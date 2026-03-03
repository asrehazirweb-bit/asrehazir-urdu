import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import {
    collection, doc, setDoc, deleteDoc, onSnapshot
} from 'firebase/firestore';
import { Plus, Trash2, FolderOpen, Tag, ChevronRight, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import Toast from '../../components/ui/Toast';

interface Category {
    id: string;
    name: string;
    subCategories: string[];
    order: number;
}

const DEFAULT_CATEGORIES: Omit<Category, 'id'>[] = [
    { name: 'عالمی خبریں', subCategories: ['ٹاپ اسٹوریز', 'مشرق وسطیٰ', 'بین الاقوامی', 'سفارت کاری'], order: 1 },
    { name: 'قومی خبریں', subCategories: ['ٹاپ اسٹوریز', 'سیاست', 'گورننس', 'ریاستیں'], order: 2 },
    { name: 'حیدرآباد', subCategories: ['مقامی خبریں', 'جرائم', 'سیاست', 'کاروبار', 'تقریبات'], order: 3 },
    { name: 'تلنگانہ', subCategories: ['مقامی خبریں', 'سیاست', 'ترقی', 'زراعت'], order: 4 },
    { name: 'آندھرا پردیش', subCategories: ['مقامی خبریں', 'سیاست', 'ترقی', 'کاروبار'], order: 5 },
    { name: 'تصویریں', subCategories: ['ٹاپ اسٹوریز', 'سیاست', 'کھیل', 'تفریح', 'تقریبات'], order: 6 },
    { name: 'ویڈیوز', subCategories: ['خبریں', 'تقریبات', 'انٹرویوز', 'وائرل'], order: 7 },
    { name: 'مضامین اور مقالہ جات', subCategories: ['ادارتی', 'تجزیہ', 'رائے', 'خصوصی رپورٹس'], order: 8 },
    { name: 'کھیل اور تفریح', subCategories: ['کرکٹ', 'سنیما', 'OTT', 'لائف اسٹائل'], order: 9 },
    { name: 'جرائم اور حادثات', subCategories: ['مقامی جرائم', 'تحقیقات', 'سیکیورٹی', 'حادثات'], order: 10 },
];


const ManageCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);

    const [newCatName, setNewCatName] = useState('');
    const [newSubInput, setNewSubInput] = useState('');
    const [newSubList, setNewSubList] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);

    const [addingSubFor, setAddingSubFor] = useState<string | null>(null);
    const [subInputFor, setSubInputFor] = useState('');

    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const COLLECTION = 'categories_urdu';

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, COLLECTION),
            (snap) => {
                const cats = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Category[];
                cats.sort((a, b) => (a.order || 0) - (b.order || 0));
                setCategories(cats);
                setLoading(false);
            },
            (error) => {
                console.error('Categories listener error:', error);
                setLoading(false);
                setToast({ message: 'زمرے لوڈ نہیں ہو سکے۔ Firestore رولز چیک کریں۔', type: 'error' });
            }
        );
        return () => unsub();
    }, []);

    const seedDefaults = async () => {
        setSeeding(true);
        try {
            for (const cat of DEFAULT_CATEGORIES) {
                const id = 'urdu-cat-' + cat.order + '-' + Date.now();
                await setDoc(doc(db, COLLECTION, id), cat);
            }
            setToast({ message: 'تمام ڈیفالٹ زمرے کامیابی سے شامل ہو گئے!', type: 'success' });
        } catch (e) {
            setToast({ message: 'زمرے شامل کرنے میں ناکامی۔', type: 'error' });
        } finally {
            setSeeding(false);
        }
    };

    const handleAddSub = () => {
        const val = newSubInput.trim();
        if (val && !newSubList.includes(val)) {
            setNewSubList([...newSubList, val]);
            setNewSubInput('');
        }
    };

    const handleCreateCategory = async () => {
        if (!newCatName.trim()) return;
        setSaving(true);
        try {
            const id = 'urdu-cat-' + Date.now();
            await setDoc(doc(db, COLLECTION, id), {
                name: newCatName.trim(),
                subCategories: newSubList,
                order: categories.length + 1,
            });
            setNewCatName('');
            setNewSubList([]);
            setNewSubInput('');
            setToast({ message: `"${newCatName}" زمرہ کامیابی سے بنا!`, type: 'success' });
        } catch {
            setToast({ message: 'زمرہ بنانے میں ناکامی۔', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteCategory = async (id: string, name: string) => {
        try {
            await deleteDoc(doc(db, COLLECTION, id));
            setToast({ message: `"${name}" حذف ہو گیا۔`, type: 'success' });
        } catch {
            setToast({ message: 'حذف کرنے میں ناکامی۔', type: 'error' });
        }
    };

    const handleAddSubToExisting = async (cat: Category) => {
        const val = subInputFor.trim();
        if (!val || cat.subCategories.includes(val)) return;
        try {
            await setDoc(doc(db, COLLECTION, cat.id), {
                ...cat,
                subCategories: [...cat.subCategories, val],
            });
            setSubInputFor('');
            setAddingSubFor(null);
            setToast({ message: `ذیلی زمرہ "${val}" شامل ہو گیا!`, type: 'success' });
        } catch {
            setToast({ message: 'ذیلی زمرہ شامل کرنے میں ناکامی۔', type: 'error' });
        }
    };

    const handleDeleteSub = async (cat: Category, sub: string) => {
        try {
            await setDoc(doc(db, COLLECTION, cat.id), {
                ...cat,
                subCategories: cat.subCategories.filter(s => s !== sub),
            });
            setToast({ message: `ذیلی زمرہ "${sub}" ہٹا دیا گیا۔`, type: 'success' });
        } catch {
            setToast({ message: 'ذیلی زمرہ ہٹانے میں ناکامی۔', type: 'error' });
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 space-y-10" dir="rtl">

            {/* Header */}
            <div className="bg-zinc-900 text-white p-8 rounded-[2rem] relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row-reverse md:items-center justify-between gap-6">
                    <div className="text-right">
                        <div className="flex flex-row-reverse items-center gap-2 mb-2">
                            <FolderOpen className="text-primary" size={18} />
                            <span className="text-[12px] font-bold text-primary">زمرہ منیجر</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black font-serif tracking-tight">
                            زمرے کا انتظام
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">خبروں کے زمرے اور ذیلی زمرے شامل، ہٹائیں، اور ترتیب دیں۔</p>
                    </div>
                    {/* Always visible — no loading condition */}
                    <button
                        onClick={seedDefaults}
                        disabled={seeding}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all whitespace-nowrap disabled:opacity-60"
                    >
                        {seeding ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> شامل ہو رہا ہے...</>
                        ) : (
                            '⚡ ڈیفالٹ زمرے لوڈ کریں'
                        )}
                    </button>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center py-20 text-gray-400 font-bold">زمرے لوڈ ہو رہے ہیں...</div>
            )}

            {/* Empty State */}
            {!loading && categories.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                    <AlertTriangle size={40} className="mx-auto text-yellow-400 mb-4" />
                    <h3 className="text-xl font-black text-gray-700 mb-2">ابھی کوئی زمرہ نہیں</h3>
                    <p className="text-sm text-gray-400 mb-6">نیچے بٹن کلک کر کے فوری ڈیفالٹ زمرے شامل کریں۔</p>
                    <button
                        onClick={seedDefaults}
                        disabled={seeding}
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-60"
                    >
                        {seeding ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> شامل ہو رہا ہے...</>
                        ) : (
                            '⚡ ڈیفالٹ زمرے لوڈ کریں'
                        )}
                    </button>
                </div>
            )}

            {/* Existing Categories */}
            {!loading && categories.length > 0 && (
                <div className="space-y-5">
                    <h2 className="text-xs font-black text-gray-400 px-1">
                        تمام زمرے ({categories.length})
                    </h2>
                    {categories.map(cat => (
                        <div key={cat.id} className="bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-row-reverse items-center justify-between px-7 py-5 border-b border-gray-50">
                                <div className="flex flex-row-reverse items-center gap-3">
                                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Tag size={16} className="text-primary" />
                                    </div>
                                    <div className="text-right">
                                        <h3 className="font-black text-gray-900 text-base">{cat.name}</h3>
                                        <span className="text-[10px] text-gray-400 font-bold">
                                            {cat.subCategories.length} ذیلی زمرے
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                    className="p-2.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="px-7 py-4">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {cat.subCategories.map(sub => (
                                        <span
                                            key={sub}
                                            className="group flex flex-row-reverse items-center gap-1.5 bg-gray-50 border border-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold hover:border-red-200 hover:bg-red-50 transition-all"
                                        >
                                            <ChevronRight size={11} className="text-primary rotate-180" />
                                            {sub}
                                            <button
                                                onClick={() => handleDeleteSub(cat, sub)}
                                                className="ml-1 text-gray-300 group-hover:text-red-400 transition-colors"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                {addingSubFor === cat.id ? (
                                    <div className="flex flex-row-reverse items-center gap-2 mt-2">
                                        <input
                                            type="text"
                                            value={subInputFor}
                                            onChange={e => setSubInputFor(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleAddSubToExisting(cat)}
                                            placeholder="نیا ذیلی زمرہ..."
                                            autoFocus
                                            className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-bold text-right"
                                        />
                                        <button
                                            onClick={() => handleAddSubToExisting(cat)}
                                            className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-black hover:bg-primary/90 transition-all"
                                        >
                                            شامل
                                        </button>
                                        <button
                                            onClick={() => { setAddingSubFor(null); setSubInputFor(''); }}
                                            className="px-3 py-2.5 bg-gray-100 text-gray-500 rounded-xl text-xs font-black hover:bg-gray-200 transition-all"
                                        >
                                            منسوخ
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { setAddingSubFor(cat.id); setSubInputFor(''); }}
                                        className="flex flex-row-reverse items-center gap-1.5 text-xs text-primary font-black hover:underline mt-1"
                                    >
                                        <Plus size={13} /> ذیلی زمرہ شامل کریں
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create New Category */}
            <div className="bg-white border-2 border-dashed border-primary/30 rounded-[2rem] p-8 space-y-6">
                <div className="flex flex-row-reverse items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                        <Plus size={18} className="text-white" />
                    </div>
                    <div className="text-right">
                        <h2 className="text-base font-black text-gray-900">نیا زمرہ بنائیں</h2>
                        <p className="text-[11px] text-gray-400 font-bold">اپنی مرضی کا زمرہ اور ذیلی زمرے شامل کریں</p>
                    </div>
                </div>

                <div>
                    <label className="text-[11px] font-black text-gray-400 block mb-2 text-right">
                        زمرے کا نام *
                    </label>
                    <input
                        type="text"
                        value={newCatName}
                        onChange={e => setNewCatName(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-bold text-sm text-right"
                        placeholder="مثال: کاروبار و معیشت"
                    />
                </div>

                <div>
                    <label className="text-[11px] font-black text-gray-400 block mb-2 text-right">
                        ذیلی زمرے (Enter دبائیں یا "شامل" کریں)
                    </label>
                    <div className="flex flex-row-reverse gap-2 mb-3">
                        <input
                            type="text"
                            value={newSubInput}
                            onChange={e => setNewSubInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSub())}
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-bold text-sm text-right"
                            placeholder="مثال: مارکیٹ خبریں"
                        />
                        <button
                            type="button"
                            onClick={handleAddSub}
                            className="px-5 py-3 bg-gray-900 text-white rounded-xl text-xs font-black hover:bg-primary transition-all"
                        >
                            شامل
                        </button>
                    </div>
                    {newSubList.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {newSubList.map(s => (
                                <span key={s} className="flex flex-row-reverse items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold">
                                    {s}
                                    <button onClick={() => setNewSubList(newSubList.filter(x => x !== s))}>
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={handleCreateCategory}
                    disabled={!newCatName.trim() || saving}
                    className="w-full flex flex-row-reverse items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl font-black text-base hover:bg-black transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
                >
                    {saving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <CheckCircle2 size={18} />
                            زمرہ بنائیں
                        </>
                    )}
                </button>
            </div>

            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </div>
    );
};

export default ManageCategories;

import React, { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';
import { uploadImage } from '../../lib/cloudinary';
import { Image as ImageIcon, Send, Layout, Type, FileText, Tag, Trash2, Sparkles, CheckCircle2, List, Activity, Hash, Loader, X } from 'lucide-react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import Toast from '../../components/ui/Toast';

interface CategoryDoc {
    id: string;
    name: string;
    subCategories: string[];
    order: number;
}

// Fallback categories for Urdu portal
const FALLBACK_CATEGORIES: CategoryDoc[] = [
    { id: 'f1', name: 'عالمی خبریں', subCategories: ['خاص خبریں', 'مڈل ایسٹ', 'بین الاقوامی', 'سفارت کاری'], order: 1 },
    { id: 'f2', name: 'قومی خبریں', subCategories: ['خاص خبریں', 'جنوبی ہند', 'سیاست', 'گورننس', 'ریاستیں'], order: 2 },
    { id: 'f3', name: 'حیدرآباد', subCategories: ['مقامی خبریں', 'جرائم', 'سیاست', 'تجارت', 'تقریبات'], order: 3 },
    { id: 'f4', name: 'تلنگانہ', subCategories: ['مقامی خبریں', 'سیاست', 'ترقی', 'زراعت'], order: 4 },
    { id: 'f5', name: 'آندھرا پردیش', subCategories: ['مقامی خبریں', 'سیاست', 'ترقی', 'تجارت'], order: 5 },
    { id: 'f6', name: 'فوٹو گیلری', subCategories: ['خاص خبریں', 'سیاست', 'کھیل', 'تفریح', 'تقریبات'], order: 6 },
    { id: 'f7', name: 'ویڈیوز', subCategories: ['خبریں', 'تقریبات', 'انٹرویو', 'وائرل'], order: 7 },
    { id: 'f8', name: 'مضامین اور مقالہ جات', subCategories: ['اداریہ', 'تجزیہ', 'رائے', 'خصوصی رپورٹ'], order: 8 },
    { id: 'f9', name: 'کھیل اور تفریح', subCategories: ['کرکٹ', 'سینما', 'او ٹی ٹی', 'لائف اسٹائل'], order: 9 },
    { id: 'f10', name: 'جرائم اور حادثات', subCategories: ['مقامی جرائم', 'تحقیقات', 'سیکیورٹی', 'حادثات'], order: 10 },
];


const AddNews: React.FC = () => {
    const [title, setTitle] = useState('');
    const [subHeadline, setSubHeadline] = useState('');
    const [content, setContent] = useState('');
    const [section, setSection] = useState('خبرِ خاص');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [showInLive, setShowInLive] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
    const [sendPush, setSendPush] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
    const [mediaLibrary, setMediaLibrary] = useState<string[]>([]);

    // Dynamic categories from Firestore
    const [categories, setCategories] = useState<CategoryDoc[]>([]);
    const [catsLoading, setCatsLoading] = useState(true);

    // Modal and toast
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Load categories from Firestore; fall back to defaults on error/empty
    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, 'categories_urdu'), orderBy('order', 'asc')),
            (snap) => {
                const cats = snap.docs.map(d => ({ id: d.id, ...d.data() })) as CategoryDoc[];

                // Merge Firestore categories with Fallbacks
                const merged = [...FALLBACK_CATEGORIES];
                cats.forEach(dbCat => {
                    const existingIdx = merged.findIndex(m => m.name === dbCat.name);
                    if (existingIdx > -1) {
                        // Merge sub-categories, avoiding duplicates
                        const combinedSubs = Array.from(new Set([...merged[existingIdx].subCategories, ...dbCat.subCategories]));
                        merged[existingIdx] = { ...dbCat, subCategories: combinedSubs };
                    } else {
                        merged.push(dbCat);
                    }
                });

                setCategories(merged.sort((a, b) => a.order - b.order));
                setCatsLoading(false);
                if (!category) {
                    setCategory(merged[0].name);
                    setSubCategory(merged[0].subCategories?.[0] || 'جنرل');
                }
            },
            (_err) => {
                // Permission denied — use fallback so dropdown always works
                setCategories(FALLBACK_CATEGORIES);
                setCatsLoading(false);
                if (!category) {
                    setCategory(FALLBACK_CATEGORIES[0].name);
                    setSubCategory(FALLBACK_CATEGORIES[0].subCategories[0]);
                }
            }
        );
        return () => unsub();
    }, []);

    // Load draft
    useEffect(() => {
        const draft = localStorage.getItem('asre-hazir-urdu-draft');
        if (draft) {
            const data = JSON.parse(draft);
            setTitle(data.title || '');
            setSubHeadline(data.subHeadline || '');
            setContent(data.content || '');
            setCategory(data.category || 'عالمی خبریں');
            setSubCategory(data.subCategory || 'ٹاپ اسٹوریز');
            setSection(data.section || 'خبرِ خاص');
            setVideoUrl(data.videoUrl || '');
            setHashtags(data.hashtags || '');
            setShowInLive(data.showInLive || false);
            setSendPush(data.sendPush || false);
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title || content) {
                localStorage.setItem('asre-hazir-urdu-draft', JSON.stringify({
                    title, subHeadline, content, category, subCategory, section, videoUrl, hashtags, showInLive, sendPush
                }));
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [title, subHeadline, content, category, subCategory, section, videoUrl, hashtags, showInLive, sendPush]);

    const fetchMediaLibrary = async () => {
        setIsMediaLibraryOpen(true);
        try {
            const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(50));
            const snapshot = await getDocs(q);
            const urls = Array.from(new Set(snapshot.docs.map(doc => doc.data().imageUrl).filter(Boolean))) as string[];
            setMediaLibrary(urls);
        } catch (error) {
            console.error("Error fetching media library:", error);
        }
    };

    const handleClearDraftClick = () => {
        setIsClearModalOpen(true);
    };

    const confirmClearDraft = () => {
        setTitle('');
        setSubHeadline('');
        setContent('');
        setImage(null);
        setImagePreview(null);
        setExistingImageUrl(null);
        setSection('خبرِ خاص');
        setCategory('عالمی خبریں');
        setSubCategory('ٹاپ اسٹوریز');
        setVideoUrl('');
        setHashtags('');
        setShowInLive(false);
        setSendPush(false);
        localStorage.removeItem('asre-hazir-urdu-draft');
        setIsClearModalOpen(false);
        setToast({ message: 'ڈرافٹ ختم کر دیا گیا', type: 'success' });
    };

    const handleCategoryChange = (val: string) => {
        setCategory(val);
        const cat = categories.find(c => c.name === val);
        if (cat) {
            setSubCategory(cat.subCategories[0] || '');
        } else {
            setSubCategory('جنرل');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
        setExistingImageUrl(null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = existingImageUrl || '';
            if (image) {
                try {
                    imageUrl = await uploadImage(image, 'urdu');
                } catch (imgErr: any) {
                    console.error("Storage error:", imgErr);
                    setToast({ message: `تصویر اپ لوڈ کرنے میں دشواری: ${imgErr.message || 'نامعلوم غلطی'}\nخبر بغیر تصویر کے شائع کی جا رہی ہے۔`, type: 'error' });
                }
            }

            const docData = {
                title,
                subHeadline,
                content,
                section,
                category,
                subCategory,
                hashtags: hashtags.split(',').map(s => s.trim()).filter(Boolean),
                showInLive,
                videoUrl,
                imageUrl: imageUrl,
                createdAt: serverTimestamp(),
                author: auth.currentUser?.displayName || 'عصر حاضر ڈیسک',
                authorId: auth.currentUser?.uid,
                status: 'published'
            };

            const docRef = await addDoc(collection(db, 'news'), docData);

            // Trigger Push Notification record if requested
            if (sendPush) {
                await addDoc(collection(db, 'notifications'), {
                    title: 'نئی خبر شائع ہوئی',
                    message: title,
                    articleId: docRef.id,
                    createdAt: serverTimestamp(),
                    read: false,
                    portal: 'urdu'
                });
            }

            setSuccessMessage(true);
            setTitle('');
            setSubHeadline('');
            setContent('');
            setImage(null);
            setImagePreview(null);
            setExistingImageUrl(null);
            setHashtags('');
            setShowInLive(false);
            setSendPush(false);
            localStorage.removeItem('asre-hazir-urdu-draft');

            setTimeout(() => setSuccessMessage(false), 5000);

            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } catch (error) {
            console.error('Error adding document: ', error);
            setToast({ message: 'نشریات ناکام ہو گئیں۔ براہ کرم انٹرنیٹ کنکشن چیک کریں۔', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const currentCat = categories.find(c => c.name === category);
    const currentSubCategories = currentCat?.subCategories || [];
    const SECTIONS = ['خبرِ خاص', 'جنوبی ہند', 'تازہ ترین خبریں', 'ضرور دیکھیں', 'علاقائی خبریں', 'بریکنگ نیوز'];

    if (catsLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] gap-3 text-gray-400" dir="rtl">
                <Loader size={20} className="animate-spin text-primary" />
                <span className="font-bold text-sm">زمرے لوڈ ہو رہے ہیں...</span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4 text-right">
            {/* Success Notification */}
            {successMessage && (
                <div className="fixed top-24 left-4 z-[100] animate-in slide-in-from-left duration-500">
                    <div className="bg-green-600 text-white px-10 py-5 rounded-2xl shadow-2xl flex flex-row-reverse items-center gap-5">
                        <CheckCircle2 size={28} />
                        <div className="text-right">
                            <p className="font-bold text-sm tracking-widest">کامیاب نشریات</p>
                            <p className="text-lg font-medium opacity-90 text-nowrap">آپ کی خبر پورٹل پر لائیو ہو چکی ہے۔</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden relative">

                        {/* News Desk Header */}
                        <div className="bg-zinc-900 p-8 md:p-12 text-white relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
                            <div className="relative z-10 flex flex-col md:flex-row-reverse md:items-end justify-between gap-6">
                                <div>
                                    <div className="flex flex-row-reverse items-center gap-2 mb-3">
                                        <Sparkles className="text-primary" size={20} />
                                        <span className="text-[12px] font-bold text-primary uppercase tracking-widest">لائیو نیوز روم انجن</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-none">نیوز ڈیسک</h1>
                                </div>
                                <div className="flex flex-row-reverse flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={handleClearDraftClick}
                                        className="flex flex-row-reverse items-center gap-2 bg-zinc-800 text-zinc-500 hover:text-white px-8 py-4 rounded-xl font-bold text-sm transition-all"
                                    >
                                        <Trash2 size={18} /> نیوز ڈیسک ری سیٹ
                                    </button>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
                            {/* Headline */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <Type className="w-3.5 h-3.5 text-primary" /> مضمون کی سرخی
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full text-3xl md:text-5xl font-black border-b-2 border-gray-100 bg-transparent py-4 focus:border-primary outline-none transition-all"
                                    placeholder="سرخی درج کریں..."
                                    required
                                />
                            </div>

                            {/* Sub-Headline */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <List className="w-3.5 h-3.5 text-primary" /> ذیلی سرخی (Sub-Headline)
                                </label>
                                <input
                                    type="text"
                                    value={subHeadline}
                                    onChange={(e) => setSubHeadline(e.target.value)}
                                    className="w-full text-xl md:text-2xl font-bold border-b border-gray-100 bg-transparent py-2 focus:border-primary outline-none transition-all text-gray-600"
                                    placeholder="ذیلی سرخی درج کریں..."
                                />
                            </div>

                            {/* Hashtags & Live Toggle */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-50 p-8 rounded-3xl border border-gray-100">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Hash className="w-3.5 h-3.5 text-primary" /> ہیش ٹیگز (کامہ سے الگ کریں)
                                    </label>
                                    <input
                                        type="text"
                                        value={hashtags}
                                        onChange={(e) => setHashtags(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-100 bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-xs h-14"
                                        placeholder="#politics, #hyderabad..."
                                    />
                                </div>
                                <div className="space-y-4 flex flex-col justify-center">
                                    <label className="flex flex-row-reverse items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                                        <Activity className="w-3.5 h-3.5 text-primary" /> نشریاتی اختیارات
                                    </label>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-end gap-4 p-4 bg-white rounded-xl border border-gray-100 h-14">
                                            <span className="font-bold text-sm text-gray-600">اسے لائیو نیوز کے طور پر دکھائیں</span>
                                            <input
                                                type="checkbox"
                                                checked={showInLive}
                                                onChange={(e) => setShowInLive(e.target.checked)}
                                                className="w-6 h-6 accent-primary cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex items-center justify-end gap-4 p-4 bg-white rounded-xl border border-gray-100 h-14">
                                            <span className="font-bold text-sm text-gray-600 italic">پش نوٹیفکیشن بھیجیں</span>
                                            <input
                                                type="checkbox"
                                                checked={sendPush}
                                                onChange={(e) => setSendPush(e.target.checked)}
                                                className="w-6 h-6 accent-primary cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Placement Strategy */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Section Selection */}
                                <div className="space-y-4">
                                    <label className="flex flex-row-reverse items-center gap-2 text-sm font-bold text-gray-400">
                                        <Sparkles className="w-4 h-4 text-primary" /> پیج سیکشن
                                    </label>
                                    <select
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                        className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-lg min-h-[3.5rem] text-right"
                                    >
                                        {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-4">
                                    <label className="flex flex-row-reverse items-center gap-2 text-sm font-bold text-gray-400">
                                        <Tag className="w-4 h-4 text-primary" /> خبر کا زمرہ
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-lg min-h-[3.5rem] text-right"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>


                                {/* Subcategory Selection */}
                                <div className="space-y-4">
                                    <label className="flex flex-row-reverse items-center gap-2 text-sm font-bold text-gray-400">
                                        <Layout className="w-4 h-4 text-primary" /> ذیلی زمرہ
                                    </label>
                                    <select
                                        value={subCategory}
                                        onChange={(e) => setSubCategory(e.target.value)}
                                        className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-lg min-h-[3.5rem] text-right"
                                    >
                                        {currentSubCategories.length > 0 ? (
                                            currentSubCategories.map(sub => (
                                                <option key={sub} value={sub}>{sub}</option>
                                            ))
                                        ) : (
                                            <option value="جنرل">جنرل</option>
                                        )}
                                    </select>
                                </div>

                            </div>

                            {/* Video URL (Conditional) */}
                            {category === 'ویڈیوز' && (
                                <div className="space-y-4 animate-in slide-in-from-top duration-500">
                                    <label className="flex flex-row-reverse items-center gap-2 text-sm font-bold text-gray-400">
                                        <Tag className="w-4 h-4 text-primary" /> بیرونی ویڈیو لنک (Twitter/YT/FB/Insta)
                                    </label>
                                    <input
                                        type="url"
                                        dir="ltr"
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        className="w-full p-6 rounded-[2rem] border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-left"
                                        placeholder="Paste video link here (e.g., https://twitter.com/...)"
                                        required={category === 'ویڈیوز'}
                                    />
                                </div>
                            )}

                            {/* Body */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <FileText className="w-3.5 h-3.5 text-primary" /> کہانی کی تفصیل
                                </label>
                                <div className="quill-wrapper ql-rtl font-noto-urdu" dir="rtl">
                                    <ReactQuill
                                        theme="snow"
                                        value={content}
                                        onChange={setContent}
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, 3, false] }],
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                ['link', 'clean'],
                                            ],
                                        }}
                                        className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100"
                                        placeholder="تفصیل یہاں لکھیں..."
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        type="button"
                                        onClick={fetchMediaLibrary}
                                        className="text-primary font-bold hover:underline flex items-center gap-2"
                                    >
                                        <List size={16} /> میڈیا لائبریری سے منتخب کریں
                                    </button>
                                    <label className="flex flex-row-reverse items-center gap-2 text-sm font-bold text-gray-400">
                                        <ImageIcon className="w-4 h-4 text-primary" /> خبر کی تصویر
                                    </label>
                                </div>
                                <div className={`relative border-2 border-dashed rounded-[2rem] p-6 transition-all duration-500 ${imagePreview || existingImageUrl ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary'}`}>
                                    {imagePreview || existingImageUrl ? (
                                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-50">
                                            <img src={imagePreview || existingImageUrl || ''} alt="Preview" className="w-full h-auto max-h-[500px] object-contain mx-auto block" />
                                            <button type="button" onClick={() => { setImage(null); setImagePreview(null); setExistingImageUrl(null); }} className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">تصویر تبدیل کریں</button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center min-h-[16rem] cursor-pointer">
                                            <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                                            <span className="text-gray-900 font-bold text-lg">خبر کے لیے تصویر منتخب کریں</span>
                                            <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group bg-primary hover:bg-black text-white font-black py-8 rounded-[2rem] transition-all duration-500 shadow-2xl shadow-primary/30 flex flex-row-reverse items-center justify-center gap-5 active:scale-95"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span className="text-lg font-bold">نشریات جاری ہیں...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-2xl font-black">خبر شائع کریں</span>
                                        <Send size={24} className="group-hover:-translate-x-2 transition-transform rotate-180" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Media Library Modal — Mobile First */}
            {isMediaLibraryOpen && (
                <div
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        backgroundColor: 'rgba(0,0,0,0.75)',
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'stretch',
                    }}
                    onClick={(e) => { if (e.target === e.currentTarget) setIsMediaLibraryOpen(false); }}
                >
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: window.innerWidth < 640 ? '1.5rem 1.5rem 0 0' : '2rem',
                            maxHeight: window.innerWidth < 640 ? '85vh' : '90vh',
                            height: window.innerWidth < 640 ? '85vh' : '90vh',
                            width: window.innerWidth < 640 ? '100%' : '1000px',
                            maxWidth: '95vw',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            boxShadow: '0 -10px 60px rgba(0,0,0,0.4)',
                            alignSelf: 'center',
                        }}
                    >
                        {/* Drag handle */}
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 6px', flexShrink: 0 }}>
                            <div style={{ width: 40, height: 4, borderRadius: 9999, background: '#d1d5db' }} />
                        </div>

                        {/* Header */}
                        <div
                            style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '12px 20px', background: '#18181b', color: '#fff',
                                flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.08)',
                            }}
                            dir="rtl"
                        >
                            <div>
                                <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', color: '#a1a1aa', margin: '0 0 2px' }}>ایڈمن پینل</p>
                                <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>میڈیا لائبریری</h2>
                            </div>
                            <button
                                onClick={() => setIsMediaLibraryOpen(false)}
                                style={{
                                    background: '#3f3f46', border: 'none', color: '#fff',
                                    borderRadius: 10, padding: '8px 14px',
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    fontSize: 12, fontWeight: 900, cursor: 'pointer',
                                }}
                            >
                                <X size={15} /> بند
                            </button>
                        </div>

                        {/* Count bar */}
                        {mediaLibrary.length > 0 && (
                            <div style={{ padding: '6px 16px', background: '#f9fafb', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
                                <p style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.15em', margin: 0, textTransform: 'uppercase' }}>
                                    {mediaLibrary.length} تصاویر — چنیں
                                </p>
                            </div>
                        )}

                        {/* Scrollable Image Grid */}
                        <div
                            style={{
                                flex: 1,
                                minHeight: 0,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                WebkitOverflowScrolling: 'touch',
                                padding: 10,
                                display: 'grid',
                                gridTemplateColumns: window.innerWidth < 640
                                    ? 'repeat(3, 1fr)'
                                    : 'repeat(5, 1fr)',
                                gap: 8,
                                alignContent: 'start',
                            }}
                        >
                            {mediaLibrary.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}>
                                    <ImageIcon size={48} style={{ color: '#d1d5db', marginBottom: 12 }} />
                                    <p style={{ fontWeight: 700, color: '#9ca3af', fontSize: 14, margin: 0 }}>کوئی تصویر نہیں ملی</p>
                                    <p style={{ fontSize: 11, color: '#d1d5db', marginTop: 6 }}>پہلے کسی خبر کے ساتھ تصویر لگائیں</p>
                                </div>
                            ) : mediaLibrary.map((url, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setExistingImageUrl(url);
                                        setImage(null);
                                        setImagePreview(null);
                                        setIsMediaLibraryOpen(false);
                                    }}
                                    onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
                                    onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                    style={{
                                        aspectRatio: '1/1',
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                        border: '2px solid transparent',
                                        cursor: 'pointer',
                                        background: '#f3f4f6',
                                        transition: 'transform 0.1s',
                                    }}
                                >
                                    <img
                                        src={url}
                                        alt={`media-${i}`}
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}


            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={confirmClearDraft}
                title="مواد صاف کریں"
                message="کیا آپ واقعی تمام فیلڈز خالی کرنا چاہتے ہیں؟ آپ کا موجودہ ڈرافٹ ختم ہو جائے گا۔"
                confirmText="سب صاف کریں"
                cancelText="منسوخ کریں"
                isLoading={false}
            />

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default AddNews;

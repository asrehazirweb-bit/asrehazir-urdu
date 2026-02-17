import React, { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadImage } from '../../lib/cloudinary';
import { Image as ImageIcon, Send, Layout, Type, FileText, Tag, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import Toast from '../../components/ui/Toast';

const CATEGORIES = [
    { name: 'عالمی خبریں', subCategories: ['ٹاپ اسٹوریز', 'مشرق وسطیٰ', 'بین الاقوامی', 'سفارت کاری'] },
    { name: 'قومی خبریں', subCategories: ['ٹاپ اسٹوریز', 'سیاست', 'گورننس', 'ریاستیں'] },
    { name: 'دکن نیوز', subCategories: ['حیدرآباد', 'تلنگانہ', 'آندھرا پردیش', 'جنوبی بھارت'] },
    { name: 'مضامین اور مقالہ جات', subCategories: ['ادارتی', 'تجزیہ', 'رائے', 'خصوصی رپورٹس'] },
    { name: 'کھیل اور تفریح', subCategories: ['کرکٹ', 'سنیما', 'OTT', 'لائف اسٹائل'] },
    { name: 'جرائم اور حادثات', subCategories: ['مقامی جرائم', 'تحقیقات', 'سیکیورٹی', 'حادثات'] }
];

const FONTS_TITLE = [
    { id: 'font-noto-urdu', name: 'Nasta`liq (Standard)' },
    { id: 'font-amiri', name: 'Amiri (Classical)' },
    { id: 'font-reem-kufi', name: 'Reem Kufi (Artistic)' },
    { id: 'font-scheherazade', name: 'Scheherazade (Traditional)' },
    { id: 'font-tajawal', name: 'Tajawal (Modern)' },
    { id: 'font-aref-ruqaa', name: 'Aref Ruqaa (Calligraphic)' },
    { id: 'font-changa', name: 'Changa (Bold)' },
    { id: 'font-lateef', name: 'Lateef (Soft)' },
    { id: 'font-harmattan', name: 'Harmattan (Clean)' },
    { id: 'font-markazi-text', name: 'Markazi (Balanced)' }
];

const FONTS_CONTENT = [
    { id: 'font-noto-urdu', name: 'Nasta`liq' },
    { id: 'font-markazi-text', name: 'Markazi Text' },
    { id: 'font-harmattan', name: 'Harmattan' },
    { id: 'font-lateef', name: 'Lateef' },
    { id: 'font-scheherazade', name: 'Scheherazade' },
    { id: 'font-tajawal', name: 'Tajawal' },
    { id: 'font-amiri', name: 'Amiri' },
    { id: 'font-reem-kufi', name: 'Reem Kufi' },
    { id: 'font-noto-sans-arabic', name: 'Noto Sans Arabic' },
    { id: 'font-serif', name: 'Default Serif' }
];

const AddNews: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [section, setSection] = useState('خبرِ خاص');
    const [category, setCategory] = useState('عالمی خبریں');
    const [subCategory, setSubCategory] = useState('عالمی');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [titleFont, setTitleFont] = useState('font-noto-urdu');
    const [contentFont, setContentFont] = useState('font-noto-urdu');

    // New state for modal and toast
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Load draft
    useEffect(() => {
        const draft = localStorage.getItem('asre-hazir-urdu-draft');
        if (draft) {
            const { title: dTitle, content: dContent, category: dCategory, subCategory: dSubCategory, section: dSection, titleFont: dTitleFont, contentFont: dContentFont } = JSON.parse(draft);
            setTitle(dTitle || '');
            setContent(dContent || '');
            setCategory(dCategory || 'عالمی خبریں');
            setSubCategory(dSubCategory || 'ٹاپ اسٹوریز');
            setSection(dSection || 'ٹاپ اسٹوریز');
            setTitleFont(dTitleFont || 'font-noto-urdu');
            setContentFont(dContentFont || 'font-noto-urdu');
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title || content) {
                localStorage.setItem('asre-hazir-urdu-draft', JSON.stringify({ title, content, category, subCategory, section, titleFont, contentFont }));
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [title, content, category, subCategory, section, titleFont, contentFont]);

    const handleClearDraftClick = () => {
        setIsClearModalOpen(true);
    };

    const confirmClearDraft = () => {
        setTitle('');
        setContent('');
        setImage(null);
        setImagePreview(null);
        setSection('خبرِ خاص');
        setCategory('عالمی خبریں');
        setSubCategory('عالمی');
        localStorage.removeItem('asre-hazir-urdu-draft');
        setIsClearModalOpen(false);
        setToast({ message: 'ڈرافٹ ختم کر دیا گیا', type: 'success' });
    };

    const handleCategoryChange = (val: string) => {
        setCategory(val);
        const cat = CATEGORIES.find(c => c.name === val);
        if (cat) {
            setSubCategory(cat.subCategories[0]);
        } else if (val !== 'دیگر') {
            setSubCategory('جنرل');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
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
            let imageUrl = '';
            if (image) {
                try {
                    imageUrl = await uploadImage(image, 'urdu');
                } catch (imgErr: any) {
                    console.error("Storage error:", imgErr);
                    setToast({ message: `تصویر اپ لوڈ کرنے میں دشواری: ${imgErr.message || 'نامعلوم غلطی'}\nخبر بغیر تصویر کے شائع کی جا رہی ہے۔`, type: 'error' });
                }
            }

            await addDoc(collection(db, 'news'), {
                title,
                content,
                section,
                category,
                subCategory,
                titleFont,
                contentFont,
                imageUrl: imageUrl,  // Single image field
                createdAt: serverTimestamp(),
                author: auth.currentUser?.displayName || 'عصر حاضر ڈیسک',
                authorId: auth.currentUser?.uid,
                status: 'published'
            });

            setSuccessMessage(true);
            setTitle('');
            setContent('');
            setImage(null);
            setImagePreview(null);
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

    const currentSubCategories = CATEGORIES.find(c => c.name === category)?.subCategories || [];
    const SECTIONS = ['خبرِ خاص', 'تازہ ترین خبریں', 'ضرور دیکھیں', 'علاقائی خبریں', 'بریکنگ نیوز', 'دیگر'];

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
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden relative">

                        {/* News Desk Header */}
                        <div className="bg-zinc-900 p-8 md:p-12 text-white relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
                            <div className="relative z-10 flex flex-col md:flex-row-reverse md:items-end justify-between gap-6">
                                <div>
                                    <div className="flex flex-row-reverse items-center gap-2 mb-3">
                                        <Sparkles className="text-red-600" size={20} />
                                        <span className="text-[12px] font-bold text-red-500 uppercase tracking-widest">لائیو نیوز روم انجن</span>
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
                                    <Type className="w-3.5 h-3.5 text-red-600" /> مضمون کی سرخی
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`w-full text-3xl md:text-5xl font-black border-b-2 border-gray-100 dark:border-zinc-800 bg-transparent py-4 focus:border-red-600 outline-none transition-all dark:text-white ${titleFont}`}
                                    placeholder="سرخی درج کریں..."
                                    required
                                />
                            </div>

                            {/* Font Strategy Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-50 dark:bg-zinc-800/30 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Sparkles className="w-3.5 h-3.5 text-red-600" /> سرخی کا فونٹ
                                    </label>
                                    <select
                                        value={titleFont}
                                        onChange={(e) => setTitleFont(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-800 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-xs h-14"
                                    >
                                        {FONTS_TITLE.map(f => <option key={f.id} value={f.id} className={f.id}>{f.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <FileText className="w-3.5 h-3.5 text-red-600" /> مواد کا فونٹ
                                    </label>
                                    <select
                                        value={contentFont}
                                        onChange={(e) => setContentFont(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-800 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-xs h-14"
                                    >
                                        {FONTS_CONTENT.map(f => <option key={f.id} value={f.id} className={f.id}>{f.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Placement Strategy */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Section Selection */}
                                <div className="space-y-4">
                                    <label className="flex flex-row-reverse items-center gap-2 text-sm font-bold text-gray-400">
                                        <Sparkles className="w-4 h-4 text-red-600" /> پیج سیکشن
                                    </label>
                                    <select
                                        value={SECTIONS.includes(section) ? section : 'دیگر'}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === 'دیگر') setSection('');
                                            else setSection(val);
                                        }}
                                        className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-lg min-h-[3.5rem] text-right"
                                    >
                                        {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {!SECTIONS.includes(section) && (
                                        <input
                                            type="text"
                                            placeholder="اپنی مرضی کا سیکشن..."
                                            value={section}
                                            onChange={(e) => setSection(e.target.value)}
                                            className="w-full p-4 mt-2 rounded-xl border border-red-600/20 bg-white dark:bg-zinc-800 outline-none focus:border-red-600 transition-all dark:text-white font-bold text-lg text-right"
                                        />
                                    )}
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-4">
                                    <label className="flex flex-row-reverse items-center gap-2 text-sm font-bold text-gray-400">
                                        <Tag className="w-4 h-4 text-red-600" /> خبر کا زمرہ
                                    </label>
                                    <select
                                        value={CATEGORIES.find(c => c.name === category) ? category : 'دیگر'}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === 'دیگر') {
                                                setCategory('');
                                                setSubCategory('جنرل');
                                            } else {
                                                handleCategoryChange(val);
                                            }
                                        }}
                                        className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-lg min-h-[3.5rem] text-right"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                                        ))}
                                        <option value="دیگر">دیگر (اپنی مرضی کا)...</option>
                                    </select>
                                    {(category === '' || !CATEGORIES.find(c => c.name === category)) && (
                                        <input
                                            type="text"
                                            placeholder="اپنی مرضی کا زمرہ..."
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full p-4 mt-2 rounded-xl border border-red-600/20 bg-white dark:bg-zinc-800 outline-none focus:border-red-600 transition-all dark:text-white font-bold text-lg text-right"
                                        />
                                    )}
                                </div>

                                {/* Subcategory Selection */}
                                <div className="space-y-4">
                                    <label className="flex flex-row-reverse items-center gap-2 text-sm font-bold text-gray-400">
                                        <Layout className="w-4 h-4 text-red-600" /> ذیلی زمرہ
                                    </label>
                                    {CATEGORIES.find(c => c.name === category) ? (
                                        <select
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                            className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-lg min-h-[3.5rem] text-right"
                                        >
                                            {currentSubCategories.map(sub => (
                                                <option key={sub} value={sub}>{sub}</option>
                                            ))}
                                            <option value="دیگر">دیگر (اپنی مرضی کا)...</option>
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder="اپنی مرضی کا ذیلی زمرہ..."
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                            className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white font-bold text-lg min-h-[3.5rem] text-right"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <FileText className="w-3.5 h-3.5 text-red-600" /> کہانی کی تفصیل
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={10}
                                    className={`w-full p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-600/10 outline-none transition-all dark:text-white leading-relaxed text-2xl ${contentFont}`}
                                    placeholder="تفصیل یہاں لکھیں..."
                                    required
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <label className="flex flex-row-reverse items-center gap-2 text-sm font-bold text-gray-400">
                                    <ImageIcon className="w-4 h-4 text-red-600" /> خبر کی تصویر
                                </label>
                                <div className={`relative border-2 border-dashed rounded-[2rem] p-6 transition-all duration-500 ${imagePreview ? 'border-red-600 bg-red-50/5' : 'border-gray-200 dark:border-zinc-800 hover:border-red-600'}`}>
                                    {imagePreview ? (
                                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-50 dark:bg-zinc-800/50">
                                            <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-[500px] object-contain mx-auto block" />
                                            <button type="button" onClick={() => { setImage(null); setImagePreview(null); }} className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">تصویر تبدیل کریں</button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center min-h-[16rem] cursor-pointer">
                                            <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                                            <span className="text-gray-900 dark:text-white font-bold text-lg">خبر کے لیے تصویر منتخب کریں</span>
                                            <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group bg-red-600 hover:bg-black text-white font-black py-8 rounded-[2rem] transition-all duration-500 shadow-2xl shadow-red-600/30 flex flex-row-reverse items-center justify-center gap-5 active:scale-95"
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

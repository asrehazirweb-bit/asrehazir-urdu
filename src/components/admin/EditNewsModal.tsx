import React, { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { X, Save, Image as ImageIcon, Layout, Type, FileText, Tag, Loader2 } from 'lucide-react';
import { type NewsArticle } from '../../hooks/useNews';
import Toast from '../../components/ui/Toast';

interface EditNewsModalProps {
    article: NewsArticle;
    onClose: () => void;
    onSuccess: () => void;
}

const CATEGORIES = [
    { name: 'عالمی خبریں', subCategories: ['عالمی', 'مشرقِ وسطی', 'بین الاقوامی', 'سفارت کاری'] },
    { name: 'قومی خبریں', subCategories: ['قومی', 'سیاست', 'حکمرانی', 'ریاستیں'] },
    { name: 'دکن نیوز', subCategories: ['حیدرآباد', 'تلنگانہ', 'آندھرا پردیش', 'جنوبی ہند'] },
    { name: 'مضامین اور مقالہ جات', subCategories: ['اداریہ', 'تجزیہ', 'رائے', 'خصوصی رپورٹ'] },
    { name: 'کھیل اور تفریح', subCategories: ['کرکٹ', 'سنیما', 'لوک فن', 'لائف اسٹائل'] },
    { name: 'جرائم اور حادثات', subCategories: ['مقامی جرائم', 'تحقیقات', 'سیکیورٹی', 'حادثات'] }
];

const EditNewsModal: React.FC<EditNewsModalProps> = ({ article, onClose, onSuccess }) => {
    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);
    const [category, setCategory] = useState(article.category);
    const [subCategory, setSubCategory] = useState(article.subCategory || 'عالمی');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(article.imageUrl);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleCategoryChange = (val: string) => {
        setCategory(val);
        const cat = CATEGORIES.find(c => c.name === val);
        if (cat) {
            setSubCategory(cat.subCategories[0]);
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
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = article.imageUrl;

            if (image) {
                try {
                    const storageRef = ref(storage, `news/${Date.now()}_${image.name}`);
                    await uploadBytes(storageRef, image);
                    imageUrl = await getDownloadURL(storageRef);
                } catch (storageErr) {
                    console.error("Storage error during edit:", storageErr);
                    setToast({ message: "تصویر اپ لوڈ کرنے میں دشواری۔ صرف مواد اپ ڈیٹ کیا جا رہا ہے۔", type: 'error' });
                }
            }

            const docRef = doc(db, 'news', article.id);
            await updateDoc(docRef, {
                title,
                content,
                category,
                subCategory,
                imageUrl,
                updatedAt: new Date()
            });

            onSuccess();
        } catch (error) {
            console.error('Error updating document: ', error);
            setToast({ message: 'خبر اپ ڈیٹ کرنے میں غلطی پیش آئی۔', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const currentSubCategories = CATEGORIES.find(c => c.name === category)?.subCategories || [];

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 text-right">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-5xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">

                {/* Modal Header */}
                <div className="bg-zinc-900 p-8 text-white flex flex-row-reverse items-center justify-between border-b border-white/5">
                    <div className="flex flex-row-reverse items-center gap-4 text-right">
                        <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-600/20">
                            <Save size={20} />
                        </div>
                        <div className="text-right">
                            <h2 className="text-2xl font-serif font-black uppercase italic tracking-tight">خبر میں ترمیم کریں</h2>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mt-1">آئی ڈی: {article.id}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 hover:bg-red-600 hover:text-white transition-all text-zinc-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 md:p-10 space-y-10">

                    {/* Headline */}
                    <div className="space-y-4">
                        <label className="flex flex-row-reverse items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <Type className="w-3.5 h-3.5 text-red-600" /> خبر کی سرخی
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-2xl md:text-4xl font-serif font-black border-b-2 border-gray-100 dark:border-zinc-800 bg-transparent py-4 focus:border-red-600 outline-none transition-all dark:text-white text-right"
                            required
                        />
                    </div>

                    {/* Meta Selects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="flex flex-row-reverse items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <Tag className="w-3.5 h-3.5 text-red-600" /> خبر کا زمرہ
                            </label>
                            <select
                                value={category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-500/10 outline-none transition-all dark:text-white cursor-pointer font-bold text-lg min-h-[3.5rem] text-right"
                            >
                                {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="flex flex-row-reverse items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <Layout className="w-3.5 h-3.5 text-red-600" /> ذیلی زمرہ
                            </label>
                            <select
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-500/10 outline-none transition-all dark:text-white cursor-pointer font-bold text-lg min-h-[3.5rem] text-right"
                            >
                                {currentSubCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <label className="flex flex-row-reverse items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <FileText className="w-3.5 h-3.5 text-red-600" /> خبر کی تفصیل
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={8}
                            className="w-full p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-4 focus:ring-red-500/10 outline-none transition-all dark:text-white font-sans leading-relaxed text-xl text-right"
                            required
                        />
                    </div>

                    {/* Image Update */}
                    <div className="space-y-4 text-right">
                        <label className="flex flex-row-reverse items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <ImageIcon className="w-3.5 h-3.5 text-red-600" /> میڈیا اپ ڈیٹ
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {imagePreview && (
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-700">
                                    <img src={imagePreview} alt="Current" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-[12px] font-black text-white uppercase tracking-widest">موجودہ تصویر</span>
                                    </div>
                                </div>
                            )}
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl cursor-pointer hover:border-red-500 transition-all aspect-video group">
                                <ImageIcon size={24} className="text-gray-300 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-gray-400">تصویر تبدیل کریں</span>
                                <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>
                </form>

                {/* Modal Footer */}
                <div className="p-8 border-t border-gray-50 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 flex flex-row-reverse gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-[2] bg-red-600 hover:bg-black text-white py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:shadow-red-600/20 transition-all active:scale-[0.98] disabled:opacity-50 flex flex-row-reverse items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                اپ ڈیٹ ہو رہا ہے...
                            </>
                        ) : (
                            <>
                                <Save size={14} /> تبدیلی محفوظ کریں
                            </>
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 px-6 rounded-2xl border border-gray-200 dark:border-zinc-800 text-gray-500 font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all"
                    >
                        منسوخ کریں
                    </button>
                </div>

            </div>
            {
                toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )
            }
        </div >
    );
};

export default EditNewsModal;

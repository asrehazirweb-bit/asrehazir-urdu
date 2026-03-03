import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Save, X, Image as ImageIcon, FileText, List, Activity, Hash, Type } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { doc, getDoc, collection, query, orderBy, limit, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { newsService } from '../../services/newsService';
import type { UrduPost } from '../../services/newsService';
import Toast from '../../components/ui/Toast';
import { uploadImage } from '../../lib/cloudinary';

const UrduPostEditor: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [subHeadline, setSubHeadline] = useState('');
    const [content, setContent] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [isLive, setIsLive] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(!!id);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
    const [mediaLibrary, setMediaLibrary] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const postDoc = await getDoc(doc(db, 'news', id));
                if (postDoc.exists()) {
                    const data = postDoc.data() as UrduPost;
                    setTitle(data.title);
                    setSubHeadline(data.subHeadline || '');
                    setContent(data.content);
                    setExistingImageUrl(data.imageUrl || null);
                    setHashtags(data.hashtags?.join(', ') || '');
                    setIsLive(data.isLive || false);
                }
                setInitialLoading(false);
            };
            fetchPost();
        }
    }, [id]);

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImageFile(file);
            setExistingImageUrl(null);
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
            let finalImageUrl = existingImageUrl || '';

            if (imageFile) {
                try {
                    finalImageUrl = await uploadImage(imageFile, 'urdu');
                } catch (imgErr: any) {
                    console.error("Image upload error:", imgErr);
                    setToast({ message: 'تصویر اپ لوڈ کرنے میں ناکامی، پرانی تصویر استعمال کی جائے گی۔', type: 'error' });
                }
            }

            const postData: Partial<UrduPost> = {
                title,
                subHeadline,
                content,
                imageUrl: finalImageUrl,
                hashtags: hashtags.split(',').map(s => s.trim()).filter(Boolean),
                isLive
            };

            if (id) {
                await newsService.updatePost(id, postData);
                setToast({ message: 'خبر کامیابی کے ساتھ اپ ڈیٹ کر دی گئی ہے۔', type: 'success' });
            } else {
                // If somehow accessed without ID as editor
                await addDoc(collection(db, 'news'), {
                    ...postData,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    status: 'published',
                    author: 'عصرِ حاضر ڈیسک'
                });
                setToast({ message: 'نئی خبر شامل کر دی گئی۔', type: 'success' });
            }

            setTimeout(() => navigate('/admin'), 2000);

        } catch (error) {
            console.error("Save error:", error);
            setToast({ message: 'خرابی پیش آگئی، براہ کرم دوبارہ کوشش کریں۔', type: 'error' });
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <div className="min-h-screen flex items-center justify-center font-urdu">لوڈ ہو رہا ہے...</div>;
    }

    return (
        <div className="min-h-screen bg-[#fdfdfb] p-6 lg:p-12 font-urdu" dir="rtl">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8"
                >
                    <ArrowRight size={20} /> واپس جائیں
                </button>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
                    <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-zinc-900 text-white">
                        <h1 className="text-3xl font-black italic">
                            {id ? 'خبر میں ترمیم کریں' : 'نئی خبر لکھیں'}
                        </h1>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/admin')}
                                className="px-6 py-2.5 rounded-full font-bold text-gray-400 hover:text-white transition-all flex items-center gap-2"
                            >
                                <X size={18} /> منسوخ کریں
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-primary hover:bg-black text-white px-10 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                            >
                                {loading ? 'محفوظ ہو رہا ہے...' : <><Save size={18} /> محفوظ کریں</>}
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-10">
                        {/* Title Section */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-gray-400 flex items-center gap-2">
                                <Type size={14} className="text-primary" /> خبر کی سرخی
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-4xl font-black border-b-2 border-gray-50 focus:border-primary bg-transparent py-4 outline-none transition-all placeholder:text-gray-200"
                                placeholder="سرخی یہاں لکھیں..."
                                required
                            />
                        </div>

                        {/* Sub-Headline Section */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-gray-400 flex items-center gap-2">
                                <List size={14} className="text-primary" /> ذیلی سرخی (Sub-Headline)
                            </label>
                            <input
                                type="text"
                                value={subHeadline}
                                onChange={(e) => setSubHeadline(e.target.value)}
                                className="w-full text-xl font-bold border-b border-gray-50 bg-transparent py-2 focus:border-primary outline-none transition-all placeholder:text-gray-200 text-gray-600"
                                placeholder="ذیلی سرخی یہاں لکھیں..."
                            />
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-50 p-8 rounded-3xl border border-gray-100 shadow-inner">
                            <div className="space-y-4">
                                <label className="text-sm font-black text-gray-400 flex items-center gap-2">
                                    <Hash size={14} className="text-primary" /> ہیش ٹیگز
                                </label>
                                <input
                                    type="text"
                                    value={hashtags}
                                    onChange={(e) => setHashtags(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-100 bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-xs h-12"
                                    placeholder="#politics, #deccan..."
                                />
                            </div>
                            <div className="space-y-4 flex flex-col justify-center">
                                <label className="text-sm font-black text-gray-400 flex items-center gap-2 mb-2">
                                    <Activity size={14} className="text-primary" /> لائیو اسٹیٹس
                                </label>
                                <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100 h-12">
                                    <span className="font-bold text-sm text-gray-600">لائیو نیوز کے طور پر دکھائیں؟</span>
                                    <input
                                        type="checkbox"
                                        checked={isLive}
                                        onChange={(e) => setIsLive(e.target.checked)}
                                        className="w-6 h-6 accent-primary cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    type="button"
                                    onClick={fetchMediaLibrary}
                                    className="text-primary font-bold hover:underline flex items-center gap-2 text-sm"
                                >
                                    <List size={16} /> میڈیا لائبریری سے منتخب کریں
                                </button>
                                <label className="text-sm font-black text-gray-400 flex items-center gap-2">
                                    <ImageIcon size={14} className="text-primary" /> خبر کی تصویر
                                </label>
                            </div>

                            <div className="relative group">
                                {(imagePreview || existingImageUrl) ? (
                                    <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-gray-100 shadow-2xl">
                                        <img
                                            src={imagePreview || existingImageUrl || ''}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFile(null);
                                                setImagePreview(null);
                                                setExistingImageUrl(null);
                                            }}
                                            className="absolute top-4 right-4 bg-black/80 text-white p-3 rounded-xl shadow-lg hover:bg-red-600 transition-all font-black text-xs uppercase"
                                        >
                                            تبدیل کریں
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center aspect-video bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-white hover:border-primary transition-all">
                                        <ImageIcon size={40} className="text-gray-200 mb-2" />
                                        <span className="text-gray-400 font-bold">تصویر اپ لوڈ کریں</span>
                                        <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-gray-400 flex items-center gap-2">
                                <FileText size={14} className="text-primary" /> خبر کی تفصیل
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
                                    className="bg-gray-50/50 rounded-3xl overflow-hidden border border-gray-100"
                                    placeholder="تفصیل یہاں لکھیں..."
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Media Library Modal */}
            {isMediaLibraryOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-zinc-900 text-white">
                            <h2 className="text-2xl font-black italic uppercase italic">میڈیا لائبریری</h2>
                            <button onClick={() => setIsMediaLibraryOpen(false)} className="bg-zinc-800 p-2 rounded-full hover:bg-red-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                            {mediaLibrary.map((url, i) => (
                                <div
                                    key={i}
                                    className="aspect-square rounded-2xl overflow-hidden border-4 border-transparent hover:border-primary cursor-pointer transition-all box-content shadow-lg shadow-black/5"
                                    onClick={() => {
                                        setExistingImageUrl(url);
                                        setImageFile(null);
                                        setImagePreview(null);
                                        setIsMediaLibraryOpen(false);
                                    }}
                                >
                                    <img src={url} alt="Media" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

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

export default UrduPostEditor;

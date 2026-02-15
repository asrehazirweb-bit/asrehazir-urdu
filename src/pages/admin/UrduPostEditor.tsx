import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Save, X, Info, Image as ImageIcon, Trash2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { newsService } from '../../services/newsService';
import type { UrduPost } from '../../services/newsService';
import Toast from '../../components/ui/Toast';

const UrduPostEditor: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(!!id);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const postDoc = await getDoc(doc(db, 'news', id));
                if (postDoc.exists()) {
                    const data = postDoc.data() as UrduPost;
                    setTitle(data.title);
                    setContent(data.content);
                    if (data.imageUrl) {
                        setExistingImageUrl(data.imageUrl);
                    }
                }
                setInitialLoading(false);
            };
            fetchPost();
        }
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImageFile(file);
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

            // Handle new image upload if selected
            if (imageFile) {
                const storageRef = ref(storage, `urdu-news/${Date.now()}_${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                finalImageUrl = await getDownloadURL(storageRef);
            }

            if (id) {
                await newsService.updatePost(id, { title, content, imageUrl: finalImageUrl });
                setToast({ message: 'خبر کامیابی کے ساتھ اپ ڈیٹ کر دی گئی ہے۔', type: 'success' });
            } else {
                await newsService.addPost(title, content, finalImageUrl);
                setToast({ message: 'نئی خبر کامیابی کے ساتھ شامل کر دی گئی ہے۔', type: 'success' });
            }

            // Wait a bit before navigating
            setTimeout(() => {
                navigate('/admin');
            }, 2000);

        } catch (error) {
            console.error("Save error:", error);
            setToast({ message: 'خرابی پیش آگئی، براہ کرم دوبارہ کوشش کریں۔', type: 'error' });
            setLoading(false); // Only stop loading on error, on success we wait for nav
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
                    <div className="p-10 border-b border-gray-50 flex justify-between items-center">
                        <h1 className="text-3xl font-black text-gray-900">
                            {id ? 'خبر میں ترمیم کریں' : 'نئی خبر لکھیں'}
                        </h1>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/admin')}
                                className="px-6 py-2.5 rounded-full font-bold text-gray-400 hover:text-gray-900 transition-all flex items-center gap-2"
                            >
                                <X size={18} /> منسوخ کریں
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-red-600 hover:bg-black text-white px-10 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
                            >
                                {loading ? 'محفوظ ہو رہا ہے...' : <><Save size={18} /> محفوظ کریں</>}
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-10">
                        {/* Image Upload Area */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-gray-400 flex items-center gap-2">
                                <ImageIcon size={14} className="text-red-600" /> خبر کی تصویر
                            </label>

                            <div className="relative group">
                                {(imagePreview || existingImageUrl) ? (
                                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-gray-100">
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
                                            className="absolute top-4 right-4 bg-white/90 hover:bg-red-600 hover:text-white p-2 rounded-full shadow-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center aspect-video bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-3xl cursor-pointer hover:bg-white hover:border-red-600 transition-all">
                                        <ImageIcon size={40} className="text-gray-200 mb-2" />
                                        <span className="text-gray-400">تصویر منتخب کریں</span>
                                        <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 flex items-center gap-2">
                                <Info size={14} className="text-red-600" /> خبر کی سرخی
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-4xl font-bold border-b-2 border-gray-50 focus:border-red-600 bg-transparent py-4 outline-none transition-all placeholder:text-gray-100"
                                placeholder="..."
                                required
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 flex items-center gap-2">
                                <Info size={14} className="text-red-600" /> خبر کی تفصیل
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={12}
                                className="w-full p-8 bg-gray-50/50 rounded-3xl border border-gray-50 focus:border-red-600 focus:bg-white outline-none transition-all text-xl leading-relaxed resize-none"
                                placeholder="..."
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>

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

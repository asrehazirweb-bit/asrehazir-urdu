import React, { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Edit2, Trash2, Search, Filter, Calendar, User, ExternalLink, Copy, Check } from 'lucide-react';
import { useNews, type NewsArticle } from '../../hooks/useNews';
import EditNewsModal from '../../components/admin/EditNewsModal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import Toast from '../../components/ui/Toast';

const ManageNews: React.FC = () => {
    const { news, loading, formatTime } = useNews('All', 100);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // New state for modal and toast
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null; imageUrl?: string }>({
        isOpen: false,
        id: null,
        imageUrl: undefined
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleDeleteClick = (id: string, imageUrl?: string) => {
        setDeleteModal({ isOpen: true, id, imageUrl });
    };

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, 'news', deleteModal.id));
            if (deleteModal.imageUrl && !deleteModal.imageUrl.includes('placeholder')) {
                try {
                    const imageRef = ref(storage, deleteModal.imageUrl);
                    await deleteObject(imageRef);
                } catch (storageErr) {
                    console.error("Error deleting image from storage:", storageErr);
                }
            }
            setToast({ message: 'خبر کامیابی سے حذف کر دی گئی۔', type: 'success' });
            setDeleteModal({ isOpen: false, id: null });
        } catch (error) {
            console.error("Error deleting article:", error);
            setToast({ message: 'خبر حذف کرنے میں غلطی پیش آئی۔', type: 'error' });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCopyLink = (id: string) => {
        const url = `${window.location.origin}/news/${id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredNews = news.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', 'عالمی خبریں', 'قومی خبریں', 'دکن نیوز', 'مضامین اور مقالہ جات', 'کھیل اور تفریح', 'جرائم اور حادثات'];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 text-right">
            <div className="flex flex-col md:flex-row-reverse md:items-end justify-between gap-4">
                <div>
                    <div className="flex flex-row-reverse items-center gap-2 mb-2">
                        <div className="w-8 h-1 bg-red-600"></div>
                        <span className="text-[12px] font-bold text-red-600 uppercase tracking-widest">آرکائیو مینیجر</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 dark:text-white">مواد کی ترتیب</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mt-1 max-w-xl">خبروں کو ایڈٹ کریں، اپ ڈیٹ کریں یا آرکائیو سے مستقل طور پر حذف کریں۔</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row-reverse gap-6 items-center shadow-sm">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="سرخیاں یا الفاظ تلاش کریں..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-12 pl-4 py-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 outline-none focus:ring-2 focus:ring-red-500 transition-all dark:text-white text-lg text-right"
                    />
                </div>
                <div className="flex flex-row-reverse items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full pr-10 pl-4 py-3 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 outline-none focus:ring-2 focus:ring-red-500 dark:text-white text-lg font-bold text-right min-h-[3.5rem]"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'تمام زمرے' : cat}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* News List */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                                <th className="p-6 text-[12px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 text-center">تصویر</th>
                                <th className="p-6 text-[12px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500">تفصیلات</th>
                                <th className="p-6 text-[12px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500">زمرہ</th>
                                <th className="p-6 text-[12px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 text-left">کارروائی</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-zinc-800/50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="p-24 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-sm font-bold text-gray-400">آرکائیو لوڈ ہو رہا ہے...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredNews.length > 0 ? (
                                filteredNews.map((item) => (
                                    <tr key={item.id} className="group hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-all duration-300">
                                        <td className="p-6">
                                            <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm transition-transform group-hover:scale-105">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-6 max-w-md">
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-red-600 transition-colors">{item.title}</h3>
                                                <div className="flex flex-row-reverse items-center gap-3 text-[12px] text-gray-400 font-bold">
                                                    <span className="flex flex-row-reverse items-center gap-1"><User size={12} className="text-red-600 ml-1" /> {item.author || 'ڈیسک'}</span>
                                                    <span>•</span>
                                                    <span className="flex flex-row-reverse items-center gap-1"><Calendar size={12} className="ml-1" /> {formatTime(item.createdAt)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col items-end gap-1.5">
                                                <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-900/10 text-red-600 text-[12px] font-bold rounded-full border border-red-100 dark:border-red-900/20">
                                                    {item.category}
                                                </span>
                                                <span className="text-[12px] text-gray-400 font-bold pr-1">
                                                    {item.subCategory || 'جنرل'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-start gap-2">
                                                <button
                                                    onClick={() => window.open(`/news/${item.id}`, '_blank')}
                                                    className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm"
                                                    title="لائیو دیکھیں"
                                                >
                                                    <ExternalLink size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleCopyLink(item.id)}
                                                    className={`p-3 rounded-xl transition-all shadow-sm ${copiedId === item.id ? 'bg-green-500 text-white' : 'bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10'}`}
                                                    title="لنک کاپی کریں"
                                                >
                                                    {copiedId === item.id ? <Check size={18} /> : <Copy size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => setEditingArticle(item)}
                                                    className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm"
                                                    title="ایڈٹ کریں"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(item.id, item.imageUrl)}
                                                    className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm"
                                                    title="حذف کریں"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-24 text-center">
                                        <div className="flex flex-col items-center gap-2 opacity-30">
                                            <Search size={48} className="text-gray-400 mb-2" />
                                            <p className="text-lg font-black italic">کوئی خبر نہیں ملی</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Placeholder */}
                <div className="p-6 bg-gray-50/50 dark:bg-zinc-800/30 border-t border-gray-100 dark:border-zinc-800 flex flex-row-reverse items-center justify-between">
                    <span className="text-sm font-bold text-gray-400">کل {news.length} میں سے {filteredNews.length} خبریں دکھائی جا رہی ہیں</span>
                    <div className="flex gap-2">
                        <button disabled className="px-6 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-gray-300">پچھلا</button>
                        <button disabled className="px-6 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-gray-900 dark:text-white shadow-sm">اگلا</button>
                    </div>
                </div>
            </div>

            {editingArticle && (
                <EditNewsModal
                    article={editingArticle}
                    onClose={() => setEditingArticle(null)}
                    onSuccess={() => {
                        setEditingArticle(null);
                    }}
                />
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={confirmDelete}
                title="خبر حذف کریں"
                message="کیا آپ واقعی اس خبر کو حذف کرنا چاہتے ہیں؟ اسے واپس نہیں لایا جا سکے گا۔"
                confirmText="حذف کریں"
                cancelText="منسوخ کریں"
                isLoading={isDeleting}
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

export default ManageNews;

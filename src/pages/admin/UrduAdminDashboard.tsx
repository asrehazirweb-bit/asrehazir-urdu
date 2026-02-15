import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { newsService } from '../../services/newsService';
import type { UrduPost } from '../../services/newsService';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import Toast from '../../components/ui/Toast';


const UrduAdminDashboard: React.FC = () => {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<UrduPost[]>([]);
    const [loading, setLoading] = useState(true);

    // New state for modal and toast
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const unsubscribe = newsService.subscribeToPosts((fetchedPosts) => {
            setPosts(fetchedPosts);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDeleteClick = (postId: string) => {
        setDeleteModal({ isOpen: true, id: postId });
    };

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        setIsDeleting(true);
        try {
            await newsService.deletePost(deleteModal.id);
            setToast({ message: 'خبر کامیابی سے حذف کر دی گئی۔', type: 'success' });
            setDeleteModal({ isOpen: false, id: null });
        } catch (error) {
            console.error("Error deleting post:", error);
            setToast({ message: 'خبر حذف کرنے میں غلطی پیش آئی۔', type: 'error' });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleToggleStatus = async (postId: string, currentStatus: 'published' | 'draft') => {
        try {
            await newsService.toggleStatus(postId, currentStatus);
            setToast({ message: `خبر کی حیثیت تبدیل کر دی گئی: ${currentStatus === 'published' ? 'ڈرافٹ' : 'شائع شدہ'}`, type: 'success' });
        } catch (error) {
            console.error("Error toggling status:", error);
            setToast({ message: 'حیثیت تبدیل کرنے میں ناکامی۔', type: 'error' });
        }
    };



    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-right" dir="rtl">
            {/* 1. WELCOME BANNER (Integrated) */}
            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
                <div className="relative z-10 lg:max-w-2xl mr-0 ml-auto">
                    <div className="flex flex-row-reverse items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-red-600 text-[10px] font-bold text-white uppercase tracking-widest rounded-full">اردو نیوز ہب فعال ہے</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black text-gray-900 dark:text-white leading-none mb-4 tracking-tighter">
                        خوش آمدید، <span className="text-red-600 italic">{userData?.role === 'admin' ? 'ایڈمن' : 'ایڈیٹر'}!</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-xl font-sans leading-relaxed">
                        عصرِ حاضر کے <span className="text-black dark:text-white font-bold underline decoration-red-600 decoration-4 underline-offset-8">اردو مینیجمنٹ ڈیسک</span> میں آپ کا استقبال ہے۔ یہاں سے آپ اپنی تمام اردو خبریں کنٹرول کر سکتے ہیں۔
                    </p>

                    <div className="mt-10 flex flex-row-reverse flex-wrap gap-4">
                        <button
                            onClick={() => navigate('/admin/add-news')}
                            className="w-full sm:w-auto bg-red-600 hover:bg-black text-white px-10 py-4 rounded-xl font-bold text-sm transition-all flex flex-row-reverse items-center justify-center gap-3 shadow-lg shadow-red-600/20 group"
                        >
                            نئی خبر شامل کریں <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/5 rounded-full -ml-32 -mt-32 blur-[100px]"></div>
            </div>

            {/* Dashboard Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content: News List */}
                <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-gray-50 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">حالیہ خبریں ({posts.length})</h2>
                        <button
                            className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                            onClick={() => navigate('/admin/editor')}
                        >
                            دستیاب تمام خبریں دیکھیں
                        </button>
                    </div>

                    <div className="divide-y divide-gray-50 dark:divide-zinc-800">
                        {loading ? (
                            <div className="p-20 text-center text-gray-400">لوڈ ہو رہا ہے...</div>
                        ) : posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-colors group gap-4">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gray-50 dark:bg-zinc-800 flex-shrink-0 overflow-hidden border border-gray-100 dark:border-zinc-700">
                                            {post.imageUrl ? (
                                                <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-200 uppercase font-black text-[10px]">No Img</div>
                                            )}
                                        </div>
                                        <div className="space-y-1 overflow-hidden">
                                            <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-red-600 transition-colors truncate">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-[10px] md:text-sm text-gray-400">
                                                <span>{post.updatedAt?.toDate().toLocaleTimeString('ur-PK')}</span>
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${post.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                    {post.status === 'published' ? 'شائع شدہ' : 'ڈرافٹ'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                        <button
                                            onClick={() => handleToggleStatus(post.id!, post.status)}
                                            className={`p-2 rounded-lg transition-colors ${post.status === 'published' ? 'text-green-600 bg-green-50 dark:bg-green-600/10' : 'text-gray-400 bg-gray-100 dark:bg-zinc-800'}`}
                                            title={post.status === 'published' ? 'غیر شائع کریں' : 'شائع کریں'}
                                        >
                                            {post.status === 'published' ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/editor/${post.id}`)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-600/10 rounded-lg transition-all"
                                            title="ترمیم کریں"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(post.id!)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-600/10 rounded-lg transition-all"
                                            title="حذف کریں"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-20 text-center text-gray-400 font-bold">کوئی خبر نہیں ملی۔ براہ کرم نئی خبر شامل کریں۔</div>
                        )}
                    </div>
                </div>

                {/* Sidebar: Widgets */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Activity Feed Widget */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">سسٹم کی صورتحال</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <p className="text-sm font-bold text-gray-700">سرور آن لائن ہے</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <p className="text-sm font-bold text-gray-700">ڈیٹا بیس محفوظ ہے</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <p className="text-sm font-bold text-gray-700">لائیو براڈکاسٹ جاری ہے</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-red-600 p-8 rounded-3xl text-white shadow-lg shadow-red-600/20">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-sm font-black uppercase tracking-widest opacity-80">آپ کا اثر</h3>
                            <button className="text-white/40 hover:text-white transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="space-y-1">
                            <p className="text-5xl font-black italic">14.2k</p>
                            <p className="text-xs font-bold opacity-60">اس مہینے کے کل قارئین</p>
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-zinc-900 p-8 rounded-3xl text-white">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-4">پرو ٹپ</p>
                        <p className="text-lg leading-relaxed font-bold opacity-90">
                            اچھی تصاویر کا استعمال خبر کو ۳ گنا زیادہ مقبول بناتا ہے۔ پکسلز کا خیال رکھیں!
                        </p>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={confirmDelete}
                title="خبر حذف کریں"
                message="کیا آپ واقعی اس خبر کو حذف کرنا چاہتے ہیں؟"
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

export default UrduAdminDashboard;

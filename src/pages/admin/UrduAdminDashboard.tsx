import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';
import { newsService } from '../../services/newsService';
import type { UrduPost } from '../../services/newsService';


const UrduAdminDashboard: React.FC = () => {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<UrduPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = newsService.subscribeToPosts((fetchedPosts) => {
            setPosts(fetchedPosts);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (postId: string) => {
        if (window.confirm('کیا آپ واقعی اس خبر کو حذف کرنا چاہتے ہیں؟')) {
            await newsService.deletePost(postId);
        }
    };

    const handleToggleStatus = async (postId: string, currentStatus: 'published' | 'draft') => {
        await newsService.toggleStatus(postId, currentStatus);
    };

    const handleLogout = () => {
        auth.signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#fdfdfb] p-6 lg:p-12 font-urdu" dir="rtl">
            {/* Header */}
            <div className="max-w-5xl mx-auto flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">اردو نیوز ہب</h1>
                    <p className="text-gray-500">خوش آمدید، {userData?.role === 'admin' ? 'ایڈمن' : 'ایڈیٹر'}</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/admin/editor')}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-red-600/20"
                    >
                        <Plus size={18} /> نئی خبر شامل کریں
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-2.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="لاگ آؤٹ"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content: News List */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">حالیہ خبریں ({posts.length})</h2>
                        <button
                            className="text-xs font-black text-red-600 uppercase tracking-widest hover:underline"
                            onClick={() => navigate('/admin/editor')}
                        >
                            دستیاب تمام خبریں دیکھیں
                        </button>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {loading ? (
                            <div className="p-20 text-center text-gray-400">لوڈ ہو رہا ہے...</div>
                        ) : posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100">
                                            {post.imageUrl ? (
                                                <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-200 uppercase font-black text-[10px]">No Img</div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span>{post.updatedAt?.toDate().toLocaleTimeString('ur-PK')}</span>
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${post.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                    {post.status === 'published' ? 'شائع شدہ' : 'ڈرافٹ'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleStatus(post.id!, post.status)}
                                            className={`p-2 rounded-lg transition-colors ${post.status === 'published' ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'}`}
                                            title={post.status === 'published' ? 'غیر شائع کریں' : 'شائع کریں'}
                                        >
                                            {post.status === 'published' ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/editor/${post.id}`)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            title="ترمیم کریں"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id!)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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

        </div>
    );
};

export default UrduAdminDashboard;

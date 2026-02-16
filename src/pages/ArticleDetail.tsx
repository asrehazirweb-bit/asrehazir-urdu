import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { Calendar, Share2, Facebook, Twitter, Link2, ArrowLeft, Clock } from 'lucide-react';
import type { NewsArticle } from '../hooks/useNews';
import Toast from '../components/ui/Toast';

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const docRef = doc(db, 'news', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const fetchedArticle = {
                        id: docSnap.id,
                        ...data
                    } as NewsArticle;
                    setArticle(fetchedArticle);

                    // Fetch related news from same category
                    const relatedQuery = query(
                        collection(db, 'news'),
                        where('category', '==', data.category),
                        limit(4)
                    );
                    const relatedSnap = await getDocs(relatedQuery);
                    const related = relatedSnap.docs
                        .map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle))
                        .filter(item => item.id !== id);
                    setRelatedNews(related);
                } else {
                    setError('Article not found');
                }
            } catch (err: any) {
                console.error("Error fetching article:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const progress = document.getElementById('reading-progress');
            if (progress) {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progress.style.width = scrolled + "%";
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatTime = (createdAt: any) => {
        if (!createdAt) return 'ابھی ابھی';
        const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
        return date.toLocaleDateString('ur-PK', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const title = article?.title || 'عصر حاضر نیوز';

        if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            setToast({ message: 'لنک کاپی ہو گیا!', type: 'success' });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-zinc-950 px-4 text-center">
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">{error === 'Article not found' ? 'مضمون نہیں ملا' : error || 'مضمون نہیں ملا'}</h2>
                <Link to="/" className="text-red-600 hover:underline flex items-center gap-2">
                    <ArrowLeft size={18} className="translate-x-1" /> ہوم پیج پر واپس جائیں
                </Link>
            </div>
        );
    }

    return (
        <article className="bg-white dark:bg-[#120f0e] transition-colors duration-300 min-h-screen pb-20 text-right">
            {/* Progression Bar */}
            <div className="hidden md:block fixed top-0 right-0 w-full h-1 bg-gray-100 dark:bg-zinc-800 z-50">
                <div className="h-full bg-red-600 w-0 transition-all duration-300 float-right" id="reading-progress"></div>
            </div>

            {/* Header / Breadcrumb */}
            <div className="max-w-4xl mx-auto px-4 pt-8 pb-4">
                <div className="flex flex-row-reverse items-center gap-2 text-[12px] font-black text-red-600 mb-6">
                    <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">ہوم</Link>
                    <span>/</span>
                    <Link to={`/${article.category.toLowerCase()}`} className="hover:text-black dark:hover:text-white transition-colors">{article.category}</Link>
                    <span>/</span>
                    <span className="text-gray-400 truncate max-w-[150px]">{article.subCategory || 'تازہ ترین'}</span>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 dark:text-white leading-[1.3] mb-8 tracking-tight">
                    {article.title}
                </h1>

                <div className="flex flex-wrap flex-row-reverse items-center justify-between gap-6 pb-8 border-b border-gray-100 dark:border-zinc-800">
                    <div className="flex flex-row-reverse items-center gap-4 text-right">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center text-white font-black text-lg shadow-lg">
                            {article.author?.[0] || 'ع'}
                        </div>
                        <div>
                            <div className="text-sm font-black text-gray-900 dark:text-white tracking-wider">{article.author || 'عصر حاضر ڈیسک'}</div>
                            <div className="flex flex-row-reverse items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                <span className="flex flex-row-reverse items-center gap-1"><Calendar size={12} className="ml-1" /> {formatTime(article.createdAt)}</span>
                                <span className="flex flex-row-reverse items-center gap-1"><Clock size={12} className="ml-1" /> 4 منٹ کا مطالعہ</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => handleShare('facebook')} className="p-2.5 rounded-full bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                            <Facebook size={18} />
                        </button>
                        <button onClick={() => handleShare('twitter')} className="p-2.5 rounded-full bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                            <Twitter size={18} />
                        </button>
                        <button onClick={() => handleShare('copy')} className="p-2.5 rounded-full bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                            <Link2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-6xl mx-auto px-0 md:px-4 mb-12">
                <div className="relative md:rounded-3xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-zinc-900">
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-auto max-h-[700px] object-contain mx-auto block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                </div>
                {article.subCategory && (
                    <div className="mt-4 px-4 md:px-0 text-right">
                        <span className="text-[12px] font-black uppercase tracking-widest text-gray-400 border-r-2 border-red-600 pr-3">
                            تصویر: عصر حاضر آرکائیوز / {article.category} {article.subCategory}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-12">
                        <div className="prose prose-lg dark:prose-invert max-w-none text-right">
                            {article.content.split('\n').filter(p => p.trim() !== '').map((para, index) => (
                                <p key={index} className="text-gray-800 dark:text-gray-200 font-serif leading-[2.2] mb-6 text-lg md:text-xl">
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Article Footer */}
                        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row-reverse md:items-center justify-between gap-6">
                            <div className="flex flex-row-reverse flex-wrap gap-2 text-right">
                                {['خبریں', article.category, article.subCategory].filter(Boolean).map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 text-[12px] font-black rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-row-reverse items-center gap-4">
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">کہانی شیئر کریں:</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleShare('facebook')} className="text-gray-400 hover:text-red-600 transition-colors"><Facebook size={20} /></button>
                                    <button onClick={() => handleShare('twitter')} className="text-gray-400 hover:text-red-600 transition-colors"><Twitter size={20} /></button>
                                    <button onClick={() => handleShare('copy')} className="text-gray-400 hover:text-red-600 transition-colors"><Share2 size={20} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related News Section */}
            {relatedNews.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 mt-24 text-right">
                    <div className="flex flex-row-reverse items-center justify-between mb-10">
                        <h2 className="text-2xl font-serif font-black text-gray-900 dark:text-white italic underline decoration-red-600 decoration-4 underline-offset-8">
                            {article.category} سے مزید خبریں
                        </h2>
                        <Link to={`/${article.category.toLowerCase()}`} className="text-xs font-black text-red-600 hover:text-black dark:hover:text-white transition-colors">
                            تمام کہانیاں دیکھیں
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedNews.slice(0, 3).map((item) => (
                            <Link key={item.id} to={`/news/${item.id}`} className="group block text-right">
                                <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100 dark:bg-zinc-900">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-[1.6]">
                                    {item.title}
                                </h3>
                                <div className="mt-2 text-[12px] font-black text-gray-400 uppercase tracking-widest">
                                    {formatTime(item.createdAt)}
                                </div>
                            </Link>
                        ))}
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
        </article>
    );
};

export default ArticleDetail;

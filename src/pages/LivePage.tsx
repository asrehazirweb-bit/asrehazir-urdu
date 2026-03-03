import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc } from 'firebase/firestore';
import type { NewsArticle } from '../hooks/useNews';
import { formatDistanceToNow } from 'date-fns';

const formatTime = (createdAt: any) => {
    if (!createdAt) return 'ابھی';
    const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    return formatDistanceToNow(date, { addSuffix: true });
};

export function LivePage() {
    const [liveNews, setLiveNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [livePageEnabled, setLivePageEnabled] = useState(true);

    useEffect(() => {
        // 1. Listen to global setting
        const unsubConfig = onSnapshot(doc(db, 'settings', 'live_config'), (snap) => {
            if (snap.exists()) {
                setLivePageEnabled(snap.data().livePageEnabled ?? true);
            }
        });

        // 2. Real-time listener for live articles
        const q = query(
            collection(db, 'news'),
            where('showInLive', '==', true),
            orderBy('createdAt', 'desc')
        );

        const unsubNews = onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as NewsArticle[];
            setLiveNews(articles);
            setLoading(false);
        }, (error) => {
            console.error('Live news error:', error);
            setLoading(false);
        });

        return () => {
            unsubConfig();
            unsubNews();
        };
    }, []);

    return (
        <div className="min-h-screen bg-white pt-4 pb-16" dir="rtl">
            <div className="max-w-6xl mx-auto px-4">
                {!livePageEnabled ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8" dir="rtl">
                        <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner">
                            <span className="text-4xl grayscale opacity-50">📡</span>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-gray-900 font-serif tracking-tight">لائیو اپ ڈیٹس فی الحال دستیاب نہیں ہیں</h2>
                            <p className="text-gray-500 max-w-sm font-medium leading-[1.8] mx-auto">
                                لائیو کوریج فی الحال معطل ہے۔ براہ کرم تازہ ترین خبروں اور اپ ڈیٹس کے لیے کچھ دیر بعد دوبارہ چیک کریں۔
                            </p>
                        </div>
                        <Link to="/" className="px-10 py-4 bg-zinc-900 text-white rounded-full text-sm font-black hover:bg-primary transition-all shadow-xl shadow-zinc-200">
                            ہوم پیج پر واپس جائیں
                        </Link>
                    </div>
                ) : (
                    <>

                        {/* Page Header */}
                        <div className="flex flex-row-reverse items-center gap-4 mb-10 pb-6 border-b-2 border-red-100">
                            <div className="flex flex-row-reverse items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg shadow-red-600/30">
                                <span className="w-3 h-3 rounded-full bg-white animate-ping flex-shrink-0"></span>
                                <span className="text-sm font-black">لائیو</span>
                            </div>
                            <div className="text-right">
                                <h1 className="text-2xl md:text-3xl font-black text-gray-900 font-serif">لائیو خبریں</h1>
                                <p className="text-sm text-gray-400 mt-0.5">ریئل ٹائم اپ ڈیٹس — خود بخود تازہ ہوتا ہے</p>
                            </div>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="flex justify-center items-center h-64">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-4 h-4 rounded-full bg-red-600 animate-ping"></div>
                                    <span className="text-sm text-gray-500 font-medium">لائیو فیڈ سے جڑ رہے ہیں...</span>
                                </div>
                            </div>
                        )}

                        {/* No Live Articles */}
                        {!loading && liveNews.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <span className="text-3xl">📡</span>
                                </div>
                                <h2 className="text-xl font-black text-gray-700 mb-2">ابھی کوئی لائیو خبر نہیں</h2>
                                <p className="text-sm text-gray-400 max-w-sm">
                                    جب ہمارے ایڈیٹر کوئی خبر لائیو کریں گے تو وہ یہاں فوری نظر آئے گی۔
                                </p>
                                <Link to="/" className="mt-6 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-black hover:bg-primary/90 transition-all">
                                    ← ہوم پر واپس جائیں
                                </Link>
                            </div>
                        )}

                        {/* Live Articles List */}
                        {!loading && liveNews.length > 0 && (
                            <div className="space-y-6">
                                {liveNews.map((article, idx) => (
                                    <Link
                                        key={article.id}
                                        to={`/news/${article.id}`}
                                        className="group flex flex-row-reverse gap-6 p-5 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg hover:shadow-red-50 transition-all duration-300 bg-white"
                                    >
                                        {/* Right: Image (RTL) */}
                                        {article.imageUrl && (
                                            <div className="flex-shrink-0 w-40 h-28 md:w-56 md:h-36 rounded-xl overflow-hidden bg-gray-100">
                                                <img
                                                    src={article.imageUrl}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}

                                        {/* Left: Content (RTL = text-right) */}
                                        <div className="flex-1 flex flex-col justify-between min-w-0 text-right">
                                            <div>
                                                <div className="flex flex-row-reverse items-center gap-3 mb-3">
                                                    {idx === 0 && (
                                                        <span className="inline-flex flex-row-reverse items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black animate-pulse">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                                            لائیو
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] font-black text-primary">
                                                        {article.category}
                                                    </span>
                                                </div>

                                                <h2 className={`text-lg md:text-xl font-black text-gray-900 leading-snug mb-2 group-hover:text-red-600 transition-colors ${article.titleFont || 'font-serif'}`}>
                                                    {article.title}
                                                </h2>

                                                {article.subHeadline && (
                                                    <p className="text-sm text-gray-500 italic line-clamp-2 mb-2">
                                                        {article.subHeadline}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-row-reverse items-center justify-between mt-2">
                                                <span className="text-[11px] text-gray-400 font-medium">
                                                    {formatTime(article.createdAt)}
                                                </span>
                                                <span className="text-[11px] font-black text-red-600 group-hover:underline">
                                                    → لائیو پڑھیں
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

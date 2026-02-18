
import { Clock, MapPin, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface FeedItem {
    id: string | number;
    title: string;
    excerpt: string;
    image?: string;
    location?: string;
    subCategory?: string;
    videoUrl?: string;
    date: string;
}

interface IndiaNewsFeedProps {
    items: FeedItem[];
}

export function IndiaNewsFeed({ items }: IndiaNewsFeedProps) {
    return (
        <div className="flex flex-col w-full font-serif text-right">

            {/* 1. PAGE HEADER */}
            <div className="w-full mb-8 border-b border-gray-200 pb-6">
                {/* Breadcrumb */}
                <div className="flex flex-row-reverse items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-500 mb-4">
                    <Link to="/" className="hover:text-accent transition-colors">ہوم</Link>
                    <ChevronLeft size={10} />
                    <span className="text-gray-400">خبریں</span>
                    <ChevronLeft size={10} />
                    <span className="text-accent">بھارت</span>
                </div>

                {/* Title & Description */}
                <h1 className="text-4xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-4">
                    بھارت
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-sans text-base leading-relaxed max-w-3xl ml-auto">
                    قومی معاملات، سیاست، پالیسی فیصلوں اور ملک کی صورت گری کرنے والی سماجی تبدیلیوں کی جامع کوریج۔ ملک بھر سے گہرائی سے رپورٹنگ کے ساتھ باخبر رہیں۔
                </p>
            </div>
            {/* 2. NEWS LIST (VERTICAL FEED) */}
            <div className="flex flex-col gap-8">
                {items.map((article) => {
                    const isVideo = !!article.videoUrl;

                    const Content = (
                        <>
                            {/* LEFT: Article Image (Fixed Container) */}
                            <div className="w-full md:w-[260px] h-[160px] flex-shrink-0 bg-gray-100 relative overflow-hidden rounded-lg">
                                {article.image ? (
                                    <>
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                        />
                                        {isVideo && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl scale-90 group-hover:scale-100 transition-transform">
                                                    <ChevronLeft size={24} />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    /* Empty Neutral Container - Layout stability */
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-300 font-sans text-xs uppercase tracking-widest">کوئی تصویر نہیں</span>
                                    </div>
                                )}
                            </div>

                            {/* RIGHT: Content */}
                            <div className="flex-1 flex flex-col py-1">
                                <div className="flex flex-row-reverse items-center gap-2 mb-2">
                                    {article.subCategory && (
                                        <span className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                                            {article.subCategory}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold leading-tight text-secondary dark:text-gray-100 mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 font-sans text-sm leading-relaxed mb-3 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                {/* Metadata */}
                                <div className="flex flex-row-reverse items-center gap-4 text-xs text-gray-400 font-sans uppercase tracking-wide mt-auto">
                                    {article.location && (
                                        <div className="flex flex-row-reverse items-center gap-1">
                                            <MapPin size={12} className="ml-1" />
                                            <span>{article.location}</span>
                                        </div>
                                    )}
                                    <div className="flex flex-row-reverse items-center gap-1">
                                        <Clock size={12} className="ml-1" />
                                        <span>{article.date}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    );

                    if (isVideo) {
                        return (
                            <a
                                key={article.id}
                                href={article.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col md:flex-row-reverse gap-6 border-b border-gray-100 pb-8 last:border-0 last:pb-0 block cursor-pointer"
                            >
                                {Content}
                            </a>
                        );
                    }

                    return (
                        <Link
                            key={article.id}
                            to={`/news/${article.id}`}
                            className="group flex flex-col md:flex-row-reverse gap-6 border-b border-gray-100 pb-8 last:border-0 last:pb-0 block cursor-pointer"
                        >
                            {Content}
                        </Link>
                    );
                })}
            </div>

        </div>
    );
}

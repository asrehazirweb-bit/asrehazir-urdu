import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

interface NewsItem {
    id: number | string;
    title: string;
    image?: string;
    time: string;
    category?: string;
    excerpt?: string;
}

interface IndiaSectionProps {
    featured: NewsItem;
    items: NewsItem[];
}

export function IndiaSection({ featured, items }: IndiaSectionProps) {
    // Exactly 10 items for the text list
    const listItems = items.slice(0, 10);

    return (
        <section className="flex flex-col w-full mb-12 font-serif border-b border-gray-100 dark:border-white/10 pb-8 transition-colors text-right">

            {/* === A. SECTION HEADER === */}
            <div className="flex flex-row-reverse items-center justify-between mb-6 border-b border-gray-200 dark:border-white/10 pb-2">
                <div className="flex flex-row-reverse items-center gap-3">
                    <div className="w-3 h-8 bg-accent"></div>
                    <h2 className="text-2xl font-black tracking-tight text-secondary dark:text-gray-100">
                        بھارت
                    </h2>
                </div>
                <Link to="/national" className="flex flex-row-reverse items-center gap-1 text-sm font-bold text-accent hover:text-secondary dark:hover:text-gray-200 transition-colors tracking-wide">
                    قومی خبریں مزید <ChevronRight size={14} className="rotate-180" />
                </Link>
            </div>

            <div className="flex flex-col gap-6">

                {/* === B. FEATURED STORY === */}
                <Link to={`/news/${featured.id}`} className="group cursor-pointer flex flex-col sm:flex-row-reverse gap-6 items-start pb-6 border-b border-gray-100 dark:border-white/10 block text-right">
                    <div className="w-full sm:w-5/12 h-48 overflow-hidden relative bg-gray-100 dark:bg-white/5 flex-shrink-0">
                        <img
                            src={featured.image || "/images/assembly.png"}
                            alt={featured.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute right-0 bottom-0 bg-accent text-white text-xs font-bold tracking-wider px-3 py-1">
                            {featured.category || "قومی"}
                        </span>
                    </div>

                    <div className="flex-1 flex flex-col h-full py-1 text-right">
                        <h3 className="text-xl font-bold leading-[1.4] text-secondary dark:text-gray-100 mb-3 group-hover:underline decoration-accent decoration-2 underline-offset-4 line-clamp-2">
                            {featured.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-sans text-sm leading-[1.8] mb-3 line-clamp-3">
                            {featured.excerpt || "مکمل کہانی پڑھنے کے لیے کلک کریں۔"}
                        </p>
                        <div className="flex flex-row-reverse items-center text-xs text-gray-400 font-sans tracking-wide mt-auto">
                            <Clock size={12} className="ml-1" />
                            <span>{featured.time}</span>
                        </div>
                    </div>
                </Link>

                {/* === C. NEWS FEED (Text List, 10 Items) === */}
                <div className="flex flex-col">
                    {listItems.map((item) => (
                        <Link key={item.id} to={`/news/${item.id}`} className="group flex flex-row-reverse items-start py-3 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-2 -mx-2 cursor-pointer block text-right">
                            {/* Bullet styled as a small square or dot */}
                            <div className="mt-2.5 ml-3 w-1.5 h-1.5 bg-gray-300 group-hover:bg-accent flex-shrink-0 transition-colors"></div>

                            <div className="flex flex-col w-full">
                                <h4 className="text-sm font-bold text-secondary dark:text-gray-200 leading-snug line-clamp-1 group-hover:text-accent transition-colors">
                                    {item.title}
                                </h4>
                                <div className="flex flex-row-reverse items-center mt-1">
                                    <span className="text-[10px] text-gray-400 font-sans tracking-wider flex items-center">
                                        {item.time}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}

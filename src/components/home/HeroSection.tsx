import { Link } from 'react-router-dom';

interface NewsItem {
    id: number | string;
    title: string;
    category: string;
    image: string;
    time: string;
    excerpt?: string;
    titleFont?: string;
    contentFont?: string;
}

interface HeroSectionProps {
    leadStory: NewsItem;
    className?: string; // Allow custom classes
}

export function HeroSection({ leadStory, className = "" }: HeroSectionProps) {
    return (
        <Link to={`/news/${leadStory.id}`} className={`relative w-full block mb-16 group cursor-pointer border-b border-gray-100 dark:border-white/5 pb-12 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5 ${className}`}>
            {/* Image Container */}
            <div className="relative aspect-video sm:aspect-[21/10] w-full overflow-hidden mb-8 md:mb-10 bg-gray-100 dark:bg-white/5 rounded-2xl shadow-inner">
                <img
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-red-700 text-white px-4 py-1.5 sm:px-6 sm:py-2.5 text-[12px] sm:text-[14px] font-bold shadow-2xl backdrop-blur-sm bg-opacity-90 rounded-sm">
                    {leadStory.category}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col gap-6 max-w-5xl px-2 text-right">
                <div className="flex flex-row-reverse items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
                    <span className="text-[14px] font-black text-red-600 uppercase tracking-widest">اہم خبر</span>
                </div>
                <h1 className={`font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.15] text-gray-900 dark:text-gray-50 group-hover:text-red-700 transition-colors duration-400 ${leadStory.titleFont || 'font-serif'}`}>
                    {leadStory.title}
                </h1>
                <p className={`text-lg md:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mt-1 md:mt-2 opacity-80 font-medium ${leadStory.contentFont || 'font-sans'}`}>
                    {leadStory.excerpt}
                </p>
                <div className="mt-2 flex flex-col sm:flex-row-reverse sm:items-center gap-2 sm:gap-5 text-[14px] text-gray-400 font-bold tracking-wide">
                    <span className="flex flex-row-reverse items-center gap-2 hover:text-red-700 transition-colors">
                        بذریعہ <span className="font-bold text-gray-900 dark:text-white border-b border-red-700/30">ادارتی عملہ</span>
                    </span>
                    <span className="hidden sm:block w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                    <span>{leadStory.time}</span>
                </div>
            </div>
        </Link>
    );
}

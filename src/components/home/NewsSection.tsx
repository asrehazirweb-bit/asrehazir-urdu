import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
    id: number | string;
    title: string;
    category: string;
    image: string;
    time: string;
}

interface NewsSectionProps {
    title: string;
    items: NewsItem[];
    variant?: 'grid' | 'list';
}

export function NewsSection({ title, items, variant = 'grid' }: NewsSectionProps) {
    return (
        <div className="mb-12 text-right">
            <div className="flex flex-row-reverse items-center mb-6 border-b border-accent/30 pb-2">
                <h2 className="text-xl font-bold font-sans text-accent tracking-wider">{title}</h2>
                <div className="flex-grow mr-4 h-[1px] bg-gray-100"></div>
            </div>

            <div className={variant === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6"}>
                {items.map((item) => (
                    <Link key={item.id} to={`/news/${item.id}`} className="group cursor-pointer block text-right">
                        <div className="relative overflow-hidden mb-3 aspect-video bg-gray-200">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-0 right-0 bg-accent text-white text-[10px] uppercase font-bold px-2 py-1">
                                {item.category}
                            </span>
                        </div>
                        <h3 className="font-serif font-bold text-lg leading-snug text-gray-900 group-hover:text-accent transition-colors mb-2">
                            {item.title}
                        </h3>
                        <span className="text-xs text-gray-400 font-sans">{item.time}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function VideoSection({ items }: { items: NewsItem[] }) {
    return (
        <div className="mb-12 bg-secondary py-12 px-4 -mx-4 md:-mx-8 md:px-8 text-white relative text-right">
            <div className="flex flex-row-reverse items-center mb-8 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold font-sans text-accent tracking-wider">ضرور دیکھیں</h2>
                <div className="flex-grow mr-4 h-[1px] bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => (
                    <Link key={item.id} to={`/news/${item.id}`} className="group cursor-pointer text-right block">
                        <div className="relative overflow-hidden mb-3 aspect-video bg-gray-800 border border-gray-700">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                                    <Play size={20} className="text-white fill-current" />
                                </div>
                            </div>
                        </div>
                        <h3 className="font-serif font-bold text-base leading-snug group-hover:text-accent transition-colors text-gray-100">
                            {item.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    )
}

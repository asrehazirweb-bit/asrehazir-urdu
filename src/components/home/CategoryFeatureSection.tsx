import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NewsItem {
    id: string;
    title: string;
    category: string;
    imageUrl?: string;
    content: string;
    createdAt: any;
}

interface CategoryFeatureSectionProps {
    tabs: string[];
    allNews: NewsItem[];
    formatTime: (date: any) => string;
}

export function CategoryFeatureSection({ tabs, allNews, formatTime }: CategoryFeatureSectionProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    // Filter logic for tabs
    const getFilteredNews = (tab: string) => {
        const t = tab; // Direct comparison for Urdu names
        if (t === 'قومی') {
            return allNews.filter(n =>
                n.category === 'قومی خبریں' ||
                n.category === 'National News' ||
                n.category === 'India'
            );
        } else if (t === 'عالمی') {
            return allNews.filter(n =>
                n.category === 'عالمی خبریں' ||
                n.category === 'World News' ||
                n.category === 'International'
            );
        } else if (t === 'علاقائی') {
            return allNews.filter(n =>
                n.category === 'دکن نیوز' ||
                n.category === 'علاقائی خبریں' ||
                n.category === 'Deccan News' ||
                n.category === 'Hyderabad' ||
                n.category === 'Telangana'
            );
        }
        return allNews.filter(n => n.category === tab);
    };

    const currentNews = getFilteredNews(activeTab);
    const featuredItem = currentNews[0];
    const listItems = currentNews.slice(1, 5);

    return (
        <div className="w-full mb-12 text-right">
            {/* Header with Tabs */}
            <div className="border-b border-gray-200 dark:border-white/10 flex flex-row-reverse items-center justify-between mb-6">
                <div className="flex flex-row-reverse items-center gap-8">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                py-2 border-b-2 font-sans text-sm font-bold tracking-wide cursor-pointer transition-all
                                ${activeTab === tab ? 'border-red-700 text-secondary dark:text-gray-100' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}
                            `}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {currentNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LEFT: Featured Big Card */}
                    {featuredItem && (
                        <Link to={`/news/${featuredItem.id}`} className="group cursor-pointer block order-1 md:order-2">
                            <div className="relative aspect-[4/3] bg-gray-200 dark:bg-white/10 overflow-hidden mb-3">
                                <img
                                    src={featuredItem.imageUrl || "/images/hero.png"}
                                    alt={featuredItem.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <span className="absolute bottom-2 left-2 bg-red-700 text-white text-[10px] font-bold px-2 py-1">
                                    {featuredItem.category}
                                </span>
                            </div>
                            <span className="text-[12px] text-gray-400 font-sans block mb-1">{formatTime(featuredItem.createdAt)}</span>
                            <h3 className="font-serif font-black text-lg md:text-xl leading-[1.4] text-gray-900 dark:text-gray-100 mb-2 group-hover:text-accent transition-colors">
                                {featuredItem.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 font-sans text-xs leading-[1.8] line-clamp-2">
                                {featuredItem.content.substring(0, 150)}...
                            </p>
                        </Link>
                    )}

                    {/* RIGHT: List of Items */}
                    <div className="flex flex-col gap-4 order-2 md:order-1">
                        {listItems.map((item, idx) => (
                            <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="flex flex-row-reverse gap-4 group cursor-pointer h-[80px] text-right">
                                <div className="w-[120px] h-full bg-gray-200 dark:bg-white/10 flex-shrink-0 relative overflow-hidden rounded-sm">
                                    <img
                                        src={item.imageUrl || "/images/hero.png"}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col py-0.5">
                                    <span className="text-[12px] text-gray-400 font-sans mb-1">{formatTime(item.createdAt)}</span>
                                    <h4 className="font-serif font-bold text-sm leading-snug text-gray-800 dark:text-gray-200 line-clamp-3 group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-3xl">
                    <p className="text-gray-400 font-sans text-lg font-bold opacity-60">
                        خبریں جلد شامل کی جائیں گی
                    </p>
                </div>
            )}
        </div>
    );
}

// Simple Block for Technology / Entertainment
interface CategoryGridSectionProps {
    category: string;
    items: any[];
    formatTime: (date: any) => string;
}

export function CategoryGridSection({ category, items, formatTime }: CategoryGridSectionProps) {
    const displayItems = items.slice(0, 4); // Limit to 4

    return (
        <div className="w-full mb-12 text-right">
            <div className="flex flex-row-reverse items-center mb-6 border-b border-gray-100 dark:border-white/10 pb-2">
                <div className="w-1.5 h-4 bg-red-700 ml-2"></div>
                <h2 className="text-secondary dark:text-gray-100 font-sans font-bold text-sm">{category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayItems.length > 0 ? displayItems.map((item, idx) => (
                    <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="flex flex-row-reverse gap-4 group cursor-pointer text-right">
                        <div className="w-[100px] h-[70px] bg-gray-200 dark:bg-white/10 flex-shrink-0 overflow-hidden relative rounded-sm">
                            <img
                                src={item.imageUrl || item.image || "/images/tech_campus.png"}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <span className="text-[12px] text-gray-400 font-sans mb-1">{item.createdAt ? formatTime(item.createdAt) : item.time}</span>
                            <h4 className="font-serif font-bold text-xs md:text-sm leading-snug text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-accent transition-colors">
                                {item.title}
                            </h4>
                        </div>
                    </Link>
                )) : (
                    <div className="col-span-1 md:col-span-2 py-10 text-center border border-dashed border-gray-100 dark:border-zinc-800 rounded-2xl">
                        <p className="text-gray-400 font-sans text-sm font-bold opacity-60">کوئی خبر دستیاب نہیں ہے</p>
                    </div>
                )}
            </div>
        </div>
    )
}

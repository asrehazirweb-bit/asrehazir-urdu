import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, ChevronRight } from 'lucide-react';
import { AdBlock } from './AdBlock';

interface NewsItem {
    id: number | string;
    title: string;
    time: string;
    image?: string;
    category?: string;
}

interface SidebarProps {
    offbeatItems: NewsItem[];
    topStories?: NewsItem[];
}

export function Sidebar({ offbeatItems = [], topStories = [] }: SidebarProps) {
    // Use provided items without auto-duplication
    const gridOffbeat = offbeatItems.slice(0, 4);
    const finalTop = topStories.slice(0, 8);

    return (
        <div className="flex flex-col gap-8 w-full h-full relative">

            {/* 0. TOP STORIES BLOCK (Static - Scrolls away) */}
            {finalTop.length > 0 && (
                <div className="border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5">
                    <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-[#B27B1E]"></div>
                        <h2 className="text-secondary dark:text-gray-300 font-sans font-bold uppercase tracking-wider text-sm">خاص خبریں</h2>
                    </div>
                    <div>
                        {finalTop.map((story, idx) => (
                            <Link key={`${story.id}-${idx}`} to={`/news/${story.id}`} className="p-3 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer flex gap-3 group transition-colors block">
                                {story.image && (
                                    <div className="w-24 h-20 flex-shrink-0 bg-gray-100 dark:bg-white/5 relative overflow-hidden">
                                        <img
                                            src={story.image || "/api/placeholder/100/100"}
                                            alt={story.title}
                                            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col justify-center w-full">
                                    <h4 className="font-serif font-bold text-xs leading-snug text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-accent transition-colors">
                                        {story.title}
                                    </h4>
                                    <span className="text-[10px] text-gray-400 font-sans mt-1">{story.time}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link to="/world">
                        <button className="w-full py-2 bg-[#004d99]/10 text-[#004d99] text-xs font-bold uppercase tracking-widest hover:bg-[#004d99]/20 transition-colors">
                            سب دیکھیں
                        </button>
                    </Link>
                </div>
            )}

            {/* STICKY CONTAINER starts here */}
            {/* This block will stick to the top as user scrolls past Top Stories */}
            <div className="sticky top-4 flex flex-col gap-8">

                {/* 1. OFFBEAT BLOCK */}
                <div className="border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5">
                    <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-[#004d99]"></div>
                        <h2 className="text-secondary dark:text-gray-300 font-sans font-bold uppercase tracking-wider text-sm">عجیب و غریب</h2>
                    </div>

                    <div className="flex flex-col">
                        {gridOffbeat.map((item, idx) => (
                            <Link key={`${item.id}-${idx}`} to={`/news/${item.id}`} className="p-4 border-b border-gray-100 dark:border-white/5 last:border-0 relative pr-8 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group block text-right">
                                <div className="absolute right-4 top-6 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-accent transition-colors"></div>
                                <span className="text-[10px] text-gray-400 font-sans mb-1 block">{item.time}</span>
                                <h3 className="font-serif font-bold text-sm leading-snug text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                                    {item.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 2. SOCIAL STATS CARD */}
                <div className="flex w-full h-auto min-h-[80px] overflow-hidden rounded-2xl">
                    <div className="flex-1 bg-[#FF0000] text-white p-4 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <Youtube size={20} className="mb-1" />
                        <span className="font-bold text-xs">1.9M</span>
                        <span className="text-[8px] uppercase opacity-80">Subscribers</span>
                    </div>
                    <div className="flex-1 bg-[#000000] text-white p-4 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity border-x border-white/10">
                        <Twitter size={20} className="mb-1" />
                        <span className="font-bold text-xs">40.4K</span>
                        <span className="text-[8px] uppercase opacity-80">Followers</span>
                    </div>
                    <div className="flex-1 bg-[#4267B2] text-white p-4 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <Facebook size={20} className="mb-1" />
                        <span className="font-bold text-xs">1.4M</span>
                        <span className="text-[8px] uppercase opacity-80">Fans</span>
                    </div>
                </div>

                <AdBlock placement="sidebar" className="h-[250px] !my-0" label="سائیڈ بار اشتہار" />

                <div className="border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-6 text-right">
                    <h3 className="text-secondary dark:text-gray-200 font-serif font-bold text-lg mb-6 border-b border-gray-100 dark:border-white/10 pb-2">مزید جانیے</h3>
                    <ul className="flex flex-col gap-4">
                        {[
                            { name: 'بھارت کی تازہ ترین خبریں', path: '/national' },
                            { name: 'حیدرآباد ٹریول گائیڈ', path: '/deccan' },
                            { name: 'تلنگانہ ٹور پیکیجز', path: '/deccan' },
                            { name: 'عالمی خبروں کی رپورٹ', path: '/world' },
                            { name: 'کھیل اور فلمی دنیا', path: '/sports-entertainment' },
                            { name: 'جرائم کی تازہ ترین رپورٹ', path: '/crime-accidents' }
                        ].map((item, idx) => (
                            <li key={idx}>
                                <Link to={item.path} className="flex flex-row-reverse items-center justify-between group cursor-pointer">
                                    <span className="text-sm font-sans text-gray-600 dark:text-gray-400 group-hover:text-red-700 transition-colors">{item.name}</span>
                                    <ChevronRight size={16} className="text-gray-400 group-hover:text-red-700 transition-colors rotate-180" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}

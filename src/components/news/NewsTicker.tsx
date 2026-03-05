import React, { useEffect, useState } from 'react';
import { newsService } from '../../services/newsService';
import type { UrduPost } from '../../services/newsService';


export const NewsTicker: React.FC = () => {
    const [posts, setPosts] = useState<UrduPost[]>([]);

    useEffect(() => {
        const unsubscribe = newsService.subscribeToPosts((fetchedPosts) => {
            setPosts(fetchedPosts.filter(p => p.status === 'published').slice(0, 5));
        });
        return () => unsubscribe();
    }, []);

    const displayPosts = posts.length > 0 ? posts : [
        { id: '1', title: 'عصر حاضر اردو پورٹل پر خوش آمدید', status: 'published' },
        { id: '2', title: 'تازہ ترین خبروں کے لیے باقاعدگی سے وزٹ کریں', status: 'published' }
    ] as UrduPost[];

    return (
        <div className="bg-primary text-white overflow-hidden py-3 border-y border-primary shadow-lg relative z-50 w-full" dir="rtl">
            <div className="flex whitespace-nowrap animate-ticker">
                {/* Render triple for absolute seamlessness */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        {displayPosts.map((post) => (
                            <span key={`${i}-${post.id}`} className="inline-flex items-center mx-12">
                                <span className="bg-white text-primary text-[10px] font-black px-2 py-0.5 rounded ml-4 shadow-sm">تازہ ترین</span>
                                <span className="text-sm md:text-base font-bold tracking-tight">{post.title}</span>
                                <span className="mx-12 text-white/30 font-light">/</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};


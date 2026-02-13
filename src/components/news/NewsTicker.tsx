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
        <div className="bg-red-600 text-white overflow-hidden py-3 border-y border-red-700 shadow-lg relative z-50 w-full" dir="rtl">
            <div className="flex whitespace-nowrap animate-ticker group">
                {displayPosts.map((post, i) => (
                    <span key={post.id || i} className="inline-flex items-center mx-12">
                        <span className="bg-white text-red-600 text-[10px] font-black px-2 py-0.5 rounded ml-4 shadow-sm">تازہ ترین</span>
                        <span className="text-sm md:text-base font-bold tracking-tight">{post.title}</span>
                        <span className="mx-12 text-white/30 font-light">/</span>
                    </span>
                ))}
                {/* Clone for infinite loop */}
                {displayPosts.map((post, i) => (
                    <span key={`clone-${post.id || i}`} className="inline-flex items-center mx-12">
                        <span className="bg-white text-red-600 text-[10px] font-black px-2 py-0.5 rounded ml-4 shadow-sm">تازہ ترین</span>
                        <span className="text-sm md:text-base font-bold tracking-tight">{post.title}</span>
                        <span className="mx-12 text-white/30 font-light">/</span>
                    </span>
                ))}
            </div>
        </div>
    );
};


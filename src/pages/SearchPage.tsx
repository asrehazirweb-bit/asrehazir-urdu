
import { useSearchParams } from 'react-router-dom';
import { Sidebar } from '../components/home/Sidebar';
import { IndiaNewsFeed } from '../components/india/IndiaNewsFeed';
import { useNews } from '../hooks/useNews';

export function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    // Fetch all to search across everything
    const { news: allNews, loading, formatTime } = useNews('All', 200);
    const sideBarNews = useNews('All', 8);

    const filteredNews = allNews.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
        const contentMatch = item.content.toLowerCase().includes(query.toLowerCase());
        const categoryMatch = item.category.toLowerCase().includes(query.toLowerCase());
        return titleMatch || contentMatch || categoryMatch;
    });

    const mappedNews = filteredNews.map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.content.substring(0, 150) + '...',
        image: item.imageUrl,
        location: item.category,
        subCategory: item.subCategory,
        date: formatTime(item.createdAt)
    }));

    const sidebarTop = sideBarNews.news.slice(0, 4).map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        image: item.imageUrl,
        time: formatTime(item.createdAt)
    }));

    const sidebarOffbeat = sideBarNews.news.slice(4, 8).map(item => ({
        id: item.id,
        title: item.title,
        time: formatTime(item.createdAt)
    }));

    return (
        <div className="pt-6 font-serif min-h-screen text-right" dir="rtl">
            <div className="w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                {/* Main Content - 8 Columns */}
                <div className="lg:col-span-8 flex flex-col">
                    <div className="mb-8 border-b-2 border-primary pb-2 flex flex-row-reverse justify-between items-end">
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
                            تلاش کے نتائج
                        </h1>
                        <span className="text-lg font-bold text-primary hidden md:block italic">
                            تلاش: "{query}"
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : mappedNews.length > 0 ? (
                        <div className="space-y-0">
                            <div className="mb-6">
                                <p className="text-lg text-gray-500">
                                    آپ کی تلاش کے لیے <span className="text-primary font-black">{mappedNews.length}</span> خبریں ملیں۔
                                </p>
                            </div>
                            <IndiaNewsFeed items={mappedNews} />
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <div className="max-w-md mx-auto">
                                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase">کوئی نتیجہ نہیں ملا</h3>
                                <p className="text-gray-500 text-lg">ہمیں <span className="font-bold underline italic text-primary opacity-80">"{query}"</span> سے متعلق کوئی خبر نہیں ملی۔ براہ کرم مختلف الفاظ استعمال کریں یا ہجے چیک کریں۔</p>
                            </div>
                        </div>
                    )}

                </div>

                {/* Sidebar - 4 Columns */}
                <div className="lg:col-span-4">
                    <Sidebar
                        offbeatItems={sidebarOffbeat}
                        topStories={sidebarTop}
                    />
                </div>

            </div>
        </div>
    );
}

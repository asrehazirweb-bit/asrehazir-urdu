import { useParams } from 'react-router-dom';
import { Sidebar } from '../components/home/Sidebar';
import { IndiaNewsFeed } from '../components/india/IndiaNewsFeed';
import { useNews } from '../hooks/useNews';

const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

export function CategoryPage() {
    const { categoryName, subCategory } = useParams();
    const displayTitle = subCategory || categoryName || 'خبریں';

    // Fetch more to allow for client-side filtering
    const { news: allNews, loading, formatTime } = useNews('All', 100);
    const sideBarNews = useNews('All', 8);

    // Dynamic filtering logic
    const filteredNews = allNews.filter(item => {
        const itemCat = item.category || '';
        const itemSubCat = item.subCategory || '';

        // Exact match for category and subcategory if provided
        if (subCategory) {
            return itemCat === categoryName && itemSubCat === subCategory;
        }

        if (categoryName) {
            // Check if it matches the main category
            if (itemCat === categoryName) return true;

            // Legacy mapping fallback for common Urdu categories
            const cat = categoryName.toLowerCase();
            const itemCatLower = itemCat.toLowerCase();

            if (cat === 'حیدرآباد' || cat === 'دکن') {
                return itemCatLower.includes('deccan') || itemCatLower.includes('hyderabad') || itemCatLower.includes('telangana') || itemCatLower.includes('andhra pradesh') || itemCatLower.includes('دکن');
            }
            if (cat === 'قومی خبریں') {
                return itemCatLower.includes('national') || itemCatLower.includes('india') || itemCatLower.includes('قومی');
            }
            if (cat === 'عالمی خبریں') {
                return itemCatLower.includes('world') || itemCatLower.includes('international') || itemCatLower.includes('middle east') || itemCatLower.includes('عالمی');
            }
            if (cat === 'مضامین اور مقالہ جات') {
                return itemCatLower.includes('articles') || itemCatLower.includes('essays') || itemCatLower.includes('مضامین');
            }
            if (cat === 'کھیل اور تفریح') {
                return itemCatLower.includes('sports') || itemCatLower.includes('entertainment') || itemCatLower.includes('کھیل');
            }
            if (cat === 'جرائم اور حادثات') {
                return itemCatLower.includes('crime') || itemCatLower.includes('accident') || itemCatLower.includes('جرائم');
            }
        }

        return false;
    });

    const mappedNews = filteredNews.map(item => ({
        id: item.id,
        title: item.title,
        excerpt: stripHtml(item.content).substring(0, 150) + '...',
        image: item.imageUrl,
        location: item.category || 'خبریں',
        subCategory: item.subCategory,
        videoUrl: (item as any).videoUrl,
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
        <div className="pt-6 font-serif text-right" dir="rtl">
            <div className="w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                {/* Main Content - 8 Columns */}
                <div className="lg:col-span-8 flex flex-col">
                    <div className="mb-8 border-b-2 border-primary pb-2 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                        <div>
                            {subCategory && (
                                <div className="flex items-center gap-2 text-[12px] font-sans font-bold text-gray-400 mb-1">
                                    <span>{categoryName}</span>
                                    <span>/</span>
                                </div>
                            )}
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                                {displayTitle}
                            </h1>
                        </div>
                        <span className="text-[12px] font-sans font-bold text-gray-500">
                            عصر حاضر کی خصوصی کوریج
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredNews.length > 0 ? (
                        <div className="space-y-0">
                            <IndiaNewsFeed items={mappedNews} />
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-500 font-sans italic">اس وقت {displayTitle} میں کوئی رپورٹ نہیں ملی۔</p>
                        </div>
                    )}

                </div>

                {/* Sidebar - 4 Columns */}
                <div className="lg:col-span-4 self-start lg:sticky lg:top-[80px] max-h-screen overflow-y-auto pr-2 custom-scrollbar hidden lg:block order-1">
                    <Sidebar
                        offbeatItems={sidebarOffbeat}
                        topStories={sidebarTop}
                    />
                </div>

            </div>
        </div>
    );
}


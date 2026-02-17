import { HeroSection } from '../components/home/HeroSection';
import { TelanganaSection } from '../components/home/TelanganaSection';
import { NewsSection, VideoSection } from '../components/home/NewsSection';
import { Sidebar as HomeSidebar } from '../components/home/Sidebar';
import { AdBlock } from '../components/home/AdBlock';
import { LatestNewsSection } from '../components/home/LatestNewsSection';
import { RegionalAndOffbeatSection } from '../components/home/RegionalAndOffbeatSection';
import { CategoryFeatureSection, CategoryGridSection } from '../components/home/CategoryFeatureSection';
import { useNews } from '../hooks/useNews';

const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

export function Home() {
    const { news, loading, formatTime } = useNews('All', 50);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white dark:bg-zinc-950">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
            </div>
        );
    }

    // Process news into sections
    const heroNews = news.slice(0, 6);
    const heroLeadStory = heroNews[0] ? {
        id: heroNews[0].id,
        title: heroNews[0].title,
        category: heroNews[0].category,
        image: heroNews[0].imageUrl,
        time: formatTime(heroNews[0].createdAt),
        excerpt: stripHtml(heroNews[0].content).substring(0, 200) + '...',
        titleFont: heroNews[0].titleFont,
        contentFont: heroNews[0].contentFont
    } : null;

    // Use news from index 6 to 14 for the sidebar top stories
    const heroTopStories = news.slice(6, 14).map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        image: item.imageUrl,
        time: formatTime(item.createdAt),
        titleFont: (item as any).titleFont
    }));

    const latestNewsItems = news.slice(0, 10).map(item => ({
        id: item.id,
        location: item.category,
        title: item.title,
        excerpt: stripHtml(item.content).substring(0, 120) + '...',
        titleFont: (item as any).titleFont
    }));

    const telanganaNews = news.filter(n =>
        n.category === 'Deccan News' ||
        n.category === 'دکن نیوز' ||
        n.category === 'Hyderabad' ||
        n.category === 'Telangana'
    );
    const telanganaFeature = telanganaNews[0] ? {
        id: telanganaNews[0].id,
        title: telanganaNews[0].title,
        image: telanganaNews[0].imageUrl,
        category: telanganaNews[0].category,
        time: formatTime(telanganaNews[0].createdAt),
        excerpt: stripHtml(telanganaNews[0].content).substring(0, 150) + '...',
        titleFont: (telanganaNews[0] as any).titleFont
    } : null;

    const telanganaList = telanganaNews.slice(1, 7).map(item => ({
        id: item.id,
        title: item.title,
        time: formatTime(item.createdAt),
        image: item.imageUrl,
        titleFont: (item as any).titleFont
    }));

    const regionalItems = news.slice(10, 16).map(item => ({
        id: item.id,
        time: formatTime(item.createdAt),
        title: item.title,
        image: item.imageUrl,
        titleFont: (item as any).titleFont
    }));

    const offbeatItems = news.slice(16, 20).map(item => ({
        id: item.id,
        time: formatTime(item.createdAt),
        title: item.title,
        titleFont: (item as any).titleFont
    }));

    const worldNews = news.filter(n =>
        n.category === 'World News' ||
        n.category === 'عالمی خبریں' ||
        n.category === 'International'
    ).slice(0, 2).map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        image: item.imageUrl,
        time: formatTime(item.createdAt),
        titleFont: (item as any).titleFont
    }));

    return (
        <div className="pt-6 text-right">

            <div className="w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                {/* === LEFT SIDEBAR COLUMN (4 Columns) - Swapped for RTL === */}
                <div className="lg:col-span-4 order-2 lg:order-1">
                    <HomeSidebar
                        topStories={heroTopStories}
                        offbeatItems={offbeatItems}
                    />
                </div>

                {/* === RIGHT CONTENT COLUMN (8 Columns) - Swapped for RTL === */}
                <div className="lg:col-span-8 flex flex-col order-1 lg:order-2">

                    {/* 1. Hero */}
                    {heroLeadStory && <HeroSection leadStory={heroLeadStory} />}

                    {/* 2. Latest News */}
                    <div className="mb-12">
                        <LatestNewsSection items={latestNewsItems} />
                    </div>

                    {/* 3. Telangana Section */}
                    {telanganaFeature && (
                        <TelanganaSection
                            featured={telanganaFeature}
                            items={telanganaList}
                        />
                    )}

                    {/* Regional (South) */}
                    <RegionalAndOffbeatSection regionalItems={regionalItems} />

                    {/* 4. India / Stats */}
                    <CategoryFeatureSection
                        tabs={['قومی', 'عالمی', 'علاقائی']}
                        allNews={news}
                        formatTime={formatTime}
                    />

                    {/* 5. Articles & Essays */}
                    <CategoryGridSection
                        category="مضامین اور مقالہ جات"
                        items={news.filter(n =>
                            n.category === 'Articles & Essays' ||
                            n.category === 'مضامین اور مقالہ جات' ||
                            n.category === 'Business' ||
                            n.category === 'Technology'
                        )}
                        formatTime={formatTime}
                    />

                </div>

            </div>

            {/* === SPORTS & ENTERTAINMENT SECTION (Full Width Layout) === */}
            <div className="w-full bg-gray-50 dark:bg-[#1a1614] py-12 mb-12 transition-colors border-y border-gray-100 dark:border-white/5">
                <div className="w-full mx-auto px-4">
                    <CategoryGridSection
                        category="کھیل اور تفریح"
                        items={news.filter(n =>
                            n.category === 'Sports & Entertainment' ||
                            n.category === 'کھیل اور تفریح' ||
                            n.category === 'Entertainment' ||
                            n.category === 'Sports'
                        )}
                        formatTime={formatTime}
                    />
                </div>
            </div>

            {/* === AD BLOCK === */}
            <AdBlock className="h-40 mb-12" label="پریمیم بینر اشتہار" />

            {worldNews.length > 0 && (
                <div className="w-full mx-auto px-4 mb-12">
                    <NewsSection title="قومی اور عالمی" items={worldNews} />
                </div>
            )}

            <VideoSection items={news.filter(n =>
                n.section === 'Must Watch' ||
                n.section === 'لازمی دیکھیں'
            ).slice(0, 3).map(item => ({
                id: item.id,
                title: item.title,
                category: item.category,
                image: item.imageUrl || '',
                time: formatTime(item.createdAt)
            }))} />
        </div>
    );
}

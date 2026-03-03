import { Play, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useVideos } from '../hooks/useVideos';
import type { VideoArticle } from '../hooks/useVideos';

export function VideosPage() {
    const { videos, loading, error } = useVideos(24);
    const navigate = useNavigate();

    const formatTime = (createdAt: any) => {
        if (!createdAt) return 'ابھی ابھی';
        const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
        return date.toLocaleDateString('ur-PK', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleVideoClick = (video: VideoArticle) => {
        if (video.videoUrl && (video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be') || video.videoUrl.includes('facebook.com'))) {
            window.open(video.videoUrl, '_blank');
        } else {
            navigate(`/news/${video.id}`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-white text-center px-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">{error}</h2>
                <Link to="/" className="text-primary hover:underline flex items-center gap-2">
                    <ChevronLeft size={18} /> ہوم پیج پر واپس جائیں
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full font-serif pt-6 pb-12 bg-white transition-colors min-h-screen" dir="rtl">

            {/* PAGE HEADER */}
            <div className="w-full px-4 mb-8 border-b border-gray-200 pb-6 text-center">
                <div className="flex flex-row-reverse items-center justify-center gap-2 text-xs font-sans font-black uppercase tracking-widest text-gray-500 mb-4">
                    <Link to="/" className="hover:text-primary transition-colors">خبریں</Link>
                    <ChevronRight size={10} className="rotate-180" />
                    <span className="text-primary">ویڈیوز</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tight mb-4 flex flex-row-reverse items-center justify-center gap-3">
                    <Video size={40} className="text-primary" />
                    ویڈیوز
                </h1>
                <p className="text-gray-600 font-sans text-base leading-relaxed max-w-2xl mx-auto">
                    تازہ ترین ویڈیوز، انٹرویوز، گراؤنڈ رپورٹس اور معلوماتی ویڈیوز یہاں دیکھیں۔
                </p>
            </div>

            {/* VIDEO GRID */}
            <div className="w-full max-w-7xl mx-auto px-4">
                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((item) => (
                            <article
                                key={item.id}
                                className="group cursor-pointer flex flex-col gap-3 text-right"
                                onClick={() => handleVideoClick(item)}
                            >
                                {/* Thumbnail Container (16:9 Aspect Ratio) */}
                                <div className="w-full aspect-video bg-gray-900 relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1 border border-gray-100">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                            <Video className="text-gray-600" size={40} />
                                        </div>
                                    )}

                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-primary/95 text-white flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-2xl shadow-primary/30 ring-4 ring-white/20">
                                            <Play size={24} fill="currentColor" className="mr-1 mt-0.5" />
                                        </div>
                                    </div>

                                    {/* Duration Badge */}
                                    {item.duration && (
                                        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white text-[12px] font-black px-3 py-1 rounded-lg flex items-center border border-white/10">
                                            {item.duration}
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-white/95 backdrop-blur-md text-zinc-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-xl shadow-black/10 border border-white/20">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col px-1">
                                    <h2 className="text-xl font-bold leading-relaxed text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2 font-serif">
                                        {item.title}
                                    </h2>
                                    <div className="flex flex-row-reverse items-center justify-start gap-2 text-[10px] text-gray-500 font-sans font-black uppercase tracking-widest">
                                        <div className="w-8 h-[1.5px] bg-primary/30"></div>
                                        <span>{formatTime(item.createdAt)}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <Video size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-500">کوئی ویڈیو نہیں ملی</h3>
                        <p className="text-gray-400">براہ کرم مزید اپڈیٹس کے لیے بعد میں دوبارہ چیک کریں۔</p>
                    </div>
                )}
            </div>

            {videos.length >= 24 && (
                <div className="flex justify-center mt-12">
                    <button className="px-10 py-4 bg-zinc-900 text-white text-[14px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary transition-all shadow-2xl shadow-zinc-900/20 active:scale-95">
                        مزید ویڈیوز دیکھیں
                    </button>
                </div>
            )}

        </div>
    );
}

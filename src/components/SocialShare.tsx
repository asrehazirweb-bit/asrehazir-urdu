import React from 'react';
import { Facebook, Send, MessageCircle, Share2, X as XIcon } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/socialLinks';

interface SocialShareProps {
    url: string;
    title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'فیس بک',
            icon: <Facebook size={20} />,
            color: 'bg-[#1877F2]',
            link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        },
        {
            name: 'ایکس',
            icon: <XIcon size={20} />,
            color: 'bg-[#000000]',
            link: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        },
        {
            name: 'ٹیلی گرام',
            icon: <Send size={20} className="rotate-180" />,
            color: 'bg-[#0088cc]',
            link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        },
        {
            name: 'واٹس ایپ',
            icon: <MessageCircle size={20} />,
            color: 'bg-[#25D366]',
            link: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
        }
    ];

    return (
        <div className="mt-12 py-8 border-y border-gray-100" dir="rtl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="text-right">
                    <h3 className="text-2xl font-black text-gray-900 mb-1">خبر شیئر کریں</h3>
                    <p className="text-sm text-gray-400 font-bold">اس خبر کو اپنے دوستوں اور سوشل میڈیا پر شیئر کریں</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {shareLinks.map((share) => (
                        <a
                            key={share.name}
                            href={share.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex flex-row items-center gap-2 ${share.color} text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg active:scale-95`}
                            title={`${share.name} پر شیئر کریں`}
                        >
                            {share.icon}
                            <span className="hidden sm:inline">{share.name}</span>
                        </a>
                    ))}

                    {/* WhatsApp Channel Join Button */}
                    <a
                        href={SOCIAL_LINKS.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-row items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20 active:scale-95"
                        title="ہمارے آفیشل واٹس ایپ چینل میں شامل ہوں"
                    >
                        <Share2 size={20} />
                        <span className="hidden sm:inline">ہمارے واٹس ایپ چینل میں شامل ہوں</span>
                    </a>
                </div>
            </div>

            <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-gray-100 flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Share2 size={20} />
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-black text-gray-900">رابطے میں رہیں</p>
                        <p className="text-xs text-gray-400 font-bold">تازہ ترین اپڈیٹس کے لیے ہمیں سوشل میڈیا پر فالو کریں</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
                        <XIcon size={16} />
                    </a>
                    <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                        <Send size={16} className="rotate-180" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SocialShare;

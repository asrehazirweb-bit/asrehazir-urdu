import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, Menu, Facebook, Twitter, Instagram, Moon, Sun, X, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import { AdBlock } from './home/AdBlock';

export function Header() {
    const currentDate = format(new Date(), 'EEEE, MMMM do, yyyy');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { isDark, toggle } = useDarkMode();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'عالمی خبریں', path: '/world' },
        { label: 'قومی خبریں', path: '/national' },
        { label: 'دکن نیوز', path: '/deccan' },
        { label: 'مضامین اور مقالہ جات', path: '/articles-essays' },
        { label: 'کھیل اور تفریح', path: '/sports-entertainment' },
        { label: 'جرائم اور حادثات', path: '/crime-accidents' },
    ];

    // Lock background scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass-effect border-b border-gray-200/50 dark:border-white/10 shadow-lg'
                : 'bg-white dark:bg-[#0a0807] border-b border-gray-100 dark:border-white/5'
                }`} dir="rtl">

                {/* Search Overlay */}
                {isSearchOpen && (
                    <div className="absolute inset-0 z-50 bg-white dark:bg-[#0a0807] flex items-center px-4 md:px-6">
                        <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto flex flex-row-reverse items-center gap-4">
                            <Search className="text-gray-400" size={24} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="خبریں، موضوعات یا الفاظ تلاش کریں..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-xl md:text-3xl font-serif text-gray-900 dark:text-white text-right"
                            />
                            <button type="button" onClick={() => setIsSearchOpen(false)} className="p-2 text-gray-500 hover:text-red-700 transition-colors">
                                <X size={24} />
                            </button>
                        </form>
                    </div>
                )}

                {/* Top Bar */}
                {!isScrolled && (
                    <div className="hidden md:block border-b border-gray-100 dark:border-white/5 py-2">
                        <div className="w-full mx-auto px-6 flex flex-row-reverse justify-between items-center text-[12px] font-bold text-gray-500">
                            <div className="flex flex-row-reverse gap-4 items-center">
                                <span>{currentDate}</span>
                                <span className="text-gray-300">|</span>
                                <span className="flex flex-row-reverse items-center gap-1.5 font-black">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                                    ڈیجیٹل ایڈیشن
                                </span>
                            </div>
                            <div className="flex flex-row-reverse items-center gap-6">
                                <div className="flex flex-row-reverse gap-4">
                                    <Facebook size={14} className="hover:text-red-700 cursor-pointer transition-colors" />
                                    <Twitter size={14} className="hover:text-red-700 cursor-pointer transition-colors" />
                                    <Instagram size={14} className="hover:text-red-700 cursor-pointer transition-colors" />
                                </div>
                                <button onClick={toggle} className="p-1 hover:text-red-700 transition-colors">
                                    {isDark ? <Sun size={14} /> : <Moon size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Branding */}
                <div className={`w-full mx-auto px-6 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6 md:py-10'}`}>
                    <div className="flex flex-row-reverse justify-between items-center relative">
                        <button className="md:hidden p-2 -mr-2 text-gray-900 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu size={24} />
                        </button>

                        <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 group transition-transform duration-300 active:scale-95">
                            <h1 className={`${isScrolled ? 'text-4xl md:text-5xl' : 'text-5xl md:text-8xl'} font-serif font-black tracking-tight leading-none text-gray-900 dark:text-white transition-all duration-300`}>
                                عصر<span className="text-red-700 font-serif">حاضر</span>
                            </h1>
                        </Link>

                        <div className="flex flex-row-reverse items-center gap-1 md:gap-4">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-gray-500 hover:text-red-700 transition-all"
                            >
                                <Search size={22} className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                            </button>
                            <Link to="/login" className="hidden sm:block bg-red-600 text-white px-6 py-2 text-[14px] font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-md">
                                ایڈمن
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Header Ad Slot */}
                {!isScrolled && (
                    <div className="w-full max-w-7xl mx-auto px-6 mb-4 hidden md:block">
                        <AdBlock placement="header" className="h-24 !my-0" label="ہیڈر اشتہار" />
                    </div>
                )}

                {/* Navigation */}
                <nav className={`w-full border-t border-gray-100 dark:border-white/5 py-1 hidden md:block`}>
                    <ul className="flex flex-row-reverse justify-center items-center gap-2">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.path}
                                    className="px-6 py-2 text-[16px] lg:text-[18px] font-bold text-gray-700 dark:text-gray-300 hover:text-red-700 transition-colors relative group"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-red-700 transition-all duration-400 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

            </header >

            {/* Mobile Sidebar Navigation */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
                    <div
                        className="fixed top-0 right-0 w-[85%] h-full bg-white dark:bg-[#0a0807] shadow-2xl overflow-y-auto flex flex-col animate-in slide-in-from-right duration-300 text-right"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 flex flex-row-reverse justify-between items-center border-b border-gray-100 dark:border-white/10 sticky top-0 bg-inherit z-10">
                            <h2 className="font-serif font-black text-3xl text-red-700 font-black">فہرست</h2>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-900 dark:text-white transition-transform active:rotate-90">
                                <X size={28} />
                            </button>
                        </div>

                        <div className="p-6 space-y-8 flex-1">
                            <div>
                                <span className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block">نیویگیشن</span>
                                <ul className="flex flex-col gap-1">
                                    {menuItems.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                to={item.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block py-4 text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-red-700 active:-translate-x-1 transition-all border-b border-gray-50 dark:border-white/5 last:border-0"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Links Urdu Section */}
                            <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                                <span className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block">فوری لنکس</span>
                                <ul className="flex flex-col gap-3">
                                    {[
                                        { name: 'انڈیا اپڈیٹس', path: '/national' },
                                        { name: 'حیدرآباد گائیڈ', path: '/deccan' },
                                        { name: 'کھیل اور فلم', path: '/sports-entertainment' },
                                        { name: 'جرائم کی رپورٹ', path: '/crime-accidents' }
                                    ].map((item, idx) => (
                                        <li key={idx}>
                                            <Link
                                                to={item.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex flex-row-reverse items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-red-600/30 group transition-all"
                                            >
                                                <span className="text-lg font-bold text-gray-700 dark:text-gray-300 group-hover:text-red-700">{item.name}</span>
                                                <ChevronRight size={18} className="rotate-180 text-gray-400 group-hover:text-red-700" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center bg-red-700 text-white py-5 text-xl font-black rounded-2xl shadow-xl shadow-red-700/20 active:scale-95 transition-all"
                                >
                                    ایڈمن لاگ ان
                                </Link>
                            </div>
                        </div>

                        <div className="mt-auto p-8 text-center border-t border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
                            <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">عصرِ حاضر ڈیسک © 2026<br />تمام حقوق محفوظ ہیں</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, Menu, Facebook, Twitter, Instagram, Moon, Sun, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

export function Header() {
    const currentDate = format(new Date(), 'EEEE, MMMM do, yyyy');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isDark, toggle } = useDarkMode();

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

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
            ? 'glass-effect border-b border-gray-200/50 dark:border-white/10 shadow-lg'
            : 'bg-white dark:bg-[#0a0807] border-b border-gray-100 dark:border-white/5'
            }`}>
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
                <div className="flex flex-row-reverse justify-between items-center">
                    <button className="md:hidden p-2 text-gray-900 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu size={24} />
                    </button>

                    <Link to="/" className="text-center group transition-transform duration-300 active:scale-95">
                        <h1 className={`${isScrolled ? 'text-4xl md:text-5xl' : 'text-5xl md:text-8xl'} font-serif font-black tracking-tight leading-none text-gray-900 dark:text-white transition-all duration-300`}>
                            عصر<span className="text-red-700 font-serif">حاضر</span>
                        </h1>
                    </Link>

                    <div className="flex flex-row-reverse items-center gap-4">
                        <button className="p-2 text-gray-500 hover:text-red-700 transition-all">
                            <Search size={22} />
                        </button>
                        <Link to="/login" className="hidden sm:block bg-red-600 text-white px-6 py-2 text-[14px] font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-md">
                            ایڈمن
                        </Link>
                    </div>
                </div>
            </div>

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

            {/* Mobile Sidebar Navigation */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
                    <div className="absolute top-0 right-0 w-4/5 h-full bg-white dark:bg-[#0a0807] p-6 shadow-2xl text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex flex-row-reverse justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-white/10">
                            <h2 className="font-serif font-black text-3xl text-red-700">فہرست</h2>
                            <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
                        </div>
                        <ul className="flex flex-col gap-1 text-right">
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-4 text-[20px] font-bold text-gray-900 dark:text-gray-100 hover:text-red-700 border-b border-gray-50 dark:border-white/5"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li className="mt-8">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-red-700 text-white py-4 text-xl font-bold rounded-xl shadow-lg">ایڈمن لاگ ان</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header >
    );
}

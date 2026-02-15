import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { LayoutDashboard, FileText, PlusSquare, LogOut, Home, Settings, ShieldCheck, Zap, Menu, X } from 'lucide-react';

import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = async () => {
        await auth.signOut();
        navigate('/');
        setIsLogoutModalOpen(false);
    };

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/admin', label: 'ڈیش بورڈ', icon: <LayoutDashboard size={18} /> },
        { path: '/admin/add-news', label: 'نیوز ڈیسک', icon: <PlusSquare size={18} /> },
        { path: '/admin/manage', label: 'آرکائیو', icon: <FileText size={18} /> },
    ];

    return (
        <div className="flex h-screen bg-[#f8f9fa] dark:bg-zinc-950 transition-colors duration-500 font-serif overflow-hidden" dir="rtl">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between px-6 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                        <ShieldCheck className="text-white" size={18} />
                    </div>
                    <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tighter">عصرِ حاضر</span>
                </div>
                <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar Desktop & Mobile */}
            <aside className={`
                fixed inset-y-0 right-0 z-40 w-72 bg-white dark:bg-zinc-900 border-l border-gray-100 dark:border-zinc-800 flex flex-col shadow-xl transition-transform duration-300 transform
                lg:translate-x-0 lg:static lg:inset-0
                ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="p-8 border-b border-gray-50 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">عصرِ حاضر</h2>
                            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">کنٹرول سینٹر</span>
                        </div>
                    </div>
                    <button onClick={() => setIsMobileSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-red-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8 text-right">
                    <div>
                        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">آپریشنز</p>
                        <nav className="space-y-1.5 font-serif">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileSidebarOpen(false)}
                                    className={`flex flex-row-reverse items-center space-x-reverse space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive(item.path)
                                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <span className={`${isActive(item.path) ? 'text-white' : 'group-hover:text-red-600'} transition-colors`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">پلیٹ فارم</p>
                        <nav className="space-y-1.5">
                            <Link
                                to="/"
                                onClick={() => setIsMobileSidebarOpen(false)}
                                className="flex flex-row-reverse items-center space-x-reverse space-x-3 px-4 py-3.5 rounded-2xl text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-all group"
                            >
                                <Home size={18} className="group-hover:text-red-600 transition-colors" />
                                <span className="text-sm font-bold tracking-tight">مین پورٹل</span>
                            </Link>
                            <Link
                                to="/admin/settings"
                                onClick={() => setIsMobileSidebarOpen(false)}
                                className={`flex flex-row-reverse items-center space-x-reverse space-x-3 px-4 py-3.5 rounded-2xl transition-all group ${isActive('/admin/settings') ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white'}`}
                            >
                                <Settings size={18} className={isActive('/admin/settings') ? 'text-white' : 'group-hover:text-red-600'} />
                                <span className="text-sm font-bold tracking-tight">پورٹل کنفیگریشن</span>
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-50 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm mb-4">
                        <div className="flex flex-row-reverse items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center text-white font-black text-xs">
                                {auth.currentUser?.displayName?.[0] || 'A'}
                            </div>
                            <div className="overflow-hidden text-right">
                                <p className="text-sm font-black text-gray-900 dark:text-white truncate uppercase tracking-tight">{auth.currentUser?.displayName || 'ایڈمن'}</p>
                                <p className="text-[10px] text-green-500 font-bold flex flex-row-reverse items-center gap-1 uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> مجاز صارف
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogoutClick}
                        className="w-full flex flex-row-reverse items-center justify-center space-x-reverse space-x-2 p-3.5 rounded-2xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all font-black uppercase tracking-widest text-[10px]"
                    >
                        <LogOut size={16} />
                        <span>اکاؤنٹ سائن آؤٹ کریں</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative z-10 transition-all duration-500 pt-20 lg:pt-8 px-4 lg:px-8 pb-12">
                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumbs / Top Bar Placeholder */}
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50 dark:border-zinc-800/50">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                            <span className="text-gray-900 dark:text-white italic">{location.pathname.split('/').pop()?.replace('-', ' ') || 'ڈیش بورڈ'}</span>
                            <span className="text-red-600">/</span>
                            <span>ایڈمن</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">v1.2.4 Active</span>
                            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-red-600 shadow-lg">
                                <Zap size={14} fill="currentColor" />
                            </div>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </main>

            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={confirmLogout}
                title="سائن آؤٹ کریں"
                message="کیا آپ واقعی سائن آؤٹ کرنا چاہتے ہیں؟ آپ کو ایڈمن پینل تک رسائی کے لیے دوبارہ لاگ ان کرنا پڑے گا۔"
                confirmText="سائن آؤٹ"
                cancelText="منسوخ کریں"
            />
        </div>
    );
};

export default AdminLayout;

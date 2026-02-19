import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { LayoutDashboard, FileText, PlusSquare, LogOut, Home, ShieldCheck, Zap, Menu, X, Megaphone } from 'lucide-react';

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
        { path: '/admin/ads', label: 'اشتہارات', icon: <Megaphone size={18} /> },
    ];

    return (
        <div className="flex h-screen bg-white transition-colors duration-500 font-serif overflow-hidden" dir="rtl">
            {/* Sidebar Desktop & Mobile */}
            <aside className={`
                fixed inset-y-0 right-0 z-40 w-72 bg-white border-l border-gray-100 flex flex-col shadow-xl transition-transform duration-300 transform
                lg:translate-x-0 lg:static lg:inset-0
                ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">عصرِ حاضر</h2>
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">کنٹرول سینٹر</span>
                        </div>
                    </div>
                    <button onClick={() => setIsMobileSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-primary">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8">
                    <div>
                        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">آپریشنز</p>
                        <nav className="space-y-1.5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileSidebarOpen(false)}
                                    className={`flex items-center space-x-3 space-x-reverse px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive(item.path)
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <span className={`${isActive(item.path) ? 'text-white' : 'group-hover:text-primary'} transition-colors`}>
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
                                className="flex items-center space-x-3 space-x-reverse px-4 py-3.5 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group"
                            >
                                <Home size={18} className="group-hover:text-primary transition-colors" />
                                <span className="text-sm font-bold tracking-tight">مین پورٹل</span>
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-50 bg-gray-50/50">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary/80 flex items-center justify-center text-white font-black text-xs">
                                {auth.currentUser?.displayName?.[0] || 'A'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-black text-gray-900 truncate uppercase tracking-tight">{auth.currentUser?.displayName || 'ایڈمن'}</p>
                                <p className="text-[10px] text-green-500 font-bold flex items-center gap-1 uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> مجاز صارف
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogoutClick}
                        className="w-full flex items-center justify-center space-x-2 space-x-reverse p-3.5 rounded-2xl bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary transition-all font-black uppercase tracking-widest text-[10px]"
                    >
                        <LogOut size={16} />
                        <span>سائن آؤٹ کریں</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <ShieldCheck className="text-white" size={18} />
                    </div>
                    <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">عصرِ حاضر</span>
                </div>
                <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative z-10 transition-all duration-500 pt-20 lg:pt-8 px-4 lg:px-8 pb-12">
                {/* Use logical margin-inline for centering */}
                <div className="max-w-6xl" style={{ marginInline: 'auto' }}>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                            <span className="text-gray-900 italic">{location.pathname.split('/').pop()?.replace('-', ' ') || 'ڈیش بورڈ'}</span>
                            <span className="text-primary">/</span>
                            <span>ایڈمن</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">v1.2.4 Active</span>
                            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-primary shadow-lg">
                                <Zap size={14} fill="currentColor" />
                            </div>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </main>

            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                ></div>
            )}

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

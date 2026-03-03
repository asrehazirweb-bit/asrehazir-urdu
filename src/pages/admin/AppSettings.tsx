import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Settings, Power, Activity, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import Toast from '../../components/ui/Toast';

const AppSettings: React.FC = () => {
    const [livePageEnabled, setLivePageEnabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        // Listen to settings for real-time updates
        const unsub = onSnapshot(doc(db, 'settings', 'live_config'), (docSnap) => {
            if (docSnap.exists()) {
                setLivePageEnabled(docSnap.data().livePageEnabled ?? true);
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const handleToggle = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'settings', 'live_config'), {
                livePageEnabled: !livePageEnabled,
                updatedAt: new Date()
            }, { merge: true });

            setToast({
                message: `لائیو پیج ${!livePageEnabled ? 'آن' : 'آف'} کر دیا گیا ہے`,
                type: 'success'
            });
        } catch (error) {
            console.error("Error updating settings:", error);
            setToast({ message: "سیٹنگز اپ ڈیٹ کرنے میں دشواری پیش آئی", type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20 text-right font-serif" dir="rtl">
            {/* Header */}
            <header>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">سسٹم سیٹنگز</h1>
                <p className="text-sm font-bold text-gray-400 mt-2">پورٹل کی عالمی کنفیگریشنز</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
                {/* Information Card */}
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-zinc-900 p-8 rounded-[2rem] text-white shadow-2xl">
                        <Activity className="text-primary mb-4" size={32} />
                        <h3 className="text-xl font-black tracking-tight mb-2 italic">لائیو کنٹرولز</h3>
                        <p className="text-sm text-zinc-400 font-medium leading-[1.8]">
                            تمام لائیو نیوز اپ ڈیٹس کے لیے ہنگامی اوور رائیڈ۔ اسے غیر فعال کرنے سے عوامی پورٹل سے لائیو فیڈ فوری طور پر غائب ہو جائے گی۔
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl flex flex-row-reverse items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">سیکیورٹی</p>
                            <p className="text-sm font-bold text-gray-900">محفوظ موڈ فعال ہے</p>
                        </div>
                    </div>
                </div>

                {/* Settings Form */}
                <div className="md:col-span-8">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex flex-row-reverse items-center justify-between">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">فیچر مینجمنٹ</h3>
                            <Settings className="text-gray-300" size={20} />
                        </div>

                        <div className="p-10 space-y-10">
                            {/* Live Page Toggle */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 transition-all">
                                <div className="space-y-1">
                                    <div className="flex flex-row-reverse items-center gap-3">
                                        <h4 className="text-lg font-black text-gray-900 tracking-tight">پبلک لائیو پیج</h4>
                                        {livePageEnabled ? (
                                            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200">آن لائن</span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">آف لائن</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">پورے پورٹل پر ریئل ٹائم نیوز فیڈ کی نمائش کو کنٹرول کریں۔</p>
                                </div>

                                <button
                                    onClick={handleToggle}
                                    disabled={saving}
                                    className={`relative inline-flex h-12 w-24 items-center rounded-full transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-primary/20 ${livePageEnabled ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-gray-200'}`}
                                >
                                    <span className="sr-only">لائیو پیج تبدیل کریں</span>
                                    <span
                                        className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform duration-500 shadow-md ${livePageEnabled ? '-translate-x-14' : '-translate-x-2'}`}
                                    />
                                    <Power className={`absolute ${livePageEnabled ? 'right-4 text-white/50' : 'left-4 text-gray-400'}`} size={12} />
                                </button>
                            </div>

                            <div className="flex flex-row-reverse items-start gap-4 p-8 bg-blue-50 rounded-2xl border border-blue-100 text-blue-800 italic text-sm font-medium leading-relaxed">
                                <AlertCircle size={24} className="shrink-0 mt-0.5" />
                                <p>نوٹ: لائیو پیج کو غیر فعال کرنے سے کوئی خبر ڈیلیٹ نہیں ہوگی، یہ صرف عوامی پورٹل سے "لائیو" سیکشن کو چھپا دے گا۔</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex flex-row-reverse justify-end">
                            <div className="flex flex-row-reverse items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                {saving ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
                                        <span>تبدیلیاں محفوظ ہو رہی ہیں...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={14} className="text-green-500" />
                                        <span>سیٹنگز ریئل ٹائم میں ہم آہنگ ہیں</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default AppSettings;

import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Chrome } from 'lucide-react';
import { googleProvider } from '../lib/firebase';

import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const { user, userData, isAdmin, loading } = useAuth();
    const [localLoading, setLocalLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle navigation/status
    React.useEffect(() => {
        if (loading) return;
        if (user && isAdmin) {
            navigate('/admin');
        }
    }, [navigate, isAdmin, user, loading]);

    const handleGoogleLogin = async () => {
        setLocalLoading(true);
        setError('');
        try {
            // Using Popup for immediate feedback
            await signInWithPopup(auth, googleProvider);
            console.log("Urdu Login Success");
        } catch (err: any) {
            console.error("Urdu - Popup Login Error:", err);
            setError(`لاگ ان میں غلطی: ${err.message}`);
            setLocalLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4" dir="rtl">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-serif">
                        ایڈمن لاگ ان
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        عصرِ حاضر سی ایم ایس تک رسائی حاصل کریں
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-bold">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="w-full">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={localLoading || loading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-gray-300 rounded-xl shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-all duration-200 active:scale-95 group"
                            >
                                <Chrome className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                                <span className="font-bold underline-offset-4">Google کے ساتھ سائن ان کریں</span>
                            </button>
                        </div>
                    </div>

                    {user && !isAdmin && !loading && (
                        <div className="mt-6 p-6 bg-amber-50 rounded-2xl border border-amber-200 text-right">
                            <div className="flex items-center gap-2 mb-3 text-amber-800 justify-end">
                                <span className="text-sm font-bold">رسائی مسترد کر دی گئی ہے</span>
                            </div>
                            <p className="text-xs text-amber-700 mb-4 leading-relaxed">
                                آپ لاگ ان ہیں، لیکن آپ کے اکاؤنٹ کو ایڈمن کے اختیارات حاصل نہیں ہیں۔ براہ کرم ایڈمن تک رسائی کی درخواست کریں۔
                            </p>

                            {/* PART 2: Admin Access Request */}
                            {userData?.requestStatus === 'pending' ? (
                                <div className="bg-amber-100/50 p-3 rounded-lg border border-amber-200 text-center">
                                    <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">درخواست پینڈنگ ہے</p>
                                    <p className="text-[10px] text-amber-600 mt-1">ایڈمن جلد آپ کی درخواست کا جائزہ لے گا۔</p>
                                </div>
                            ) : userData?.requestStatus === 'approved' ? (
                                <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
                                    <p className="text-[10px] font-bold text-green-800 uppercase tracking-widest">رسائی منظور کر دی گئی!</p>
                                    <p className="text-[10px] text-green-600 mt-1">براہ کرم ڈیش بورڈ تک رسائی کے لیے صفحہ ریفریش کریں۔</p>
                                </div>
                            ) : (
                                <button
                                    onClick={async () => {
                                        const { doc, updateDoc } = await import('firebase/firestore');
                                        const { db } = await import('../lib/firebase');
                                        await updateDoc(doc(db, 'users', user.uid), {
                                            adminRequest: true,
                                            requestStatus: 'pending'
                                        });
                                        window.location.reload();
                                    }}
                                    className="w-full py-3 bg-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-700 transition-all shadow-md active:scale-95"
                                >
                                    ایڈمن تک رسائی کی درخواست کریں
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

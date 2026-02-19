import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Chrome } from 'lucide-react';
import { googleProvider } from '../lib/firebase';

import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const { user, isAdmin, loading } = useAuth();
    const [localLoading, setLocalLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // TEMPORARY: Direct redirect for testing
    React.useEffect(() => {
        if (loading) return;

        if (user && isAdmin) {
            navigate('/admin');
        } else if (user && !isAdmin) {
            // STRICT MODE: Auto-logout non-admins
            auth.signOut().then(() => {
                setError('رسائی مسترد: صرف ایڈمن لاگ ان کر سکتے ہیں۔');
                setLocalLoading(false);
            });
        }
    }, [navigate, isAdmin, user, loading]);

    const handleGoogleLogin = async () => {
        setLocalLoading(true);
        setError('');
        try {
            // Using Popup for immediate feedback
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Urdu Login Success UID:", result.user.uid);
            // navigate('/admin') will be handled by the useEffect
        } catch (err: any) {
            console.error("Urdu - Popup Login Error:", err);
            setError(`Login failed: ${err.message}`);
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
                                <span className="font-bold font-sans">Google کے ساتھ سائن ان کریں</span>
                            </button>
                        </div>
                        <p className="text-xs text-center text-gray-500">
                            صرف مجاز ایڈمن اکاؤنٹس ہی لاگ ان کر سکتے ہیں۔
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

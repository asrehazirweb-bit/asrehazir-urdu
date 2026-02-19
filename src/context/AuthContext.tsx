import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, type User, getRedirectResult } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
    role: "admin" | "editor" | "reader";
    appAccess: string[];
    languagePreference: string;
}

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    isAdmin: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    isAdmin: false,
    loading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Handle redirect result
        getRedirectResult(auth).then((result) => {
            if (result?.user) {
                console.log("Urdu - Google Redirect Success:", result.user.uid);
            }
        }).catch((error) => {
            console.error("Urdu - Redirect Error:", error);
        });

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log("Urdu - Auth State Changed. User UID:", firebaseUser?.uid || "null");

            setUser(firebaseUser);

            if (firebaseUser) {
                setLoading(true);
                try {
                    console.log("Urdu - Fetching Firestore doc for UID:", firebaseUser.uid);
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data() as UserData;
                        setUserData(data);
                        console.log("Urdu - Firestore User Data:", data);

                        // Check if user is admin/editor AND has 'ur' in appAccess
                        const hasAccess = (data.role === 'admin' || data.role === 'editor') &&
                            data.appAccess?.includes('ur');

                        if (!hasAccess) {
                            console.warn("Urdu - User does not have Urdu CMS access (ur in appAccess)");
                        }
                        setIsAdmin(hasAccess);
                    } else {
                        console.warn("Urdu - No user profile found in Firestore for UID:", firebaseUser.uid);
                        setUserData(null);
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error("Urdu - Error fetching user data:", error);
                    setIsAdmin(false);
                } finally {
                    setLoading(false);
                }
            } else {
                setUserData(null);
                setIsAdmin(false);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, isAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


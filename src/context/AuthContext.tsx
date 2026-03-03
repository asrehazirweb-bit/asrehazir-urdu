import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, type User, getRedirectResult } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: "admin" | "user" | "editor" | "reader";
    adminRequest: boolean;
    requestStatus: "pending" | "approved" | "rejected" | null;
    appAccess?: string[];
    languagePreference?: string;
    createdAt?: any;
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
                        // OR if they are a standard 'admin' role (PART 6)
                        const hasAccess = !!(data.role === 'admin' || (data.role === 'editor' && data.appAccess?.includes('ur')));

                        if (!hasAccess) {
                            console.warn("Urdu - User does not have Urdu CMS access");
                        }
                        setIsAdmin(hasAccess);
                    } else {
                        // Create default user profile if it doesn't exist (PART 1: Registration)
                        console.log("Urdu - Creating new user profile in Firestore for UID:", firebaseUser.uid);
                        const newUser: UserData = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            role: "user",
                            adminRequest: false,
                            requestStatus: null,
                            appAccess: [],
                            languagePreference: 'ur',
                            createdAt: new Date()
                        };

                        setUserData(newUser);
                        setIsAdmin(false);

                        const { setDoc, serverTimestamp } = await import('firebase/firestore');
                        await setDoc(doc(db, 'users', firebaseUser.uid), { ...newUser, createdAt: serverTimestamp() });
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


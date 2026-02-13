import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
    role: "admin" | "editor" | "reader";
    appAccess: string[];
    languagePreference: string;
}

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    isUrduAdmin: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    isUrduAdmin: false,
    loading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isUrduAdmin, setIsUrduAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);
            setUser(firebaseUser);

            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data() as UserData;
                        setUserData(data);

                        // Check if user is admin/editor AND has 'ur' in appAccess
                        const hasAccess = (data.role === 'admin' || data.role === 'editor') &&
                            data.appAccess?.includes('ur');
                        setIsUrduAdmin(hasAccess);
                    } else {
                        setUserData(null);
                        setIsUrduAdmin(false);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setIsUrduAdmin(false);
                }
            } else {
                setUserData(null);
                setIsUrduAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, isUrduAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


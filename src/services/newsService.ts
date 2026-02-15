import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface UrduPost {
    id?: string;
    title: string;
    content: string;
    imageUrl?: string;
    status: 'published' | 'draft';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Urdu posts collection path: news (matching Home page and useNews hook)
const URDU_POSTS_PATH = 'news';
const postsCollection = collection(db, URDU_POSTS_PATH);

export const newsService = {
    // 1. Fetch Urdu Posts (Real-time)
    subscribeToPosts: (callback: (posts: UrduPost[]) => void) => {
        const q = query(postsCollection, orderBy('createdAt', 'desc'));
        return onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as UrduPost));
            callback(posts);
        });
    },

    // 2. Add New Urdu Post
    addPost: async (title: string, content: string, imageUrl?: string) => {
        return await addDoc(postsCollection, {
            title,
            content,
            category: 'Deccan News', // Default category for Urdu posts
            subCategory: 'Top Stories',
            imageUrl: imageUrl || '',
            status: 'published',
            author: 'عصرِ حاضر ڈیسک',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    },

    // 3. Update Urdu Post
    updatePost: async (postId: string, updates: Partial<UrduPost>) => {
        const postRef = doc(db, URDU_POSTS_PATH, postId);
        return await updateDoc(postRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    },


    // 4. Delete Urdu Post
    deletePost: async (postId: string) => {
        const postRef = doc(db, URDU_POSTS_PATH, postId);
        return await deleteDoc(postRef);
    },

    // 5. Toggle Publish Status
    toggleStatus: async (postId: string, currentStatus: 'published' | 'draft') => {
        const postRef = doc(db, URDU_POSTS_PATH, postId);
        return await updateDoc(postRef, {
            status: currentStatus === 'published' ? 'draft' : 'published',
            updatedAt: serverTimestamp()
        });
    }
};

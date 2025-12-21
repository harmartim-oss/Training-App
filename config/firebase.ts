/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
    getAuth, 
    Auth, 
    GoogleAuthProvider, 
    FacebookAuthProvider,
    OAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    User as FirebaseUser
} from 'firebase/auth';

// Firebase configuration - using environment variables
// These should be set in .env.local file
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Initialize Firebase
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// Check if Firebase is configured
const isFirebaseConfigured = () => {
    return firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId;
};

if (isFirebaseConfigured()) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
    } catch (error) {
        console.warn('Firebase initialization failed:', error);
    }
}

// Authentication providers
const googleProvider = auth ? new GoogleAuthProvider() : null;
const facebookProvider = auth ? new FacebookAuthProvider() : null;
const linkedInProvider = auth ? new OAuthProvider('linkedin.com') : null;
// Note: Instagram doesn't support OAuth via Firebase Auth, would need Facebook Login with Instagram permissions

// Social login functions
export const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
        throw new Error('Firebase not configured. Please set up Firebase credentials in .env.local');
    }
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error: any) {
        console.error('Google sign in error:', error);
        throw error;
    }
};

export const signInWithFacebook = async () => {
    if (!auth || !facebookProvider) {
        throw new Error('Firebase not configured. Please set up Firebase credentials in .env.local');
    }
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        return result.user;
    } catch (error: any) {
        console.error('Facebook sign in error:', error);
        throw error;
    }
};

export const signInWithLinkedIn = async () => {
    if (!auth || !linkedInProvider) {
        throw new Error('Firebase not configured. Please set up Firebase credentials in .env.local');
    }
    try {
        const result = await signInWithPopup(auth, linkedInProvider);
        return result.user;
    } catch (error: any) {
        console.error('LinkedIn sign in error:', error);
        throw error;
    }
};

export const signOut = async () => {
    if (!auth) {
        throw new Error('Firebase not configured');
    }
    try {
        await firebaseSignOut(auth);
    } catch (error: any) {
        console.error('Sign out error:', error);
        throw error;
    }
};

// Convert Firebase user to our User type
export const convertFirebaseUser = (firebaseUser: FirebaseUser) => {
    return {
        id: firebaseUser.uid,
        fullname: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        organizationType: '',
        organizationName: '',
        subscriptionTier: 'basic' as const,
        loginDate: new Date().toISOString(),
        registrationDate: new Date().toISOString(),
        isEnterprise: false
    };
};

export { auth, isFirebaseConfigured };
export type { FirebaseUser };

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS7LdRMCllPsfSiyFSMcc51GaYXZ70jv4",
  authDomain: "hitungin-63ed4.firebaseapp.com",
  projectId: "hitungin-63ed4",
  storageBucket: "hitungin-63ed4.firebasestorage.app",
  messagingSenderId: "632806065095",
  appId: "1:632806065095:web:a8d8b1032af95dd93f4fe2"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

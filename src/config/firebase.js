import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPZaU2M87uCJH-alUZCJ5iW0n3b6BfU3E",
  authDomain: "t-delete.firebaseapp.com",
  projectId: "t-delete",
  storageBucket: "t-delete.appspot.com", // Revisi bagian ini
  messagingSenderId: "446655498719",
  appId: "1:446655498719:web:10665e8f45f1cb7cc2dc6a",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth dan Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Fungsi Login dengan Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Kembalikan data pengguna
  } catch (error) {
    console.error("Google login error:", error.message);
    throw new Error(error.message); // Lempar error agar dapat ditangani
  }
};

// Ekspor Modul
export { auth, db, googleProvider, signInWithGoogle };

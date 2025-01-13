import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPZaU2M87uCJH-alUZCJ5iW0n3b6BfU3E",
    authDomain: "t-delete.firebaseapp.com",
    projectId: "t-delete",
    storageBucket: "t-delete.firebasestorage.app",
    messagingSenderId: "446655498719",
    appId: "1:446655498719:web:10665e8f45f1cb7cc2dc6a"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
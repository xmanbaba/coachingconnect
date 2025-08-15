import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBOAmgh6q9SjykFi9nLrpct6NIlFiaPHFo",
  authDomain: "coaching-connect-3d5af.firebaseapp.com",
  projectId: "coaching-connect-3d5af",
  storageBucket: "coaching-connect-3d5af.firebasestorage.app",
  messagingSenderId: "1070767870022",
  appId: "1:1070767870022:web:93d04c99dfd237b1d9ba47",
  measurementId: "G-W59RNQXF76"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
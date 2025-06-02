
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbN44l0Zb1iMy7jp4rWwETYuUYWnF4v8M",
  authDomain: "okiw7reyri.firebaseapp.com",
  projectId: "okiw7reyri",
  storageBucket: "okiw7reyri.firebasestorage.app",
  messagingSenderId: "11725363489",
  appId: "1:11725363489:web:3beac35a7284b42390c660"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

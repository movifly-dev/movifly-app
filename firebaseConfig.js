// import {...} from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyCxccqIojiaurqKoPwUUzEVqXMAxx9Faqw',
  authDomain: 'movifly-7a229.firebaseapp.com',
  projectId: 'movifly-7a229',
  storageBucket: 'movifly-7a229.appspot.com',
  messagingSenderId: '401416833203',
  appId: '1:401416833203:web:eefa98edc01c861c3348c6'
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIRESTORE_DB,
};

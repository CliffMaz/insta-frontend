import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = firebase.initializeApp( {
    apiKey: "AIzaSyD3wl26UaMoNcqgjP88EGPvDVakbGtZeJo",
    authDomain: "instagramclone-f219b.firebaseapp.com",
    projectId: "instagramclone-f219b",
    storageBucket: "instagramclone-f219b.appspot.com",
    messagingSenderId: "565834823334",
    appId: "1:565834823334:web:fc92926590582e0a4d6667",
    measurementId: "G-LKWXKEQC86"
  });

  const db = firebaseConfig.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};
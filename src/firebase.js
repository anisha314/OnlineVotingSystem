import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBuBsHhYAmsJlSE8tUHgJhATsn-eeiXB3g",
    authDomain: "online-voting-app-e2faf.firebaseapp.com",
    projectId: "online-voting-app-e2faf",
    storageBucket: "online-voting-app-e2faf.firebasestorage.app",
    messagingSenderId: "503506934614",
    appId: "1:503506934614:web:3d1ce9c9eef8fb37e154f7",
    measurementId: "G-1TJXNQT19J"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
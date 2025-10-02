// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyAY4xPP3d_42JVcB0gySpcR_muct9Cijus",
  authDomain: "matb2b-54a06.firebaseapp.com",
  projectId: "matb2b-54a06",
  storageBucket: "matb2b-54a06.firebasestorage.app",
  messagingSenderId: "463425467837",
  appId: "1:463425467837:web:53d8a0ac26a08723bf0ed4",
  measurementId: "G-K2TZ0QSBFJ",
});

const messaging = firebase.messaging();

// Opsiyonel: Arka planda gelen mesajları dinle
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Arka planda mesaj:', payload);
});

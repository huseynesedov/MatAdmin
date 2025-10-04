// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyBMpTtk-Zp0K_Zj0F-7AZb6NMXs66g-pMs",
  authDomain: "matt-6c92c.firebaseapp.com",
  projectId: "matt-6c92c",
  storageBucket: "matt-6c92c.firebasestorage.app",
  messagingSenderId: "37643677283",
  appId: "1:37643677283:web:0f3b40e218976717271256",
  measurementId: "G-L15LBMF6HW"
});

const messaging = firebase.messaging();

// Opsiyonel: Arka planda gelen mesajları dinle
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Arka planda mesaj:', payload);
});

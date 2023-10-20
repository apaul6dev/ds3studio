// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    projectId: 'modosmart-2506c',
    appId: '1:32762457249:web:cb74f2e2f2288b2550d4e0',
    storageBucket: 'modosmart-2506c.appspot.com',
    apiKey: 'AIzaSyBB5xCP7i0x4NOm1bA2Sk-qpQjeMl57sAc',
    authDomain: 'modosmart-2506c.firebaseapp.com',
    messagingSenderId: '32762457249',
    measurementId: 'G-YR6S22B07E',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

firebase.initializeApp({
    projectId: 'modosmart-2506c',
    appId: '1:32762457249:web:cb74f2e2f2288b2550d4e0',
    storageBucket: 'modosmart-2506c.appspot.com',
    apiKey: 'AIzaSyBB5xCP7i0x4NOm1bA2Sk-qpQjeMl57sAc',
    authDomain: 'modosmart-2506c.firebaseapp.com',
    messagingSenderId: '32762457249',
    measurementId: 'G-YR6S22B07E',
});

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
        self.registration.showNotification(title, { body, icon: image || null });
    });
}
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBB5xCP7i0x4NOm1bA2Sk-qpQjeMl57sAc",
    authDomain: "modosmart-2506c.firebaseapp.com",
    projectId: "modosmart-2506c",
    storageBucket: "modosmart-2506c.appspot.com",
    messagingSenderId: "32762457249",
    appId: "1:32762457249:web:adbbd4d85e7c79be50d4e0",
    measurementId: "G-EGP4W39SEZ"
});

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
        self.registration.showNotification(title, { body, icon: image || null });
    });
}
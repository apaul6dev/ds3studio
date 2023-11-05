importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js');

const initializeFirebase = async () => {
    try {
        await firebase.initializeApp({
            apiKey: "AIzaSyBB5xCP7i0x4NOm1bA2Sk-qpQjeMl57sAc",
            authDomain: "modosmart-2506c.firebaseapp.com",
            projectId: "modosmart-2506c",
            storageBucket: "modosmart-2506c.appspot.com",
            messagingSenderId: "32762457249",
            appId: "1:32762457249:web:cb74f2e2f2288b2550d4e0",
            measurementId: "G-YR6S22B07E"
        });
        const isSupported = firebase.messaging.isSupported();
        if (isSupported) {

            const messaging = firebase.messaging();
            messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
                console.log(title, body);
                self.registration.showNotification(title, { body, icon: image || null });
            });

        }
    } catch (error) {
        console.error('Error en la inicialización de Firebase:', error);
    }
};

initializeFirebase();
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js').then(function (reg) {
        console.log('reg: ', reg.scope);
    }).catch(function (err) {
        console.log('err: ', err);
    })
}

const initializeFirebase = async () => {
    try {
        await firebase.initializeApp({
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
            messaging.onBackgroundMessage(function (payload) {
                console.log(payload);
                return payload;
            });

        }
    } catch (error) {
        console.error('Error en la inicialización de Firebase:', error);
    }
};

initializeFirebase();
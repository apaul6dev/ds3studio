importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');
/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js').then(function (reg) {
        console.log('reg: ', reg.scope);
    }).catch(function (err) {
        console.log('err: ', err);
    })
} */

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBB5xCP7i0x4NOm1bA2Sk-qpQjeMl57sAc",
    authDomain: "modosmart-2506c.firebaseapp.com",
    projectId: "modosmart-2506c",
    storageBucket: "modosmart-2506c.appspot.com",
    messagingSenderId: "32762457249",
    appId: "1:32762457249:web:adbbd4d85e7c79be50d4e0",
    measurementId: "G-EGP4W39SEZ"
};

const NotificationEvent = {
    VEHICLE_IMPORTED: 'vehicle_imported',
};

initializeFirebase();

async function initializeFirebase() {
    try {
        await firebase.initializeApp(FIREBASE_CONFIG);
        const isSupported = firebase.messaging.isSupported();
        if (isSupported) {
            const messaging = firebase.messaging();
            messaging.onBackgroundMessage(handleBackgroundMessage);
        }
    } catch (error) {
        console.error('Error en la inicialización de Firebase:', error);
    }
}

function handleBackgroundMessage(payload) {
    console.log(payload);
    self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function (clients) {
        clients.forEach(function (client) {
            client.postMessage(payload);
        });
    });
}

self.addEventListener('push', event => {
    const promiseChain = isClientFocused().then((clientIsFocused) => {
        if (clientIsFocused) {
            console.log('No es necesario mostrar una notificación.');
            return;
        }
        const payload = event.data?.json() ?? {};
        const data = payload.data ? payload.data : { contenido: '{}' };
        const contenido = JSON.parse(data.contenido);
        let notificationTitle = '';
        let notificationOptions = {
            body: 'Mensaje recibido',
            icon: 'assets/iconos/logo.png',
        };
        if (contenido.type === 'msg') {
            notificationTitle = payload.notification.title ? payload.notification.title : 'No se ha recuperado la notificacion';
        } else {
            notificationTitle = contenido.titulo;
            notificationOptions.body = contenido.mensaje;
        }
        return self.registration.showNotification(notificationTitle, notificationOptions);
    });

    event.waitUntil(promiseChain);
});


self.addEventListener('notificationclick', function (event) {
    const url = 'https://d3studio.app/#/';
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(windowClients => {
        if (windowClients.length > 0) {
            const focusedClient = windowClients[0];
            focusedClient.postMessage({ type: 'refreshPage' });
            focusedClient.focus();
        } else {
            return clients.openWindow(url);
        }
    })
    );
});

function isClientFocused() {
    return clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then((windowClients) => {
        let clientIsFocused = false;
        for (let i = 0; i < windowClients.length; i++) {
            const windowClient = windowClients[i];
            //if (windowClient.focused) {
            if (windowClient.visibilityState === "visible") {
                clientIsFocused = true;
                break;
            }
        }
        return clientIsFocused;
    });
}

/*

self.addEventListener('push', event => {
    const promiseChain = isClientFocused().then((clientIsFocused) => {
        if (clientIsFocused) {
            console.log('No es necesario mostrar una notificación.');
            return;
        }
        //const messageFrom = event.data.json().data.event;
        const messageFrom = event.data?.json() ?? {};
        const promiseNotify = handleNotification(event, messageFrom);
        return promiseNotify;
    });

    event.waitUntil(promiseChain);
});



function handleNotification(event, messageFrom) {
    const options = {
        icon: 'assets/iconos/logo.png'
    };
    return registration.getNotifications()
        .then(notifications => {
            let currentNotification;
            for (let i = 0; i < notifications.length; i++) {

                if (notifications[i].data && notifications[i].data.messageFrom && notifications[i].data.messageFrom === messageFrom) {
                    currentNotification = notifications[i];
                }

            }
            return currentNotification;
        })
        .then((currentNotification) => {

            let notificationTitle;
            const bodyOptions = getBodyOptions(messageFrom);

            if (currentNotification) {
                const messageCount = currentNotification.data.newMessageCount + 1;
                options.body = bodyOptions.body;
                options.data = {
                    messageFrom: messageFrom,
                    newMessageCount: messageCount
                };
                notificationTitle = bodyOptions.notificationTitle;
                currentNotification.close();

            } else {
                options.body = bodyOptions.body;
                options.data = {
                    messageFrom: messageFrom,
                    newMessageCount: 1
                };
                notificationTitle = bodyOptions.notificationTitle;
            }

            return registration.showNotification(
                notificationTitle,
                options
            );
        });
}

function getBodyOptions(messageFrom) {
    let body = '';
    switch (messageFrom) {
        case NotificationEvent.VEHICLE_IMPORTED:
            body = 'Vehicle has finished importing.';
            break;
    }
    const rs = {
        body: body,
        notificationTitle: (messageFrom === NotificationEvent.VEHICLE_IMPORTED) ? 'New Images' : 'Catch'
    };
    return rs;
} */
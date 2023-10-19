import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    // message:any = null;
    currentMessage = new BehaviorSubject<any>({});

    constructor(private angularFireMessaging: AngularFireMessaging) {
        this.initMessaging();
    }

    private initMessaging() {
        this.requestPermission();
        this.listenForMessages();
    }

    private requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                console.log(token);
                // Guarda el token en tu servidor para enviar notificaciones.
            },
            (error) => {
                console.error('Error requesting permission:', error);
            }
        );
    }


    private listenForMessages() {
        this.angularFireMessaging.messages.subscribe((message) => {
            console.log('New message received:', message);
            this.currentMessage.next(message);
        });

    }
}

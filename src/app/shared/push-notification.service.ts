import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { MessagePayload } from './notification-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  
  private messagingFirebase: any; // Cambiar el tipo de la variable a "any"

  constructor() {
    const firebaseConfig = environment.firebase;
    const app = initializeApp(firebaseConfig);
    this.messagingFirebase = getMessaging(app);
  }

  requestPermission = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const permsis = await Notification.requestPermission();
        if (permsis === "granted") {
          const tokenFirebase = await getToken(this.messagingFirebase);
          resolve(tokenFirebase);
        } else {
          reject(new Error("No se otorgaron los permisos"));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  private messageSubject = new Subject<MessagePayload>();

  private subscribeToMessages() {
    onMessage(this.messagingFirebase, (payload:any) => {
      this.messageSubject.next(payload);
    });
  }

  receiveMessage(): Observable<MessagePayload> {
    if (!this.messageSubject.observers.length) {
      this.subscribeToMessages();
    }
    return this.messageSubject.asObservable();
  }
}

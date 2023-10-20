import { Injectable } from '@angular/core'
import { Chat } from './chat.model';
import { HOST } from 'src/app/shared/constants';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


let chats: any = [new Chat(
    'assets/img/avatars/avatar-9.png',
    'Comunidad',
    'Activo',
    'Bienvenido!! Este es el chat de la comunidad, envía tu mensaje!',
    new Date(),
    false
)
]

let talks: any = [

]

@Injectable()
export class ChatService {

    datosCambio = new Subject<any>(); 

    url = `${HOST}`;

    urlListaMensajes = `/mensajeria/mensajeschat/`;
    urlEnviarMensaje = `/mensajeria/enviarmensaje/`;

    constructor(private http: HttpClient) { }

    getMensajes(solicitud: any) {
        return this.http.post<any>(`${this.url}${this.urlListaMensajes}`, solicitud);
    }

    refrescarUltimosMensajes(solicitud: any) {
        return this.http.post<any>(`${this.url}${this.urlListaMensajes}`, solicitud);
    }

    sendMesg(newMsg: any) {
        return this.http.post<any>(`${this.url}${this.urlEnviarMensaje}`, newMsg);
    }


    public getChats(): Array<Chat> {
        return chats;
    }

    public getTalk(): Array<Chat> {
        return talks;
    }

}


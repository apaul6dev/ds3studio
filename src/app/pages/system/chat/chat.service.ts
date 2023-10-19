import { Injectable } from '@angular/core'
import { Chat } from './chat.model';
import { HOST } from 'src/app/shared/constants';
import { HttpClient } from '@angular/common/http';

let date = new Date(),
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    minute = date.getMinutes();

// let chats = [
//     new Chat(
//         'assets/img/profile/ashley.jpg',
//         'Ashley Ahlberg', 
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/bruno.jpg',
//         'Bruno Vespa',
//         'Do not disturb',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/julia.jpg',
//         'Julia Aniston',
//         'Away',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/adam.jpg',
//         'Adam Sandler',
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/tereza.jpg',
//         'Tereza Stiles',
//         'Offline',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),  
//     new Chat(
//         'assets/img/profile/michael.jpg',
//         'Michael Blair',
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     )
// ]

let chats = [
    new Chat(
        'assets/img/profile/ashley.jpg',
        'Comunidad',
        'Online',
        'Comunidad',
        new Date(year, month, day - 2, hour, minute),
        false
    )
]

let talks = [
    new Chat(
        'assets/img/profile/ashley.jpg',
        'Ashley Ahlberg',
        'Online',
        'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
        new Date(year, month, day - 2, hour, minute + 3),
        false
    ),
    new Chat(
        'assets/img/users/user.jpg',
        'Yo',
        'Online',
        'Hi, Gradus is a fully compatible with angular material 2, responsive, organized folder structure, clean & customizable code, easy to use and much more...',
        new Date(year, month, day - 2, hour, minute + 2),
        true
    )
]

@Injectable()
export class ChatService {

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


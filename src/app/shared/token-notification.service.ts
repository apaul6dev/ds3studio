import { Injectable } from "@angular/core";
import { HOST } from "./constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TokenNotificationsService {

    url = `${HOST}`;

    constructor(private http: HttpClient) { }

    sendTokenToServer(token:any){
        const solicitud: any = {};
        solicitud.query = new Date().getTime() + '';
        solicitud.device = token;
        solicitud.uuid = 'UP';
        return this.http.post<any>(`${this.url}/app/dragonfire/`, solicitud);
    }

}
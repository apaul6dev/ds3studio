import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HOST } from "src/app/shared/constants";

@Injectable({
    providedIn: 'root'
})
export class InicioService {
    
    datosCambio = new Subject<any>(); 

    url = `${HOST}`;

    constructor(private http: HttpClient) { }

    getConfiguracion() {
        return this.http.post<any>(`${this.url}/userapp/getConfigApp/`, null);
    }

    recuperarEstadoAlarmaComunitaria() {
        return this.http.post<any>(`${this.url}/controlDispositivos/recuperarEstadoAlarmaComunitaria/`, null);
    }

    smartboxactionalarma(params: any) {
        return this.http.post<any>(`${this.url}/controlDispositivos/smartboxactionalarma/`, params);
    }

}
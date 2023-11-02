import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HOST } from "src/app/shared/constants";

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {

    datosCambio = new Subject<any>(); 

    url = `${HOST}`;

    constructor(private http: HttpClient) {}

    obtenerDatos(params: any) {
        return this.http.post<any>(`${this.url}/controlDispositivos/listarEventos/`, params);
    }

}
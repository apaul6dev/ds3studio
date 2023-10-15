import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/app/shared/constants";

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {
    url = `${HOST}`;

    constructor(private http: HttpClient) { }


    /**
     *Metodo utilizado para obtener datos del servidor independientemente de su categoria
     *Utilizamos el # de pagina para obtener rangos de resultados
     */
    obtenerDatos(params:any) {
        return this.http.post<any>(`${this.url}/controlDispositivos/listarEventos/`, params);
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/app/shared/constants";

@Injectable({
    providedIn: 'root'
})
export class ComunidadService {
    url = `${HOST}/comunidad`;

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.post<any[]>(`${this.url}/listarVecinos/`, null);
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/app/shared/constants";

@Injectable({
    providedIn: 'root'
})
export class DispositivosService {
    url = `${HOST}/controlDispositivos`;

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.post<any>(`${this.url}/listarDispositivosUsuario/`, null);
    }

    smartboxaction(params: any) {
        return this.http.post<any>(`${this.url}/smartboxaction/`, params);
    }

}
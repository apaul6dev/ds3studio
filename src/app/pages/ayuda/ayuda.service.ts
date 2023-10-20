import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/app/shared/constants";

@Injectable({
    providedIn: 'root'
})
export class AyudaService {

    url = `${HOST}`;

    constructor(private http: HttpClient) { }

    recuperarInfoAyuda() {
        return this.http.post<any>(`${this.url}/userapp/recuperarInfoAyuda/`, null);
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/app/shared/constants";

@Injectable({
    providedIn: 'root'
})
export class RecordarPassService {
    url = `${HOST}`;

    constructor(private http: HttpClient) { }


    recordarPass(params:any) {
        return this.http.post<any>(`${this.url}/userapp/recuperarpass/`, params);
    }

}
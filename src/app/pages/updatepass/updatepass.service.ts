import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/app/shared/constants";
import { UpdatePassComponent } from './updatepass.component';

@Injectable({
    providedIn: 'root'
})
export class UpdatePassService {
    url = `${HOST}`;

    constructor(private http: HttpClient) { }


    actualizarpass(params:any) {
        return this.http.post<any>(`${this.url}/userapp/actualizarpass/`, params);
    }

}
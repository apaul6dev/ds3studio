import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatUpdateService {

    datosCambio = new Subject<any>();

    constructor() { }

}
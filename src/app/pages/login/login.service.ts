import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
//import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'
//import { Observable } from "rxjs";
import { HOST, TOKEN_NAME } from "src/app/shared/constants";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    datosCambio = new Subject<any>();

    url = `${HOST}/logincontroller`;

    constructor(
        //private auth: Auth
        private http: HttpClient) { }
    /*
    register({ email, password }: any) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }
    
    login({ email, password }: any) {
        return signInWithEmailAndPassword(this.auth, email, password);
    } */

    login(params:any) {
       
        const paramsSender = {
            email: params.email,
            password: params.password,
            firetoken: params.messaging,
        }

        //console.log('Haciendo login: ', paramsSender);

        return this.http.post<any>(`${this.url}/loginApp/`, paramsSender);
    }

    /*
    logout() {
        return signOut(this.auth);
    } */

    logout() {
        return this.http.post<any>(`${this.url}/logout/`, null);
    }

    isLoggedIn() {
        return localStorage.getItem(TOKEN_NAME) != null;
    }

    getToken() {
        return localStorage.getItem(TOKEN_NAME);
    }

}
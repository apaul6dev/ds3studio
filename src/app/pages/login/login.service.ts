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

    login({ firetoken , email, password }: any) {
  const token = 'dSDOn0H5uWlCdDDVJ3oTBB:APA91bEKv7e2hMHQzhhww-vm2LRT2F8BUrTSkfmpkFJzDnzXxORiJKqRREj7doup4KHTWS3QyAw7-WWsSHE5fppQrEPrtfDdvnGQQCWf_ORzZwpeM6sZcM2oKZOcenMI1a6WclkkOVlS';
    
        console.log('Haciendo, login: ', token, email, password);
        
        return this.http.post<any>(`${this.url}/loginApp/`, {
            email: email,
            password: password,
            firetoken: token,
        });
    }

    /*
    logout() {
        return signOut(this.auth);
    } */

    logout() {
        return this.http.post<any>(`${this.url}/logout/`, null);
    }

    isLoggedIn() {
        return sessionStorage.getItem(TOKEN_NAME) != null;
    }

    getToken() {
        return sessionStorage.getItem(TOKEN_NAME);
    }

}
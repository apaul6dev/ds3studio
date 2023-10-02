import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'
import { TOKEN_NAME } from "src/app/shared/constants";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private auth: Auth) { }

    register({ email, password }: any) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login({ email, password }: any) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logout() {
        return signOut(this.auth);
    }

    isLoggedIn() {
        return sessionStorage.getItem(TOKEN_NAME) != null;
    }

    getToken(){
        return sessionStorage.getItem(TOKEN_NAME);
    }

}
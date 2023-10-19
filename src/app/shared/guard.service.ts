import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, } from '@angular/router';
import { LoginService } from '../pages/login/login.service';

@Injectable({
    providedIn: 'root'
})
export class GuardService {

    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const rpta = this.loginService.isLoggedIn();

        if (rpta) {
            return true;
        } else {
            this.loginService.logout().subscribe(rs => {
                console.log("logout system: ", rs);
                sessionStorage.clear();
                this.router.navigate(['/login']);
            });
            return false;
        }
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(GuardService).canActivate(next, state);
}


import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService
            .isConnected$()
            .pipe(
                first(),
                map((connectedValue: boolean) => {
                    let result = true;
                    if (connectedValue === true) {
                        result = true;
                    } else if (route.url.join('/') !== '/auth/sign-in') {
                        result = false;
                        this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
                    }
                    return result;
                })
            );
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }
}

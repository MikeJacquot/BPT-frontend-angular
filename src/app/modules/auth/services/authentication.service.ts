import { LoginSuccessResponse } from '../responses/login-success.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { Observable, ReplaySubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { LoginData } from '../entities/login-data.entity';
import { User } from '../entities/user.entity';
import { JwtUser } from '../entities/jwt-user.entity';
import { SessionErrorsManager } from '../../errors-management/services/session-errors-manager.service';


@Injectable()
export class AuthenticationService {

    private currentUserSubject: ReplaySubject<User>;

    constructor(
        private http: HttpClient,
        private router: Router,
        private readonly sessionErrorsManager: SessionErrorsManager
    ) {
        this.currentUserSubject = new ReplaySubject<User>(1);
        this.currentUserSubject.next(this.getCurrentUserFromLocalStorage());
    }

    getCurrentUserFromLocalStorage(): User {
        const user: User = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.expirationDate) {
            user.expirationDate = new Date(user.expirationDate);
        }
        return user;
    }

    /**
     * Get the current user.
     * If the user token is expired, then the application display an error message, clear localStorage and redirect to the 'sign-in' page.
     */
    get currentUser$(): Observable<User> {
        return this.currentUserSubject
            .pipe(
                tap(user => {
                    if (user && user.expirationDate <= new Date()) {
                        this.sessionErrorsManager.add({
                            msg: 'Token expired, please reconnect'
                        });
                        this.currentUserSubject.next(null);
                        localStorage.removeItem('currentUser');
                        this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: window.location.pathname } });
                        throw new Error('user token has expired');
                    }
                })
            );
    }

    loginSuccess(result: {accessToken: string, tokenType: string}): User {
        const token = `${result.tokenType} ${result.accessToken}`;
        const jwtUser: JwtUser = jwt_decode(result.accessToken);
        const user: User = {
            email: jwtUser.email,
            token,
            expirationDate: new Date(jwtUser.exp * 1000) // Date have epoch constructor in milliseconds, and jwt.exp is in seconds
        };
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('currentUserEmail', user.email);
        return user;
    }

    signIn$(loginData: LoginData): Observable<User> {
        const url = `/api/auth/sign-in`;
        return this.http
            .post<LoginSuccessResponse>(url, loginData)
            .pipe(
                take(1),
                map((result) => this.loginSuccess(result))
            ) ;
    }

    async signOut(): Promise<void> {
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        await this.router.navigate(['/auth/sign-in']);
    }

    /**
     * Check if the user is connected and if he has an unexpired token.
     * If the token is expired, the localstorage is cleared.
     */
    isConnected$(): Observable<boolean> {
        return this.currentUserSubject
            .pipe(
                map((user: User) => {
                    if (
                        user !== null
                        && user.token
                        && user.token !== ''
                    ) {
                        if (user.expirationDate > new Date()) {
                            return true;
                        } else {
                            this.currentUserSubject.next(null);
                            localStorage.removeItem('currentUser');
                            return false;
                        }
                    }
                    return false;
                })
            );
    }

    changeUserPassword(oldPassword: string, newPassword: string): Observable<void> {
        const url = `/api/auth/update-password`;
        return this.http
            .put<void>(url, {
                oldPassword,
                newPassword
            });
    }
}

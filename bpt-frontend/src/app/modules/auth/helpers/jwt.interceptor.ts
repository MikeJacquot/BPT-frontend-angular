import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { map, mergeMap } from 'rxjs/operators';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(originalRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authenticationService.currentUser$
            .pipe(
                map((user: User) => {
                    let request = originalRequest;
                    if (user && 'token' in user && user.token) {
                        request = request.clone({
                            setHeaders: {
                                Authorization: `${user.token}`
                            }
                        });
                    }
                    return request;
                }),
                mergeMap((request: HttpRequest<any>) => next.handle(request))
            );
    }
}

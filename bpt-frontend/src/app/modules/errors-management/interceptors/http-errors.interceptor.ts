import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { SessionErrorsManager } from '../services/session-errors-manager.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor(
        private readonly sessionErrorsManager: SessionErrorsManager,
        private readonly router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(
                tap ({
                    error: (error) => {
                        if (error instanceof HttpErrorResponse && error.status >= 400) {
                            let errorMessage: string;
                            if (error.status === 404) {
                                errorMessage = error.error.error;
                            } else {
                                if (error.error.message != null && Array.isArray(error.error.message)) {
                                    errorMessage = error.error.message.join(',');
                                } else {
                                    errorMessage = error.error.message;
                                }
                            }
                            this.sessionErrorsManager.add({
                                msg: 'Une erreur est survenue, merci de contacter votre administrateur.',
                                additionalInformations: {
                                    status: `${error.status} - ${error.statusText}`,
                                    url: `${request.method} - ${request.urlWithParams}`,
                                    date: new Date().toISOString(),
                                    errorMessage,
                                    route: this.router.url
                                }
                            });
                        }
                    }
                })
            );
    }
}

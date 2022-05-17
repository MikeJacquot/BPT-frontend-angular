import { Injectable } from '@angular/core';

import { Error } from '../entities/error.entity';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SessionErrorsManager {
    errors$ = new Subject<Error>();

    get$(): Observable<Error> {
        return this.errors$.asObservable();
    }

    add(error: Error): void {
        this.errors$.next(error);
    }

}

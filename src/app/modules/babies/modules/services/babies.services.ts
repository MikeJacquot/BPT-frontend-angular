import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Baby } from '../entities/baby.entity';


@Injectable()
export class BabiesService {

    constructor(
        private readonly http: HttpClient,
    ) {}

    createOne$(familyId: string, baby: Baby): Observable<Baby> {
        const path = `api/babies/${familyId}/create`
        return this.http.post<Baby>(path, baby);
    }

    listAllByFamily$(familyId: string): Observable<Baby[]> {
        const path = `api/babies/${familyId}/list`;
        return this.http.get<Baby[]>(path);
    }

    deleteOne$(id: string): Observable<Baby> {
        const path = `api/babies/${id}`;
        return this.http.delete<Baby>(path);
    }

    updateOne$(id: string, baby: Baby): Observable<Baby> {
        const path = `api/babies/${id}`;
        return this.http.patch<Baby>(path, baby);
    }

    getOne$(id: string): Observable<Baby> {
        const path = `api/babies/${id}`;
        return this.http.get<Baby>(path);
    }
}

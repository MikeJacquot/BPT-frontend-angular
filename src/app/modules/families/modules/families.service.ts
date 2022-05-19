import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Family } from './entities/family.entity';

@Injectable({
  providedIn: 'root'
})
export class FamiliesService {

  constructor(
    private readonly http: HttpClient,
) {}

listAll$(): Observable<Family[]> {
    const path = 'api/families/list';
    return this.http.get<Family[]>(path);
}

deleteOne$(id: string): Observable<Family> {
    const path = `api/families/${id}`;
    return this.http.delete<Family>(path);
}

updateOne$(id: string, family: Family): Observable<Family> {
    const path = `api/families/${id}`;
    return this.http.patch<Family>(path, family);
}

getOne$(id: string): Observable<Family> {
    const path = `api/families/${id}`;
    return this.http.get<Family>(path);
}

uploadFile$(file: Array<File>): Observable<Array<File>>{
    const path = `api/families/upload`;
    console.log(file);
    return this.http.post<Array<File>>(path, file);
}
}

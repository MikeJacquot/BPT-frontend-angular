import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FamilyCreateDTO } from './dto/family-create.dto';
import { Family } from './entities/family.entity';

@Injectable({
  providedIn: 'root'
})
export class FamiliesService {

  constructor(
    private readonly http: HttpClient,
) {}

create$(dto: FamilyCreateDTO): Observable<Family> {
    const path = 'api/families';
    return this.http.post<Family>(path, dto);
}

listAllByUser$(id: string): Observable<Family[]> {
    const path = `api/families/list/${id}`;
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

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateBiometricDTO } from './dto/create-biometric.dto';
import { Biometric } from './entities/biometric.entity';

@Injectable({
  providedIn: 'root'
})
export class BiometricsService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  create$(babyId: string, dto: CreateBiometricDTO): Observable<Biometric> {
    const path = `api/biometrics/${babyId}`;
    return this.http.post<Biometric>(path, dto);
  }

  listAllByBaby$(id: string): Observable<Biometric[]> {
    const path = `api/biometrics/${id}/list`;
    return this.http.get<Biometric[]>(path);
  }

  deleteOne$(id: string): Observable<Biometric> {
    const path = `api/biometrics/${id}`;
    return this.http.delete<Biometric>(path);
  }

  updateOne$(id: string, family: CreateBiometricDTO): Observable<Biometric> {
    const path = `api/biometrics/${id}`;
    return this.http.patch<Biometric>(path, family);
  }

  getOne$(id: string): Observable<Biometric> {
    const path = `api/biometrics/${id}`;
    return this.http.get<Biometric>(path);
  }
}

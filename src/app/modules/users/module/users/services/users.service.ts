import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserListItem } from '../entities/user.list-item.entity';



@Injectable()
export class UsersService {

    constructor(
        private readonly http: HttpClient,
    ) {

    }

    listAll$(): Observable<UserListItem[]> {
        const path = 'api/users/list';
        return this.http.get<UserListItem[]>(path);
    }

    createOne$(createUserDTO: CreateUserDTO): Observable<User> {
        const path = 'api/users';
        return this.http.put<User>(path, createUserDTO);
    }

    deleteOne$(id: string): Observable<void> {
      const path = `api/users/${id}`;
      return this.http.delete<void>(path);
    }

    getOneById$(id: string): Observable<User> {
      const path = `api/users/search/by-Id/${id}`;
      return this.http.get<User>(path);
    }

    updateOne$(id: string , user: CreateUserDTO): Observable<CreateUserDTO> {
      const path = `api/users/${id}`;
      return this.http.patch<CreateUserDTO>(path, user);
    }
}

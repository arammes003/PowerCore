// ANGULAR
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

//
import { environment } from '@enviroments/environment';
import type { UsersResponse } from '../interfaces/user.interfaces';
import { UserMapper } from '../mapper/user.mapper';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  users = signal<User[]>([]);
  usersLoading = signal(true);

  constructor() {
    this.loadUsers();
  }

  token = localStorage.getItem('token');

  loadUsers() {
    this.http
      .get<UsersResponse>(`${environment.apiUrl}/auth/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((res) => {
        const users = UserMapper.mapUserItemsToUserArray(res.users);
        this.users.set(users);
        this.usersLoading.set(false);
        console.log({ users });
      });
  }
}

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

  loadUsers() {
    this.http
      .get<UsersResponse>(`${environment.apiUrl}/auth/`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTY5M2ZiYTkzNDczMDA4NjExM2NkZiIsImlhdCI6MTc1MDUyOTI0MiwiZXhwIjoxNzUwNTM2NDQyfQ.JqFVs4Uqry2rhcrgF0iWL2IVLPiE0G7_zbz4DlH8_gI',
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

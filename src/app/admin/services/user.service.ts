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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTY3NTcwYmU1N2ZlODE3M2UzZGQ0YyIsImlhdCI6MTc1MDQ5ODM2MywiZXhwIjoxNzUwNTA1NTYzfQ.WcTMywXUihRDSRffD55mPF5tlFZC5CU90nzsltu1cis',
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

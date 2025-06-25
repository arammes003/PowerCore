// ANGULAR
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

//
import { environment } from '@enviroments/environment';
import type { UserItem, UsersResponse } from '../interfaces/user.interfaces';
import { UserMapper } from '../mapper/user.mapper';
import { User } from '../interfaces/user.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, map, Observable, of, tap } from 'rxjs';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  users = signal<User[]>([]);
  usersLoading = signal(true);

  // Signal para la query de búsqueda
  searchQuery = signal('');

  constructor() {
    this.loadUsers();
  }

  private token = localStorage.getItem('token');

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

  // Signal computada para filtrado de usuarios
  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.users();
    return this.users().filter((user) => {
      const fullName = `${user.name} ${user.last_name ?? ''}`.toLowerCase();
      return (
        fullName.includes(query) || user.email.toLowerCase().includes(query)
      );
    });
  });

  // Método que actualiza la query del filtro
  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  // CREACION USER
  createUser(
    email: string,
    birth_date: string,
    name: string,
    lastName: string,
    phone: string,
    dni: string,
    role: string[],
    gender: string
  ): Observable<boolean | string> {
    return this.http
      .post<UserItem>(
        `${baseUrl}/users/create-user`,
        {
          email: email,
          birth_date: birth_date,
          name: name,
          lastName: lastName,
          phone: phone,
          dni: dni,
          role: role,
          gender: gender,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .pipe(
        tap((res) => {
          console.log('hola');
        }),
        map(() => true),
        catchError((error: any) => {
          return this.handleAuthError(error);
        })
      );
  }

  private handleAuthError(error: any) {
    const errorMessage = error?.error;
    if (errorMessage) {
      return of(errorMessage.error);
    }
    return of(errorMessage);
  }
}

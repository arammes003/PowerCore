import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@enviroments/environment';
import { User } from 'src/app/admin/interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private http = inject(HttpClient);

  constructor() {}

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());

  token = computed(this._token);

  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((res) => {
          this._user.set(res.user);
          this._authStatus.set('authenticated');
          this._token.set(res.token);

          localStorage.setItem('token', res.token);
        })
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@enviroments/environment';
import { User } from 'src/app/admin/interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

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

  // checkAuthStatusResource = rxResource({
  //   loader: () => this.checkAuthStatus(),
  // });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  token = computed(this._token);
  isAdmin = computed(() => this._user()?.role.includes('ADMIN_PTS') ?? false);

  loginUser(email: string, password: string): Observable<boolean | string> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((res) => {
          this.handleAuthSuccess(res);
        }),
        map(() => true),
        catchError((error: any) => {
          return this.handleAuthError(error);
        })
      );
  }

  registerUser(
    name: string,
    email: string,
    password: string
  ): Observable<boolean | string> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/register`, {
        name: name,
        email: email,
        password: password,
      })
      .pipe(
        tap((res) => {
          this.handleAuthSuccess(res);
        }),
        map(() => true),
        catchError((error: any) => {
          return this.handleAuthError(error);
        })
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http
      .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((res) => {
          this.handleAuthSuccess(res);
        }),
        map(() => true),
        catchError((error: any) => {
          return this.handleAuthError(error);
        })
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('non-authenticated');

    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);
  }

  private handleAuthError(error: any) {
    this.logout();

    const errorMessage = error?.error;
    if (errorMessage) {
      return of(errorMessage.error);
    }
    return of(errorMessage);
  }
}

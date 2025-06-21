import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  constructor() {}

  loginUser() {
    this.http.post(`${environment.apiUrl}/auth/login`, {
      body: {},
    });
  }
}

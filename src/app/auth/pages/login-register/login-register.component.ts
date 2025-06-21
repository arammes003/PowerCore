import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  imports: [],
  templateUrl: './login-register.component.html',
})
export default class LoginRegisterComponent {
  isLogin = true;

  // Login states
  Mail = '';
  Password = '';
  ErrorLogin = '';

  // Register states
  MailRegister = '';
  PasswordRegister = '';
  ConfirmPasswordReg = '';
  FullName = '';
  DNI = '';
  avatar: File | null = null;
  ErrorRegister = '';

  constructor(private router: Router) {}

  handleLogin() {
    // Tu lógica de login
  }

  handleRegister() {
    // Tu lógica de registro
  }

  setAvatar(file: File) {
    this.avatar = file;
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  formBuilder = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  errorMessage: string | null = null;

  onSubmit() {
    const {
      email = '',
      password = '',
      rememberMe = false,
    } = this.loginForm.value;

    this.authService
      .loginUser(email!, password!, rememberMe!)
      .subscribe((res) => {
        console.log(res);

        if (res === true) {
          this.router.navigateByUrl('/dashboard');
          return;
        }

        if (typeof res === 'string') {
          this.errorMessage = res;
        }

        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
          this.errorMessage = null;
        }, 2000);
      });
  }
}

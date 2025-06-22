import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  formBuilder = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit() {
    const {
      name = '',
      email = '',
      password = '',
      confirmPassword = '',
    } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = "Passwords don't match";
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
        this.errorMessage = null;
      }, 2000);
      return;
    }

    this.authService.registerUser(name!, email!, password!).subscribe((res) => {
      console.log(res);

      if (res === true) {
        this.router.navigateByUrl('/auth/login');
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

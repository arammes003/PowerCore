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
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    name: ['', [Validators.required]],
    last_name: [''],
    password: ['', [Validators.required]],
    confirmPassword: ['', Validators.required],
    birth_date: ['', Validators.required],
    phone: ['', Validators.required],
    dni: ['', Validators.required],
  });

  errorMessage: string | null = null;
  avatar: File | null = null;

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.avatar = input.files[0];
    }
  }

  onSubmit() {
    const {
      email = '',
      gender = '',
      name = '',
      last_name = '',
      password = '',
      confirmPassword = '',
      birth_date = '',
      phone = '',
      dni = '',
    } = this.registerForm.value;

    const avatar = this.avatar;
    console.log(avatar);

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
        this.errorMessage = null;
      }, 2000);
      return;
    }

    this.authService
      .registerUser(
        email!,
        name!,
        last_name!,
        password!,
        phone!,
        gender!,
        birth_date!,
        dni!,
        avatar!
      )
      .subscribe((res) => {
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

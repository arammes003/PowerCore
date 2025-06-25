import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { RoleService } from '../../services/role.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'admin-create-user-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user-modal.component.html',
})
export class CreateUserModelComponent {
  constructor(public roleService: RoleService) {}

  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  // CREACION USUARIO
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  hasError = signal(false);
  showSuccess = signal(false);

  createUserForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required]],
    role: this.formBuilder.array([], [Validators.minLength(1)]), // El array y la validación
  });

  errorMessage: string | null = null;

  onRoleSelected(e: any, roleKey: string) {
    const roles: FormArray = this.createUserForm.get('role') as FormArray;
    if (e.target.checked) {
      roles.push(new FormControl(roleKey));
    } else {
      const i = roles.controls.findIndex((x) => x.value === roleKey);
      if (i !== -1) {
        roles.removeAt(i);
      }
    }
  }

  createUser() {
    const {
      name = '',
      email = '',
      role = [],
      lastName = '',
    } = this.createUserForm.value;

    const roleArray = role as string[];

    this.userService
      .createUser(name!, email!, roleArray!, lastName!)
      .subscribe((res) => {
        if (res === true) {
          this.showSuccess.set(true);
          this.userService.loadUsers();
          setTimeout(() => {
            this.close();
          }, 3000);
        }

        if (typeof res === 'string') {
          this.errorMessage = res;
        }

        this.hasError.set(true);

        this.createUserForm.valueChanges.subscribe(() => {
          if (this.hasError()) {
            this.hasError.set(false);
            this.errorMessage = null;
          }
        });
      });
  }
}

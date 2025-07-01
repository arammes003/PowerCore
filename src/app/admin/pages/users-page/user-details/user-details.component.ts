import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import { User } from 'src/app/admin/interfaces/user.interface';
import { RoleService } from 'src/app/admin/services/role.service';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'modal-user-details',
  imports: [DatePipe],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  roleService = inject(RoleService);
  userService = inject(UserService);

  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  user = input.required<User>();
  showSuccess = signal(false);

  delete(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario permanentemente. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton:
          '!bg-secondary-500 !hover:bg-secondary-600 !text-text !px-4 !py-2 !rounded',
        cancelButton:
          '!bg-error-500 !hover:bg-error-300 !text-text !px-4 !py-2 !rounded',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe((res) => {
          if (res === true) {
            this.userService.loadUsers();
            this.showSuccess.set(true);
            setTimeout(() => {
              this.close();
            }, 3000);
          }
        });
      }
    });
  }
}

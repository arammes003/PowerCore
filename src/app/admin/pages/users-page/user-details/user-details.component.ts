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

@Component({
  selector: 'modal-user-details',
  imports: [DatePipe],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  roleService = inject(RoleService);

  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  user = input.required<User>();
}

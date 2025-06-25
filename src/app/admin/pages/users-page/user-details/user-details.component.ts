import {
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import { User } from 'src/app/admin/interfaces/user.interface';

@Component({
  selector: 'modal-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  user = input.required<User>();
}

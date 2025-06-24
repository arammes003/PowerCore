import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'admin-create-user-modal',
  imports: [],
  templateUrl: './create-user-modal.component.html',
})
export class CreateUserModelComponent {
  constructor(public roleService: RoleService) {}

  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}

import { Component, input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { DatePipe } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { RouterLink } from '@angular/router';
import { UserDetailsComponent } from '../../pages/users-page/user-details/user-details.component';

@Component({
  selector: 'admin-user-table',
  imports: [DatePipe, UserDetailsComponent],
  templateUrl: './user-table.component.html',
})
export class UserListComponent {
  users = input.required<User[]>();

  constructor(public roleService: RoleService) {}

  showModal = false;
  selectedUser: User | null = null;

  openUserModal(user: User) {
    this.selectedUser = user;
    this.showModal = true;
  }
}

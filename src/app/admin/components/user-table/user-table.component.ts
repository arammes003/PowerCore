import { Component, input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { DatePipe } from '@angular/common';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'admin-user-table',
  imports: [DatePipe],
  templateUrl: './user-table.component.html',
})
export class UserListComponent {
  users = input.required<User[]>();

  constructor(public roleService: RoleService) {}
}

import { Component, input } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'admin-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users = input.required<User[]>();
}

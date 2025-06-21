import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserListComponent } from '../../components/user-table/user-table.component';

@Component({
  selector: 'admin-users-page',
  imports: [UserListComponent],
  templateUrl: './users-page.component.html',
})
export default class UsersPageComponent {
  userService = inject(UserService);
}

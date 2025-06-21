import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserListHeaderComponent } from "../../components/user-list/user-list-header/user-list-header.component";
import { UserListComponent } from "../../components/user-list/user-list.component";

@Component({
  selector: 'admin-users-page',
  imports: [UserListHeaderComponent, UserListComponent],
  templateUrl: './users-page.component.html',
})
export default class UsersPageComponent {
  userService = inject(UserService);
}

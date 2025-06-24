import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserListComponent } from '../../components/user-table/user-table.component';
import { RoleService } from '../../services/role.service';
import { CreateUserModelComponent } from "../../components/create-user-modal/create-user-modal.component";

@Component({
  selector: 'admin-users-page',
  imports: [UserListComponent, CreateUserModelComponent],
  templateUrl: './users-page.component.html',
})
export default class UsersPageComponent {
  userService = inject(UserService);

  showModal = false;
}

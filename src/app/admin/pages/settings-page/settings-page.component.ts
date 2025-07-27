import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'admin-settings-page',
  imports: [],
  templateUrl: './settings-page.component.html',
})
export default class SettingsPageComponent {
  user = inject(UserService);
}

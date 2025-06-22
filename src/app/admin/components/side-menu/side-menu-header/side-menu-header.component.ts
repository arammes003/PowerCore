import { Component, inject } from '@angular/core';
import { environment } from '@enviroments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'admin-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent {
  envs = environment;

  authService = inject(AuthService);
}

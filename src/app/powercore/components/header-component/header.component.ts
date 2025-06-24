import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@enviroments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuOptions } from '../../interfaces/menu-options';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponentComponent {
  envs = environment;
  authService = inject(AuthService);

  menu: MenuOptions[] = [];

  constructor(private menuService: MenuService) {}

  get menuOptions(): MenuOptions[] {
    return this.menuService.menuOptions;
  }
}

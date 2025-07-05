import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuService } from 'src/app/club/services/menu.service';
import { MenuOption } from 'src/app/shared/interfaces/MenuOption';

@Component({
  selector: 'club-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  menu: MenuOption[] = [];

  constructor(private menuService: MenuService) {}

  get menuOptions(): MenuOption[] {
    return this.menuService.menuOptions;
  }

  authService = inject(AuthService);
}

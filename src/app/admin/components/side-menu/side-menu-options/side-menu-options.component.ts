import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuOption } from 'src/app/admin/interfaces/MenuOption';
import { MenuService } from 'src/app/admin/services/menu.service';

@Component({
  selector: 'admin-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  menu: MenuOption[] = [];

  constructor(private menuService: MenuService) {}

  get menuOptions(): MenuOption[] {
    return this.menuService.menuOptions;
  }
}

import { Component } from '@angular/core';
import { MenuOption } from '../../interfaces/MenuOption';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-title-page',
  imports: [],
  templateUrl: './title-page.component.html',
})
export class TitlePageComponent {
  pages: MenuOption[] = [];

  constructor(private menuService: MenuService, private router: Router) {}

  get menuOptions(): MenuOption[] {
    return this.menuService.menuOptions;
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.router.events.subscribe(() => this.setBreadcrumbs());
  }

  setBreadcrumbs() {
    const url = this.router.url;
    this.pages = this.menuOptions.filter((opt) => url.startsWith(opt.route));
  }
}

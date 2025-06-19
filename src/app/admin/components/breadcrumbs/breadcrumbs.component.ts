import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuOption } from '../../interfaces/MenuOption';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent {
  breadcrumbs: MenuOption[] = [];

  constructor(private router: Router, private menuService: MenuService) {}

  get menuOptions(): MenuOption[] {
    return this.menuService.menuOptions;
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.router.events.subscribe(() => this.setBreadcrumbs());
  }

  setBreadcrumbs() {
    const url = this.router.url;
    this.breadcrumbs = this.menuOptions.filter((opt) =>
      url.startsWith(opt.route)
    );
  }
}

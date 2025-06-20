import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { MenuService } from '../../services/menu.service';
import { TitlePageComponent } from "../../components/title-page/title-page.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SideMenuComponent, BreadcrumbsComponent, TitlePageComponent],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent {
  constructor(private menuService: MenuService) {}

  get menuOptions() {
    return this.menuService.menuOptions;
  }
}

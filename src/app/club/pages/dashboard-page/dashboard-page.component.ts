import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'club-dashboard-page',
  imports: [
    BreadcrumbsComponent,
    SideMenuComponent,
    TitlePageComponent,
    RouterOutlet,
  ],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent {}

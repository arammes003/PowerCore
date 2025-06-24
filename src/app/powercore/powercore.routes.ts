import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import HomePageComponent from './pages/home-page/home-page.component';
import { AthletesPageComponent } from './pages/athletes-page/athletes-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'atletas',
        component: AthletesPageComponent,
      },
    ],
  },
];

export default authRoutes;

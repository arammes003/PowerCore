import { Routes } from '@angular/router';

export const routes: Routes = [
  // Panel de administrador
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./admin/pages/dashboard-page/dashboard-page.component'),
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./admin/pages/home-page/home-page.component'),
      },

      {
        path: 'atletas',
        loadComponent: () =>
          import('./admin/pages/athletes-page/athletes-page.component'),
      },
      {
        path: 'clubes',
        loadComponent: () =>
          import('./admin/pages/clubs-page/clubs-page.component'),
      },

      {
        path: 'competiciones',
        loadComponent: () =>
          import('./admin/pages/competitions-page/competitions-page.component'),
      },

      {
        path: '**',
        redirectTo: 'inicio',
      },
    ],
  },

  // Redireccion
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

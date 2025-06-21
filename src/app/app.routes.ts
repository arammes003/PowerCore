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
        path: 'usuarios',
        loadComponent: () =>
          import('./admin/pages/users-page/users-page.component'),
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
        path: 'entrenadores',
        loadComponent: () =>
          import('./admin/pages/coaches-page/coaches-page.component'),
      },

      {
        path: 'ajustes',
        loadComponent: () =>
          import('./admin/pages/settings-page/settings-page.component'),
      },

      {
        path: '**',
        redirectTo: 'inicio',
      },
    ],
  },

  // Redireccion

  // {
  //   path: 'auth',
  //   children: [
  //     {
  //       path: 'login',
  //       loadComponent: () =>
  //         import('./auth/pages/login-register/login-page.component'),
  //     },
  //   ],
  // },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { IsAdminGuard } from './auth/guards/is-admin.guard';
import { IsClubGuard } from './auth/guards/is-club.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./powercore/powercore.routes'),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [NotAuthenticatedGuard],
  },

  // Panel de administrador
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./admin/pages/dashboard-page/dashboard-page.component'),
    canMatch: [AuthenticatedGuard, IsAdminGuard],
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

  // Panel de clubes
  {
    path: 'dashboard/club',
    loadComponent: () =>
      import('./club/pages/dashboard-page/dashboard-page.component'),
    canMatch: [AuthenticatedGuard, IsClubGuard],
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./club/pages/home-page/home-page.component'),
      },

      {
        path: 'atletas',
        loadComponent: () =>
          import('./admin/pages/athletes-page/athletes-page.component'),
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

  {
    path: '**',
    redirectTo: '',
  },
];

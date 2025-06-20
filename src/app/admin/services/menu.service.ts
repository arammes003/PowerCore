import { Injectable } from '@angular/core';
import { MenuOption } from '../interfaces/MenuOption';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  readonly menuOptions: MenuOption[] = [
    {
      icon: 'assets/icons/dashboard',
      label: 'Inicio',
      route: '/dashboard/inicio',
    },
    {
      icon: 'assets/icons/person',
      label: 'Usuarios',
      route: '/dashboard/usuarios',
    },
    {
      icon: 'assets/icons/person',
      label: 'Atletas',
      route: '/dashboard/atletas',
    },
    {
      icon: 'assets/icons/shield',
      label: 'Clubes',
      route: '/dashboard/clubes',
    },
    {
      icon: 'assets/icons/competition',
      label: 'Competiciones',
      route: '/dashboard/competiciones',
    },
    {
      icon: 'assets/icons/coach',
      label: 'Entrenadores',
      route: '/dashboard/entrenadores',
    },
    {
      icon: 'assets/icons/settings',
      label: 'Ajustes',
      route: '/dashboard/ajustes',
    },
  ];
}

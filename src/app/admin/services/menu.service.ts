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
      message: 'Gestiona los registros, eventos y movimientos',
    },
    {
      icon: 'assets/icons/person',
      label: 'Usuarios',
      route: '/dashboard/usuarios',
      message: 'Gestiona los registros, eventos y movimientos',
    },
    {
      icon: 'assets/icons/person',
      label: 'Atletas',
      route: '/dashboard/atletas',
      message: 'Gestiona los atletas y sus movimientos',
    },
    {
      icon: 'assets/icons/shield',
      label: 'Clubes',
      route: '/dashboard/clubes',
      message: 'Gestiona los clubes y sus movimientos',
    },
    {
      icon: 'assets/icons/competition',
      label: 'Competiciones',
      route: '/dashboard/competiciones',
      message: 'Gestiona las competiciones',
    },
    {
      icon: 'assets/icons/coach',
      label: 'Entrenadores',
      route: '/dashboard/entrenadores',
      message: 'Gestiona los entrenadores y sus movimientos',
    },
    {
      icon: 'assets/icons/settings',
      label: 'Ajustes',
      route: '/dashboard/ajustes',
      message: 'Gestiona tu perfil y vista',
    },
  ];
}

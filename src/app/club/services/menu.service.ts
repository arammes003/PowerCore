import { Injectable } from '@angular/core';
import { MenuOption } from 'src/app/shared/interfaces/MenuOption';

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
      icon: 'assets/icons/dumbell',
      label: 'Atletas',
      route: '/dashboard/atletas',
      message: 'Gestiona los atletas y sus movimientos',
    },
    {
      icon: 'assets/icons/coach',
      label: 'Entrenadores',
      route: '/dashboard/entrenadores',
      message: 'Gestiona los entrenadores y sus movimientos',
    },
    {
      icon: 'assets/icons/competition',
      label: 'Competiciones',
      route: '/dashboard/competiciones',
      message: 'Gestiona tus competiciones',
    },
    {
      icon: 'assets/icons/settings',
      label: 'Ajustes',
      route: '/dashboard/ajustes',
      message: 'Gestiona el perfil y vista de tu club',
    },
    {
      icon: 'assets/icons/logout.svg',
      label: 'Cerrar sesión',
      route: '/auth/login',
    },
  ];
}

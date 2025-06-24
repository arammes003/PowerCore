import { Injectable } from '@angular/core';
import { MenuOptions } from '../interfaces/menu-options';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  readonly menuOptions: MenuOptions[] = [
    {
      label: 'Inicio',
      route: '',
    },
    {
      label: 'Atletas',
      route: '/atletas',
    },
    {
      label: 'Clubes',
      route: '/clubes',
    },
    {
      label: 'Entrenadores',
      route: '/entrenadores',
    },
    {
      label: 'Competiciones',
      route: '/competiciones',
    },
  ];
}

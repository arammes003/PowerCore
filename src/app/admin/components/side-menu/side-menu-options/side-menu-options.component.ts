import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'admin-side-menu-options',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  menuOptions: MenuOption[] = [
    {
      icon: 'assets/icons/dashboard',
      label: 'Dashboard',
      route: '/dashboard/inicio',
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

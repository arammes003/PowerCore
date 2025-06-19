import { Component } from '@angular/core';

interface CardOptions {
  count: number;
  icon: string;
  increment: number;
  message: string;
  title: string;
}

@Component({
  selector: 'admin-page-stats-card',
  imports: [],
  templateUrl: './page-stats-card.component.html',
})
export class PageStatsCardComponent {
  cardOptions: CardOptions[] = [
    {
      title: 'Atletas Registrados',
      count: 7283,
      icon: 'assets/icons/person-inactive.svg',
      increment: 18,
      message: 'respecto a la semana pasada',
    },

    {
      title: 'Clubes Registrados',
      count: 637,
      icon: 'assets/icons/shield-inactive.svg',
      increment: 3,
      message: 'respecto a la semana pasada',
    },

    {
      title: 'Entrenadores Registrados',
      count: 2012,
      icon: 'assets/icons/coach-inactive.svg',
      increment: 10,
      message: 'respecto a la semana pasada',
    },

    {
      title: 'Competiciones Próximas',
      count: 21,
      icon: 'assets/icons/competition-inactive.svg',
      increment: 2,
      message: 'respecto a la semana pasada',
    },
  ];
}

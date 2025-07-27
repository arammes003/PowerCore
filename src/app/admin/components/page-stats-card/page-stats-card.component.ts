import { Component, inject } from '@angular/core';
import { ClubService } from '../../services/club.service';

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
  clubService = inject(ClubService);

  cardOptions: CardOptions[] = [
    {
      title: 'Atletas registrados',
      count: 7283,
      icon: 'assets/icons/dumbell-inactive.svg',
      increment: 18,
      message: 'respecto a la semana pasada',
    },

    {
      title: 'Clubes registrados',
      count: this.clubService.clubs().length,
      icon: 'assets/icons/shield-inactive.svg',
      increment: 3,
      message: 'respecto a la semana pasada',
    },

    {
      title: 'Entrenadores registrados',
      count: 2012,
      icon: 'assets/icons/coach-inactive.svg',
      increment: 10,
      message: 'respecto a la semana pasada',
    },

    {
      title: 'Competiciones próximas',
      count: 21,
      icon: 'assets/icons/competition-inactive.svg',
      increment: 2,
      message: 'respecto a la semana pasada',
    },
  ];
}

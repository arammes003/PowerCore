import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Club, ClubResponse } from '../interfaces/club.interfaces';
import { environment } from '@enviroments/environment';
import { ClubMapper } from '../mapper/club.mapper';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private http = inject(HttpClient);
  private token = localStorage.getItem('token');
  clubs = signal<Club[]>([]);
  clubsLoading = signal(true);

  constructor() {
    this.loadClubs();
  }

  loadClubs() {
    this.http
      .get<ClubResponse>(`${environment.apiUrl}/clubs`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((res) => {
        const clubs = ClubMapper.mapClubItemsToClubArray(res.clubs);
        this.clubs.set(clubs);
        this.clubsLoading.set(false);
        console.log({ clubs });
      });
  }
}

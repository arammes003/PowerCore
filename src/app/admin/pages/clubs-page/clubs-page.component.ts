import { Component, inject } from '@angular/core';
import { NavbarClubComponent } from './navbar-club/navbar-club.component';
import { ClubCardComponent } from '../../components/club-card/club-card.component';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'admin-clubs-page',
  imports: [NavbarClubComponent, ClubCardComponent],
  templateUrl: './clubs-page.component.html',
})
export default class ClubsPageComponent {
  clubService = inject(ClubService);
}

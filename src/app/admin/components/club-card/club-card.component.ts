import { Component, input } from '@angular/core';
import { Club } from '../../interfaces/club.interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'admin-club-card',
  imports: [DatePipe],
  templateUrl: './club-card.component.html',
})
export class ClubCardComponent {
  clubs = input.required<Club[]>();
}

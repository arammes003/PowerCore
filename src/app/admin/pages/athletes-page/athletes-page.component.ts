import { Component } from '@angular/core';
import { NavbarAthleteComponent } from "./navbar-athlete/navbar-athlete.component";
import { AthleteCardComponent } from "../../components/athlete-card/athlete-card.component";

@Component({
  selector: 'admin-athletes-page',
  imports: [NavbarAthleteComponent, AthleteCardComponent],
  templateUrl: './athletes-page.component.html',
})
export default class AthletesPageComponent {}

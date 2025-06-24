import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '@enviroments/environment';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  envs = environment;
}

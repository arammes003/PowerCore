import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponentComponent } from '../../components/header-component/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [HeaderComponentComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLayoutComponent {}

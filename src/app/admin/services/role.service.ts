import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  readonly roleLabels: { [key: string]: string } = {
    USER_ROLE: 'Usuario',
    CLUB_ROLE: 'Club',
    ATHLETE_ROLE: 'Atleta',
    COACH_ROLE: 'Entrenador',
    ADMIN_PTS: 'Administrador',
  };

  getRoleLabel(role: string): string {
    return this.roleLabels[role] || role;
  }
}

import { Routes } from '@angular/router';
import { AsignacionMasivaComponent } from './asignacion-masiva.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const asignacionTurnoRoute: Routes = [
  {
    path: '',
    component: AsignacionMasivaComponent,
    data: {
      authorities: [
        'ROLE_ADMIN',
        'JEFE_GESTION_HUMANA',
        'ASISTENTE_GESTION_HUMANA',
        'JEFE_PRODUCCION',
        'ASISTENTE_PRODUCCION',
        'SUPERVISOR'
      ],
      pageTitle: 'controlAccesoApp.asignacionTurno.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

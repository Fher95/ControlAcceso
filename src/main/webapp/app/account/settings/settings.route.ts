import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
  path: 'settings',
  component: SettingsComponent,
  data: {
    authorities: [
      'ROLE_USER',
      'ROLE_ADMIN',
      'JEFE_PRODUCCION',
      'ASISTENTE_PRODUCCION',
      'JEFE_GESTION_HUMANA',
      'ASISTENTE_GESTION_HUMANA',
      'SUPERVISOR',
      'GERENTE',
      'PORTERO'
    ],
    pageTitle: 'global.menu.account.settings'
  },
  canActivate: [UserRouteAccessService]
};

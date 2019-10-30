import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { NovedadesComponent } from './novedades.component';
import { NovedadesDetailComponent } from './novedades-detail.component';
import { NovedadesUpdateComponent } from './novedades-update.component';
import { NovedadesDeletePopupComponent, NovedadesDeleteDialogComponent } from './novedades-delete-dialog.component';
import { novedadesRoute, novedadesPopupRoute } from './novedades.route';

const ENTITY_STATES = [...novedadesRoute, ...novedadesPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NovedadesComponent,
    NovedadesDetailComponent,
    NovedadesUpdateComponent,
    NovedadesDeleteDialogComponent,
    NovedadesDeletePopupComponent
  ],
  entryComponents: [NovedadesDeleteDialogComponent]
})
export class ControlAccesoNovedadesModule {}

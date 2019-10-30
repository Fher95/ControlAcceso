import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { AsignacionTurnoComponent } from './asignacion-turno.component';
import { AsignacionTurnoDetailComponent } from './asignacion-turno-detail.component';
import { AsignacionTurnoUpdateComponent } from './asignacion-turno-update.component';
import { AsignacionTurnoDeletePopupComponent, AsignacionTurnoDeleteDialogComponent } from './asignacion-turno-delete-dialog.component';
import { asignacionTurnoRoute, asignacionTurnoPopupRoute } from './asignacion-turno.route';

const ENTITY_STATES = [...asignacionTurnoRoute, ...asignacionTurnoPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AsignacionTurnoComponent,
    AsignacionTurnoDetailComponent,
    AsignacionTurnoUpdateComponent,
    AsignacionTurnoDeleteDialogComponent,
    AsignacionTurnoDeletePopupComponent
  ],
  entryComponents: [AsignacionTurnoDeleteDialogComponent]
})
export class ControlAccesoAsignacionTurnoModule {}

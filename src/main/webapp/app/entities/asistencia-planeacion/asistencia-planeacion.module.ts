import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { AsistenciaPlaneacionComponent } from './asistencia-planeacion.component';
import { AsistenciaPlaneacionDetailComponent } from './asistencia-planeacion-detail.component';
import { AsistenciaPlaneacionUpdateComponent } from './asistencia-planeacion-update.component';
import {
  AsistenciaPlaneacionDeletePopupComponent,
  AsistenciaPlaneacionDeleteDialogComponent
} from './asistencia-planeacion-delete-dialog.component';
import { asistenciaPlaneacionRoute, asistenciaPlaneacionPopupRoute } from './asistencia-planeacion.route';

const ENTITY_STATES = [...asistenciaPlaneacionRoute, ...asistenciaPlaneacionPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AsistenciaPlaneacionComponent,
    AsistenciaPlaneacionDetailComponent,
    AsistenciaPlaneacionUpdateComponent,
    AsistenciaPlaneacionDeleteDialogComponent,
    AsistenciaPlaneacionDeletePopupComponent
  ],
  entryComponents: [AsistenciaPlaneacionDeleteDialogComponent]
})
export class ControlAccesoAsistenciaPlaneacionModule {}

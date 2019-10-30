import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { AsistenciaHorasExtrasComponent } from './asistencia-horas-extras.component';
import { AsistenciaHorasExtrasDetailComponent } from './asistencia-horas-extras-detail.component';
import { AsistenciaHorasExtrasUpdateComponent } from './asistencia-horas-extras-update.component';
import {
  AsistenciaHorasExtrasDeletePopupComponent,
  AsistenciaHorasExtrasDeleteDialogComponent
} from './asistencia-horas-extras-delete-dialog.component';
import { asistenciaHorasExtrasRoute, asistenciaHorasExtrasPopupRoute } from './asistencia-horas-extras.route';

const ENTITY_STATES = [...asistenciaHorasExtrasRoute, ...asistenciaHorasExtrasPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AsistenciaHorasExtrasComponent,
    AsistenciaHorasExtrasDetailComponent,
    AsistenciaHorasExtrasUpdateComponent,
    AsistenciaHorasExtrasDeleteDialogComponent,
    AsistenciaHorasExtrasDeletePopupComponent
  ],
  entryComponents: [AsistenciaHorasExtrasDeleteDialogComponent]
})
export class ControlAccesoAsistenciaHorasExtrasModule {}

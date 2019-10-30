import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { AsignacionHorasExtrasComponent } from './asignacion-horas-extras.component';
import { AsignacionHorasExtrasDetailComponent } from './asignacion-horas-extras-detail.component';
import { AsignacionHorasExtrasUpdateComponent } from './asignacion-horas-extras-update.component';
import {
  AsignacionHorasExtrasDeletePopupComponent,
  AsignacionHorasExtrasDeleteDialogComponent
} from './asignacion-horas-extras-delete-dialog.component';
import { asignacionHorasExtrasRoute, asignacionHorasExtrasPopupRoute } from './asignacion-horas-extras.route';

const ENTITY_STATES = [...asignacionHorasExtrasRoute, ...asignacionHorasExtrasPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AsignacionHorasExtrasComponent,
    AsignacionHorasExtrasDetailComponent,
    AsignacionHorasExtrasUpdateComponent,
    AsignacionHorasExtrasDeleteDialogComponent,
    AsignacionHorasExtrasDeletePopupComponent
  ],
  entryComponents: [AsignacionHorasExtrasDeleteDialogComponent]
})
export class ControlAccesoAsignacionHorasExtrasModule {}

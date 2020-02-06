import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { PlanificacionAsistenciaComponent } from './planificacion-asistencia.component';
import { PlanificacionAsistenciaDetailComponent } from './planificacion-asistencia-detail.component';
import { PlanificacionAsistenciaUpdateComponent } from './planificacion-asistencia-update.component';
import {
  PlanificacionAsistenciaDeletePopupComponent,
  PlanificacionAsistenciaDeleteDialogComponent
} from './planificacion-asistencia-delete-dialog.component';
import { planificacionAsistenciaRoute, planificacionAsistenciaPopupRoute } from './planificacion-asistencia.route';

const ENTITY_STATES = [...planificacionAsistenciaRoute, ...planificacionAsistenciaPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlanificacionAsistenciaComponent,
    PlanificacionAsistenciaDetailComponent,
    PlanificacionAsistenciaUpdateComponent,
    PlanificacionAsistenciaDeleteDialogComponent,
    PlanificacionAsistenciaDeletePopupComponent
  ],
  entryComponents: [PlanificacionAsistenciaDeleteDialogComponent]
})
export class ControlAccesoPlanificacionAsistenciaModule {}

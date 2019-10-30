import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { AsistenciaComponent } from './asistencia.component';
import { AsistenciaDetailComponent } from './asistencia-detail.component';
import { AsistenciaUpdateComponent } from './asistencia-update.component';
import { AsistenciaDeletePopupComponent, AsistenciaDeleteDialogComponent } from './asistencia-delete-dialog.component';
import { asistenciaRoute, asistenciaPopupRoute } from './asistencia.route';

const ENTITY_STATES = [...asistenciaRoute, ...asistenciaPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AsistenciaComponent,
    AsistenciaDetailComponent,
    AsistenciaUpdateComponent,
    AsistenciaDeleteDialogComponent,
    AsistenciaDeletePopupComponent
  ],
  entryComponents: [AsistenciaDeleteDialogComponent]
})
export class ControlAccesoAsistenciaModule {}

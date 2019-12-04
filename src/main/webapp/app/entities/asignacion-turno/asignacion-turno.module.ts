import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { AsignacionTurnoComponent } from './asignacion-turno.component';
import { AsignacionTurnoDetailComponent } from './asignacion-turno-detail.component';
import { AsignacionTurnoUpdateComponent } from './asignacion-turno-update.component';
import { AsignacionTurnoDeletePopupComponent, AsignacionTurnoDeleteDialogComponent } from './asignacion-turno-delete-dialog.component';
import { asignacionTurnoRoute, asignacionTurnoPopupRoute } from './asignacion-turno.route';
import { TabsModule } from 'ngx-bootstrap/tabs';

const ENTITY_STATES = [...asignacionTurnoRoute, ...asignacionTurnoPopupRoute];

@NgModule({
  imports: [TabsModule.forRoot(), ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
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

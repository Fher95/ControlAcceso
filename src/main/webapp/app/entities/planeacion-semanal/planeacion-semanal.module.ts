import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { PlaneacionSemanalComponent } from './planeacion-semanal.component';
import { PlaneacionSemanalDetailComponent } from './planeacion-semanal-detail.component';
import { PlaneacionSemanalUpdateComponent } from './planeacion-semanal-update.component';
import {
  PlaneacionSemanalDeletePopupComponent,
  PlaneacionSemanalDeleteDialogComponent
} from './planeacion-semanal-delete-dialog.component';
import { planeacionSemanalRoute, planeacionSemanalPopupRoute } from './planeacion-semanal.route';

const ENTITY_STATES = [...planeacionSemanalRoute, ...planeacionSemanalPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaneacionSemanalComponent,
    PlaneacionSemanalDetailComponent,
    PlaneacionSemanalUpdateComponent,
    PlaneacionSemanalDeleteDialogComponent,
    PlaneacionSemanalDeletePopupComponent
  ],
  entryComponents: [PlaneacionSemanalDeleteDialogComponent]
})
export class ControlAccesoPlaneacionSemanalModule {}

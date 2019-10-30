import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { TurnoComponent } from './turno.component';
import { TurnoDetailComponent } from './turno-detail.component';
import { TurnoUpdateComponent } from './turno-update.component';
import { TurnoDeletePopupComponent, TurnoDeleteDialogComponent } from './turno-delete-dialog.component';
import { turnoRoute, turnoPopupRoute } from './turno.route';

const ENTITY_STATES = [...turnoRoute, ...turnoPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TurnoComponent, TurnoDetailComponent, TurnoUpdateComponent, TurnoDeleteDialogComponent, TurnoDeletePopupComponent],
  entryComponents: [TurnoDeleteDialogComponent]
})
export class ControlAccesoTurnoModule {}

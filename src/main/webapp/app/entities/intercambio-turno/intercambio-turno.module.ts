import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { IntercambioTurnoComponent } from './intercambio-turno.component';
import { IntercambioTurnoDetailComponent } from './intercambio-turno-detail.component';
import { IntercambioTurnoUpdateComponent } from './intercambio-turno-update.component';
import { IntercambioTurnoDeletePopupComponent, IntercambioTurnoDeleteDialogComponent } from './intercambio-turno-delete-dialog.component';
import { intercambioTurnoRoute, intercambioTurnoPopupRoute } from './intercambio-turno.route';

const ENTITY_STATES = [...intercambioTurnoRoute, ...intercambioTurnoPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    IntercambioTurnoComponent,
    IntercambioTurnoDetailComponent,
    IntercambioTurnoUpdateComponent,
    IntercambioTurnoDeleteDialogComponent,
    IntercambioTurnoDeletePopupComponent
  ],
  entryComponents: [IntercambioTurnoDeleteDialogComponent]
})
export class ControlAccesoIntercambioTurnoModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { DevengoNominaComponent } from './devengo-nomina.component';
import { DevengoNominaDetailComponent } from './devengo-nomina-detail.component';
import { DevengoNominaUpdateComponent } from './devengo-nomina-update.component';
import { DevengoNominaDeletePopupComponent, DevengoNominaDeleteDialogComponent } from './devengo-nomina-delete-dialog.component';
import { devengoNominaRoute, devengoNominaPopupRoute } from './devengo-nomina.route';

const ENTITY_STATES = [...devengoNominaRoute, ...devengoNominaPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DevengoNominaComponent,
    DevengoNominaDetailComponent,
    DevengoNominaUpdateComponent,
    DevengoNominaDeleteDialogComponent,
    DevengoNominaDeletePopupComponent
  ],
  entryComponents: [DevengoNominaDeleteDialogComponent]
})
export class ControlAccesoDevengoNominaModule {}

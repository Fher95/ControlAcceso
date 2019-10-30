import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { TelefonoComponent } from './telefono.component';
import { TelefonoDetailComponent } from './telefono-detail.component';
import { TelefonoUpdateComponent } from './telefono-update.component';
import { TelefonoDeletePopupComponent, TelefonoDeleteDialogComponent } from './telefono-delete-dialog.component';
import { telefonoRoute, telefonoPopupRoute } from './telefono.route';

const ENTITY_STATES = [...telefonoRoute, ...telefonoPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TelefonoComponent,
    TelefonoDetailComponent,
    TelefonoUpdateComponent,
    TelefonoDeleteDialogComponent,
    TelefonoDeletePopupComponent
  ],
  entryComponents: [TelefonoDeleteDialogComponent]
})
export class ControlAccesoTelefonoModule {}

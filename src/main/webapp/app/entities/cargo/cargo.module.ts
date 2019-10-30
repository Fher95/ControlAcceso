import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { CargoComponent } from './cargo.component';
import { CargoDetailComponent } from './cargo-detail.component';
import { CargoUpdateComponent } from './cargo-update.component';
import { CargoDeletePopupComponent, CargoDeleteDialogComponent } from './cargo-delete-dialog.component';
import { cargoRoute, cargoPopupRoute } from './cargo.route';

const ENTITY_STATES = [...cargoRoute, ...cargoPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CargoComponent, CargoDetailComponent, CargoUpdateComponent, CargoDeleteDialogComponent, CargoDeletePopupComponent],
  entryComponents: [CargoDeleteDialogComponent]
})
export class ControlAccesoCargoModule {}

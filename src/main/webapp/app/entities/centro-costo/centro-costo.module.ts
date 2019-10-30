import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { CentroCostoComponent } from './centro-costo.component';
import { CentroCostoDetailComponent } from './centro-costo-detail.component';
import { CentroCostoUpdateComponent } from './centro-costo-update.component';
import { CentroCostoDeletePopupComponent, CentroCostoDeleteDialogComponent } from './centro-costo-delete-dialog.component';
import { centroCostoRoute, centroCostoPopupRoute } from './centro-costo.route';

const ENTITY_STATES = [...centroCostoRoute, ...centroCostoPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CentroCostoComponent,
    CentroCostoDetailComponent,
    CentroCostoUpdateComponent,
    CentroCostoDeleteDialogComponent,
    CentroCostoDeletePopupComponent
  ],
  entryComponents: [CentroCostoDeleteDialogComponent]
})
export class ControlAccesoCentroCostoModule {}

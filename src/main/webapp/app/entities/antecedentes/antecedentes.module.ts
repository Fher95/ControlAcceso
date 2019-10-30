import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { AntecedentesComponent } from './antecedentes.component';
import { AntecedentesDetailComponent } from './antecedentes-detail.component';
import { AntecedentesUpdateComponent } from './antecedentes-update.component';
import { AntecedentesDeletePopupComponent, AntecedentesDeleteDialogComponent } from './antecedentes-delete-dialog.component';
import { antecedentesRoute, antecedentesPopupRoute } from './antecedentes.route';

const ENTITY_STATES = [...antecedentesRoute, ...antecedentesPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AntecedentesComponent,
    AntecedentesDetailComponent,
    AntecedentesUpdateComponent,
    AntecedentesDeleteDialogComponent,
    AntecedentesDeletePopupComponent
  ],
  entryComponents: [AntecedentesDeleteDialogComponent]
})
export class ControlAccesoAntecedentesModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { ColaboradorComponent } from './colaborador.component';
import { ColaboradorDetailComponent } from './colaborador-detail.component';
import { ColaboradorUpdateComponent } from './colaborador-update.component';
import { ColaboradorDeletePopupComponent, ColaboradorDeleteDialogComponent } from './colaborador-delete-dialog.component';
import { colaboradorRoute, colaboradorPopupRoute } from './colaborador.route';

const ENTITY_STATES = [...colaboradorRoute, ...colaboradorPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ColaboradorComponent,
    ColaboradorDetailComponent,
    ColaboradorUpdateComponent,
    ColaboradorDeleteDialogComponent,
    ColaboradorDeletePopupComponent
  ],
  entryComponents: [ColaboradorDeleteDialogComponent]
})
export class ControlAccesoColaboradorModule {}

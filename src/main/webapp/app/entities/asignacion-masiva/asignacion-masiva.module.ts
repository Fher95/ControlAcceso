import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { AsignacionMasivaComponent } from './asignacion-masiva.component';
import { asignacionTurnoRoute } from './asignacion-masiva.route';

const ENTITY_STATES = [...asignacionTurnoRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AsignacionMasivaComponent]
})
export class ControlAccesoAsignacionMasivaModule {}

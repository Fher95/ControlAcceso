import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { ReporteAsistenciaComponent } from './reporte-asistencia.component';
import { ReporteAsistenciaDetailComponent } from './reporte-asistencia-detail.component';
import { ReporteAsistenciaUpdateComponent } from './reporte-asistencia-update.component';
import {
  ReporteAsistenciaDeletePopupComponent,
  ReporteAsistenciaDeleteDialogComponent
} from './reporte-asistencia-delete-dialog.component';
import { reporteAsistenciaRoute, reporteAsistenciaPopupRoute } from './reporte-asistencia.route';

const ENTITY_STATES = [...reporteAsistenciaRoute, ...reporteAsistenciaPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReporteAsistenciaComponent,
    ReporteAsistenciaDetailComponent,
    ReporteAsistenciaUpdateComponent,
    ReporteAsistenciaDeleteDialogComponent,
    ReporteAsistenciaDeletePopupComponent
  ],
  entryComponents: [ReporteAsistenciaDeleteDialogComponent]
})
export class ControlAccesoReporteAsistenciaModule {}

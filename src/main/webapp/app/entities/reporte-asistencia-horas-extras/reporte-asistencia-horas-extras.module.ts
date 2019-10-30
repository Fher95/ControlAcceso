import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlAccesoSharedModule } from 'app/shared/shared.module';
import { ReporteAsistenciaHorasExtrasComponent } from './reporte-asistencia-horas-extras.component';
import { ReporteAsistenciaHorasExtrasDetailComponent } from './reporte-asistencia-horas-extras-detail.component';
import { ReporteAsistenciaHorasExtrasUpdateComponent } from './reporte-asistencia-horas-extras-update.component';
import {
  ReporteAsistenciaHorasExtrasDeletePopupComponent,
  ReporteAsistenciaHorasExtrasDeleteDialogComponent
} from './reporte-asistencia-horas-extras-delete-dialog.component';
import { reporteAsistenciaHorasExtrasRoute, reporteAsistenciaHorasExtrasPopupRoute } from './reporte-asistencia-horas-extras.route';

const ENTITY_STATES = [...reporteAsistenciaHorasExtrasRoute, ...reporteAsistenciaHorasExtrasPopupRoute];

@NgModule({
  imports: [ControlAccesoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReporteAsistenciaHorasExtrasComponent,
    ReporteAsistenciaHorasExtrasDetailComponent,
    ReporteAsistenciaHorasExtrasUpdateComponent,
    ReporteAsistenciaHorasExtrasDeleteDialogComponent,
    ReporteAsistenciaHorasExtrasDeletePopupComponent
  ],
  entryComponents: [ReporteAsistenciaHorasExtrasDeleteDialogComponent]
})
export class ControlAccesoReporteAsistenciaHorasExtrasModule {}

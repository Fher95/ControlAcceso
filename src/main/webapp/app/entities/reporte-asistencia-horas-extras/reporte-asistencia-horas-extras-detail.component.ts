import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';

@Component({
  selector: 'jhi-reporte-asistencia-horas-extras-detail',
  templateUrl: './reporte-asistencia-horas-extras-detail.component.html'
})
export class ReporteAsistenciaHorasExtrasDetailComponent implements OnInit {
  reporteAsistenciaHorasExtras: IReporteAsistenciaHorasExtras;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reporteAsistenciaHorasExtras }) => {
      this.reporteAsistenciaHorasExtras = reporteAsistenciaHorasExtras;
    });
  }

  previousState() {
    window.history.back();
  }
}

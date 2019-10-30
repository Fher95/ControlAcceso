import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReporteAsistencia } from 'app/shared/model/reporte-asistencia.model';

@Component({
  selector: 'jhi-reporte-asistencia-detail',
  templateUrl: './reporte-asistencia-detail.component.html'
})
export class ReporteAsistenciaDetailComponent implements OnInit {
  reporteAsistencia: IReporteAsistencia;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reporteAsistencia }) => {
      this.reporteAsistencia = reporteAsistencia;
    });
  }

  previousState() {
    window.history.back();
  }
}

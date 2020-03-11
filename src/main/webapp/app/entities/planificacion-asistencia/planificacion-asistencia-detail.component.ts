import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilidadesColaborador } from 'app/shared/util/utilidades-generales';

import { IPlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';

@Component({
  selector: 'jhi-planificacion-asistencia-detail',
  templateUrl: './planificacion-asistencia-detail.component.html'
})
export class PlanificacionAsistenciaDetailComponent implements OnInit {
  planificacionAsistencia: IPlanificacionAsistencia;

  constructor(protected activatedRoute: ActivatedRoute, public utilCol: UtilidadesColaborador) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ planificacionAsistencia }) => {
      this.planificacionAsistencia = planificacionAsistencia;
    });
  }

  previousState() {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';

@Component({
  selector: 'jhi-asistencia-planeacion-detail',
  templateUrl: './asistencia-planeacion-detail.component.html'
})
export class AsistenciaPlaneacionDetailComponent implements OnInit {
  asistenciaPlaneacion: IAsistenciaPlaneacion;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asistenciaPlaneacion }) => {
      this.asistenciaPlaneacion = asistenciaPlaneacion;
    });
  }

  previousState() {
    window.history.back();
  }
}

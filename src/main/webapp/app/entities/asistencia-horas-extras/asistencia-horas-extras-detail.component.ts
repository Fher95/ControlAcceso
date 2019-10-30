import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';

@Component({
  selector: 'jhi-asistencia-horas-extras-detail',
  templateUrl: './asistencia-horas-extras-detail.component.html'
})
export class AsistenciaHorasExtrasDetailComponent implements OnInit {
  asistenciaHorasExtras: IAsistenciaHorasExtras;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asistenciaHorasExtras }) => {
      this.asistenciaHorasExtras = asistenciaHorasExtras;
    });
  }

  previousState() {
    window.history.back();
  }
}

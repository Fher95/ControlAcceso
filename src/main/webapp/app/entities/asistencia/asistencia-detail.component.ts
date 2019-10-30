import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsistencia } from 'app/shared/model/asistencia.model';

@Component({
  selector: 'jhi-asistencia-detail',
  templateUrl: './asistencia-detail.component.html'
})
export class AsistenciaDetailComponent implements OnInit {
  asistencia: IAsistencia;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asistencia }) => {
      this.asistencia = asistencia;
    });
  }

  previousState() {
    window.history.back();
  }
}

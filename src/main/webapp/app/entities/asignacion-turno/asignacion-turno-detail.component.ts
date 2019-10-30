import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';

@Component({
  selector: 'jhi-asignacion-turno-detail',
  templateUrl: './asignacion-turno-detail.component.html'
})
export class AsignacionTurnoDetailComponent implements OnInit {
  asignacionTurno: IAsignacionTurno;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asignacionTurno }) => {
      this.asignacionTurno = asignacionTurno;
    });
  }

  previousState() {
    window.history.back();
  }
}

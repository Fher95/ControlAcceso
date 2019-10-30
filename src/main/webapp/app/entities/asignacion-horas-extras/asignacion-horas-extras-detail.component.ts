import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';

@Component({
  selector: 'jhi-asignacion-horas-extras-detail',
  templateUrl: './asignacion-horas-extras-detail.component.html'
})
export class AsignacionHorasExtrasDetailComponent implements OnInit {
  asignacionHorasExtras: IAsignacionHorasExtras;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asignacionHorasExtras }) => {
      this.asignacionHorasExtras = asignacionHorasExtras;
    });
  }

  previousState() {
    window.history.back();
  }
}

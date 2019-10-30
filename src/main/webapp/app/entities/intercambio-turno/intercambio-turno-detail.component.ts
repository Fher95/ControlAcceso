import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';

@Component({
  selector: 'jhi-intercambio-turno-detail',
  templateUrl: './intercambio-turno-detail.component.html'
})
export class IntercambioTurnoDetailComponent implements OnInit {
  intercambioTurno: IIntercambioTurno;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ intercambioTurno }) => {
      this.intercambioTurno = intercambioTurno;
    });
  }

  previousState() {
    window.history.back();
  }
}

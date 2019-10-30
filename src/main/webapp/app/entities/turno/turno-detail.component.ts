import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITurno } from 'app/shared/model/turno.model';

@Component({
  selector: 'jhi-turno-detail',
  templateUrl: './turno-detail.component.html'
})
export class TurnoDetailComponent implements OnInit {
  turno: ITurno;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ turno }) => {
      this.turno = turno;
    });
  }

  previousState() {
    window.history.back();
  }
}

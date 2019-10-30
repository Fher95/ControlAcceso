import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICentroCosto } from 'app/shared/model/centro-costo.model';

@Component({
  selector: 'jhi-centro-costo-detail',
  templateUrl: './centro-costo-detail.component.html'
})
export class CentroCostoDetailComponent implements OnInit {
  centroCosto: ICentroCosto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ centroCosto }) => {
      this.centroCosto = centroCosto;
    });
  }

  previousState() {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDevengoNomina } from 'app/shared/model/devengo-nomina.model';

@Component({
  selector: 'jhi-devengo-nomina-detail',
  templateUrl: './devengo-nomina-detail.component.html'
})
export class DevengoNominaDetailComponent implements OnInit {
  devengoNomina: IDevengoNomina;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ devengoNomina }) => {
      this.devengoNomina = devengoNomina;
    });
  }

  previousState() {
    window.history.back();
  }
}

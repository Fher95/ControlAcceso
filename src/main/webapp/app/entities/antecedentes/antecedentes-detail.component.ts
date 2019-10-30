import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAntecedentes } from 'app/shared/model/antecedentes.model';

@Component({
  selector: 'jhi-antecedentes-detail',
  templateUrl: './antecedentes-detail.component.html'
})
export class AntecedentesDetailComponent implements OnInit {
  antecedentes: IAntecedentes;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ antecedentes }) => {
      this.antecedentes = antecedentes;
    });
  }

  previousState() {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColaborador } from 'app/shared/model/colaborador.model';

@Component({
  selector: 'jhi-colaborador-detail',
  templateUrl: './colaborador-detail.component.html'
})
export class ColaboradorDetailComponent implements OnInit {
  colaborador: IColaborador;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ colaborador }) => {
      this.colaborador = colaborador;
    });
  }

  previousState() {
    window.history.back();
  }
}

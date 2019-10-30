import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INovedades } from 'app/shared/model/novedades.model';

@Component({
  selector: 'jhi-novedades-detail',
  templateUrl: './novedades-detail.component.html'
})
export class NovedadesDetailComponent implements OnInit {
  novedades: INovedades;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ novedades }) => {
      this.novedades = novedades;
    });
  }

  previousState() {
    window.history.back();
  }
}

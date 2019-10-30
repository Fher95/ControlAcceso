import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';

@Component({
  selector: 'jhi-planeacion-semanal-detail',
  templateUrl: './planeacion-semanal-detail.component.html'
})
export class PlaneacionSemanalDetailComponent implements OnInit {
  planeacionSemanal: IPlaneacionSemanal;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ planeacionSemanal }) => {
      this.planeacionSemanal = planeacionSemanal;
    });
  }

  previousState() {
    window.history.back();
  }
}

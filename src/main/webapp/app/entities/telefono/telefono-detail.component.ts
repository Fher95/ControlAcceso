import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITelefono } from 'app/shared/model/telefono.model';

@Component({
  selector: 'jhi-telefono-detail',
  templateUrl: './telefono-detail.component.html'
})
export class TelefonoDetailComponent implements OnInit {
  telefono: ITelefono;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ telefono }) => {
      this.telefono = telefono;
    });
  }

  previousState() {
    window.history.back();
  }
}

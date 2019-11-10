import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColaborador } from 'app/shared/model/colaborador.model';
import { Moment } from 'moment';
import { TelefonoService } from 'app/entities/telefono/telefono.service';
import { ITelefono } from 'app/shared/model/telefono.model';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-colaborador-detail',
  templateUrl: './colaborador-detail.component.html'
})
export class ColaboradorDetailComponent implements OnInit {
  colaborador: IColaborador;
  telefonos: ITelefono[];

  constructor(protected activatedRoute: ActivatedRoute, protected telefonoService: TelefonoService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ colaborador }) => {
      this.colaborador = colaborador;
    });
    this.loadTelefonosColaborador();
  }

  convertirMoment(parMoment: Moment): string {
    let fecha = '';
    parMoment.locale('es');
    fecha = parMoment.format('DD MMMM YYYY');
    return fecha;
  }

  previousState() {
    window.history.back();
  }

  loadTelefonosColaborador() {
    this.telefonoService
      .findTelefonosColaborador(this.colaborador.id)
      .pipe(
        filter((res: HttpResponse<ITelefono[]>) => res.ok),
        map((res: HttpResponse<ITelefono[]>) => res.body)
      )
      .subscribe((res: ITelefono[]) => {
        this.telefonos = res;
      });
  }
}

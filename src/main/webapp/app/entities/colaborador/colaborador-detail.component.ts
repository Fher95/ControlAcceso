import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColaborador } from 'app/shared/model/colaborador.model';
import { Moment } from 'moment';
import { TelefonoService } from 'app/entities/telefono/telefono.service';
import { ITelefono } from 'app/shared/model/telefono.model';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from '../asignacion-turno/asignacion-turno.service';

@Component({
  selector: 'jhi-colaborador-detail',
  templateUrl: './colaborador-detail.component.html',
  styleUrls: ['../../shared/css/estilos-turno.scss']
})
export class ColaboradorDetailComponent implements OnInit {
  colaborador: IColaborador;
  telefonos: ITelefono[];
  asignacionesColSeleccionado: IAsignacionTurno[] = [];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected telefonoService: TelefonoService,
    protected asignacionTurnoService: AsignacionTurnoService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ colaborador }) => {
      this.colaborador = colaborador;
      this.loadAsignacionesColaborador(this.colaborador.id);
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

  loadAsignacionesColaborador(parId: number) {
    this.asignacionesColSeleccionado = [];
    this.asignacionTurnoService
      .findAsignacionesColaborador(parId)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      )
      .subscribe((res: IAsignacionTurno[]) => {
        if (res.length > 0) {
          this.asignacionesColSeleccionado = res;
          this.asignacionesColSeleccionado = this.asignacionesColSeleccionado.filter((asig: IAsignacionTurno) =>
            asig.turno ? true : false
          );
        }
      });
  }
}

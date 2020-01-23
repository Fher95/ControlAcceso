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
import { AntecedentesService } from '../antecedentes/antecedentes.service';
import { IAntecedentes } from 'app/shared/model/antecedentes.model';
// import { TipoAntecedente } from 'app/shared/model/enumerations/tipo-antecedente.model';

@Component({
  selector: 'jhi-colaborador-detail',
  templateUrl: './colaborador-detail.component.html',
  styleUrls: ['../../shared/css/estilos-turno.scss']
})
export class ColaboradorDetailComponent implements OnInit {
  colaborador: IColaborador;
  telefonos: ITelefono[];
  asignacionesColSeleccionado: IAsignacionTurno[] = [];
  antecedentesCol: IAntecedentes[] = [];
  antDiscip = false;
  antFisc = false;
  antPenal = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected telefonoService: TelefonoService,
    protected asignacionTurnoService: AsignacionTurnoService,
    protected antecedentesService: AntecedentesService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ colaborador }) => {
      this.colaborador = colaborador;
      this.loadAsignacionesColaborador(this.colaborador.id);
    });
    this.loadTelefonosColaborador();
    this.loadAntecedentesColaborador();
  }
  loadAntecedentesColaborador() {
    this.antecedentesService
      .findAntecedentesColaborador(this.colaborador.id)
      .pipe(
        filter((res: HttpResponse<IAntecedentes[]>) => res.ok),
        map((res: HttpResponse<IAntecedentes[]>) => res.body)
      )
      .subscribe((res: IAntecedentes[]) => {
        this.antecedentesCol = res;
        this.tieneAntecedentes();
      });
  }

  convertirMoment(parMoment: Moment): string {
    let fecha = '(Sin registrar)';
    if (parMoment !== null) {
      parMoment.locale('es');
      fecha = parMoment.format('DD MMMM YYYY');
    }
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

  /**
   * 1 para verificar si tiene antecedentes disciplinarios, 2 para fiscales, 3 para penales.
   */
  tieneAntecedentes() {
    (this.antDiscip = false), (this.antDiscip = false);
    this.antPenal = false;

    this.antecedentesCol.forEach(element => {
      if (element.tipo === 'Disciplinario') {
        this.antDiscip = true;
      }
      if (element.tipo === 'Fiscal') {
        this.antFisc = true;
      }
      if (element.tipo === 'Penal') {
        this.antPenal = true;
      }
    });
  }

  getSalario(parSalario: number): string {
    const strNumero = '$ ' + parSalario.toLocaleString();
    return strNumero;
  }
}

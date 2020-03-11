import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { AccountService } from 'app/core/auth/account.service';
import { AsistenciaPlaneacionService } from './asistencia-planeacion.service';
import * as moment from 'moment';
import { ITurno } from 'app/shared/model/turno.model';
import { UtilidadesColaborador } from 'app/shared/util/utilidades-generales';
import { Respuesta } from 'app/shared/model/respuesta';
import { Moment } from 'moment';
import { IPlanificacionAsistencia, PlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { PlanificacionAsistenciaService } from '../planificacion-asistencia/planificacion-asistencia.service';

@Component({
  selector: 'jhi-asistencia-planeacion',
  templateUrl: './asistencia-planeacion.component.html'
})
export class AsistenciaPlaneacionComponent implements OnInit, OnDestroy {
  asistenciaPlaneacions: IAsistenciaPlaneacion[];
  currentAccount: any;
  eventSubscriber: Subscription;
  asistenciasTardias: IAsistenciaPlaneacion[];
  asistenciasTempranas: IAsistenciaPlaneacion[];
  salidasTempranas: IAsistenciaPlaneacion[];
  salidasTardias: IAsistenciaPlaneacion[];

  listaAsistencias: IPlanificacionAsistencia[];

  fromDate: string;
  toDate: string;
  cargando: boolean;

  predicate: any;
  reverse: any;

  tipoAsistencia = 'sin-registro';

  constructor(
    protected asistenciaPlaneacionService: AsistenciaPlaneacionService,
    protected planificacionAsistenciaService: PlanificacionAsistenciaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    private datePipe: DatePipe,
    protected router: Router,
    public utilCol: UtilidadesColaborador
  ) {}

  loadAll() {
    this.asistenciaPlaneacionService
      .query()
      .pipe(
        filter((res: HttpResponse<IAsistenciaPlaneacion[]>) => res.ok),
        map((res: HttpResponse<IAsistenciaPlaneacion[]>) => res.body)
      )
      .subscribe(
        (res: IAsistenciaPlaneacion[]) => {
          this.asistenciaPlaneacions = res;
          // this.setAsistenciasTardiasTempranas(this.asistenciaPlaneacions);
          // this.setSaldidasTardiasTempranas(this.asistenciaPlaneacions);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    // this.loadAll();
    this.predicate = 'fechaAsistenciaTurno';
    this.reverse = true;
    this.today();
    this.previousMonth();
    this.cargarAsistenciasPlanificacion('sin-registro');
    // this.cargarAsistenciasPlanificacion('entradas-tarde');
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAsistenciaPlaneacions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAsistenciaPlaneacion) {
    return item.id;
  }

  registerChangeInAsistenciaPlaneacions() {
    this.eventSubscriber = this.eventManager.subscribe('asistenciaPlaneacionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  setAsistenciasTardiasTempranas(lstAsistencias: IAsistenciaPlaneacion[]) {
    this.asistenciasTardias = [];
    this.asistenciasTempranas = [];
    lstAsistencias.forEach(element => {
      // Se obtiene la fecha de la asistencia registrada para un colaborador (incluida la hora)
      const fechaAsistencia: moment.Moment = element.asistencia.entrada;
      // Se obtiene la hora del turno (está en formato fecha y hora pero se considera solo la hora)
      const horaTurno: moment.Moment = element.asignacionTurno.turno.horaInicio;

      // Se convierten las anteriores fechas (tipo Moment) y se convierten en strings para poder crear un Date
      const strFechaAsistencia = fechaAsistencia.toString();
      const strHoraTurno = horaTurno.toString();

      // Se crean objetos tipo Date para facilitar su manipulación y comparación
      const varFechaAsist = new Date(strFechaAsistencia);
      // Como lo que se van a comparar son objetos Date (fechas completas), se un Date que tenga la misma fecha
      // de la asistencia (se copia de la fecha de asistencia)
      const varFechaTurno = new Date(strFechaAsistencia);
      // Se crea el Date del turno
      const varHoraTurno = new Date(strHoraTurno);
      // Finalmente se obtienen la hora y los minutos del turno y se aplican a la Fecha Turno
      varFechaTurno.setHours(varHoraTurno.getHours());
      varFechaTurno.setMinutes(varHoraTurno.getMinutes());
      // De esta forma tenemos un Date de Asistencia y un Date de turno con la misma fecha, pero con hora diferente
      // Finalmente se comparan y se asignan a la lista correspondiente
      if (varFechaAsist > varFechaTurno) {
        this.asistenciasTardias.push(element);
      } else {
        this.asistenciasTempranas.push(element);
      }
    });
  }

  setSaldidasTardiasTempranas(lstAsistencias: IAsistenciaPlaneacion[]) {
    this.salidasTardias = [];
    this.salidasTempranas = [];
    lstAsistencias.forEach(element => {
      // Se obtiene la fecha de la asistencia registrada para un colaborador (incluida la hora)
      const fechaAsistencia: moment.Moment = element.asistencia.salida;
      // Se obtiene la hora del turno (está en formato fecha y hora pero se considera solo la hora)
      const horaTurno: moment.Moment = element.asignacionTurno.turno.horaInicio;
      let duracionTurno: number = element.asignacionTurno.turno.duracion;
      if (duracionTurno > 12) {
        duracionTurno = 0;
      }

      // Se convierten las anteriores fechas (tipo Moment) y se convierten en strings para poder crear un Date
      const strFechaAsistencia = fechaAsistencia.toString();
      const strHoraTurno = horaTurno.toString();

      // Se crean objetos tipo Date para facilitar su manipulación y comparación
      const varFechaAsist = new Date(strFechaAsistencia);
      // Como lo que se van a comparar son objetos Date (fechas completas), se un Date que tenga la misma fecha
      // de la asistencia (se copia de la fecha de asistencia)
      const varFechaTurno = new Date(strFechaAsistencia);
      // Se crea el Date del turno
      const varHoraTurno = new Date(strHoraTurno);
      // Finalmente se obtienen la hora y los minutos del turno y se aplican a la Fecha Turno
      varFechaTurno.setHours(varHoraTurno.getHours() + duracionTurno);
      varFechaTurno.setMinutes(varHoraTurno.getMinutes());
      // De esta forma tenemos un Date de Asistencia y un Date de turno con la misma fecha, pero con hora diferente
      // Finalmente se comparan y se asignan a la lista correspondiente
      if (varFechaAsist > varFechaTurno) {
        this.salidasTardias.push(element);
      } else {
        this.salidasTempranas.push(element);
      }
    });
  }

  getSalidaTurno(parTurno: ITurno): string {
    const fechaHora = new Date(parTurno.horaInicio.toString());
    fechaHora.setHours(fechaHora.getHours() + parTurno.duracion);
    /*
    let resultado = '';
    resultado += fechaHora.getFullYear() + '-' +
    (fechaHora.getMonth() + 1) + '-' + fechaHora.getDate() + 'T'
    + fechaHora.getHours() + ':' + fechaHora.getMinutes() + ':00Z' 
    this.stringTurno = resultado;
    this.momentPrueba = parTurno.horaInicio;
    const strHoraTurno = parTurno.horaInicio.toString();
    let duracionTurno = parTurno.duracion;
    if (duracionTurno > 12) {
      duracionTurno = 0;
    }
    const varHoraTurno = new Date(strHoraTurno);
    varHoraTurno.setHours(varHoraTurno.getHours() + duracionTurno);
    let strSalida = parTurno.nombre + ' ';
    if (varHoraTurno.getHours() < 10) {
      strSalida += '0';
    }
    strSalida += varHoraTurno.getHours() + ':';
    if (varHoraTurno.getMinutes() < 10) {
      strSalida += 0;
    }
    strSalida += varHoraTurno.getMinutes();

    */
    return fechaHora.toISOString();
  }

  cargarAsistenciasPlanificacion(tipoEntrada: string) {
    this.tipoAsistencia = tipoEntrada;
    this.listaAsistencias = [];
    this.cargando = true;
    this.asistenciaPlaneacionService
      .getAsistenciasPlanificacion({
        filter: tipoEntrada,
        fromDate: this.fromDate,
        toDate: this.toDate,
        orden: this.sort()
      })
      .subscribe(
        (res: HttpResponse<PlanificacionAsistencia[]>) => {
          this.listaAsistencias = res.body;
          this.cargando = false;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  /*
  cargarAsistencias() {
    this.asistenciaPlaneacionService
      .cargarAsistencia()
      .pipe(
        filter((res: HttpResponse<Respuesta>) => res.ok),
        map((res: HttpResponse<Respuesta>) => res.body)
      )
      .subscribe((res: Respuesta) => {
        this.jhiAlertService.i18nEnabled = false;
        this.jhiAlertService.info(
          'Se registraron ' +
            res.numAsignaciones +
            (res.numAsignaciones !== 0 ? ' nuevas asistencias.' : ' asistenicas.') +
            ' ' +
            (res.numRechazados !== 0 ? res.numRechazados + ' registros fueron inválidos.' : ' no se rechazó ningún registro.')
        );
        this.jhiAlertService.i18nEnabled = true;
        this.loadAll();
      });
  }
  */
  getStringMinutosRegistro(objAsistencia: IPlanificacionAsistencia, tipoAsistencia: string): string {
    let unidadTiempo = 'minutos';
    let tipoAsis = 'temprano';
    if (tipoAsistencia === 'entrada') {
      let minutosTotales = objAsistencia.minDiferenciaEntrada;
      if (objAsistencia.minDiferenciaEntrada === 1 || objAsistencia.minDiferenciaEntrada === -1) {
        unidadTiempo = 'minuto';
      }
      if (objAsistencia.minDiferenciaEntrada <= 0) {
        minutosTotales = objAsistencia.minDiferenciaEntrada * -1;
        if (objAsistencia.minDiferenciaSalida === 0) {
          tipoAsis = '';
        }
      } else {
        tipoAsis = 'tarde';
      }
      return minutosTotales + ' ' + unidadTiempo + ' ' + tipoAsis;
    }
    if (tipoAsistencia === 'salida') {
      let minutosTotales = objAsistencia.minDiferenciaSalida;
      if (objAsistencia.minDiferenciaSalida === 1 || objAsistencia.minDiferenciaSalida === -1) {
        unidadTiempo = 'minuto';
      }
      if (objAsistencia.minDiferenciaSalida <= 0) {
        minutosTotales = objAsistencia.minDiferenciaSalida * -1;
        if (objAsistencia.minDiferenciaSalida === 0) {
          tipoAsis = '';
        }
      } else {
        tipoAsis = 'tarde';
      }
      return minutosTotales + ' ' + unidadTiempo + ' ' + tipoAsis;
    }
    if (tipoAsistencia === 'sin-registro') {
      return 'Sin registro';
    }
  }

  today() {
    const dateFormat = 'yyyy-MM-dd';
    // Today + 1 day - needed if the current day must be included
    const today: Date = new Date();
    today.setDate(today.getDate());
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.toDate = this.datePipe.transform(date, dateFormat);
  }
  previousMonth() {
    const dateFormat = 'yyyy-MM-dd';
    let fromDate: Date = new Date();

    if (fromDate.getMonth() === 0) {
      fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
    } else {
      fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
    }

    this.fromDate = this.datePipe.transform(fromDate, dateFormat);
  }
  sort() {
    if (this.predicate.includes('minDiferencia')) {
      let minutosDiferencia: string;
      if (this.tipoAsistencia.includes('entrada')) {
        minutosDiferencia = 'minDiferenciaEntrada';
      } else {
        minutosDiferencia = 'minDiferenciaSalida';
      }
      return minutosDiferencia + ' ' + (this.reverse ? 'asc' : 'desc');
    }
    const result = this.predicate + ' ' + (this.reverse ? 'asc' : 'desc');
    return result;
  }

  transition() {
    this.router.navigate(['/asistencia-planeacion'], {
      queryParams: {
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.cargarAsistenciasPlanificacion(this.tipoAsistencia);
  }

  cargarAsistencias() {
    this.planificacionAsistenciaService
      .cargarAsistencias()
      .pipe(
        filter((res: HttpResponse<Respuesta>) => res.ok),
        map((res: HttpResponse<Respuesta>) => res.body)
      )
      .subscribe((res: Respuesta) => {
        this.mostrarMensaje(res.mensaje, res.tipoMensaje);
      });
  }

  mostrarMensaje(parMensaje: string, tipoMensaje: string) {
    this.jhiAlertService.i18nEnabled = false;
    if (tipoMensaje === 'Exito') {
      this.jhiAlertService.info(parMensaje);
    } else if (tipoMensaje === 'Error') {
      this.jhiAlertService.error(parMensaje);
    }
    this.jhiAlertService.i18nEnabled = true;
  }
}

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

  constructor(
    protected asistenciaPlaneacionService: AsistenciaPlaneacionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
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
          this.setAsistenciasTardiasTempranas(this.asistenciaPlaneacions);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
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
      const fechaAsistencia: moment.Moment = element.asistencia.entrada;
      const horaTurno: moment.Moment = element.asignacionTurno.turno.horaInicio;

      const strFechaAsistencia = fechaAsistencia.toString();
      const strHoraTurno = horaTurno.toString();

      const varFechaAsist = new Date(strFechaAsistencia);
      const varFechaTurno = new Date(strFechaAsistencia);
      const varHoraTurno = new Date(strHoraTurno);
      varFechaTurno.setHours(varHoraTurno.getHours());
      varFechaTurno.setMinutes(varHoraTurno.getMinutes());

      if (varFechaAsist > varFechaTurno) {
        this.asistenciasTardias.push(element);
      } else {
        this.asistenciasTempranas.push(element);
      }
    });
  }
}

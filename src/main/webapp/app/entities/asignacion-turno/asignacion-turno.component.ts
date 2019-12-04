import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AccountService } from 'app/core/auth/account.service';
import { AsignacionTurnoService } from './asignacion-turno.service';
import { ITurno } from 'app/shared/model/turno.model';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { ICargo } from 'app/shared/model/cargo.model';

@Component({
  selector: 'jhi-asignacion-turno',
  templateUrl: './asignacion-turno.component.html'
})
export class AsignacionTurnoComponent implements OnInit, OnDestroy {
  asignacionTurnos: IAsignacionTurno[];
  turnos: ITurno[];
  currentAccount: any;
  eventSubscriber: Subscription;
  centrosCosto: ICentroCosto[];

  constructor(
    protected asignacionTurnoService: AsignacionTurnoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.asignacionTurnoService
      .query()
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      )
      .subscribe(
        (res: IAsignacionTurno[]) => {
          this.asignacionTurnos = res;
          this.setTurnosTotales();
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAsignacionTurnos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAsignacionTurno) {
    return item.id;
  }

  registerChangeInAsignacionTurnos() {
    this.eventSubscriber = this.eventManager.subscribe('asignacionTurnoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  /** Funciones nuevas */
  setTurnosTotales() {
    this.turnos = [];
    this.asignacionTurnos.forEach(element => {
      if (!this.turnos.includes(element.turno)) {
        this.turnos.push(element.turno);
      }
    });

    this.setCentrosCosto();
  }

  setCentrosCosto() {
    this.centrosCosto = [];
    this.asignacionTurnos.forEach(element => {
      if (!this.turnos.includes(element.cargo.centroCosto)) {
        this.centrosCosto.push(element.cargo.centroCosto);
      }
    });
  }

  getCargosPorCentroCosto(parCentroCosto: ICentroCosto): ICargo[] {
    const arrayCargos: ICargo[] = [];
    this.asignacionTurnos.forEach(element => {
      if (element.cargo.centroCosto.id === parCentroCosto.id) {
        arrayCargos.push(element.cargo);
      }
    });
    return arrayCargos;
  }

  getColaboradorTurnoCargo(parTurno: ITurno, parCargo: ICargo): string {
    let nombreColaborador: string;
    nombreColaborador = 'No Asignado';
    this.asignacionTurnos.forEach(element => {
      if (element.turno.id === parTurno.id) {
        if (element.cargo.id === parCargo.id) {
          nombreColaborador = '';
          let contador = 0;
          element.colaboradors.forEach(element2 => {
            contador++;
            nombreColaborador += element2.nombre1 + ' ' + element2.nombre2 + ' ' + element2.apellido1 + ' ' + element2.apellido2;
            if (contador < element.colaboradors.length) {
              nombreColaborador += ' - ';
            }
          });
        }
      }
    });
    return nombreColaborador;
  }
}

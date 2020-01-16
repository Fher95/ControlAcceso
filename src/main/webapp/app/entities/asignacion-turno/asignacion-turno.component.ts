import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AccountService } from 'app/core/auth/account.service';
import { AsignacionTurnoService } from './asignacion-turno.service';
import { ITurno } from 'app/shared/model/turno.model';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { ICargo } from 'app/shared/model/cargo.model';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { UtilidadesColaborador } from 'app/shared/util/utilidades-generales';
import { Router, ActivatedRoute } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';

@Component({
  selector: 'jhi-asignacion-turno',
  templateUrl: './asignacion-turno.component.html',
  styleUrls: ['../../shared/css/estilos-turno.scss']
})
export class AsignacionTurnoComponent implements OnInit, OnDestroy {
  asignacionTurnos: IAsignacionTurno[];
  asignacionesActualesTodo: IAsignacionTurno[];
  turnos: ITurno[];
  currentAccount: any;
  eventSubscriber: Subscription;
  centrosCosto: ICentroCosto[];
  reverse: any;
  predicate: any;
  routeData: any;
  previousPage: any;
  itemsPerPage: any;
  page: any;
  totalItems: any;
  links: any;

  constructor(
    protected asignacionTurnoService: AsignacionTurnoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected parseLinks: JhiParseLinks,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected colUtil: UtilidadesColaborador
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = 1;
      this.previousPage = 0;
      this.reverse = true;
      this.predicate = 'id';
    });
  }

  loadPageActuales() {
    this.asignacionTurnoService
      .query({
        filter: 'fechaFin-is-null',
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      /*
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      ) */
      .subscribe(
        (res: HttpResponse<IAsignacionTurno[]>) => this.paginateAsistencias(res.body, res.headers),

        //this.setTurnosTotales();
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadAllActuales() {
    this.asignacionTurnoService
      .query({
        filter: 'fechaFin-is-null-all'
      })
      /*
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      ) */
      .subscribe(
        (res: HttpResponse<IAsignacionTurno[]>) => {
          this.asignacionesActualesTodo = res.body;

          this.setTurnosTotales();
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadPageActuales();
    this.loadAllActuales();
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
    this.eventSubscriber = this.eventManager.subscribe('asignacionTurnoListModification', response => this.loadPageActuales());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  /** Funciones nuevas */

  /** ** Funciones para la creacion de la tabla de ubicacion */

  cargarUbicacion() {
    this.loadAllActuales();
  }

  setTurnosTotales() {
    this.turnos = [];
    this.asignacionesActualesTodo.forEach(asignacion => {
      if (!this.enListaTurnos(asignacion.turno.id)) {
        this.turnos.push(asignacion.turno);
      }
    });
    this.ordenarTurnos();
    this.setCentrosCosto();
  }
  ordenarTurnos() {
    this.turnos.sort((t1, t2) => {
      if (t1.horaInicio > t2.horaInicio) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  enListaTurnos(parTurnoId: number): boolean {
    let respuesta: boolean;
    if (this.turnos.length === 0) {
      respuesta = false;
    } else {
      this.turnos.forEach(element => {
        if (element.id === parTurnoId) {
          respuesta = true;
        }
      });
    }
    return respuesta;
  }

  setCentrosCosto() {
    this.centrosCosto = [];
    this.asignacionesActualesTodo.forEach(element => {
      if (!this.enListaCentrosCosto(element.cargo.centroCosto.id)) {
        this.centrosCosto.push(element.cargo.centroCosto);
      }
    });
  }

  enListaCentrosCosto(parCentroCostoId: number): boolean {
    let respuesta: boolean;
    if (this.turnos.length === 0) {
      respuesta = false;
    } else {
      this.centrosCosto.forEach(element => {
        if (element.id === parCentroCostoId) {
          respuesta = true;
        }
      });
    }
    return respuesta;
  }

  /**
   * Obtiene todos los cargos (distintos) de la lista de asignaciones
   * @param parCentroCosto Centro de costo del que se quieren sacar los cargos
   */
  getCargosPorCentroCosto(parCentroCosto: ICentroCosto): ICargo[] {
    const arrayCargos: ICargo[] = [];
    this.asignacionesActualesTodo.forEach(element => {
      if (element.cargo.centroCosto.id === parCentroCosto.id) {
        let existeEnArrayCargos = false;
        arrayCargos.forEach(element2 => {
          if (element2.id === element.cargo.id) {
            existeEnArrayCargos = true;
          }
        });

        if (!existeEnArrayCargos) {
          arrayCargos.push(element.cargo);
        }
      }
    });
    return arrayCargos;
  }

  getColaboradorTurnoCargo(parTurno: ITurno, parCargo: ICargo): string {
    let nombreColaborador: string;
    nombreColaborador = '';
    this.asignacionesActualesTodo.forEach(element => {
      if (element.turno.id === parTurno.id) {
        if (element.cargo.id === parCargo.id) {
          if (element.colaboradors) {
            const objCol = element.colaboradors[0];
            nombreColaborador += objCol.nombre1 + ' ' + objCol.nombre2 + ' ' + objCol.apellido1 + ' ' + objCol.apellido2;
            nombreColaborador += ' - ';
          }
        }
      }
    });
    return nombreColaborador;
  }

  /**
   * Obtiene la lista de colaboradores que tienen asignados el turno y el cargo dados
   * de la lista de asignaciones
   * @param parTurno
   * @param parCargo
   */
  getArryColaboradores(parTurno: ITurno, parCargo: ICargo): IColaborador[] {
    const arrayCols: IColaborador[] = [];
    this.asignacionesActualesTodo.forEach(element => {
      if (element.turno.id === parTurno.id) {
        if (element.cargo.id === parCargo.id) {
          if (element.colaboradors) {
            // Recordar que en una asignacion normal, apesar de que el atributo colaboradors
            // es un array, éste solo debe contener un unico colaborador
            const objCol = element.colaboradors[0];
            arrayCols.push(objCol);
          }
        }
      }
    });
    return arrayCols;
  }
  /** ** FIN de las funciones para la creacion de la tabla de ubicacion */

  /** Metodos para rotacion de turnos */
  rotarAsignacion() {
    this.asignacionTurnoService.rotar().subscribe(res => {
      this.loadPageActuales();
    });
  }
  cargarAsistencias() {
    this.asignacionTurnoService.cargarAsistencias().subscribe();
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  transition() {
    this.router.navigate(['/asignacion-turno'], {
      queryParams: {
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadPageActuales();
  }
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }
  protected paginateAsistencias(data: IAsignacionTurno[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.asignacionTurnos = data;
  }
}

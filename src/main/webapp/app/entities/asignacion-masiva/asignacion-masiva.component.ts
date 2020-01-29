import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AsignacionTurnoService } from '../asignacion-turno/asignacion-turno.service';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UtilidadesColaborador } from 'app/shared/util/utilidades-generales';
import { ITurno } from 'app/shared/model/turno.model';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo/cargo.service';
import { CentroCostoService } from 'app/entities/centro-costo/centro-costo.service';
import { TurnoService } from 'app/entities/turno/turno.service';
import { JhiAlertService } from 'ng-jhipster';

export interface ITuplaAsignaciones {
  checked?: boolean;
  asignacionTurno?: IAsignacionTurno;
}
export class TuplaAsignaciones implements ITuplaAsignaciones {
  constructor(public checked?: boolean, public asignacionTurno?: IAsignacionTurno) {}
}

@Component({
  selector: 'jhi-asignacion-masiva',
  templateUrl: './asignacion-masiva.component.html',
  styleUrls: ['./asignacion-masiva.component.scss']
})
export class AsignacionMasivaComponent implements OnInit {
  editForm = this.fb.group({
    turnoSeleccionado: [],
    centroDeCosto: [],
    cargo: [],
    turno: []
  });
  vecAsignacionesActuales: IAsignacionTurno[] = [];
  turnos: ITurno[] = [];
  turnosTodos: ITurno[] = [];
  idTurnoSeleccionado: number;
  idCargoSeleccionado: number;
  cargos: ICargo[] = [];
  cargosTodos: ICargo[] = [];
  varChecked: boolean;
  tuplaAsignaciones: [boolean, IAsignacionTurno];
  arrayAsignacionesMostradas: Array<TuplaAsignaciones> = [];
  todosSeleccionados = false;
  centrosCosto: ICentroCosto[] = [];

  constructor(
    protected jhiAlertService: JhiAlertService,
    private fb: FormBuilder,
    protected asignacionTurnoService: AsignacionTurnoService,
    protected utilCol: UtilidadesColaborador,
    protected cargoService: CargoService,
    protected centroCostoService: CentroCostoService,
    protected turnoService: TurnoService
  ) {}

  ngOnInit() {
    this.idTurnoSeleccionado = -1;
    this.idCargoSeleccionado = -1;
    this.loadAllActuales();
    this.loadAllCentroCosto();
    this.loadCargos();
    this.loadTurnos();
  }

  loadAllActuales() {
    this.asignacionTurnoService
      .query({
        filter: 'fechaFin-is-null-all'
      })
      .subscribe(
        (res: HttpResponse<IAsignacionTurno[]>) => {
          this.vecAsignacionesActuales = res.body;
          // this.vecAsignacionesMostradas = this.vecAsignacionesActuales;
          this.llenarTupla(this.vecAsignacionesActuales);
          this.setTurnosTotales();
          this.setCargos();
        },
        (res: HttpErrorResponse) => {}
      );
  }

  trackCargoById(index: number, item: ICargo) {
    return item.id;
  }

  trackTurnoById(index: number, item: ITurno) {
    return item.id;
  }

  llenarTupla(parVecAsignaciones: IAsignacionTurno[]) {
    this.arrayAsignacionesMostradas = [];
    parVecAsignaciones.forEach(asig => {
      const tupla: TuplaAsignaciones = new TuplaAsignaciones(false, asig);
      this.arrayAsignacionesMostradas.push(tupla);
    });
  }

  setTurnosTotales() {
    this.turnos = [];
    this.vecAsignacionesActuales.forEach(asignacion => {
      if (!this.enListaTurnos(asignacion.turno.id)) {
        this.turnos.push(asignacion.turno);
      }
    });
    this.ordenarTurnos();
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

  ordenarTurnos() {
    this.turnos.sort((t1, t2) => {
      if (t1.horaInicio > t2.horaInicio) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  filtrarAsignaciones() {
    let vecAsignacionesFiltradas = [];
    if (this.idTurnoSeleccionado === -1 && this.idCargoSeleccionado === -1) {
      vecAsignacionesFiltradas = this.vecAsignacionesActuales;
    } else if (this.idCargoSeleccionado === -1) {
      vecAsignacionesFiltradas = this.vecAsignacionesActuales.filter(
        (asig: IAsignacionTurno) => asig.turno.id === this.idTurnoSeleccionado
      );
    } else if (this.idTurnoSeleccionado === -1) {
      vecAsignacionesFiltradas = this.vecAsignacionesActuales.filter(
        (asig: IAsignacionTurno) => asig.cargo.id === this.idCargoSeleccionado
      );
    } else {
      vecAsignacionesFiltradas = this.vecAsignacionesActuales.filter(
        (asig: IAsignacionTurno) => asig.cargo.id === this.idCargoSeleccionado && asig.turno.id === this.idTurnoSeleccionado
      );
    }
    this.llenarTupla(vecAsignacionesFiltradas);
  }

  setCargos() {
    this.cargos = [];
    this.vecAsignacionesActuales.forEach(element => {
      if (!this.enListaCargos(element.cargo.id)) {
        this.cargos.push(element.cargo);
      }
    });
  }

  enListaCargos(parCargoId: number): boolean {
    let respuesta: boolean;
    if (this.turnos.length === 0) {
      respuesta = false;
    } else {
      this.cargos.forEach(element => {
        if (element.id === parCargoId) {
          respuesta = true;
        }
      });
    }
    return respuesta;
  }

  cambiarSeleccionTodos() {
    this.arrayAsignacionesMostradas.forEach(asig => {
      asig.checked = this.todosSeleccionados;
    });
  }

  cargarCargos() {
    if (this.editForm.get('centroDeCosto').value === 'todos') {
      this.loadCargos();
    } else {
      const idCentroCosto: number = this.editForm.get('centroDeCosto').value;
      this.loadCargosCentroCostoId(idCentroCosto);
    }
  }

  loadAllCentroCosto() {
    this.centroCostoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICentroCosto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICentroCosto[]>) => response.body)
      )
      .subscribe((res: ICentroCosto[]) => (this.centrosCosto = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  loadCargos() {
    this.cargoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICargo[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICargo[]>) => response.body)
      )
      .subscribe(
        (res: ICargo[]) => {
          this.cargosTodos = res.filter((cargo: ICargo) => cargo.centroCosto !== null);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadCargosCentroCostoId(parId: number) {
    this.cargoService
      .findCargosCentroCosto(parId)
      .pipe(
        filter((res: HttpResponse<ICargo[]>) => res.ok),
        map((res: HttpResponse<ICargo[]>) => res.body)
      )
      .subscribe((res: ICargo[]) => {
        this.cargosTodos = res;
      });
  }

  loadTurnos() {
    this.turnoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITurno[]>) => response.body)
      )
      .subscribe(
        (res: ITurno[]) => {
          this.turnosTodos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

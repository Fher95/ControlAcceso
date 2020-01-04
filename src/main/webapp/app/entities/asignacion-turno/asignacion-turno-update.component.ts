import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT, DATE_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAsignacionTurno, AsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from './asignacion-turno.service';
import { ITurno } from 'app/shared/model/turno.model';
import { TurnoService } from 'app/entities/turno/turno.service';
import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { IntercambioTurnoService } from 'app/entities/intercambio-turno/intercambio-turno.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { AsistenciaPlaneacionService } from 'app/entities/asistencia-planeacion/asistencia-planeacion.service';
import { IPlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';
import { PlaneacionSemanalService } from 'app/entities/planeacion-semanal/planeacion-semanal.service';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo/cargo.service';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { CentroCostoService } from '../centro-costo/centro-costo.service';

@Component({
  selector: 'jhi-asignacion-turno-update',
  templateUrl: './asignacion-turno-update.component.html'
})
export class AsignacionTurnoUpdateComponent implements OnInit {
  isSaving: boolean;

  turnos: ITurno[];

  intercambioturnos: IIntercambioTurno[];

  asistenciaplaneacions: IAsistenciaPlaneacion[];

  colaboradors: IColaborador[];

  colaboradoresSeleccionados: IColaborador[];

  planeacionsemanals: IPlaneacionSemanal[];

  cargos: ICargo[];
  varAsignacion: IAsignacionTurno;

  currentSearch: string;
  colaboradorEncontrado: IColaborador;
  centrocostos: ICentroCosto[];
  strAsginaciones = 'Sin asignacion';
  asignacionesColSeleccionado: IAsignacionTurno[];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    turno: [this, [Validators.required]],
    intercambioTurno: [],
    colaboradors: [],
    planeacionSemanal: [],
    cargo: [this, [Validators.required]],
    centroDeCosto: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected asignacionTurnoService: AsignacionTurnoService,
    protected turnoService: TurnoService,
    protected intercambioTurnoService: IntercambioTurnoService,
    protected asistenciaPlaneacionService: AsistenciaPlaneacionService,
    protected colaboradorService: ColaboradorService,
    protected planeacionSemanalService: PlaneacionSemanalService,
    protected cargoService: CargoService,
    protected centroCostoService: CentroCostoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ asignacionTurno }) => {
      this.updateForm(asignacionTurno);
    });
    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.loadAllCentroCosto();
    this.turnoService
      .query({ filter: 'asignacionturno-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ITurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITurno[]>) => response.body)
      )
      .subscribe(
        (res: ITurno[]) => {
          if (!this.editForm.get('turno').value || !this.editForm.get('turno').value.id) {
            this.turnos = res;
          } else {
            this.turnoService
              .find(this.editForm.get('turno').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ITurno>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ITurno>) => subResponse.body)
              )
              .subscribe(
                (subRes: ITurno) => (this.turnos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.intercambioTurnoService
      .query({ filter: 'asignacionturno-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IIntercambioTurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<IIntercambioTurno[]>) => response.body)
      )
      .subscribe(
        (res: IIntercambioTurno[]) => {
          if (!this.editForm.get('intercambioTurno').value || !this.editForm.get('intercambioTurno').value.id) {
            this.intercambioturnos = res;
          } else {
            this.intercambioTurnoService
              .find(this.editForm.get('intercambioTurno').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IIntercambioTurno>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IIntercambioTurno>) => subResponse.body)
              )
              .subscribe(
                (subRes: IIntercambioTurno) => (this.intercambioturnos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.asistenciaPlaneacionService
      .query({ filter: 'asignacionturno-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAsistenciaPlaneacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsistenciaPlaneacion[]>) => response.body)
      )
      .subscribe(
        (res: IAsistenciaPlaneacion[]) => {
          if (!this.editForm.get('asistenciaPlaneacion').value || !this.editForm.get('asistenciaPlaneacion').value.id) {
            this.asistenciaplaneacions = res;
          } else {
            this.asistenciaPlaneacionService
              .find(this.editForm.get('asistenciaPlaneacion').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAsistenciaPlaneacion>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAsistenciaPlaneacion>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAsistenciaPlaneacion) => (this.asistenciaplaneacions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.planeacionSemanalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaneacionSemanal[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaneacionSemanal[]>) => response.body)
      )
      .subscribe((res: IPlaneacionSemanal[]) => (this.planeacionsemanals = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cargoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICargo[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICargo[]>) => response.body)
      )
      .subscribe((res: ICargo[]) => (this.cargos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(asignacionTurno: IAsignacionTurno) {
    this.editForm.patchValue({
      id: asignacionTurno.id,
      fecha: asignacionTurno.fecha != null ? asignacionTurno.fecha.format(DATE_FORMAT) : null,
      turno: asignacionTurno.turno,
      intercambioTurno: asignacionTurno.intercambioTurno,
      colaboradors: asignacionTurno.colaboradors,
      planeacionSemanal: asignacionTurno.planeacionSemanal,
      cargo: asignacionTurno.cargo
    });
    if (asignacionTurno.id === undefined) {
      this.editForm.patchValue({ fecha: this.getStringFecha(new Date()) });
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const asignacionTurno = this.createFromForm();
    if (asignacionTurno.id !== undefined) {
      this.subscribeToSaveResponse(this.asignacionTurnoService.update(asignacionTurno));
    } else {
      this.subscribeToSaveResponse(this.asignacionTurnoService.create(asignacionTurno));
    }
  }

  private createFromForm(): IAsignacionTurno {
    return {
      ...new AsignacionTurno(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      turno: this.editForm.get(['turno']).value,
      intercambioTurno: this.editForm.get(['intercambioTurno']).value,
      colaboradors: this.editForm.get(['colaboradors']).value,
      planeacionSemanal: this.editForm.get(['planeacionSemanal']).value,
      cargo: this.editForm.get(['cargo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsignacionTurno>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTurnoById(index: number, item: ITurno) {
    return item.id;
  }

  trackIntercambioTurnoById(index: number, item: IIntercambioTurno) {
    return item.id;
  }

  trackColaboradorById(index: number, item: IColaborador) {
    return item.id;
  }

  trackAsistenciaPlaneacionById(index: number, item: IAsistenciaPlaneacion) {
    return item.id;
  }

  trackPlaneacionSemanalById(index: number, item: IPlaneacionSemanal) {
    return item.id;
  }

  trackCargoById(index: number, item: ICargo) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }

  searchColaborador(parDocumento: string) {
    if (parDocumento === '') {
      this.colaboradorEncontrado = undefined;
      this.editForm.patchValue({ colaboradors: [] });
    }
    this.colaboradors.forEach(element => {
      if (element.numeroDocumento === parDocumento) {
        this.colaboradorEncontrado = element;
        this.editForm.patchValue({ colaboradors: [this.colaboradorEncontrado] });
      }
    });
    // this.colaboradorEncontrado = undefined;
    /*
    if (parDocumento === '') {
      this.colaboradorService
        .query()
        .pipe(
          filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
          map((response: HttpResponse<IColaborador[]>) => response.body)
        )
        .subscribe(
          (res: IColaborador[]) => {
            this.colaboradors = res;
            this.editForm.patchValue({ colaboradors: [] });
          },
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    } else {
      this.colaboradorService
        .findConPeticiones(parDocumento)
        .pipe(
          filter((res: HttpResponse<IColaborador>) => res.ok),
          map((res: HttpResponse<IColaborador>) => res.body)
        )
        .subscribe((res: IColaborador) => {
          this.colaboradors = [res];
          this.colaboradorEncontrado = res;
          this.colaboradoresSeleccionados = [res];
          //this.editForm.patchValue({ colaboradors: [this.colaboradorEncontrado] });
          this.loadAsignacionTurno(this.colaboradorEncontrado.id);
        });
    }
    */
  }
  clear(): void {
    this.currentSearch = '';
  }

  loadAsignacionTurno(parIdColaborador: number) {
    this.editForm.patchValue({ id: undefined, centroDeCosto: undefined, cargo: undefined });
    this.asignacionTurnoService
      .findAsignacionesColaborador(parIdColaborador)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      )
      .subscribe((res: IAsignacionTurno[]) => {
        this.varAsignacion = res[0];
        if (this.varAsignacion !== undefined) {
          this.setAsignacionTurno(this.varAsignacion.id);
          this.loadCargosCentroCostoId(this.varAsignacion.cargo.centroCosto.id);
          this.editForm.patchValue({
            centroDeCosto: this.varAsignacion.cargo.centroCosto.id ? this.varAsignacion.cargo.centroCosto.id : []
          });
        } else {
          this.editForm.patchValue({
            id: undefined,
            centroDeCosto: [],
            cargo: []
          });
        }
      });
  }
  setAsignacionTurno(id: number) {
    this.asignacionTurnoService
      .find(id)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno>) => res.body)
      )
      .subscribe(res => {
        this.updateForm(res);
      });
  }

  loadCargosCentroCostoId(parId: number) {
    this.cargoService
      .findCargosCentroCosto(parId)
      .pipe(
        filter((res: HttpResponse<ICargo[]>) => res.ok),
        map((res: HttpResponse<ICargo[]>) => res.body)
      )
      .subscribe((res: ICargo[]) => {
        this.cargos = res;
      });
  }

  setColaboradorSeleccionado(): void {
    this.colaboradorEncontrado = this.editForm.get(['colaboradors']).value[0];
    // this.colaboradoresSeleccionados = [this.colaboradorEncontrado];
    // this.loadAsignacionTurno(this.colaboradorEncontrado.id);
    this.currentSearch = this.colaboradorEncontrado.numeroDocumento;
    this.turnosCargosColaborador(this.colaboradorEncontrado.id);
  }

  cargarCargos() {
    this.loadCargosCentroCostoId(this.editForm.get(['centroDeCosto']).value);
  }

  loadAllCentroCosto() {
    this.centroCostoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICentroCosto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICentroCosto[]>) => response.body)
      )
      .subscribe((res: ICentroCosto[]) => (this.centrocostos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  turnosCargosColaborador(parId: number): string {
    let result = 'No asignado';
    this.strAsginaciones = result;
    this.asignacionesColSeleccionado = [];
    this.asignacionTurnoService
      .findAsignacionesColaborador(parId)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      )
      .subscribe((res: IAsignacionTurno[]) => {
        if (res.length > 0) {
          result = '';
          this.asignacionesColSeleccionado = res;
          res.forEach(element => {
            result += element.turno.nombre + ' - ' + element.cargo.nombre + ' || ';
          });
          // result = '' + res[0].turno.nombre + ' - ' + res[0].cargo.nombre;
          this.strAsginaciones = result;
        }
      });

    return result;
  }

  getCadenaAsignacion(parAsignacion: IAsignacionTurno): string {
    let result = '';
    result = parAsignacion.turno.nombre + ' - ' + parAsignacion.cargo.nombre;
    return result;
  }

  // Recibe un obj asignación, y le establece una fechaFin a la asignación para que deje de ser actual
  desasignarTurno(parAsignacion: IAsignacionTurno) {
    const fechaHoraActual: Date = new Date();
    const momentoActual = moment(fechaHoraActual.toDateString());
    parAsignacion.fechaFin = momentoActual;
    this.asignacionTurnoService.update2(parAsignacion).subscribe(
      () => {
        this.jhiAlertService.success('controlAccesoApp.asignacionTurno.desasignacion.exitosa', null, null);
        this.turnosCargosColaborador(this.colaboradorEncontrado.id);
      },
      () => this.jhiAlertService.error('controlAccesoApp.asignacionTurno.desasignacion.error', null, null)
    );
  }

  // Recibe un objeto tipo Date y crea un cadena con el formato YYYY-MM-DD
  getStringFecha(parFecha: Date): string {
    let res = '';
    res = parFecha.getFullYear().toString() + '-';
    if (parFecha.getDate() < 10) {
      res += '0';
    }
    res += parFecha.getDate().toString() + '-';
    if (parFecha.getDay() < 10) {
      res += '0';
    }
    res += parFecha.getDay().toString();
    return res;
  }

  // Recibe dos objetos Turno y compara sus horas de entrada para verificar si se cruzan o no
  turnosCruzados(turno1: ITurno, turno2: ITurno): boolean {
    const horaEntrada1 = turno1.horaInicio;
    const horaEntrada2 = turno2.horaInicio;
    return false;
  }
}

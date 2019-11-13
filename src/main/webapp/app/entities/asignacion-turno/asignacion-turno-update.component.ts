import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAsignacionTurno, AsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from './asignacion-turno.service';
import { ITurno } from 'app/shared/model/turno.model';
import { TurnoService } from 'app/entities/turno/turno.service';
import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { IntercambioTurnoService } from 'app/entities/intercambio-turno/intercambio-turno.service';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { AsistenciaPlaneacionService } from 'app/entities/asistencia-planeacion/asistencia-planeacion.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';
import { IPlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';
import { PlaneacionSemanalService } from 'app/entities/planeacion-semanal/planeacion-semanal.service';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo/cargo.service';
import { CentroCostoService } from 'app/entities/centro-costo/centro-costo.service';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';

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

  colaboradorEncontrado: IColaborador;

  planeacionsemanals: IPlaneacionSemanal[];

  cargos: ICargo[];

  varAsignacion: IAsignacionTurno;

  centrocostos: ICentroCosto[];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    turno: [],
    intercambioTurno: [],
    asistenciaPlaneacion: [],
    colaboradors: [],
    planeacionSemanal: [],
    cargo: [],
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
    this.loadCentrosCosto();
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
    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
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
      fecha: asignacionTurno.fecha != null ? asignacionTurno.fecha.format(DATE_TIME_FORMAT) : null,
      turno: asignacionTurno.turno,
      intercambioTurno: asignacionTurno.intercambioTurno,
      asistenciaPlaneacion: asignacionTurno.asistenciaPlaneacion,
      colaboradors: asignacionTurno.colaboradors,
      planeacionSemanal: asignacionTurno.planeacionSemanal,
      cargo: asignacionTurno.cargo,
      centroDeCosto: asignacionTurno.cargo.centroCosto.id
    });
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
      asistenciaPlaneacion: this.editForm.get(['asistenciaPlaneacion']).value,
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

  trackAsistenciaPlaneacionById(index: number, item: IAsistenciaPlaneacion) {
    return item.id;
  }

  trackColaboradorById(index: number, item: IColaborador) {
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

  setColaborador() {
    this.colaboradorEncontrado = this.editForm.get(['colaboradors']).value[0];
    this.loadAsignacionTurno(this.colaboradorEncontrado.id);
  }

  cargarCargos() {
    this.loadCargosCentroCostoId(this.editForm.get(['centroDeCosto']).value);
  }

  loadAsignacionTurno(parIdColaborador: number) {
    this.asignacionTurnoService
      .findCargoColaborador(parIdColaborador)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno>) => res.body)
      )
      .subscribe((res: IAsignacionTurno) => {
        this.varAsignacion = res;
        this.loadCargosCentroCostoId(this.varAsignacion.cargo.centroCosto.id);
        this.editForm.patchValue({
          centroDeCosto: this.varAsignacion.cargo.centroCosto.id,
          cargo: this.varAsignacion.cargo
        });
      });
  }
  setCentroCosto() {
    //const centroCosto: ICentroCosto = (this.editForm.get(['cargo']).value).centroCosto;
    this.editForm.patchValue({ centroDeCosto: 2 });
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

  loadCentrosCosto() {
    this.centroCostoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICentroCosto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICentroCosto[]>) => response.body)
      )
      .subscribe((res: ICentroCosto[]) => (this.centrocostos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }
}

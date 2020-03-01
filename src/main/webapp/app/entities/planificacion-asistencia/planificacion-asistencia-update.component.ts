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
import { IPlanificacionAsistencia, PlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { PlanificacionAsistenciaService } from './planificacion-asistencia.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';

@Component({
  selector: 'jhi-planificacion-asistencia-update',
  templateUrl: './planificacion-asistencia-update.component.html'
})
export class PlanificacionAsistenciaUpdateComponent implements OnInit {
  isSaving: boolean;

  colaboradors: IColaborador[];

  editForm = this.fb.group({
    id: [],
    fechaInicioPlanificacion: [],
    fechaFinPlanificacion: [],
    fechaAsistenciaTurno: [],
    horaInicioTurno: [],
    horaFinTurno: [],
    nombreCargo: [],
    tiposAsistencia: [],
    minDiferenciaEntrada: [],
    minDiferenciaSalida: [],
    nombreTurno: [],
    inasistenciaJustificada: [],
    colaborador: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected planificacionAsistenciaService: PlanificacionAsistenciaService,
    protected colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ planificacionAsistencia }) => {
      this.updateForm(planificacionAsistencia);
    });
    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(planificacionAsistencia: IPlanificacionAsistencia) {
    this.editForm.patchValue({
      id: planificacionAsistencia.id,
      fechaInicioPlanificacion:
        planificacionAsistencia.fechaInicioPlanificacion != null
          ? planificacionAsistencia.fechaInicioPlanificacion.format(DATE_TIME_FORMAT)
          : null,
      fechaFinPlanificacion:
        planificacionAsistencia.fechaFinPlanificacion != null
          ? planificacionAsistencia.fechaFinPlanificacion.format(DATE_TIME_FORMAT)
          : null,
      fechaAsistenciaTurno:
        planificacionAsistencia.fechaAsistenciaTurno != null ? planificacionAsistencia.fechaAsistenciaTurno.format(DATE_TIME_FORMAT) : null,
      horaInicioTurno:
        planificacionAsistencia.horaInicioTurno != null ? planificacionAsistencia.horaInicioTurno.format(DATE_TIME_FORMAT) : null,
      horaFinTurno: planificacionAsistencia.horaFinTurno != null ? planificacionAsistencia.horaFinTurno.format(DATE_TIME_FORMAT) : null,
      nombreCargo: planificacionAsistencia.nombreCargo,
      tiposAsistencia: planificacionAsistencia.tiposAsistencia,
      minDiferenciaEntrada: planificacionAsistencia.minDiferenciaEntrada,
      minDiferenciaSalida: planificacionAsistencia.minDiferenciaSalida,
      nombreTurno: planificacionAsistencia.nombreTurno,
      inasistenciaJustificada: planificacionAsistencia.inasistenciaJustificada,
      colaborador: planificacionAsistencia.colaborador
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const planificacionAsistencia = this.createFromForm();
    if (planificacionAsistencia.id !== undefined) {
      this.subscribeToSaveResponse(this.planificacionAsistenciaService.update(planificacionAsistencia));
    } else {
      this.subscribeToSaveResponse(this.planificacionAsistenciaService.create(planificacionAsistencia));
    }
  }

  private createFromForm(): IPlanificacionAsistencia {
    return {
      ...new PlanificacionAsistencia(),
      id: this.editForm.get(['id']).value,
      fechaInicioPlanificacion:
        this.editForm.get(['fechaInicioPlanificacion']).value != null
          ? moment(this.editForm.get(['fechaInicioPlanificacion']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaFinPlanificacion:
        this.editForm.get(['fechaFinPlanificacion']).value != null
          ? moment(this.editForm.get(['fechaFinPlanificacion']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaAsistenciaTurno:
        this.editForm.get(['fechaAsistenciaTurno']).value != null
          ? moment(this.editForm.get(['fechaAsistenciaTurno']).value, DATE_TIME_FORMAT)
          : undefined,
      horaInicioTurno:
        this.editForm.get(['horaInicioTurno']).value != null
          ? moment(this.editForm.get(['horaInicioTurno']).value, DATE_TIME_FORMAT)
          : undefined,
      horaFinTurno:
        this.editForm.get(['horaFinTurno']).value != null ? moment(this.editForm.get(['horaFinTurno']).value, DATE_TIME_FORMAT) : undefined,
      nombreCargo: this.editForm.get(['nombreCargo']).value,
      tiposAsistencia: this.editForm.get(['tiposAsistencia']).value,
      minDiferenciaEntrada: this.editForm.get(['minDiferenciaEntrada']).value,
      minDiferenciaSalida: this.editForm.get(['minDiferenciaSalida']).value,
      nombreTurno: this.editForm.get(['nombreTurno']).value,
      inasistenciaJustificada: this.editForm.get(['inasistenciaJustificada']).value,
      colaborador: this.editForm.get(['colaborador']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanificacionAsistencia>>) {
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

  trackColaboradorById(index: number, item: IColaborador) {
    return item.id;
  }
}

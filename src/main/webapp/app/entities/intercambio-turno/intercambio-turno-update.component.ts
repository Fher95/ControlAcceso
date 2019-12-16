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
import { IIntercambioTurno, IntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { IntercambioTurnoService } from './intercambio-turno.service';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from 'app/entities/asignacion-turno/asignacion-turno.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';

@Component({
  selector: 'jhi-intercambio-turno-update',
  templateUrl: './intercambio-turno-update.component.html'
})
export class IntercambioTurnoUpdateComponent implements OnInit {
  isSaving: boolean;

  asignacionturnos: IAsignacionTurno[];

  colaboradors: IColaborador[];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    autorizadoPor: [],
    observaciones: [],
    colaborador1: [],
    colaborador2: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected intercambioTurnoService: IntercambioTurnoService,
    protected asignacionTurnoService: AsignacionTurnoService,
    protected colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ intercambioTurno }) => {
      this.updateForm(intercambioTurno);
    });
    this.asignacionTurnoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAsignacionTurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsignacionTurno[]>) => response.body)
      )
      .subscribe((res: IAsignacionTurno[]) => (this.asignacionturnos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(intercambioTurno: IIntercambioTurno) {
    this.editForm.patchValue({
      id: intercambioTurno.id,
      fecha: intercambioTurno.fecha != null ? intercambioTurno.fecha.format(DATE_TIME_FORMAT) : null,
      autorizadoPor: intercambioTurno.autorizadoPor,
      observaciones: intercambioTurno.observaciones,
      colaborador1: intercambioTurno.colaborador1,
      colaborador2: intercambioTurno.colaborador2
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const intercambioTurno = this.createFromForm();
    if (intercambioTurno.id !== undefined) {
      this.subscribeToSaveResponse(this.intercambioTurnoService.update(intercambioTurno));
    } else {
      this.subscribeToSaveResponse(this.intercambioTurnoService.create(intercambioTurno));
    }
  }

  private createFromForm(): IIntercambioTurno {
    return {
      ...new IntercambioTurno(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      autorizadoPor: this.editForm.get(['autorizadoPor']).value,
      observaciones: this.editForm.get(['observaciones']).value,
      colaborador1: this.editForm.get(['colaborador1']).value,
      colaborador2: this.editForm.get(['colaborador2']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIntercambioTurno>>) {
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

  trackAsignacionTurnoById(index: number, item: IAsignacionTurno) {
    return item.id;
  }

  trackColaboradorById(index: number, item: IColaborador) {
    return item.id;
  }
}

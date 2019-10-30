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
import { IAsignacionHorasExtras, AsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';
import { AsignacionHorasExtrasService } from './asignacion-horas-extras.service';
import { IAsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';
import { AsistenciaHorasExtrasService } from 'app/entities/asistencia-horas-extras/asistencia-horas-extras.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';

@Component({
  selector: 'jhi-asignacion-horas-extras-update',
  templateUrl: './asignacion-horas-extras-update.component.html'
})
export class AsignacionHorasExtrasUpdateComponent implements OnInit {
  isSaving: boolean;

  asistenciahorasextras: IAsistenciaHorasExtras[];

  colaboradors: IColaborador[];

  editForm = this.fb.group({
    id: [],
    justificacion: [],
    observaciones: [],
    fecha: [],
    horaInicio: [],
    horaFin: [],
    compensatorio: [],
    autorizadasPor: [],
    asistenciaHorasExtras: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected asignacionHorasExtrasService: AsignacionHorasExtrasService,
    protected asistenciaHorasExtrasService: AsistenciaHorasExtrasService,
    protected colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ asignacionHorasExtras }) => {
      this.updateForm(asignacionHorasExtras);
    });
    this.asistenciaHorasExtrasService
      .query({ filter: 'asignacionhorasextras-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAsistenciaHorasExtras[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsistenciaHorasExtras[]>) => response.body)
      )
      .subscribe(
        (res: IAsistenciaHorasExtras[]) => {
          if (!this.editForm.get('asistenciaHorasExtras').value || !this.editForm.get('asistenciaHorasExtras').value.id) {
            this.asistenciahorasextras = res;
          } else {
            this.asistenciaHorasExtrasService
              .find(this.editForm.get('asistenciaHorasExtras').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAsistenciaHorasExtras>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAsistenciaHorasExtras>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAsistenciaHorasExtras) => (this.asistenciahorasextras = [subRes].concat(res)),
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
  }

  updateForm(asignacionHorasExtras: IAsignacionHorasExtras) {
    this.editForm.patchValue({
      id: asignacionHorasExtras.id,
      justificacion: asignacionHorasExtras.justificacion,
      observaciones: asignacionHorasExtras.observaciones,
      fecha: asignacionHorasExtras.fecha != null ? asignacionHorasExtras.fecha.format(DATE_TIME_FORMAT) : null,
      horaInicio: asignacionHorasExtras.horaInicio != null ? asignacionHorasExtras.horaInicio.format(DATE_TIME_FORMAT) : null,
      horaFin: asignacionHorasExtras.horaFin != null ? asignacionHorasExtras.horaFin.format(DATE_TIME_FORMAT) : null,
      compensatorio: asignacionHorasExtras.compensatorio,
      autorizadasPor: asignacionHorasExtras.autorizadasPor,
      asistenciaHorasExtras: asignacionHorasExtras.asistenciaHorasExtras
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const asignacionHorasExtras = this.createFromForm();
    if (asignacionHorasExtras.id !== undefined) {
      this.subscribeToSaveResponse(this.asignacionHorasExtrasService.update(asignacionHorasExtras));
    } else {
      this.subscribeToSaveResponse(this.asignacionHorasExtrasService.create(asignacionHorasExtras));
    }
  }

  private createFromForm(): IAsignacionHorasExtras {
    return {
      ...new AsignacionHorasExtras(),
      id: this.editForm.get(['id']).value,
      justificacion: this.editForm.get(['justificacion']).value,
      observaciones: this.editForm.get(['observaciones']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      horaInicio:
        this.editForm.get(['horaInicio']).value != null ? moment(this.editForm.get(['horaInicio']).value, DATE_TIME_FORMAT) : undefined,
      horaFin: this.editForm.get(['horaFin']).value != null ? moment(this.editForm.get(['horaFin']).value, DATE_TIME_FORMAT) : undefined,
      compensatorio: this.editForm.get(['compensatorio']).value,
      autorizadasPor: this.editForm.get(['autorizadasPor']).value,
      asistenciaHorasExtras: this.editForm.get(['asistenciaHorasExtras']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsignacionHorasExtras>>) {
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

  trackAsistenciaHorasExtrasById(index: number, item: IAsistenciaHorasExtras) {
    return item.id;
  }

  trackColaboradorById(index: number, item: IColaborador) {
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
}

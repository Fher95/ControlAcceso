import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IReporteAsistenciaHorasExtras, ReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';
import { ReporteAsistenciaHorasExtrasService } from './reporte-asistencia-horas-extras.service';

@Component({
  selector: 'jhi-reporte-asistencia-horas-extras-update',
  templateUrl: './reporte-asistencia-horas-extras-update.component.html'
})
export class ReporteAsistenciaHorasExtrasUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    tipo: [],
    fechaInicio: [],
    fechaFin: []
  });

  constructor(
    protected reporteAsistenciaHorasExtrasService: ReporteAsistenciaHorasExtrasService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reporteAsistenciaHorasExtras }) => {
      this.updateForm(reporteAsistenciaHorasExtras);
    });
  }

  updateForm(reporteAsistenciaHorasExtras: IReporteAsistenciaHorasExtras) {
    this.editForm.patchValue({
      id: reporteAsistenciaHorasExtras.id,
      tipo: reporteAsistenciaHorasExtras.tipo,
      fechaInicio:
        reporteAsistenciaHorasExtras.fechaInicio != null ? reporteAsistenciaHorasExtras.fechaInicio.format(DATE_TIME_FORMAT) : null,
      fechaFin: reporteAsistenciaHorasExtras.fechaFin != null ? reporteAsistenciaHorasExtras.fechaFin.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reporteAsistenciaHorasExtras = this.createFromForm();
    if (reporteAsistenciaHorasExtras.id !== undefined) {
      this.subscribeToSaveResponse(this.reporteAsistenciaHorasExtrasService.update(reporteAsistenciaHorasExtras));
    } else {
      this.subscribeToSaveResponse(this.reporteAsistenciaHorasExtrasService.create(reporteAsistenciaHorasExtras));
    }
  }

  private createFromForm(): IReporteAsistenciaHorasExtras {
    return {
      ...new ReporteAsistenciaHorasExtras(),
      id: this.editForm.get(['id']).value,
      tipo: this.editForm.get(['tipo']).value,
      fechaInicio:
        this.editForm.get(['fechaInicio']).value != null ? moment(this.editForm.get(['fechaInicio']).value, DATE_TIME_FORMAT) : undefined,
      fechaFin: this.editForm.get(['fechaFin']).value != null ? moment(this.editForm.get(['fechaFin']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReporteAsistenciaHorasExtras>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IReporteAsistencia, ReporteAsistencia } from 'app/shared/model/reporte-asistencia.model';
import { ReporteAsistenciaService } from './reporte-asistencia.service';

@Component({
  selector: 'jhi-reporte-asistencia-update',
  templateUrl: './reporte-asistencia-update.component.html'
})
export class ReporteAsistenciaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    tipo: [],
    fechaInicio: [],
    fechaFin: []
  });

  constructor(
    protected reporteAsistenciaService: ReporteAsistenciaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reporteAsistencia }) => {
      this.updateForm(reporteAsistencia);
    });
  }

  updateForm(reporteAsistencia: IReporteAsistencia) {
    this.editForm.patchValue({
      id: reporteAsistencia.id,
      tipo: reporteAsistencia.tipo,
      fechaInicio: reporteAsistencia.fechaInicio != null ? reporteAsistencia.fechaInicio.format(DATE_TIME_FORMAT) : null,
      fechaFin: reporteAsistencia.fechaFin != null ? reporteAsistencia.fechaFin.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reporteAsistencia = this.createFromForm();
    if (reporteAsistencia.id !== undefined) {
      this.subscribeToSaveResponse(this.reporteAsistenciaService.update(reporteAsistencia));
    } else {
      this.subscribeToSaveResponse(this.reporteAsistenciaService.create(reporteAsistencia));
    }
  }

  private createFromForm(): IReporteAsistencia {
    return {
      ...new ReporteAsistencia(),
      id: this.editForm.get(['id']).value,
      tipo: this.editForm.get(['tipo']).value,
      fechaInicio:
        this.editForm.get(['fechaInicio']).value != null ? moment(this.editForm.get(['fechaInicio']).value, DATE_TIME_FORMAT) : undefined,
      fechaFin: this.editForm.get(['fechaFin']).value != null ? moment(this.editForm.get(['fechaFin']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReporteAsistencia>>) {
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

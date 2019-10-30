import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPlaneacionSemanal, PlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';
import { PlaneacionSemanalService } from './planeacion-semanal.service';

@Component({
  selector: 'jhi-planeacion-semanal-update',
  templateUrl: './planeacion-semanal-update.component.html'
})
export class PlaneacionSemanalUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    fechaInicio: [],
    fechaFin: [],
    estado: []
  });

  constructor(
    protected planeacionSemanalService: PlaneacionSemanalService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ planeacionSemanal }) => {
      this.updateForm(planeacionSemanal);
    });
  }

  updateForm(planeacionSemanal: IPlaneacionSemanal) {
    this.editForm.patchValue({
      id: planeacionSemanal.id,
      fechaInicio: planeacionSemanal.fechaInicio != null ? planeacionSemanal.fechaInicio.format(DATE_TIME_FORMAT) : null,
      fechaFin: planeacionSemanal.fechaFin != null ? planeacionSemanal.fechaFin.format(DATE_TIME_FORMAT) : null,
      estado: planeacionSemanal.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const planeacionSemanal = this.createFromForm();
    if (planeacionSemanal.id !== undefined) {
      this.subscribeToSaveResponse(this.planeacionSemanalService.update(planeacionSemanal));
    } else {
      this.subscribeToSaveResponse(this.planeacionSemanalService.create(planeacionSemanal));
    }
  }

  private createFromForm(): IPlaneacionSemanal {
    return {
      ...new PlaneacionSemanal(),
      id: this.editForm.get(['id']).value,
      fechaInicio:
        this.editForm.get(['fechaInicio']).value != null ? moment(this.editForm.get(['fechaInicio']).value, DATE_TIME_FORMAT) : undefined,
      fechaFin: this.editForm.get(['fechaFin']).value != null ? moment(this.editForm.get(['fechaFin']).value, DATE_TIME_FORMAT) : undefined,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaneacionSemanal>>) {
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

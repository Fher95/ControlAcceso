import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { INovedades, Novedades } from 'app/shared/model/novedades.model';
import { NovedadesService } from './novedades.service';

@Component({
  selector: 'jhi-novedades-update',
  templateUrl: './novedades-update.component.html'
})
export class NovedadesUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    justificacion: [],
    estado: [],
    fechaInicial: [],
    fechaFinal: []
  });

  constructor(protected novedadesService: NovedadesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ novedades }) => {
      this.updateForm(novedades);
    });
  }

  updateForm(novedades: INovedades) {
    this.editForm.patchValue({
      id: novedades.id,
      justificacion: novedades.justificacion,
      estado: novedades.estado,
      fechaInicial: novedades.fechaInicial != null ? novedades.fechaInicial.format(DATE_TIME_FORMAT) : null,
      fechaFinal: novedades.fechaFinal != null ? novedades.fechaFinal.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const novedades = this.createFromForm();
    if (novedades.id !== undefined) {
      this.subscribeToSaveResponse(this.novedadesService.update(novedades));
    } else {
      this.subscribeToSaveResponse(this.novedadesService.create(novedades));
    }
  }

  private createFromForm(): INovedades {
    return {
      ...new Novedades(),
      id: this.editForm.get(['id']).value,
      justificacion: this.editForm.get(['justificacion']).value,
      estado: this.editForm.get(['estado']).value,
      fechaInicial:
        this.editForm.get(['fechaInicial']).value != null ? moment(this.editForm.get(['fechaInicial']).value, DATE_TIME_FORMAT) : undefined,
      fechaFinal:
        this.editForm.get(['fechaFinal']).value != null ? moment(this.editForm.get(['fechaFinal']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INovedades>>) {
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

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IDevengoNomina, DevengoNomina } from 'app/shared/model/devengo-nomina.model';
import { DevengoNominaService } from './devengo-nomina.service';

@Component({
  selector: 'jhi-devengo-nomina-update',
  templateUrl: './devengo-nomina-update.component.html'
})
export class DevengoNominaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    fechaInicio: [],
    fechaFin: []
  });

  constructor(protected devengoNominaService: DevengoNominaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ devengoNomina }) => {
      this.updateForm(devengoNomina);
    });
  }

  updateForm(devengoNomina: IDevengoNomina) {
    this.editForm.patchValue({
      id: devengoNomina.id,
      fechaInicio: devengoNomina.fechaInicio != null ? devengoNomina.fechaInicio.format(DATE_TIME_FORMAT) : null,
      fechaFin: devengoNomina.fechaFin != null ? devengoNomina.fechaFin.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const devengoNomina = this.createFromForm();
    if (devengoNomina.id !== undefined) {
      this.subscribeToSaveResponse(this.devengoNominaService.update(devengoNomina));
    } else {
      this.subscribeToSaveResponse(this.devengoNominaService.create(devengoNomina));
    }
  }

  private createFromForm(): IDevengoNomina {
    return {
      ...new DevengoNomina(),
      id: this.editForm.get(['id']).value,
      fechaInicio:
        this.editForm.get(['fechaInicio']).value != null ? moment(this.editForm.get(['fechaInicio']).value, DATE_TIME_FORMAT) : undefined,
      fechaFin: this.editForm.get(['fechaFin']).value != null ? moment(this.editForm.get(['fechaFin']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDevengoNomina>>) {
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

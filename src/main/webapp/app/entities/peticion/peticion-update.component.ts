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
import { IPeticion, Peticion } from 'app/shared/model/peticion.model';
import { PeticionService } from './peticion.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';

@Component({
  selector: 'jhi-peticion-update',
  templateUrl: './peticion-update.component.html'
})
export class PeticionUpdateComponent implements OnInit {
  isSaving: boolean;

  colaboradors: IColaborador[];

  editForm = this.fb.group({
    id: [],
    tipo: [],
    fechaPeticion: [],
    motivo: [],
    constancia: [],
    fechaInicio: [],
    fechaFin: [],
    estado: [],
    autorizadoPor: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected peticionService: PeticionService,
    protected colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ peticion }) => {
      this.updateForm(peticion);
    });
    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(peticion: IPeticion) {
    this.editForm.patchValue({
      id: peticion.id,
      tipo: peticion.tipo,
      fechaPeticion: peticion.fechaPeticion != null ? peticion.fechaPeticion.format(DATE_TIME_FORMAT) : null,
      motivo: peticion.motivo,
      constancia: peticion.constancia,
      fechaInicio: peticion.fechaInicio != null ? peticion.fechaInicio.format(DATE_TIME_FORMAT) : null,
      fechaFin: peticion.fechaFin != null ? peticion.fechaFin.format(DATE_TIME_FORMAT) : null,
      estado: peticion.estado,
      autorizadoPor: peticion.autorizadoPor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const peticion = this.createFromForm();
    if (peticion.id !== undefined) {
      this.subscribeToSaveResponse(this.peticionService.update(peticion));
    } else {
      this.subscribeToSaveResponse(this.peticionService.create(peticion));
    }
  }

  private createFromForm(): IPeticion {
    return {
      ...new Peticion(),
      id: this.editForm.get(['id']).value,
      tipo: this.editForm.get(['tipo']).value,
      fechaPeticion:
        this.editForm.get(['fechaPeticion']).value != null
          ? moment(this.editForm.get(['fechaPeticion']).value, DATE_TIME_FORMAT)
          : undefined,
      motivo: this.editForm.get(['motivo']).value,
      constancia: this.editForm.get(['constancia']).value,
      fechaInicio:
        this.editForm.get(['fechaInicio']).value != null ? moment(this.editForm.get(['fechaInicio']).value, DATE_TIME_FORMAT) : undefined,
      fechaFin: this.editForm.get(['fechaFin']).value != null ? moment(this.editForm.get(['fechaFin']).value, DATE_TIME_FORMAT) : undefined,
      estado: this.editForm.get(['estado']).value,
      autorizadoPor: this.editForm.get(['autorizadoPor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeticion>>) {
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

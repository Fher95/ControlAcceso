import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT, DATE_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPeticion, Peticion } from 'app/shared/model/peticion.model';
import { PeticionService } from './peticion.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';
import { UtilidadesColaborador, UtilidadesFecha } from 'app/shared/util/utilidades-generales';

@Component({
  selector: 'jhi-peticion-update',
  templateUrl: './peticion-update.component.html'
})
export class PeticionUpdateComponent implements OnInit {
  isSaving: boolean;

  colaboradors: IColaborador[];
  colaboradorEncontrado: IColaborador = undefined;
  currentSearch: string;

  editForm = this.fb.group({
    id: [],
    tipo: [],
    tipoPermiso: [],
    fechaPeticion: [],
    motivo: [],
    constancia: [],
    fechaInicio: [],
    fechaFin: [],
    estado: [],
    autorizadoPor: [],
    colaborador: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected peticionService: PeticionService,
    protected colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected utilidadesCol: UtilidadesColaborador,
    protected utilidadesFecha: UtilidadesFecha
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
      tipoPermiso: peticion.tipoPermiso,
      fechaPeticion: peticion.fechaPeticion != null ? peticion.fechaPeticion.format(DATE_FORMAT) : null,
      motivo: peticion.motivo,
      constancia: peticion.constancia,
      fechaInicio: peticion.fechaInicio != null ? peticion.fechaInicio.format(DATE_FORMAT) : null,
      fechaFin: peticion.fechaFin != null ? peticion.fechaFin.format(DATE_FORMAT) : null,
      estado: peticion.estado,
      autorizadoPor: peticion.autorizadoPor,
      colaborador: peticion.colaborador !== undefined ? peticion.colaborador : undefined
    });
    if (peticion.id === undefined) {
      this.editForm.patchValue({ fechaPeticion: this.utilidadesFecha.getStringFecha(new Date()) });
    } else {
      if (peticion.colaborador !== undefined) {
        this.colaboradorEncontrado = peticion.colaborador;
      } else {
        this.colaboradorEncontrado = undefined;
      }
    }
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
      tipoPermiso: this.editForm.get(['tipoPermiso']).value,
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
      autorizadoPor: this.editForm.get(['autorizadoPor']).value,
      colaborador: this.editForm.get(['colaborador']).value
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

  search(parDocumento: string) {
    this.colaboradorEncontrado = undefined;

    this.colaboradorService
      .findByNumDocumento(parDocumento)
      .pipe(
        filter((res: HttpResponse<IColaborador>) => res.ok),
        map((res: HttpResponse<IColaborador>) => res.body)
      )
      .subscribe((res: IColaborador) => {
        this.colaboradorEncontrado = res;
        this.editForm.patchValue({
          colaborador: res
        });
      });
  }

  clear() {
    this.currentSearch = '';
  }

  setColaboradorEncontrado() {
    this.colaboradorEncontrado = this.editForm.get(['colaborador']).value;
  }
}

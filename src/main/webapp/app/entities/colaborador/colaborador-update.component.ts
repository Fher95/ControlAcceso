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
import { IColaborador, Colaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from './colaborador.service';
import { IPeticion } from 'app/shared/model/peticion.model';
import { PeticionService } from 'app/entities/peticion/peticion.service';
import { IAsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';
import { AsignacionHorasExtrasService } from 'app/entities/asignacion-horas-extras/asignacion-horas-extras.service';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from 'app/entities/asignacion-turno/asignacion-turno.service';
import { CentroCostoService } from 'app/entities/centro-costo/centro-costo.service';
import { CargoService } from 'app/entities/cargo/cargo.service';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { ICargo } from 'app/shared/model/cargo.model';

@Component({
  selector: 'jhi-colaborador-update',
  templateUrl: './colaborador-update.component.html'
})
export class ColaboradorUpdateComponent implements OnInit {
  isSaving: boolean;

  peticions: IPeticion[];

  asignacionhorasextras: IAsignacionHorasExtras[];

  asignacionturnos: IAsignacionTurno[];

  centrocostos: ICentroCosto[];

  cargos: ICargo[];
  centroCostoSeleccionado: number;

  editForm = this.fb.group({
    id: [],
    nombre1: [null, [Validators.required]],
    nombre2: [],
    apellido1: [null, [Validators.required]],
    apellido2: [],
    tipoDocumento: [],
    numeroDocumento: [],
    lugarExpedicion: [],
    fechaExpedicion: [],
    fechaNacimiento: [],
    direccionResidencia: [],
    barrio: [],
    fechaIngreso: [],
    tiempoRequerido: [],
    cargoDesempeniar: [],
    salario: [],
    eps: [],
    estado: [],
    fechaBaja: [],
    nivelEducativo: [],
    peticions: [],
    asignacionHorasExtras: [],
    cargos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected colaboradorService: ColaboradorService,
    protected peticionService: PeticionService,
    protected asignacionHorasExtrasService: AsignacionHorasExtrasService,
    protected asignacionTurnoService: AsignacionTurnoService,
    protected centroCostoService: CentroCostoService,
    protected cargoService: CargoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ colaborador }) => {
      this.updateForm(colaborador);
    });
    this.peticionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPeticion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPeticion[]>) => response.body)
      )
      .subscribe((res: IPeticion[]) => (this.peticions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.asignacionHorasExtrasService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAsignacionHorasExtras[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsignacionHorasExtras[]>) => response.body)
      )
      .subscribe(
        (res: IAsignacionHorasExtras[]) => (this.asignacionhorasextras = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.asignacionTurnoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAsignacionTurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsignacionTurno[]>) => response.body)
      )
      .subscribe((res: IAsignacionTurno[]) => (this.asignacionturnos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.centroCostoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICentroCosto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICentroCosto[]>) => response.body)
      )
      .subscribe((res: ICentroCosto[]) => (this.centrocostos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.loadCentroCostoId(1);
    this.centroCostoSeleccionado = -1;
  }

  updateForm(colaborador: IColaborador) {
    this.editForm.patchValue({
      id: colaborador.id,
      nombre1: colaborador.nombre1,
      nombre2: colaborador.nombre2,
      apellido1: colaborador.apellido1,
      apellido2: colaborador.apellido2,
      tipoDocumento: colaborador.tipoDocumento,
      numeroDocumento: colaborador.numeroDocumento,
      lugarExpedicion: colaborador.lugarExpedicion,
      fechaExpedicion: colaborador.fechaExpedicion != null ? colaborador.fechaExpedicion.format(DATE_TIME_FORMAT) : null,
      fechaNacimiento: colaborador.fechaNacimiento != null ? colaborador.fechaNacimiento.format(DATE_TIME_FORMAT) : null,
      direccionResidencia: colaborador.direccionResidencia,
      barrio: colaborador.barrio,
      fechaIngreso: colaborador.fechaIngreso != null ? colaborador.fechaIngreso.format(DATE_TIME_FORMAT) : null,
      tiempoRequerido: colaborador.tiempoRequerido,
      cargoDesempeniar: colaborador.cargoDesempeniar,
      salario: colaborador.salario,
      eps: colaborador.eps,
      estado: colaborador.estado,
      fechaBaja: colaborador.fechaBaja != null ? colaborador.fechaBaja.format(DATE_TIME_FORMAT) : null,
      nivelEducativo: colaborador.nivelEducativo,
      peticions: colaborador.peticions,
      asignacionHorasExtras: colaborador.asignacionHorasExtras
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const colaborador = this.createFromForm();
    if (colaborador.id !== undefined) {
      this.subscribeToSaveResponse(this.colaboradorService.update(colaborador));
    } else {
      this.subscribeToSaveResponse(this.colaboradorService.create(colaborador));
    }
  }

  private createFromForm(): IColaborador {
    return {
      ...new Colaborador(),
      id: this.editForm.get(['id']).value,
      nombre1: this.editForm.get(['nombre1']).value,
      nombre2: this.editForm.get(['nombre2']).value,
      apellido1: this.editForm.get(['apellido1']).value,
      apellido2: this.editForm.get(['apellido2']).value,
      tipoDocumento: this.editForm.get(['tipoDocumento']).value,
      numeroDocumento: this.editForm.get(['numeroDocumento']).value,
      lugarExpedicion: this.editForm.get(['lugarExpedicion']).value,
      fechaExpedicion:
        this.editForm.get(['fechaExpedicion']).value != null
          ? moment(this.editForm.get(['fechaExpedicion']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaNacimiento:
        this.editForm.get(['fechaNacimiento']).value != null
          ? moment(this.editForm.get(['fechaNacimiento']).value, DATE_TIME_FORMAT)
          : undefined,
      direccionResidencia: this.editForm.get(['direccionResidencia']).value,
      barrio: this.editForm.get(['barrio']).value,
      fechaIngreso:
        this.editForm.get(['fechaIngreso']).value != null ? moment(this.editForm.get(['fechaIngreso']).value, DATE_TIME_FORMAT) : undefined,
      tiempoRequerido: this.editForm.get(['tiempoRequerido']).value,
      cargoDesempeniar: this.editForm.get(['cargoDesempeniar']).value,
      salario: this.editForm.get(['salario']).value,
      eps: this.editForm.get(['eps']).value,
      estado: this.editForm.get(['estado']).value,
      fechaBaja:
        this.editForm.get(['fechaBaja']).value != null ? moment(this.editForm.get(['fechaBaja']).value, DATE_TIME_FORMAT) : undefined,
      nivelEducativo: this.editForm.get(['nivelEducativo']).value,
      peticions: this.editForm.get(['peticions']).value,
      asignacionHorasExtras: this.editForm.get(['asignacionHorasExtras']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IColaborador>>) {
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

  trackPeticionById(index: number, item: IPeticion) {
    return item.id;
  }

  trackAsignacionHorasExtrasById(index: number, item: IAsignacionHorasExtras) {
    return item.id;
  }

  trackAsignacionTurnoById(index: number, item: IAsignacionTurno) {
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

  loadCentroCostoId(parId: number) {
    this.cargoService
      .findCargosCentroCosto(parId)
      .pipe(
        filter((res: HttpResponse<ICargo[]>) => res.ok),
        map((res: HttpResponse<ICargo[]>) => res.body)
      )
      .subscribe((res: ICargo[]) => {
        this.cargos = res;
      });
  }

  getCantidadCargos(): number {
    return this.cargos.length;
  }

  setCentroCosto(parId: number): void {
    this.centroCostoSeleccionado = parId;
    this.loadCentroCostoId(this.centroCostoSeleccionado);
  }
}

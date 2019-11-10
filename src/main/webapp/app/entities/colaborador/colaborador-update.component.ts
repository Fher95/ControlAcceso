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
import { AntecedentesService } from 'app/entities/antecedentes/antecedentes.service';
import { TelefonoService } from 'app/entities/telefono/telefono.service';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { ICargo } from 'app/shared/model/cargo.model';
import { ITelefono } from 'app/shared/model/telefono.model';
import { TipoAntecedente } from 'app/shared/model/enumerations/tipo-antecedente.model';
import { IAntecedentes } from 'app/shared/model/antecedentes.model';

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
  varAsignacion: IAsignacionTurno;
  longitudTelefono: number;

  atrTelefono: ITelefono;
  temporal: string;

  editForm = this.fb.group({
    id: [],
    nombre1: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    nombre2: [null, [Validators.pattern('[a-zA-Z ]*')]],
    apellido1: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    apellido2: [null, [Validators.pattern('[a-zA-Z ]*')]],
    tipoDocumento: [],
    numeroDocumento: [null, [Validators.required, Validators.pattern('[0-9 ]*'), Validators.minLength(6)]],
    lugarExpedicion: [],
    fechaExpedicion: [],
    fechaNacimiento: [],
    direccionResidencia: [],
    barrio: [],
    fechaIngreso: [],
    tiempoRequerido: ['', [Validators.pattern('[0-9 ]*')]],
    cargoDesempeniar: [],
    salario: ['', [Validators.pattern('[0-9 ]*')]],
    eps: [],
    estado: [],
    fechaBaja: [],
    nivelEducativo: [],
    peticions: [],
    asignacionHorasExtras: [],
    centroDeCosto: [],
    cargo: [],
    telefono: [null, [Validators.minLength(7)]],
    tipoTelefono: [],
    antecedente1: [],
    antecedente2: [],
    antecedente3: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected colaboradorService: ColaboradorService,
    protected peticionService: PeticionService,
    protected asignacionHorasExtrasService: AsignacionHorasExtrasService,
    protected asignacionTurnoService: AsignacionTurnoService,
    protected centroCostoService: CentroCostoService,
    protected cargoService: CargoService,
    protected antecedenteService: AntecedentesService,
    protected telefonoService: TelefonoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.longitudTelefono = 7;
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ colaborador }) => {
      this.updateForm(colaborador);
    });
    /*
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
*/

    this.centroCostoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICentroCosto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICentroCosto[]>) => response.body)
      )
      .subscribe((res: ICentroCosto[]) => (this.centrocostos = res), (res: HttpErrorResponse) => this.onError(res.message));
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
      fechaExpedicion: colaborador.fechaExpedicion != null ? colaborador.fechaExpedicion.format(DATE_FORMAT) : null,
      fechaNacimiento: colaborador.fechaNacimiento != null ? colaborador.fechaNacimiento.format(DATE_FORMAT) : null,
      direccionResidencia: colaborador.direccionResidencia,
      barrio: colaborador.barrio,
      fechaIngreso: colaborador.fechaIngreso != null ? colaborador.fechaIngreso.format(DATE_FORMAT) : null,
      tiempoRequerido: colaborador.tiempoRequerido,
      cargoDesempeniar: colaborador.cargoDesempeniar,
      salario: colaborador.salario,
      eps: colaborador.eps,
      estado: colaborador.estado,
      fechaBaja: colaborador.fechaBaja != null ? colaborador.fechaBaja.format(DATE_FORMAT) : null,
      nivelEducativo: colaborador.nivelEducativo,
      peticions: colaborador.peticions,
      asignacionHorasExtras: colaborador.asignacionHorasExtras
    });

    if (colaborador.id !== undefined) {
      this.loadAsignacionTurno(colaborador.id);
      this.loadTelefonosColaborador(colaborador.id);
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

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const colaborador = this.createFromForm();
    if (colaborador.id !== undefined) {
      this.subscribeToSaveResponse(this.colaboradorService.update(colaborador), true);
    } else {
      this.subscribeToSaveResponse(this.colaboradorService.create(colaborador), false);
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IColaborador>>, update: boolean) {
    result.subscribe(() => this.onSaveSuccess(update), () => this.onSaveError());
  }

  protected onSaveSuccess(update: boolean) {
    this.guardarAsignacionCargo(update);
    this.guardarTelefono(update);
    this.guardarAntecedentes(false);
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

  loadAsignacionTurno(parIdColaborador: number) {
    this.asignacionTurnoService
      .findCargoColaborador(parIdColaborador)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno>) => res.body)
      )
      .subscribe((res: IAsignacionTurno) => {
        this.varAsignacion = res;
        this.loadCargosCentroCostoId(this.varAsignacion.cargo.centroCosto.id);
        this.editForm.patchValue({
          centroDeCosto: this.varAsignacion.cargo.centroCosto.id,
          cargo: this.varAsignacion.cargo
        });
      });
  }
  loadCargosCentroCostoId(parId: number) {
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

  loadTelefonosColaborador(parIdColaborador: number) {
    let arrayTelefonos: ITelefono[];
    this.telefonoService
      .findTelefonosColaborador(parIdColaborador)
      .pipe(
        filter((res: HttpResponse<ITelefono[]>) => res.ok),
        map((res: HttpResponse<ITelefono[]>) => res.body)
      )
      .subscribe((res: ITelefono[]) => {
        arrayTelefonos = res;
        if (arrayTelefonos.length > 0) {
          this.atrTelefono = arrayTelefonos[arrayTelefonos.length - 1];
          this.editForm.patchValue({
            tipoTelefono: arrayTelefonos[arrayTelefonos.length - 1].tipo,
            telefono: arrayTelefonos[arrayTelefonos.length - 1].numero
          });
        }
      });
  }

  getCantidadCargos(): number {
    return this.cargos.length;
  }

  setCentroCosto(parId: number): void {
    this.centroCostoSeleccionado = parId;
    this.loadCargosCentroCostoId(this.centroCostoSeleccionado);
  }
  cargarCargos() {
    this.loadCargosCentroCostoId(this.editForm.get(['centroDeCosto']).value);
  }

  getUltimoColaborador(): number {
    return this.colaboradorService.idUltimoColaborador;
  }

  guardarAsignacionCargo(update: boolean) {
    const idColaborador = this.getUltimoColaborador();
    const objCargo = this.editForm.get(['cargo']).value;

    if (update) {
      if (this.varAsignacion === null || this.varAsignacion === undefined) {
        const objAsignacion = {
          colaboradors: [
            {
              id: this.editForm.get(['id']).value
            }
          ],
          cargo: objCargo
        };
        this.asignacionTurnoService.create(objAsignacion).subscribe();
      } else {
        this.varAsignacion.cargo = objCargo;
        this.asignacionTurnoService.update(this.varAsignacion).subscribe();
      }
    } else {
      const objAsignacion = {
        colaboradors: [
          {
            id: idColaborador
          }
        ],
        cargo: objCargo
      };
      this.asignacionTurnoService.create(objAsignacion).subscribe();
    }
  }

  guardarAntecedentes(update: boolean) {
    const ant1: String = this.editForm.get(['antecedente1']).value;
    const ant2: String = this.editForm.get(['antecedente2']).value;
    const ant3: String = this.editForm.get(['antecedente3']).value;

    if (update) {
      const objAntecedente1: IAntecedentes = {
        tipo: TipoAntecedente.Disciplinario,
        colaborador: { id: this.editForm.get(['id']).value }
      };
      this.antecedenteService.create(objAntecedente1).subscribe();
    } else {
      const idColaborador = this.getUltimoColaborador();
      if (ant1 === 'Si') {
        const objAntecedente2 = { tipo: TipoAntecedente.Disciplinario, colaborador: { id: idColaborador } };
        this.antecedenteService.create(objAntecedente2).subscribe();
      }
      if (ant2 === 'Si') {
        const objAntecedente2 = { tipo: 'Penal' as TipoAntecedente, colaborador: { id: idColaborador } };
        this.antecedenteService.create(objAntecedente2).subscribe();
      }
      if (ant3 === 'Si') {
        const objAntecedente3 = { tipo: 'Fiscal' as TipoAntecedente, colaborador: { id: idColaborador } };
        this.antecedenteService.create(objAntecedente3).subscribe();
      }
    }
  }

  guardarTelefono(update: boolean) {
    const varTelefono = this.editForm.get(['telefono']).value;
    const tipoTelefono = this.editForm.get(['tipoTelefono']).value;
    if (this.editForm.get(['telefono']).value != null) {
      if (update && this.atrTelefono != null) {
        this.atrTelefono.numero = varTelefono;
        this.atrTelefono.tipo = tipoTelefono;
        this.telefonoService.update(this.atrTelefono).subscribe();
      } else {
        const idColaborador = this.getUltimoColaborador();
        const objTelefono = { numero: varTelefono, colaborador: { id: idColaborador }, tipo: tipoTelefono };
        this.telefonoService.create(objTelefono).subscribe();
      }
    }
  }

  setLongitudTelefono(): void {
    const tipo: String = this.editForm.get(['tipoTelefono']).value;
    if (tipo === 'Fijo') {
      this.longitudTelefono = 7;
    } else if (tipo === 'Celular') {
      this.longitudTelefono = 10;
    }
    this.editForm.get(['telefono']).setValidators([Validators.minLength(this.longitudTelefono)]);
  }
}

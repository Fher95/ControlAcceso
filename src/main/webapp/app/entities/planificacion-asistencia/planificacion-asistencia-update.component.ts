import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT, DATE_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPlanificacionAsistencia, PlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { PlanificacionAsistenciaService } from './planificacion-asistencia.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';
import { ITurno } from 'app/shared/model/turno.model';
import { TurnoService } from 'app/entities/turno/turno.service';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo/cargo.service';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { CentroCostoService } from 'app/entities/centro-costo/centro-costo.service';
import { UtilidadesFecha, UtilidadesColaborador } from 'app/shared/util/utilidades-generales';
import { isUndefined } from 'util';

@Component({
  selector: 'jhi-planificacion-asistencia-update',
  templateUrl: './planificacion-asistencia-update.component.html'
})
export class PlanificacionAsistenciaUpdateComponent implements OnInit {
  isSaving: boolean;
  strCargo = '';
  colaboradors: IColaborador[];

  turnos: ITurno[];

  cargos: ICargo[];

  centrosCosto: ICentroCosto[];

  planEncontrada = false;

  planificacionObtenida: IPlanificacionAsistencia;

  currentSearch;

  editForm = this.fb.group({
    id: [],
    fechaInicioPlanificacion: [],
    fechaFinPlanificacion: [],
    fechaAsistenciaTurno: [],
    horaInicioTurno: [],
    horaFinTurno: [],
    nombreCargo: [],
    tiposAsistencia: [],
    minDiferenciaEntrada: [],
    minDiferenciaSalida: [],
    nombreTurno: [],
    inasistenciaJustificada: [],
    colaborador: [],
    centroDeCosto: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected planificacionAsistenciaService: PlanificacionAsistenciaService,
    protected colaboradorService: ColaboradorService,
    protected turnoService: TurnoService,
    protected cargoService: CargoService,
    protected centroCostoService: CentroCostoService,
    protected utilDate: UtilidadesFecha,
    protected utilCol: UtilidadesColaborador,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ planificacionAsistencia }) => {
      this.updateForm(planificacionAsistencia);
    });
    this.loadAllCentroCosto();
    this.loadCargos();
    this.loadTurnos();
    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(planificacionAsistencia: IPlanificacionAsistencia) {
    this.editForm.patchValue({
      id: planificacionAsistencia.id,
      fechaInicioPlanificacion:
        planificacionAsistencia.fechaInicioPlanificacion != null
          ? planificacionAsistencia.fechaInicioPlanificacion.format(DATE_TIME_FORMAT)
          : null,
      fechaFinPlanificacion:
        planificacionAsistencia.fechaFinPlanificacion != null
          ? planificacionAsistencia.fechaFinPlanificacion.format(DATE_TIME_FORMAT)
          : null,
      fechaAsistenciaTurno:
        planificacionAsistencia.fechaAsistenciaTurno != null ? planificacionAsistencia.fechaAsistenciaTurno.format(DATE_FORMAT) : null,
      horaInicioTurno:
        planificacionAsistencia.horaInicioTurno != null ? planificacionAsistencia.horaInicioTurno.format(DATE_TIME_FORMAT) : null,
      horaFinTurno: planificacionAsistencia.horaFinTurno != null ? planificacionAsistencia.horaFinTurno.format(DATE_TIME_FORMAT) : null,
      nombreCargo: planificacionAsistencia.nombreCargo,
      tiposAsistencia: planificacionAsistencia.tiposAsistencia,
      minDiferenciaEntrada: planificacionAsistencia.minDiferenciaEntrada,
      minDiferenciaSalida: planificacionAsistencia.minDiferenciaSalida,
      nombreTurno: planificacionAsistencia.nombreTurno,
      inasistenciaJustificada: planificacionAsistencia.inasistenciaJustificada,
      colaborador: planificacionAsistencia.colaborador
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const planificacionAsistencia = this.createFromForm();
    if (planificacionAsistencia.id !== undefined) {
      this.subscribeToSaveResponse(this.planificacionAsistenciaService.update(planificacionAsistencia));
    } else {
      this.subscribeToSaveResponse(this.planificacionAsistenciaService.create(planificacionAsistencia));
    }
  }

  private createFromForm(): IPlanificacionAsistencia {
    return {
      ...new PlanificacionAsistencia(),
      id: this.editForm.get(['id']).value,
      fechaInicioPlanificacion:
        this.editForm.get(['fechaInicioPlanificacion']).value != null
          ? moment(this.editForm.get(['fechaInicioPlanificacion']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaFinPlanificacion:
        this.editForm.get(['fechaFinPlanificacion']).value != null
          ? moment(this.editForm.get(['fechaFinPlanificacion']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaAsistenciaTurno:
        this.editForm.get(['fechaAsistenciaTurno']).value != null
          ? moment(this.editForm.get(['fechaAsistenciaTurno']).value, DATE_TIME_FORMAT)
          : undefined,
      horaInicioTurno:
        this.editForm.get(['horaInicioTurno']).value != null
          ? moment(this.editForm.get(['horaInicioTurno']).value, DATE_TIME_FORMAT)
          : undefined,
      horaFinTurno:
        this.editForm.get(['horaFinTurno']).value != null ? moment(this.editForm.get(['horaFinTurno']).value, DATE_TIME_FORMAT) : undefined,
      nombreCargo: this.editForm.get(['nombreCargo']).value,
      tiposAsistencia: this.editForm.get(['tiposAsistencia']).value,
      minDiferenciaEntrada: this.editForm.get(['minDiferenciaEntrada']).value,
      minDiferenciaSalida: this.editForm.get(['minDiferenciaSalida']).value,
      nombreTurno: this.editForm.get(['nombreTurno']).value,
      inasistenciaJustificada: this.editForm.get(['inasistenciaJustificada']).value,
      colaborador: this.editForm.get(['colaborador']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanificacionAsistencia>>) {
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

  comprobarPlanificacion() {
    const fecha = this.editForm.get(['fechaAsistenciaTurno']).value;
    if (fecha !== null && fecha !== undefined && fecha !== '') {
      this.planificacionAsistenciaService.findRegistroActual(fecha).subscribe(
        (res: HttpResponse<IPlanificacionAsistencia>) => this.cambiarEstadoEncontrado(res),
        () => {
          this.planEncontrada = false;
        }
      );
    }
  }

  /**
   * Recibe una respuesta de httpResponse, verifica su codigo, y si tiene contenido obtiene el objeto
   * PlanificacionAsistencia
   * @param res objeto respuesta tipo HttpRespose<PlanificacionAsistencia
   */
  cambiarEstadoEncontrado(res: HttpResponse<IPlanificacionAsistencia>) {
    if (res.status === 204) {
      this.planEncontrada = false;
      this.planificacionObtenida = undefined;
      this.editForm.patchValue({
        fechaInicioPlanificacion: null,
        fechaFinPlanificacion: null
      });
    } else {
      this.planEncontrada = true;
      this.planificacionObtenida = res.body;
      this.editForm.patchValue({
        fechaInicioPlanificacion:
          this.planificacionObtenida.fechaInicioPlanificacion != null
            ? this.planificacionObtenida.fechaInicioPlanificacion.format(DATE_TIME_FORMAT)
            : null,
        fechaFinPlanificacion:
          this.planificacionObtenida.fechaFinPlanificacion != null
            ? this.planificacionObtenida.fechaFinPlanificacion.format(DATE_TIME_FORMAT)
            : null
      });
    }
  }

  loadTurnos() {
    this.turnoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITurno[]>) => response.body)
      )
      .subscribe(
        (res: ITurno[]) => {
          this.turnos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadCargos() {
    this.cargoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICargo[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICargo[]>) => response.body)
      )
      .subscribe(
        (res: ICargo[]) => {
          this.cargos = res.filter((cargo: ICargo) => cargo.centroCosto !== null);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  cargarCargos() {
    if (this.editForm.get('centroDeCosto').value === 'todos') {
      this.loadCargos();
    } else {
      const idCentroCosto: number = this.editForm.get('centroDeCosto').value;
      this.loadCargosCentroCostoId(idCentroCosto);
    }
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

  loadAllCentroCosto() {
    this.centroCostoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICentroCosto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICentroCosto[]>) => response.body)
      )
      .subscribe((res: ICentroCosto[]) => (this.centrosCosto = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  setNombreCargo(parNombre: string) {
    this.editForm.patchValue({ nombreCargo: parNombre });
  }

  setHorarioTurno() {
    if (this.planificacionObtenida !== undefined) {
      const nombreTurno: string = this.editForm.get('nombreTurno').value;
      this.turnos.forEach(element => {
        if (element.nombre === nombreTurno) {
          const horaEntrada = element.horaInicio.toDate();
          const fechaAsis = this.planificacionObtenida.fechaAsistenciaTurno.toDate();
          fechaAsis.setHours(horaEntrada.getHours());
          fechaAsis.setMinutes(horaEntrada.getMinutes());
          this.planificacionObtenida.horaInicioTurno = this.utilDate.convertirDateAMoment(fechaAsis);
          fechaAsis.setHours(fechaAsis.getHours() + element.duracion);
          this.planificacionObtenida.horaFinTurno = this.utilDate.convertirDateAMoment(fechaAsis);
          this.editForm.patchValue({
            horaInicioTurno: this.planificacionObtenida.horaInicioTurno,
            horaFinTurno: this.planificacionObtenida.horaFinTurno
          });
        }
      });
    }
  }

  search(parStrNombres: string) {
    // Si la cadena de busqueda contiene numero, entonces la busca de colaboradores se hará por id.
    if (this.contieneNumeros(parStrNombres)) {
      this.colaboradorService.findByNumDocumento(parStrNombres).subscribe(
        (res: HttpResponse<IColaborador[]>) => {
          this.setColaboradores(res.body);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    } else {
      // De lo contrario se busca por los nombres
      const listaDatos: string[] = this.getArrayPalabras(parStrNombres);
      this.colaboradorService.findByNombres(listaDatos).subscribe(
        (res: HttpResponse<IColaborador[]>) => {
          this.setColaboradores(res.body);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
  }

  setColaboradores(parLista: IColaborador[]) {
    this.colaboradors = parLista;
    if (this.colaboradors.length > 0) {
      this.editForm.patchValue({ colaborador: this.colaboradors[0] });
    }
  }

  clear() {
    this.currentSearch = '';
  }

  getArrayPalabras(nombres: string): string[] {
    const arrayInicial = nombres.split(' ');
    const arrayFinal = arrayInicial.filter((valor: string) => valor !== '');
    return arrayFinal;
  }
  contieneNumeros(parCadena: string): boolean {
    const str = parCadena.trim();
    if (
      str.includes('0') ||
      str.includes('1') ||
      str.includes('2') ||
      str.includes('3') ||
      str.includes('4') ||
      str.includes('5') ||
      str.includes('6') ||
      str.includes('7') ||
      str.includes('8') ||
      str.includes('9')
    ) {
      return true;
    } else {
      return false;
    }
  }
}

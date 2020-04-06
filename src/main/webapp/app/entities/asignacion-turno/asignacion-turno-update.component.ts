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
import { IAsignacionTurno, AsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from './asignacion-turno.service';
import { ITurno, Turno } from 'app/shared/model/turno.model';
import { TurnoService } from 'app/entities/turno/turno.service';
import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { AsistenciaPlaneacionService } from 'app/entities/asistencia-planeacion/asistencia-planeacion.service';
import { IPlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';
import { PlaneacionSemanalService } from 'app/entities/planeacion-semanal/planeacion-semanal.service';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo/cargo.service';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { CentroCostoService } from '../centro-costo/centro-costo.service';
import { UtilidadesString, UtilidadesColaborador } from 'app/shared/util/utilidades-generales';

@Component({
  selector: 'jhi-asignacion-turno-update',
  templateUrl: './asignacion-turno-update.component.html',
  styleUrls: ['../../shared/css/estilos-turno.scss']
})
export class AsignacionTurnoUpdateComponent implements OnInit {
  isSaving: boolean;

  turnos: ITurno[];

  intercambioturnos: IIntercambioTurno[];

  asistenciaplaneacions: IAsistenciaPlaneacion[];

  colaboradors: IColaborador[];

  colaboradoresSeleccionados: IColaborador[];

  planeacionsemanals: IPlaneacionSemanal[];

  cargos: ICargo[];
  varAsignacion: IAsignacionTurno;

  currentSearch: string;
  colaboradorEncontrado: IColaborador;
  centrocostos: ICentroCosto[];
  strAsginaciones = 'Sin asignacion';
  asignacionesColSeleccionado: IAsignacionTurno[];
  seleccionTurnoInvalida = false;
  maximoAsignacionesExcedido = false;

  editForm = this.fb.group({
    id: [],
    fecha: [],
    turno: [this, [Validators.required]],
    colaboradors: [],
    planeacionSemanal: [],
    cargo: [this, [Validators.required]],
    centroDeCosto: []
  });
  seEncontraronColaboradores = true;

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected asignacionTurnoService: AsignacionTurnoService,
    protected turnoService: TurnoService,
    protected asistenciaPlaneacionService: AsistenciaPlaneacionService,
    protected colaboradorService: ColaboradorService,
    protected planeacionSemanalService: PlaneacionSemanalService,
    protected cargoService: CargoService,
    protected centroCostoService: CentroCostoService,
    protected activatedRoute: ActivatedRoute,
    private utilString: UtilidadesString,
    public utilCol: UtilidadesColaborador,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ asignacionTurno }) => {
      this.updateForm(asignacionTurno);
    });
    this.loadColaboradores();
    this.loadAllCentroCosto();
    this.loadTurnos();
    // this.loadAsistenciaPlaneaciones();
    // this.loadPlaneacionesSemanales();
    this.loadCargos();
  }

  updateForm(asignacionTurno: IAsignacionTurno) {
    this.editForm.patchValue({
      id: asignacionTurno.id,
      fecha: asignacionTurno.fecha != null ? asignacionTurno.fecha.format(DATE_FORMAT) : null,
      turno: asignacionTurno.turno,
      colaboradors: asignacionTurno.colaboradors,
      cargo: asignacionTurno.cargo
    });
    if (asignacionTurno.id === undefined) {
      this.editForm.patchValue({ fecha: this.getStringFecha(new Date()) });
    } else {
      this.setColaboradorSeleccionado();
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const asignacionTurno = this.createFromForm();
    if (asignacionTurno.id !== undefined) {
      this.subscribeToSaveResponse(this.asignacionTurnoService.update(asignacionTurno));
    } else {
      this.subscribeToSaveResponse(this.asignacionTurnoService.create(asignacionTurno));
    }
  }

  private createFromForm(): IAsignacionTurno {
    return {
      ...new AsignacionTurno(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      turno: this.editForm.get(['turno']).value,
      colaboradors: this.editForm.get(['colaboradors']).value,
      cargo: this.editForm.get(['cargo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsignacionTurno>>) {
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

  trackTurnoById(index: number, item: ITurno) {
    return item.id;
  }

  trackIntercambioTurnoById(index: number, item: IIntercambioTurno) {
    return item.id;
  }

  trackColaboradorById(index: number, item: IColaborador) {
    return item.id;
  }

  trackAsistenciaPlaneacionById(index: number, item: IAsistenciaPlaneacion) {
    return item.id;
  }

  trackPlaneacionSemanalById(index: number, item: IPlaneacionSemanal) {
    return item.id;
  }

  trackCargoById(index: number, item: ICargo) {
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

  loadTurnos() {
    this.turnoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITurno[]>) => response.body)
      )
      .subscribe(
        (res: ITurno[]) => {
          if (!this.editForm.get('turno').value || !this.editForm.get('turno').value.id) {
            this.turnos = res;
            this.turnos.sort((t1, t2) => (t1.id > t2.id ? 1 : -1));
          } else {
            this.turnoService
              .find(this.editForm.get('turno').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ITurno>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ITurno>) => subResponse.body)
              )
              .subscribe(
                (subRes: ITurno) => (this.turnos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadAsistenciaPlaneaciones() {
    this.asistenciaPlaneacionService
      .query({ filter: 'asignacionturno-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAsistenciaPlaneacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsistenciaPlaneacion[]>) => response.body)
      )
      .subscribe(
        (res: IAsistenciaPlaneacion[]) => {
          if (!this.editForm.get('asistenciaPlaneacion').value || !this.editForm.get('asistenciaPlaneacion').value.id) {
            this.asistenciaplaneacions = res;
          } else {
            this.asistenciaPlaneacionService
              .find(this.editForm.get('asistenciaPlaneacion').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAsistenciaPlaneacion>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAsistenciaPlaneacion>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAsistenciaPlaneacion) => (this.asistenciaplaneacions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPlaneacionesSemanales() {
    this.planeacionSemanalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaneacionSemanal[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaneacionSemanal[]>) => response.body)
      )
      .subscribe((res: IPlaneacionSemanal[]) => (this.planeacionsemanals = res), (res: HttpErrorResponse) => this.onError(res.message));
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

  loadColaboradores() {
    this.colaboradorService
      .query({ soloLaboral: true })
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  searchColaborador(parStrBusqueda: string) {
    this.colaboradorEncontrado = undefined;
    // Si la variable de busqueda contiene numeros, se buscan los colaboradores por num documento
    if (this.utilString.contieneNumeros(parStrBusqueda)) {
      this.buscarColsPorDocumento(parStrBusqueda);
    } else {
      // De lo contrario se buscan por sus nombres
      if (parStrBusqueda !== '') {
        this.buscarColsPorNombres(parStrBusqueda);
      } else {
        this.loadColaboradores();
        this.editForm.patchValue({
          colaboradors: undefined
        });
      }
      this.setColaboradorSeleccionado();
    }
  }

  clear(): void {
    this.currentSearch = '';
    this.seEncontraronColaboradores = true;
  }

  loadAsignacionTurno(parIdColaborador: number) {
    this.editForm.patchValue({ id: undefined, centroDeCosto: undefined, cargo: undefined });
    this.asignacionTurnoService
      .findAsignacionesColaborador(parIdColaborador)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      )
      .subscribe((res: IAsignacionTurno[]) => {
        this.varAsignacion = res[0];
        if (this.varAsignacion !== undefined) {
          this.setAsignacionTurno(this.varAsignacion.id);
          this.loadCargosCentroCostoId(this.varAsignacion.cargo.centroCosto.id);
          this.editForm.patchValue({
            centroDeCosto: this.varAsignacion.cargo.centroCosto.id ? this.varAsignacion.cargo.centroCosto.id : []
          });
        } else {
          this.editForm.patchValue({
            id: undefined,
            centroDeCosto: [],
            cargo: []
          });
        }
      });
  }

  setAsignacionTurno(id: number) {
    this.asignacionTurnoService
      .find(id)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno>) => res.body)
      )
      .subscribe(res => {
        this.updateForm(res);
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

  /**
   * Método que se activa al seleccionar un colaborador, se establece el atributo colaboradorEncontrado
   * y además se buscan todas las asignaciones actuales para ese colaborador
   */
  setColaboradorSeleccionado(): void {
    this.colaboradorEncontrado = this.editForm.get(['colaboradors']).value[0];
    // this.colaboradoresSeleccionados = [this.colaboradorEncontrado];
    // this.loadAsignacionTurno(this.colaboradorEncontrado.id);
    // this.currentSearch = this.colaboradorEncontrado.numeroDocumento;
    this.turnosCargosColaborador(this.colaboradorEncontrado.id);
  }

  cargarCargos() {
    if (this.editForm.get(['centroDeCosto']).value === 'cualquiera') {
      this.loadCargos();
    } else {
      this.loadCargosCentroCostoId(this.editForm.get(['centroDeCosto']).value);
    }
  }

  loadAllCentroCosto() {
    this.centroCostoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICentroCosto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICentroCosto[]>) => response.body)
      )
      .subscribe((res: ICentroCosto[]) => (this.centrocostos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  /**
   * Obtiene todos las asignaciones (objetos tipo IAsignacionTurno) que le pertenecen a un Colaborador
   * y las guarda en el atributo asignacionesColSeleccionado: IAsignacionTurno[], además, devuelve
   * una cadena de texto con el nombre del turno y el cargo de las asignaciones
   * @param parId number: Identificador del objeto Colaborador
   */
  turnosCargosColaborador(parId: number): string {
    let result = 'No asignado';
    this.maximoAsignacionesExcedido = false;
    this.strAsginaciones = result;
    this.asignacionesColSeleccionado = [];
    this.asignacionTurnoService
      .findAsignacionesColaborador(parId)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      )
      .subscribe((res: IAsignacionTurno[]) => {
        if (res.length > 0) {
          result = '';
          this.asignacionesColSeleccionado = res;
          res.forEach(element => {
            // Verifica si hay alguna asignación sin conclusa (una asignación sin turno)
            if (element.turno === null) {
              this.editForm.patchValue({
                cargo: element.cargo,
                id: element.id
              });
            } else {
              result += element.turno.nombre + ' - ' + element.cargo.nombre + ' || ';
            }
          });
          if (res.length >= 2) {
            this.maximoAsignacionesExcedido = true;
          }
          this.strAsginaciones = result;
        }
      });
    return result;
  }

  getCadenaAsignacion(parAsignacion: IAsignacionTurno): string {
    let result = '';
    result = parAsignacion.turno.nombre + ' - ' + parAsignacion.cargo.nombre;
    return result;
  }

  // Recibe un obj asignación, y le establece una fechaFin a la asignación para que deje de ser actual
  desasignarTurno(parAsignacion: IAsignacionTurno) {
    const fechaHoraActual: Date = new Date();
    const momentoActual = moment(fechaHoraActual.toDateString());
    parAsignacion.fechaFin = momentoActual;
    this.asignacionTurnoService.update2(parAsignacion).subscribe(
      () => {
        this.jhiAlertService.success('controlAccesoApp.asignacionTurno.desasignacion.exitosa', null, null);
        this.turnosCargosColaborador(this.colaboradorEncontrado.id);
      },
      () => this.jhiAlertService.error('controlAccesoApp.asignacionTurno.desasignacion.error', null, null)
    );
  }

  /**
   * Recibe un objeto tipo Date y crea un cadena con el formato YYYY-MM-DD
   * @param parFecha Objeto de tipo Date
   */
  getStringFecha(parFecha: Date): string {
    let res = '';
    res = parFecha.getFullYear().toString() + '-';
    if (parFecha.getMonth() + 1 < 10) {
      res += '0';
    }
    res += (parFecha.getMonth() + 1).toString() + '-';
    if (parFecha.getDate() < 10) {
      res += '0';
    }
    res += parFecha.getDate().toString();
    return res;
  }

  /**
   * Recibe dos objetos Turno y compara sus atributos 'horaInicio' y 'duracion' para verificar si se cruzan o no
   * @param turno1 Objeto de tipo ITurno
   * @param turno2 Objeto de tipo ITurno
   */
  turnosCruzados(turno1: ITurno, turno2: ITurno): boolean {
    let resultado = false;
    if (turno1 !== null && turno2 !== null) {
      const fechaHora1 = new Date(turno1.horaInicio.toString());
      const fechaHora2 = new Date(turno2.horaInicio.toString());
      const horaInicio1 = fechaHora1.getHours();
      const horaFin1 = fechaHora1.getHours() + turno1.duracion;
      const horaInicio2 = fechaHora2.getHours();
      const horaFin2 = fechaHora2.getHours() + turno2.duracion;
      // Compara si la hora de inicio del turno2 está dentro del horario de turno1
      if (horaInicio2 > horaInicio1 && horaInicio2 < horaFin1) {
        resultado = true;
      }
      // Compara si la hora de inicio del turno1 está dentro del intervalo horario de turno2
      if (horaInicio1 > horaInicio2 && horaInicio1 < horaFin2) {
        resultado = true;
      }
      // Compara si ambos turnos inician al mismo tiempo
      if (horaInicio1 === horaInicio2) {
        resultado = true;
      }
    }
    return resultado;
  }

  /**
   * Verifica que el turno seleccionado para la nueva asignación no se cruce con la asignación
   * actual de ese colaborador. Actualiza el atributo seleccionTurnoInvalida: boolean
   */

  comprobarSeleccionTurno() {
    this.seleccionTurnoInvalida = false;
    const turnoSeleccionado: Turno = this.editForm.get(['turno']).value;
    this.asignacionesColSeleccionado.forEach(asignacion => {
      if (this.turnosCruzados(turnoSeleccionado, asignacion.turno)) {
        this.seleccionTurnoInvalida = true;
      }
    });
  }

  buscarColsPorNombres(parCadena: string) {
    const listaDatos: string[] = this.utilString.getArrayPalabras(parCadena);
    this.colaboradorService
      .findByNombres(listaDatos)
      .pipe(
        filter((res: HttpResponse<IColaborador[]>) => res.ok),
        map((res: HttpResponse<IColaborador[]>) => res.body)
      )
      .subscribe(
        (res: IColaborador[]) => {
          if (res.length >= 1) {
            this.seEncontraronColaboradores = true;
            this.colaboradors = res;
            this.colaboradorEncontrado = res[0];
            this.turnosCargosColaborador(this.colaboradorEncontrado.id);
            const arrCol: IColaborador[] = [res[0]];

            this.editForm.patchValue({
              colaboradors: arrCol
            });
          } else {
            this.seEncontraronColaboradores = false;
            this.loadColaboradores();
            this.colaboradorEncontrado = undefined;
            this.editForm.patchValue({
              colaboradors: undefined
            });
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  buscarColsPorDocumento(parNumDocumento: string) {
    this.colaboradorService
      .findByNumDocumento(parNumDocumento)
      .pipe(
        filter((res: HttpResponse<IColaborador[]>) => res.ok),
        map((res: HttpResponse<IColaborador[]>) => res.body)
      )
      .subscribe((res: IColaborador[]) => {
        if (res.length >= 1) {
          this.seEncontraronColaboradores = true;
          this.colaboradors = res;
          this.colaboradorEncontrado = res[0];
          this.turnosCargosColaborador(this.colaboradorEncontrado.id);
          this.editForm.patchValue({
            colaboradors: [res[0]]
          });
        } else {
          this.seEncontraronColaboradores = false;
          this.loadColaboradores();
          this.colaboradorEncontrado = undefined;
          this.editForm.patchValue({
            colaboradors: undefined
          });
        }
      });
  }
}

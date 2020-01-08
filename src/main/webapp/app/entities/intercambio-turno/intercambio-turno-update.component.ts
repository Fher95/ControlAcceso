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
import { IIntercambioTurno, IntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { IntercambioTurnoService } from './intercambio-turno.service';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from 'app/entities/asignacion-turno/asignacion-turno.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';
import { ITurno } from 'app/shared/model/turno.model';

@Component({
  selector: 'jhi-intercambio-turno-update',
  templateUrl: './intercambio-turno-update.component.html'
})
export class IntercambioTurnoUpdateComponent implements OnInit {
  isSaving: boolean;

  asignacionturnos1: IAsignacionTurno[];

  asignacionturnos2: IAsignacionTurno[];

  colaboradors: IColaborador[];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    autorizadoPor: [],
    observaciones: [],
    asignacionTurno1: [],
    asignacionTurno2: [],
    colaborador1: [],
    colaborador2: [],
    radioButton: ['dia']
  });
  asignaciones1: IAsignacionTurno[];
  asignacionSeleccionada1: IAsignacionTurno;
  asignacionSeleccionada2: IAsignacionTurno;
  currentSearch: string;
  colaboradorEncontrado: IColaborador;
  radioButton = '';

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected intercambioTurnoService: IntercambioTurnoService,
    protected asignacionTurnoService: AsignacionTurnoService,
    protected colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ intercambioTurno }) => {
      this.updateForm(intercambioTurno);
    });

    /*
    this.asignacionTurnoService
      .query({ filter: 'intercambioturno-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAsignacionTurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsignacionTurno[]>) => response.body)
      )
      .subscribe(
        (res: IAsignacionTurno[]) => {
          if (!this.editForm.get('asignacionTurno1').value || !this.editForm.get('asignacionTurno1').value.id) {
            this.asignacionturnos1 = res;
          } else {
            this.asignacionTurnoService
              .find(this.editForm.get('asignacionTurno1').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAsignacionTurno>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAsignacionTurno>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAsignacionTurno) => (this.asignacionturnos1 = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.asignacionTurnoService
      .query({ filter: 'intercambioturno-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAsignacionTurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsignacionTurno[]>) => response.body)
      )
      .subscribe(
        (res: IAsignacionTurno[]) => {
          if (!this.editForm.get('asignacionTurno2').value || !this.editForm.get('asignacionTurno2').value.id) {
            this.asignacionturnos2 = res;
          } else {
            this.asignacionTurnoService
              .find(this.editForm.get('asignacionTurno2').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAsignacionTurno>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAsignacionTurno>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAsignacionTurno) => (this.asignacionturnos2 = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
        */

    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(intercambioTurno: IIntercambioTurno) {
    this.editForm.patchValue({
      id: intercambioTurno.id,
      fecha: intercambioTurno.fecha != null ? intercambioTurno.fecha.format(DATE_TIME_FORMAT) : null,
      autorizadoPor: intercambioTurno.autorizadoPor,
      observaciones: intercambioTurno.observaciones,
      asignacionTurno1: intercambioTurno.asignacionTurno1,
      asignacionTurno2: intercambioTurno.asignacionTurno2,
      colaborador1: intercambioTurno.colaborador1,
      colaborador2: intercambioTurno.colaborador2
    });
    if (intercambioTurno.id === undefined) {
      this.editForm.patchValue({ fecha: this.getStringFecha(new Date()) });
    }
    if (intercambioTurno.colaborador1 !== undefined) {
      this.setColaboradorSeleccionado(1);
    }
    if (intercambioTurno.colaborador2 !== undefined) {
      this.setColaboradorSeleccionado(2);
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const intercambioTurno = this.createFromForm();
    if (intercambioTurno.id !== undefined) {
      this.subscribeToSaveResponse(this.intercambioTurnoService.update(intercambioTurno));
    } else {
      this.cambiarTurnosAsignados(this.asignacionSeleccionada1, this.asignacionSeleccionada2);
      this.subscribeToSaveResponse(this.intercambioTurnoService.create(intercambioTurno));
    }
  }

  private createFromForm(): IIntercambioTurno {
    return {
      ...new IntercambioTurno(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      autorizadoPor: this.editForm.get(['autorizadoPor']).value,
      observaciones: this.editForm.get(['observaciones']).value,
      asignacionTurno1: this.editForm.get(['asignacionTurno1']).value,
      asignacionTurno2: this.editForm.get(['asignacionTurno2']).value,
      colaborador1: this.editForm.get(['colaborador1']).value,
      colaborador2: this.editForm.get(['colaborador2']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIntercambioTurno>>) {
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

  trackAsignacionTurnoById(index: number, item: IAsignacionTurno) {
    return item.id;
  }

  trackColaboradorById(index: number, item: IColaborador) {
    return item.id;
  }

  /**
   * Toma dos objeto tipo AsignacionTurno. A la primera asignación se le cambia el turno que tenía por el turno de la asignación 2
   * A la segunda asignación le cambia el turno por el turno que tenía la segunda asignación.
   * Posteriormente se guardan los cambios en la base de datos.
   * @param parAsignacion1 Primera asignación, objeto tipo IAsignacionTurno
   * @param parAsignacion2 Segunda asignación, objeto tipo IAsignacionTurno
   */
  cambiarTurnosAsignados(parAsignacion1: IAsignacionTurno, parAsignacion2: IAsignacionTurno): boolean {
    let result = false,
      guardado1 = false,
      guardado2 = false;
    const turno1: ITurno = parAsignacion1.turno;
    const turno2: ITurno = parAsignacion2.turno;
    parAsignacion1.turno = turno2;
    parAsignacion2.turno = turno1;
    this.asignacionTurnoService.update2(parAsignacion1).subscribe(() => (guardado1 = true), () => (guardado1 = false));
    this.asignacionTurnoService.update2(parAsignacion2).subscribe(() => (guardado2 = true), () => (guardado2 = false));
    if (guardado1 && guardado2) {
      result = true;
    }
    return result;
  }

  /**
   * Se encarga de obtener el colaborador seleccionado de la lista y buscar sus asignaciones actuales corresponientes
   * @param numVector 1 Para indicar que se buscan las asignaciones del colaborador1 y 2 para las asignaciones del colaborador2
   */
  setColaboradorSeleccionado(numVector: number) {
    if (numVector === 1) {
      this.asignacionturnos1 = undefined;
      const col = this.editForm.get(['colaborador1']).value;
      this.setAsignacionesColaborador(col.id, numVector);
    } else if (numVector === 2) {
      this.asignacionturnos2 = undefined;
      const col = this.editForm.get(['colaborador2']).value;
      this.setAsignacionesColaborador(col.id, numVector);
    }
  }

  /**
   * Busca todas las asignaciones actuales para un Colaborador con su id, y establece los arreglos asignacionTurno1 y asignacionTurno2 según se indique
   * @param parId identificador del objeto Colaborador para la busqueda
   * @param numVector 1 para llenar el array 'asignacionTurno1', 2 para llenar el 'asignacionTurno2'
   */
  setAsignacionesColaborador(parId: number, numVector: number) {
    this.asignacionTurnoService
      .findAsignacionesColaborador(parId)
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      )
      .subscribe((res: IAsignacionTurno[]) => {
        if (res.length > 0) {
          if (numVector === 1) {
            this.asignacionturnos1 = res;
            this.setAsignacionSeleccionada(1);
          } else if (numVector === 2) {
            this.asignacionturnos2 = res;
            this.setAsignacionSeleccionada(2);
          }
        }
      });
  }

  /**
   * Recibe el numero del vector para determinar en cual vector de asignaciones llenar el resultado
   * @param numVector Indicador de cual de los vectores de asignaciones llenar (1 o 2)
   */
  setAsignacionSeleccionada(numVector: number) {
    if (numVector === 1) {
      if (this.asignacionturnos1.length === 1) {
        this.asignacionSeleccionada1 = this.asignacionturnos1[0];
        this.editForm.patchValue({ asignacionTurno1: this.asignacionSeleccionada1 });
      } else {
        this.asignacionSeleccionada1 = undefined;
        this.editForm.patchValue({ asignacionTurno1: [] });
      }
    } else if (numVector === 2) {
      if (this.asignacionturnos2.length === 1) {
        this.asignacionSeleccionada2 = this.asignacionturnos2[0];
        this.editForm.patchValue({ asignacionTurno2: this.asignacionSeleccionada2 });
      } else {
        this.asignacionSeleccionada2 = undefined;
        this.editForm.patchValue({ asignacionTurno1: [] });
      }
    }
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
   * Recibe un numero indicando a que colaborador seleccionado se le van a sacar los datos en formato 'Nombre1 Nombre2? Apellido1 Apellido2?'
   * @param numCol Variable para indicar a cual de los dos colaboradores seleccionados se le va a sacar el nombre
   */
  getStrColaboradorSelec(numCol: number): string {
    let nombreCompleto = '';
    if (numCol === 1) {
      const objCol: IColaborador = this.editForm.get(['colaborador1']).value;
      nombreCompleto = objCol.nombre1 + ' ' + objCol.nombre2 + ' ' + objCol.apellido1 + ' ' + objCol.apellido2;
    } else if (numCol === 2) {
      const objCol: IColaborador = this.editForm.get(['colaborador2']).value;
      nombreCompleto = objCol.nombre1 + ' ' + objCol.nombre2 + ' ' + objCol.apellido1 + ' ' + objCol.apellido2;
    }
    return nombreCompleto;
  }

  /**
   * Recibe un objeto Colaborador y devuelve un string con los datos en formato 'Nombre1 Nombre2? Apellido1 Apellido2?'
   * @param parCol Objeto tipo IColaborador
   */
  getStrColaborador(parCol: IColaborador): string {
    let nombreCompleto = '';
    nombreCompleto =
      parCol.nombre1 +
      ' ' +
      (parCol.nombre2 ? parCol.nombre2 : '') +
      ' ' +
      parCol.apellido1 +
      ' ' +
      (parCol.apellido2 ? parCol.apellido2 : '');
    return nombreCompleto;
  }

  searchColaborador(parDocumento: string) {
    if (parDocumento === '') {
      this.colaboradorEncontrado = undefined;
      this.editForm.patchValue({ colaboradors: [] });
    }
    this.colaboradors.forEach(element => {
      if (element.numeroDocumento === parDocumento) {
        this.colaboradorEncontrado = element;
        this.editForm.patchValue({ colaboradors: [this.colaboradorEncontrado] });
      }
    });
  }
  clear(): void {
    this.currentSearch = '';
  }

  setSeleccionAsignacion(parAsignacion: IAsignacionTurno, numSeleccion: number) {
    if (numSeleccion === 1) {
      this.asignacionSeleccionada1 = parAsignacion;
      this.editForm.patchValue({ asignacionTurno1: parAsignacion });
    } else if (numSeleccion === 2) {
      this.asignacionSeleccionada2 = parAsignacion;
      this.editForm.patchValue({ asignacionTurno2: parAsignacion });
    }
  }

  asignacionSeleccionada(parAsignacion: IAsignacionTurno, numAsig: number): boolean {
    let result = false;
    if (numAsig === 1) {
      if (this.asignacionSeleccionada1 === undefined) {
        return false;
      } else {
        if (this.asignacionSeleccionada1 === parAsignacion) {
          result = true;
        }
      }
    } else if (numAsig === 2) {
      if (this.asignacionSeleccionada2 === undefined) {
        return false;
      } else {
        if (this.asignacionSeleccionada2 === parAsignacion) {
          result = true;
        }
      }
    }
    return result;
  }
}

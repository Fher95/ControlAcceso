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
import { IAsistencia, Asistencia } from 'app/shared/model/asistencia.model';
import { AsistenciaService } from './asistencia.service';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { AsistenciaPlaneacionService } from 'app/entities/asistencia-planeacion/asistencia-planeacion.service';

@Component({
  selector: 'jhi-asistencia-update',
  templateUrl: './asistencia-update.component.html'
})
export class AsistenciaUpdateComponent implements OnInit {
  isSaving: boolean;

  asistenciaplaneacions: IAsistenciaPlaneacion[];

  editForm = this.fb.group({
    id: [],
    nombre1: [],
    nombre2: [],
    apellido1: [],
    apellido2: [],
    fecha: [],
    turno: [],
    entrada: [],
    salida: [],
    sinEntrada: [],
    sinSalida: [],
    ausente: [],
    minutosTrabajados: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected asistenciaService: AsistenciaService,
    protected asistenciaPlaneacionService: AsistenciaPlaneacionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ asistencia }) => {
      this.updateForm(asistencia);
    });
    this.asistenciaPlaneacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAsistenciaPlaneacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsistenciaPlaneacion[]>) => response.body)
      )
      .subscribe(
        (res: IAsistenciaPlaneacion[]) => (this.asistenciaplaneacions = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(asistencia: IAsistencia) {
    this.editForm.patchValue({
      id: asistencia.id,
      nombre1: asistencia.nombre1,
      nombre2: asistencia.nombre2,
      apellido1: asistencia.apellido1,
      apellido2: asistencia.apellido2,
      fecha: asistencia.fecha != null ? asistencia.fecha.format(DATE_TIME_FORMAT) : null,
      turno: asistencia.turno,
      entrada: asistencia.entrada != null ? asistencia.entrada.format(DATE_TIME_FORMAT) : null,
      salida: asistencia.salida != null ? asistencia.salida.format(DATE_TIME_FORMAT) : null,
      sinEntrada: asistencia.sinEntrada,
      sinSalida: asistencia.sinSalida,
      ausente: asistencia.ausente,
      minutosTrabajados: asistencia.minutosTrabajados
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const asistencia = this.createFromForm();
    if (asistencia.id !== undefined) {
      this.subscribeToSaveResponse(this.asistenciaService.update(asistencia));
    } else {
      this.subscribeToSaveResponse(this.asistenciaService.create(asistencia));
    }
  }

  private createFromForm(): IAsistencia {
    return {
      ...new Asistencia(),
      id: this.editForm.get(['id']).value,
      nombre1: this.editForm.get(['nombre1']).value,
      nombre2: this.editForm.get(['nombre2']).value,
      apellido1: this.editForm.get(['apellido1']).value,
      apellido2: this.editForm.get(['apellido2']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      turno: this.editForm.get(['turno']).value,
      entrada: this.editForm.get(['entrada']).value != null ? moment(this.editForm.get(['entrada']).value, DATE_TIME_FORMAT) : undefined,
      salida: this.editForm.get(['salida']).value != null ? moment(this.editForm.get(['salida']).value, DATE_TIME_FORMAT) : undefined,
      sinEntrada: this.editForm.get(['sinEntrada']).value,
      sinSalida: this.editForm.get(['sinSalida']).value,
      ausente: this.editForm.get(['ausente']).value,
      minutosTrabajados: this.editForm.get(['minutosTrabajados']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsistencia>>) {
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

  trackAsistenciaPlaneacionById(index: number, item: IAsistenciaPlaneacion) {
    return item.id;
  }
}

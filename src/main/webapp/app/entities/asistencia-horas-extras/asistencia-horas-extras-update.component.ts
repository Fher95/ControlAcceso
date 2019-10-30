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
import { IAsistenciaHorasExtras, AsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';
import { AsistenciaHorasExtrasService } from './asistencia-horas-extras.service';
import { IAsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';
import { AsignacionHorasExtrasService } from 'app/entities/asignacion-horas-extras/asignacion-horas-extras.service';

@Component({
  selector: 'jhi-asistencia-horas-extras-update',
  templateUrl: './asistencia-horas-extras-update.component.html'
})
export class AsistenciaHorasExtrasUpdateComponent implements OnInit {
  isSaving: boolean;

  asignacionhorasextras: IAsignacionHorasExtras[];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    horaLlegada: [],
    horaSalida: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected asistenciaHorasExtrasService: AsistenciaHorasExtrasService,
    protected asignacionHorasExtrasService: AsignacionHorasExtrasService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ asistenciaHorasExtras }) => {
      this.updateForm(asistenciaHorasExtras);
    });
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
  }

  updateForm(asistenciaHorasExtras: IAsistenciaHorasExtras) {
    this.editForm.patchValue({
      id: asistenciaHorasExtras.id,
      fecha: asistenciaHorasExtras.fecha != null ? asistenciaHorasExtras.fecha.format(DATE_TIME_FORMAT) : null,
      horaLlegada: asistenciaHorasExtras.horaLlegada != null ? asistenciaHorasExtras.horaLlegada.format(DATE_TIME_FORMAT) : null,
      horaSalida: asistenciaHorasExtras.horaSalida != null ? asistenciaHorasExtras.horaSalida.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const asistenciaHorasExtras = this.createFromForm();
    if (asistenciaHorasExtras.id !== undefined) {
      this.subscribeToSaveResponse(this.asistenciaHorasExtrasService.update(asistenciaHorasExtras));
    } else {
      this.subscribeToSaveResponse(this.asistenciaHorasExtrasService.create(asistenciaHorasExtras));
    }
  }

  private createFromForm(): IAsistenciaHorasExtras {
    return {
      ...new AsistenciaHorasExtras(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      horaLlegada:
        this.editForm.get(['horaLlegada']).value != null ? moment(this.editForm.get(['horaLlegada']).value, DATE_TIME_FORMAT) : undefined,
      horaSalida:
        this.editForm.get(['horaSalida']).value != null ? moment(this.editForm.get(['horaSalida']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsistenciaHorasExtras>>) {
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

  trackAsignacionHorasExtrasById(index: number, item: IAsignacionHorasExtras) {
    return item.id;
  }
}

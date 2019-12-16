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
    documentoColaborador: [],
    entrada: [],
    salida: []
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
      documentoColaborador: asistencia.documentoColaborador,
      entrada: asistencia.entrada != null ? asistencia.entrada.format(DATE_TIME_FORMAT) : null,
      salida: asistencia.salida != null ? asistencia.salida.format(DATE_TIME_FORMAT) : null
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
      documentoColaborador: this.editForm.get(['documentoColaborador']).value,
      entrada: this.editForm.get(['entrada']).value != null ? moment(this.editForm.get(['entrada']).value, DATE_TIME_FORMAT) : undefined,
      salida: this.editForm.get(['salida']).value != null ? moment(this.editForm.get(['salida']).value, DATE_TIME_FORMAT) : undefined
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

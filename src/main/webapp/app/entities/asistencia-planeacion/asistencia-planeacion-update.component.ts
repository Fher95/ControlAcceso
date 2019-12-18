import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAsistenciaPlaneacion, AsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { AsistenciaPlaneacionService } from './asistencia-planeacion.service';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from 'app/entities/asignacion-turno/asignacion-turno.service';
import { IAsistencia } from 'app/shared/model/asistencia.model';
import { AsistenciaService } from 'app/entities/asistencia/asistencia.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';

@Component({
  selector: 'jhi-asistencia-planeacion-update',
  templateUrl: './asistencia-planeacion-update.component.html'
})
export class AsistenciaPlaneacionUpdateComponent implements OnInit {
  isSaving: boolean;

  asignacionturnos: IAsignacionTurno[];

  asistencias: IAsistencia[];

  colaboradors: IColaborador[];

  editForm = this.fb.group({
    id: [],
    asignacionTurno: [],
    asistencia: [],
    colaborador: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected asistenciaPlaneacionService: AsistenciaPlaneacionService,
    protected asignacionTurnoService: AsignacionTurnoService,
    protected asistenciaService: AsistenciaService,
    protected colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ asistenciaPlaneacion }) => {
      this.updateForm(asistenciaPlaneacion);
    });
    this.asignacionTurnoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAsignacionTurno[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsignacionTurno[]>) => response.body)
      )
      .subscribe(
        (res: IAsignacionTurno[]) => {
          if (!this.editForm.get('asignacionTurno').value || !this.editForm.get('asignacionTurno').value.id) {
            this.asignacionturnos = res;
          } else {
            this.asignacionTurnoService
              .find(this.editForm.get('asignacionTurno').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAsignacionTurno>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAsignacionTurno>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAsignacionTurno) => (this.asignacionturnos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.asistenciaService
      .query({ filter: 'asistenciaplaneacion-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAsistencia[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsistencia[]>) => response.body)
      )
      .subscribe(
        (res: IAsistencia[]) => {
          if (!this.editForm.get('asistencia').value || !this.editForm.get('asistencia').value.id) {
            this.asistencias = res;
          } else {
            this.asistenciaService
              .find(this.editForm.get('asistencia').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAsistencia>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAsistencia>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAsistencia) => (this.asistencias = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(asistenciaPlaneacion: IAsistenciaPlaneacion) {
    this.editForm.patchValue({
      id: asistenciaPlaneacion.id,
      asignacionTurno: asistenciaPlaneacion.asignacionTurno,
      asistencia: asistenciaPlaneacion.asistencia,
      colaborador: asistenciaPlaneacion.colaborador
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const asistenciaPlaneacion = this.createFromForm();
    if (asistenciaPlaneacion.id !== undefined) {
      this.subscribeToSaveResponse(this.asistenciaPlaneacionService.update(asistenciaPlaneacion));
    } else {
      this.subscribeToSaveResponse(this.asistenciaPlaneacionService.create(asistenciaPlaneacion));
    }
  }

  private createFromForm(): IAsistenciaPlaneacion {
    return {
      ...new AsistenciaPlaneacion(),
      id: this.editForm.get(['id']).value,
      asignacionTurno: this.editForm.get(['asignacionTurno']).value,
      asistencia: this.editForm.get(['asistencia']).value,
      colaborador: this.editForm.get(['colaborador']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsistenciaPlaneacion>>) {
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

  trackAsistenciaById(index: number, item: IAsistencia) {
    return item.id;
  }

  trackColaboradorById(index: number, item: IColaborador) {
    return item.id;
  }
}

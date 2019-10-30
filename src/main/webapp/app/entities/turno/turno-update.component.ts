import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ITurno, Turno } from 'app/shared/model/turno.model';
import { TurnoService } from './turno.service';

@Component({
  selector: 'jhi-turno-update',
  templateUrl: './turno-update.component.html'
})
export class TurnoUpdateComponent implements OnInit {
  isSaving: boolean;
  dtHoraInicio: Date = new Date();
  dtHoraUmbral: Date = new Date();
  esLaboral = true;

  editForm = this.fb.group({
    id: [],
    tipo: [],
    nombre: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    descripcion: [],
    horaInicio: [],
    umbralInicio: [],
    duracion: [this, [Validators.required, Validators.pattern('[0-9 ]*')]],
    color: [],
    estado: []
  });

  constructor(protected turnoService: TurnoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ turno }) => {
      this.updateForm(turno);
    });
  }

  updateForm(turno: ITurno) {
    this.editForm.patchValue({
      id: turno.id,
      tipo: turno.tipo,
      nombre: turno.nombre,
      descripcion: turno.descripcion,
      horaInicio: turno.horaInicio != null ? turno.horaInicio.format(DATE_TIME_FORMAT) : null,
      umbralInicio: turno.umbralInicio != null ? turno.umbralInicio.format(DATE_TIME_FORMAT) : null,
      duracion: turno.duracion,
      color: turno.color,
      estado: turno.estado
    });
    this.dtHoraInicio.setHours(turno.horaInicio.hour(), turno.horaInicio.minute());
    this.dtHoraUmbral.setHours(turno.umbralInicio.hour(), turno.umbralInicio.minute());
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.dtHoraInicio.setFullYear(1, 0, 1);
    this.dtHoraInicio.setSeconds(0);
    this.dtHoraUmbral.setFullYear(1, 0, 1);
    this.dtHoraUmbral.setSeconds(0);
    this.isSaving = true;
    const turno = this.createFromForm();
    if (turno.id !== undefined) {
      this.subscribeToSaveResponse(this.turnoService.update(turno));
    } else {
      this.subscribeToSaveResponse(this.turnoService.create(turno));
    }
  }

  private createFromForm(): ITurno {
    return {
      ...new Turno(),
      id: this.editForm.get(['id']).value,
      tipo: this.editForm.get(['tipo']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      horaInicio:
        this.editForm.get(['horaInicio']).value != null ? moment(this.editForm.get(['horaInicio']).value, DATE_TIME_FORMAT) : undefined,
      umbralInicio:
        this.editForm.get(['umbralInicio']).value != null ? moment(this.editForm.get(['umbralInicio']).value, DATE_TIME_FORMAT) : undefined,
      duracion: this.editForm.get(['duracion']).value,
      color: this.editForm.get(['color']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITurno>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

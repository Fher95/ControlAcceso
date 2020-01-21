import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICentroCosto, CentroCosto } from 'app/shared/model/centro-costo.model';
import { CentroCostoService } from './centro-costo.service';

@Component({
  selector: 'jhi-centro-costo-update',
  templateUrl: './centro-costo-update.component.html'
})
export class CentroCostoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    estado: []
  });

  constructor(protected centroCostoService: CentroCostoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ centroCosto }) => {
      this.updateForm(centroCosto);
    });
    this.editForm.patchValue({ estado: 'Activo' });
  }

  updateForm(centroCosto: ICentroCosto) {
    this.editForm.patchValue({
      id: centroCosto.id,
      nombre: centroCosto.nombre,
      descripcion: centroCosto.descripcion,
      estado: centroCosto.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const centroCosto = this.createFromForm();
    if (centroCosto.id !== undefined) {
      this.subscribeToSaveResponse(this.centroCostoService.update(centroCosto));
    } else {
      this.subscribeToSaveResponse(this.centroCostoService.create(centroCosto));
    }
  }

  private createFromForm(): ICentroCosto {
    return {
      ...new CentroCosto(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICentroCosto>>) {
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

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICargo, Cargo } from 'app/shared/model/cargo.model';
import { CargoService } from './cargo.service';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { CentroCostoService } from 'app/entities/centro-costo/centro-costo.service';

@Component({
  selector: 'jhi-cargo-update',
  templateUrl: './cargo-update.component.html'
})
export class CargoUpdateComponent implements OnInit {
  isSaving: boolean;

  centrocostos: ICentroCosto[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    estado: [],
    centroCosto: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cargoService: CargoService,
    protected centroCostoService: CentroCostoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cargo }) => {
      this.updateForm(cargo);
    });
    this.centroCostoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICentroCosto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICentroCosto[]>) => response.body)
      )
      .subscribe((res: ICentroCosto[]) => (this.centrocostos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cargo: ICargo) {
    this.editForm.patchValue({
      id: cargo.id,
      nombre: cargo.nombre,
      estado: cargo.estado,
      centroCosto: cargo.centroCosto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cargo = this.createFromForm();
    if (cargo.id !== undefined) {
      this.subscribeToSaveResponse(this.cargoService.update(cargo));
    } else {
      this.subscribeToSaveResponse(this.cargoService.create(cargo));
    }
  }

  private createFromForm(): ICargo {
    return {
      ...new Cargo(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      estado: this.editForm.get(['estado']).value,
      centroCosto: this.editForm.get(['centroCosto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICargo>>) {
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

  trackCentroCostoById(index: number, item: ICentroCosto) {
    return item.id;
  }
}

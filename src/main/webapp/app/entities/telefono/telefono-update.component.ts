import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITelefono, Telefono } from 'app/shared/model/telefono.model';
import { TelefonoService } from './telefono.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';

@Component({
  selector: 'jhi-telefono-update',
  templateUrl: './telefono-update.component.html'
})
export class TelefonoUpdateComponent implements OnInit {
  isSaving: boolean;

  colaboradors: IColaborador[];

  editForm = this.fb.group({
    id: [],
    numero: [null, [Validators.minLength(6), Validators.maxLength(15)]],
    tipo: [],
    colaborador: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected telefonoService: TelefonoService,
    protected colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ telefono }) => {
      this.updateForm(telefono);
    });
    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(telefono: ITelefono) {
    this.editForm.patchValue({
      id: telefono.id,
      numero: telefono.numero,
      tipo: telefono.tipo,
      colaborador: telefono.colaborador
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const telefono = this.createFromForm();
    if (telefono.id !== undefined) {
      this.subscribeToSaveResponse(this.telefonoService.update(telefono));
    } else {
      this.subscribeToSaveResponse(this.telefonoService.create(telefono));
    }
  }

  private createFromForm(): ITelefono {
    return {
      ...new Telefono(),
      id: this.editForm.get(['id']).value,
      numero: this.editForm.get(['numero']).value,
      tipo: this.editForm.get(['tipo']).value,
      colaborador: this.editForm.get(['colaborador']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITelefono>>) {
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
}

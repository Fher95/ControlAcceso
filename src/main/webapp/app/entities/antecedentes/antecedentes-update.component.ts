import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAntecedentes, Antecedentes } from 'app/shared/model/antecedentes.model';
import { AntecedentesService } from './antecedentes.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';

@Component({
  selector: 'jhi-antecedentes-update',
  templateUrl: './antecedentes-update.component.html'
})
export class AntecedentesUpdateComponent implements OnInit {
  isSaving: boolean;

  colaboradors: IColaborador[];

  editForm = this.fb.group({
    id: [],
    tipo: [],
    soporte: [],
    colaborador: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected antecedentesService: AntecedentesService,
    protected colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ antecedentes }) => {
      this.updateForm(antecedentes);
    });
    this.colaboradorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColaborador[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColaborador[]>) => response.body)
      )
      .subscribe((res: IColaborador[]) => (this.colaboradors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(antecedentes: IAntecedentes) {
    this.editForm.patchValue({
      id: antecedentes.id,
      tipo: antecedentes.tipo,
      soporte: antecedentes.soporte,
      colaborador: antecedentes.colaborador
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const antecedentes = this.createFromForm();
    if (antecedentes.id !== undefined) {
      this.subscribeToSaveResponse(this.antecedentesService.update(antecedentes));
    } else {
      this.subscribeToSaveResponse(this.antecedentesService.create(antecedentes));
    }
  }

  private createFromForm(): IAntecedentes {
    return {
      ...new Antecedentes(),
      id: this.editForm.get(['id']).value,
      tipo: this.editForm.get(['tipo']).value,
      soporte: this.editForm.get(['soporte']).value,
      colaborador: this.editForm.get(['colaborador']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAntecedentes>>) {
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

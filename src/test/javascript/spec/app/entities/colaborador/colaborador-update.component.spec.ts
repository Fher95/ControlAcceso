import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { ColaboradorUpdateComponent } from 'app/entities/colaborador/colaborador-update.component';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';
import { Colaborador } from 'app/shared/model/colaborador.model';

describe('Component Tests', () => {
  describe('Colaborador Management Update Component', () => {
    let comp: ColaboradorUpdateComponent;
    let fixture: ComponentFixture<ColaboradorUpdateComponent>;
    let service: ColaboradorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ColaboradorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ColaboradorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ColaboradorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ColaboradorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Colaborador(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Colaborador();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

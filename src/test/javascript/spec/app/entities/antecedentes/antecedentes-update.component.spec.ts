import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AntecedentesUpdateComponent } from 'app/entities/antecedentes/antecedentes-update.component';
import { AntecedentesService } from 'app/entities/antecedentes/antecedentes.service';
import { Antecedentes } from 'app/shared/model/antecedentes.model';

describe('Component Tests', () => {
  describe('Antecedentes Management Update Component', () => {
    let comp: AntecedentesUpdateComponent;
    let fixture: ComponentFixture<AntecedentesUpdateComponent>;
    let service: AntecedentesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AntecedentesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AntecedentesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AntecedentesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AntecedentesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Antecedentes(123);
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
        const entity = new Antecedentes();
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

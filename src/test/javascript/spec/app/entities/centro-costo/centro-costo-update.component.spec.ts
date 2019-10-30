import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { CentroCostoUpdateComponent } from 'app/entities/centro-costo/centro-costo-update.component';
import { CentroCostoService } from 'app/entities/centro-costo/centro-costo.service';
import { CentroCosto } from 'app/shared/model/centro-costo.model';

describe('Component Tests', () => {
  describe('CentroCosto Management Update Component', () => {
    let comp: CentroCostoUpdateComponent;
    let fixture: ComponentFixture<CentroCostoUpdateComponent>;
    let service: CentroCostoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [CentroCostoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CentroCostoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CentroCostoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CentroCostoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CentroCosto(123);
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
        const entity = new CentroCosto();
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

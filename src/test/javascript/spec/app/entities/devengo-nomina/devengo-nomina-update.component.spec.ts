import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { DevengoNominaUpdateComponent } from 'app/entities/devengo-nomina/devengo-nomina-update.component';
import { DevengoNominaService } from 'app/entities/devengo-nomina/devengo-nomina.service';
import { DevengoNomina } from 'app/shared/model/devengo-nomina.model';

describe('Component Tests', () => {
  describe('DevengoNomina Management Update Component', () => {
    let comp: DevengoNominaUpdateComponent;
    let fixture: ComponentFixture<DevengoNominaUpdateComponent>;
    let service: DevengoNominaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [DevengoNominaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DevengoNominaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DevengoNominaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DevengoNominaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DevengoNomina(123);
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
        const entity = new DevengoNomina();
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

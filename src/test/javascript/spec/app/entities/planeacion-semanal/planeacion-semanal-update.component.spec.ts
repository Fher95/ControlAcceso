import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { PlaneacionSemanalUpdateComponent } from 'app/entities/planeacion-semanal/planeacion-semanal-update.component';
import { PlaneacionSemanalService } from 'app/entities/planeacion-semanal/planeacion-semanal.service';
import { PlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';

describe('Component Tests', () => {
  describe('PlaneacionSemanal Management Update Component', () => {
    let comp: PlaneacionSemanalUpdateComponent;
    let fixture: ComponentFixture<PlaneacionSemanalUpdateComponent>;
    let service: PlaneacionSemanalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [PlaneacionSemanalUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaneacionSemanalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaneacionSemanalUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaneacionSemanalService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaneacionSemanal(123);
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
        const entity = new PlaneacionSemanal();
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

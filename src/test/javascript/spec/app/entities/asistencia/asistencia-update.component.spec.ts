import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaUpdateComponent } from 'app/entities/asistencia/asistencia-update.component';
import { AsistenciaService } from 'app/entities/asistencia/asistencia.service';
import { Asistencia } from 'app/shared/model/asistencia.model';

describe('Component Tests', () => {
  describe('Asistencia Management Update Component', () => {
    let comp: AsistenciaUpdateComponent;
    let fixture: ComponentFixture<AsistenciaUpdateComponent>;
    let service: AsistenciaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AsistenciaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsistenciaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsistenciaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Asistencia(123);
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
        const entity = new Asistencia();
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

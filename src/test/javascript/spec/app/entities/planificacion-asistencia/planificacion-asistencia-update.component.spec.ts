import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { PlanificacionAsistenciaUpdateComponent } from 'app/entities/planificacion-asistencia/planificacion-asistencia-update.component';
import { PlanificacionAsistenciaService } from 'app/entities/planificacion-asistencia/planificacion-asistencia.service';
import { PlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';

describe('Component Tests', () => {
  describe('PlanificacionAsistencia Management Update Component', () => {
    let comp: PlanificacionAsistenciaUpdateComponent;
    let fixture: ComponentFixture<PlanificacionAsistenciaUpdateComponent>;
    let service: PlanificacionAsistenciaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [PlanificacionAsistenciaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlanificacionAsistenciaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlanificacionAsistenciaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanificacionAsistenciaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlanificacionAsistencia(123);
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
        const entity = new PlanificacionAsistencia();
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

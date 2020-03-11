import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaPlaneacionUpdateComponent } from 'app/entities/asistencia-planeacion/asistencia-planeacion-update.component';
import { AsistenciaPlaneacionService } from 'app/entities/asistencia-planeacion/asistencia-planeacion.service';
import { AsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';

describe('Component Tests', () => {
  describe('AsistenciaPlaneacion Management Update Component', () => {
    let comp: AsistenciaPlaneacionUpdateComponent;
    let fixture: ComponentFixture<AsistenciaPlaneacionUpdateComponent>;
    let service: AsistenciaPlaneacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaPlaneacionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AsistenciaPlaneacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsistenciaPlaneacionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsistenciaPlaneacionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AsistenciaPlaneacion(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        // expect(service.update).toHaveBeenCalledWith(entity);
        // expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AsistenciaPlaneacion();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        // expect(service.create).toHaveBeenCalledWith(entity);
        // expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

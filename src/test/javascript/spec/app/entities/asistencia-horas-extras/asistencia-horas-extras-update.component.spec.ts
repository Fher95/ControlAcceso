import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaHorasExtrasUpdateComponent } from 'app/entities/asistencia-horas-extras/asistencia-horas-extras-update.component';
import { AsistenciaHorasExtrasService } from 'app/entities/asistencia-horas-extras/asistencia-horas-extras.service';
import { AsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';

describe('Component Tests', () => {
  describe('AsistenciaHorasExtras Management Update Component', () => {
    let comp: AsistenciaHorasExtrasUpdateComponent;
    let fixture: ComponentFixture<AsistenciaHorasExtrasUpdateComponent>;
    let service: AsistenciaHorasExtrasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaHorasExtrasUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AsistenciaHorasExtrasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsistenciaHorasExtrasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsistenciaHorasExtrasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AsistenciaHorasExtras(123);
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
        const entity = new AsistenciaHorasExtras();
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

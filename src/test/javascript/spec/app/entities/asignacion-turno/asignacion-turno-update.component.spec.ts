import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsignacionTurnoUpdateComponent } from 'app/entities/asignacion-turno/asignacion-turno-update.component';
import { AsignacionTurnoService } from 'app/entities/asignacion-turno/asignacion-turno.service';
import { AsignacionTurno } from 'app/shared/model/asignacion-turno.model';

describe('Component Tests', () => {
  describe('AsignacionTurno Management Update Component', () => {
    let comp: AsignacionTurnoUpdateComponent;
    let fixture: ComponentFixture<AsignacionTurnoUpdateComponent>;
    let service: AsignacionTurnoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsignacionTurnoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AsignacionTurnoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsignacionTurnoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsignacionTurnoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AsignacionTurno(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        // comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        // expect(service.update).toHaveBeenCalledWith(entity);
        // expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AsignacionTurno(undefined, undefined, undefined, undefined, undefined, undefined);
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        // comp.updateForm(entity);
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

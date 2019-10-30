import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsignacionHorasExtrasUpdateComponent } from 'app/entities/asignacion-horas-extras/asignacion-horas-extras-update.component';
import { AsignacionHorasExtrasService } from 'app/entities/asignacion-horas-extras/asignacion-horas-extras.service';
import { AsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';

describe('Component Tests', () => {
  describe('AsignacionHorasExtras Management Update Component', () => {
    let comp: AsignacionHorasExtrasUpdateComponent;
    let fixture: ComponentFixture<AsignacionHorasExtrasUpdateComponent>;
    let service: AsignacionHorasExtrasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsignacionHorasExtrasUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AsignacionHorasExtrasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsignacionHorasExtrasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsignacionHorasExtrasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AsignacionHorasExtras(123);
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
        const entity = new AsignacionHorasExtras();
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

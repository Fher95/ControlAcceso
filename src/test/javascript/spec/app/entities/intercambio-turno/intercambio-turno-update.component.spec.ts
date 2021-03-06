import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { IntercambioTurnoUpdateComponent } from 'app/entities/intercambio-turno/intercambio-turno-update.component';
import { IntercambioTurnoService } from 'app/entities/intercambio-turno/intercambio-turno.service';
import { IntercambioTurno } from 'app/shared/model/intercambio-turno.model';

describe('Component Tests', () => {
  describe('IntercambioTurno Management Update Component', () => {
    let comp: IntercambioTurnoUpdateComponent;
    let fixture: ComponentFixture<IntercambioTurnoUpdateComponent>;
    let service: IntercambioTurnoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [IntercambioTurnoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(IntercambioTurnoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IntercambioTurnoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IntercambioTurnoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new IntercambioTurno(123);
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
        const entity = new IntercambioTurno();
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

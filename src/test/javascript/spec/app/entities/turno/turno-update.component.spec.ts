import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { TurnoUpdateComponent } from 'app/entities/turno/turno-update.component';
import { TurnoService } from 'app/entities/turno/turno.service';
import { Turno } from 'app/shared/model/turno.model';

describe('Component Tests', () => {
  describe('Turno Management Update Component', () => {
    let comp: TurnoUpdateComponent;
    let fixture: ComponentFixture<TurnoUpdateComponent>;
    let service: TurnoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [TurnoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TurnoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TurnoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TurnoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Turno(123);
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
        const entity = new Turno();
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

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { NovedadesUpdateComponent } from 'app/entities/novedades/novedades-update.component';
import { NovedadesService } from 'app/entities/novedades/novedades.service';
import { Novedades } from 'app/shared/model/novedades.model';

describe('Component Tests', () => {
  describe('Novedades Management Update Component', () => {
    let comp: NovedadesUpdateComponent;
    let fixture: ComponentFixture<NovedadesUpdateComponent>;
    let service: NovedadesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [NovedadesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NovedadesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NovedadesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NovedadesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Novedades(123);
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
        const entity = new Novedades();
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

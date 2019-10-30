import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { ReporteAsistenciaUpdateComponent } from 'app/entities/reporte-asistencia/reporte-asistencia-update.component';
import { ReporteAsistenciaService } from 'app/entities/reporte-asistencia/reporte-asistencia.service';
import { ReporteAsistencia } from 'app/shared/model/reporte-asistencia.model';

describe('Component Tests', () => {
  describe('ReporteAsistencia Management Update Component', () => {
    let comp: ReporteAsistenciaUpdateComponent;
    let fixture: ComponentFixture<ReporteAsistenciaUpdateComponent>;
    let service: ReporteAsistenciaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ReporteAsistenciaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReporteAsistenciaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReporteAsistenciaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReporteAsistenciaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReporteAsistencia(123);
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
        const entity = new ReporteAsistencia();
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

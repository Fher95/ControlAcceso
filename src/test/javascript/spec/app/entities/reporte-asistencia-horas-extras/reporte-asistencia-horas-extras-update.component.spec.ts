import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { ReporteAsistenciaHorasExtrasUpdateComponent } from 'app/entities/reporte-asistencia-horas-extras/reporte-asistencia-horas-extras-update.component';
import { ReporteAsistenciaHorasExtrasService } from 'app/entities/reporte-asistencia-horas-extras/reporte-asistencia-horas-extras.service';
import { ReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';

describe('Component Tests', () => {
  describe('ReporteAsistenciaHorasExtras Management Update Component', () => {
    let comp: ReporteAsistenciaHorasExtrasUpdateComponent;
    let fixture: ComponentFixture<ReporteAsistenciaHorasExtrasUpdateComponent>;
    let service: ReporteAsistenciaHorasExtrasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ReporteAsistenciaHorasExtrasUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReporteAsistenciaHorasExtrasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReporteAsistenciaHorasExtrasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReporteAsistenciaHorasExtrasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReporteAsistenciaHorasExtras(123);
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
        const entity = new ReporteAsistenciaHorasExtras();
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

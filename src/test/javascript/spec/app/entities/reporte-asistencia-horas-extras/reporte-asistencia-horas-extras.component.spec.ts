import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ControlAccesoTestModule } from '../../../test.module';
import { ReporteAsistenciaHorasExtrasComponent } from 'app/entities/reporte-asistencia-horas-extras/reporte-asistencia-horas-extras.component';
import { ReporteAsistenciaHorasExtrasService } from 'app/entities/reporte-asistencia-horas-extras/reporte-asistencia-horas-extras.service';
import { ReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';

describe('Component Tests', () => {
  describe('ReporteAsistenciaHorasExtras Management Component', () => {
    let comp: ReporteAsistenciaHorasExtrasComponent;
    let fixture: ComponentFixture<ReporteAsistenciaHorasExtrasComponent>;
    let service: ReporteAsistenciaHorasExtrasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ReporteAsistenciaHorasExtrasComponent],
        providers: []
      })
        .overrideTemplate(ReporteAsistenciaHorasExtrasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReporteAsistenciaHorasExtrasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReporteAsistenciaHorasExtrasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReporteAsistenciaHorasExtras(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reporteAsistenciaHorasExtras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

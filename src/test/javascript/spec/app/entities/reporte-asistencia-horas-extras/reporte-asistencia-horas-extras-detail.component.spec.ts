import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { ReporteAsistenciaHorasExtrasDetailComponent } from 'app/entities/reporte-asistencia-horas-extras/reporte-asistencia-horas-extras-detail.component';
import { ReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';

describe('Component Tests', () => {
  describe('ReporteAsistenciaHorasExtras Management Detail Component', () => {
    let comp: ReporteAsistenciaHorasExtrasDetailComponent;
    let fixture: ComponentFixture<ReporteAsistenciaHorasExtrasDetailComponent>;
    const route = ({ data: of({ reporteAsistenciaHorasExtras: new ReporteAsistenciaHorasExtras(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ReporteAsistenciaHorasExtrasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReporteAsistenciaHorasExtrasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReporteAsistenciaHorasExtrasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reporteAsistenciaHorasExtras).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

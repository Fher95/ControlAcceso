import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { ReporteAsistenciaDetailComponent } from 'app/entities/reporte-asistencia/reporte-asistencia-detail.component';
import { ReporteAsistencia } from 'app/shared/model/reporte-asistencia.model';

describe('Component Tests', () => {
  describe('ReporteAsistencia Management Detail Component', () => {
    let comp: ReporteAsistenciaDetailComponent;
    let fixture: ComponentFixture<ReporteAsistenciaDetailComponent>;
    const route = ({ data: of({ reporteAsistencia: new ReporteAsistencia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ReporteAsistenciaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReporteAsistenciaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReporteAsistenciaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reporteAsistencia).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

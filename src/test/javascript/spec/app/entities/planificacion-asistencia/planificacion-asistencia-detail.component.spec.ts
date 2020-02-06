import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { PlanificacionAsistenciaDetailComponent } from 'app/entities/planificacion-asistencia/planificacion-asistencia-detail.component';
import { PlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';

describe('Component Tests', () => {
  describe('PlanificacionAsistencia Management Detail Component', () => {
    let comp: PlanificacionAsistenciaDetailComponent;
    let fixture: ComponentFixture<PlanificacionAsistenciaDetailComponent>;
    const route = ({ data: of({ planificacionAsistencia: new PlanificacionAsistencia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [PlanificacionAsistenciaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlanificacionAsistenciaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanificacionAsistenciaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.planificacionAsistencia).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

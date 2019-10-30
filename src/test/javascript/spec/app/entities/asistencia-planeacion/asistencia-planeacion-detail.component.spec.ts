import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaPlaneacionDetailComponent } from 'app/entities/asistencia-planeacion/asistencia-planeacion-detail.component';
import { AsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';

describe('Component Tests', () => {
  describe('AsistenciaPlaneacion Management Detail Component', () => {
    let comp: AsistenciaPlaneacionDetailComponent;
    let fixture: ComponentFixture<AsistenciaPlaneacionDetailComponent>;
    const route = ({ data: of({ asistenciaPlaneacion: new AsistenciaPlaneacion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaPlaneacionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AsistenciaPlaneacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsistenciaPlaneacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asistenciaPlaneacion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

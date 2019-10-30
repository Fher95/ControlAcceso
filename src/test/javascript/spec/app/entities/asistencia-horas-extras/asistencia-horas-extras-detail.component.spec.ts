import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaHorasExtrasDetailComponent } from 'app/entities/asistencia-horas-extras/asistencia-horas-extras-detail.component';
import { AsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';

describe('Component Tests', () => {
  describe('AsistenciaHorasExtras Management Detail Component', () => {
    let comp: AsistenciaHorasExtrasDetailComponent;
    let fixture: ComponentFixture<AsistenciaHorasExtrasDetailComponent>;
    const route = ({ data: of({ asistenciaHorasExtras: new AsistenciaHorasExtras(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaHorasExtrasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AsistenciaHorasExtrasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsistenciaHorasExtrasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asistenciaHorasExtras).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

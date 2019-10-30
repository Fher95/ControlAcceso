import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsignacionTurnoDetailComponent } from 'app/entities/asignacion-turno/asignacion-turno-detail.component';
import { AsignacionTurno } from 'app/shared/model/asignacion-turno.model';

describe('Component Tests', () => {
  describe('AsignacionTurno Management Detail Component', () => {
    let comp: AsignacionTurnoDetailComponent;
    let fixture: ComponentFixture<AsignacionTurnoDetailComponent>;
    const route = ({ data: of({ asignacionTurno: new AsignacionTurno(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsignacionTurnoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AsignacionTurnoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsignacionTurnoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asignacionTurno).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { IntercambioTurnoDetailComponent } from 'app/entities/intercambio-turno/intercambio-turno-detail.component';
import { IntercambioTurno } from 'app/shared/model/intercambio-turno.model';

describe('Component Tests', () => {
  describe('IntercambioTurno Management Detail Component', () => {
    let comp: IntercambioTurnoDetailComponent;
    let fixture: ComponentFixture<IntercambioTurnoDetailComponent>;
    const route = ({ data: of({ intercambioTurno: new IntercambioTurno(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [IntercambioTurnoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(IntercambioTurnoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IntercambioTurnoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.intercambioTurno).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

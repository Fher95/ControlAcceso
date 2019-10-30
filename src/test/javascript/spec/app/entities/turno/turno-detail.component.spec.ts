import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { TurnoDetailComponent } from 'app/entities/turno/turno-detail.component';
import { Turno } from 'app/shared/model/turno.model';

describe('Component Tests', () => {
  describe('Turno Management Detail Component', () => {
    let comp: TurnoDetailComponent;
    let fixture: ComponentFixture<TurnoDetailComponent>;
    const route = ({ data: of({ turno: new Turno(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [TurnoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TurnoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TurnoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.turno).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

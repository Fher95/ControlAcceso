import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { PlaneacionSemanalDetailComponent } from 'app/entities/planeacion-semanal/planeacion-semanal-detail.component';
import { PlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';

describe('Component Tests', () => {
  describe('PlaneacionSemanal Management Detail Component', () => {
    let comp: PlaneacionSemanalDetailComponent;
    let fixture: ComponentFixture<PlaneacionSemanalDetailComponent>;
    const route = ({ data: of({ planeacionSemanal: new PlaneacionSemanal(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [PlaneacionSemanalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaneacionSemanalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaneacionSemanalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.planeacionSemanal).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

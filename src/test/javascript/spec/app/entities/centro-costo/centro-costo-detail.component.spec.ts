import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { CentroCostoDetailComponent } from 'app/entities/centro-costo/centro-costo-detail.component';
import { CentroCosto } from 'app/shared/model/centro-costo.model';

describe('Component Tests', () => {
  describe('CentroCosto Management Detail Component', () => {
    let comp: CentroCostoDetailComponent;
    let fixture: ComponentFixture<CentroCostoDetailComponent>;
    const route = ({ data: of({ centroCosto: new CentroCosto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [CentroCostoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CentroCostoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CentroCostoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.centroCosto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

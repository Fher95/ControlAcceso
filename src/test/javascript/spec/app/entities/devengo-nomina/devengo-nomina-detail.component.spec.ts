import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { DevengoNominaDetailComponent } from 'app/entities/devengo-nomina/devengo-nomina-detail.component';
import { DevengoNomina } from 'app/shared/model/devengo-nomina.model';

describe('Component Tests', () => {
  describe('DevengoNomina Management Detail Component', () => {
    let comp: DevengoNominaDetailComponent;
    let fixture: ComponentFixture<DevengoNominaDetailComponent>;
    const route = ({ data: of({ devengoNomina: new DevengoNomina(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [DevengoNominaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DevengoNominaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DevengoNominaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.devengoNomina).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AntecedentesDetailComponent } from 'app/entities/antecedentes/antecedentes-detail.component';
import { Antecedentes } from 'app/shared/model/antecedentes.model';

describe('Component Tests', () => {
  describe('Antecedentes Management Detail Component', () => {
    let comp: AntecedentesDetailComponent;
    let fixture: ComponentFixture<AntecedentesDetailComponent>;
    const route = ({ data: of({ antecedentes: new Antecedentes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AntecedentesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AntecedentesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AntecedentesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.antecedentes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

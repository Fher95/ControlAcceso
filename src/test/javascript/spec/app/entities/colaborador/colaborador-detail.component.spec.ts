import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { ColaboradorDetailComponent } from 'app/entities/colaborador/colaborador-detail.component';
import { Colaborador } from 'app/shared/model/colaborador.model';

describe('Component Tests', () => {
  describe('Colaborador Management Detail Component', () => {
    let comp: ColaboradorDetailComponent;
    let fixture: ComponentFixture<ColaboradorDetailComponent>;
    const route = ({ data: of({ colaborador: new Colaborador(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ColaboradorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ColaboradorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ColaboradorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.colaborador).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

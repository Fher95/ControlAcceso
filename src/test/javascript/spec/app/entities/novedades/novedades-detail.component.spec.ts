import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { NovedadesDetailComponent } from 'app/entities/novedades/novedades-detail.component';
import { Novedades } from 'app/shared/model/novedades.model';

describe('Component Tests', () => {
  describe('Novedades Management Detail Component', () => {
    let comp: NovedadesDetailComponent;
    let fixture: ComponentFixture<NovedadesDetailComponent>;
    const route = ({ data: of({ novedades: new Novedades(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [NovedadesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NovedadesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NovedadesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.novedades).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

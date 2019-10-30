import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaDetailComponent } from 'app/entities/asistencia/asistencia-detail.component';
import { Asistencia } from 'app/shared/model/asistencia.model';

describe('Component Tests', () => {
  describe('Asistencia Management Detail Component', () => {
    let comp: AsistenciaDetailComponent;
    let fixture: ComponentFixture<AsistenciaDetailComponent>;
    const route = ({ data: of({ asistencia: new Asistencia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AsistenciaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsistenciaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asistencia).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

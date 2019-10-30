import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsignacionHorasExtrasDetailComponent } from 'app/entities/asignacion-horas-extras/asignacion-horas-extras-detail.component';
import { AsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';

describe('Component Tests', () => {
  describe('AsignacionHorasExtras Management Detail Component', () => {
    let comp: AsignacionHorasExtrasDetailComponent;
    let fixture: ComponentFixture<AsignacionHorasExtrasDetailComponent>;
    const route = ({ data: of({ asignacionHorasExtras: new AsignacionHorasExtras(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsignacionHorasExtrasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AsignacionHorasExtrasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsignacionHorasExtrasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asignacionHorasExtras).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

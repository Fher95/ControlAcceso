import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ControlAccesoTestModule } from '../../../test.module';
import { IntercambioTurnoComponent } from 'app/entities/intercambio-turno/intercambio-turno.component';
import { IntercambioTurnoService } from 'app/entities/intercambio-turno/intercambio-turno.service';
import { IntercambioTurno } from 'app/shared/model/intercambio-turno.model';

describe('Component Tests', () => {
  describe('IntercambioTurno Management Component', () => {
    let comp: IntercambioTurnoComponent;
    let fixture: ComponentFixture<IntercambioTurnoComponent>;
    let service: IntercambioTurnoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [IntercambioTurnoComponent],
        providers: []
      })
        .overrideTemplate(IntercambioTurnoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IntercambioTurnoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IntercambioTurnoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new IntercambioTurno(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.intercambioTurnos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

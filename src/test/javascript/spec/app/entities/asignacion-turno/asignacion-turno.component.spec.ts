import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsignacionTurnoComponent } from 'app/entities/asignacion-turno/asignacion-turno.component';
import { AsignacionTurnoService } from 'app/entities/asignacion-turno/asignacion-turno.service';
import { AsignacionTurno } from 'app/shared/model/asignacion-turno.model';

describe('Component Tests', () => {
  describe('AsignacionTurno Management Component', () => {
    let comp: AsignacionTurnoComponent;
    let fixture: ComponentFixture<AsignacionTurnoComponent>;
    let service: AsignacionTurnoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsignacionTurnoComponent],
        providers: []
      })
        .overrideTemplate(AsignacionTurnoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsignacionTurnoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsignacionTurnoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AsignacionTurno(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.asignacionTurnos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

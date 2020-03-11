import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaPlaneacionComponent } from 'app/entities/asistencia-planeacion/asistencia-planeacion.component';
import { AsistenciaPlaneacionService } from 'app/entities/asistencia-planeacion/asistencia-planeacion.service';
import { AsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';

describe('Component Tests', () => {
  describe('AsistenciaPlaneacion Management Component', () => {
    let comp: AsistenciaPlaneacionComponent;
    let fixture: ComponentFixture<AsistenciaPlaneacionComponent>;
    let service: AsistenciaPlaneacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaPlaneacionComponent],
        providers: []
      })
        .overrideTemplate(AsistenciaPlaneacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsistenciaPlaneacionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsistenciaPlaneacionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AsistenciaPlaneacion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      // expect(service.query).toHaveBeenCalled();
      // expect(comp.asistenciaPlaneacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

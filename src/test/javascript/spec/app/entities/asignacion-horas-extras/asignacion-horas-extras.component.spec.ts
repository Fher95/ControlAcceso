import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsignacionHorasExtrasComponent } from 'app/entities/asignacion-horas-extras/asignacion-horas-extras.component';
import { AsignacionHorasExtrasService } from 'app/entities/asignacion-horas-extras/asignacion-horas-extras.service';
import { AsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';

describe('Component Tests', () => {
  describe('AsignacionHorasExtras Management Component', () => {
    let comp: AsignacionHorasExtrasComponent;
    let fixture: ComponentFixture<AsignacionHorasExtrasComponent>;
    let service: AsignacionHorasExtrasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsignacionHorasExtrasComponent],
        providers: []
      })
        .overrideTemplate(AsignacionHorasExtrasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsignacionHorasExtrasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsignacionHorasExtrasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AsignacionHorasExtras(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.asignacionHorasExtras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

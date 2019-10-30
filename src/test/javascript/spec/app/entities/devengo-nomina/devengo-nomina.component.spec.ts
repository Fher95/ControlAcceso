import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ControlAccesoTestModule } from '../../../test.module';
import { DevengoNominaComponent } from 'app/entities/devengo-nomina/devengo-nomina.component';
import { DevengoNominaService } from 'app/entities/devengo-nomina/devengo-nomina.service';
import { DevengoNomina } from 'app/shared/model/devengo-nomina.model';

describe('Component Tests', () => {
  describe('DevengoNomina Management Component', () => {
    let comp: DevengoNominaComponent;
    let fixture: ComponentFixture<DevengoNominaComponent>;
    let service: DevengoNominaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [DevengoNominaComponent],
        providers: []
      })
        .overrideTemplate(DevengoNominaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DevengoNominaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DevengoNominaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DevengoNomina(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.devengoNominas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

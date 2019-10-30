import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ControlAccesoTestModule } from '../../../test.module';
import { TelefonoComponent } from 'app/entities/telefono/telefono.component';
import { TelefonoService } from 'app/entities/telefono/telefono.service';
import { Telefono } from 'app/shared/model/telefono.model';

describe('Component Tests', () => {
  describe('Telefono Management Component', () => {
    let comp: TelefonoComponent;
    let fixture: ComponentFixture<TelefonoComponent>;
    let service: TelefonoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [TelefonoComponent],
        providers: []
      })
        .overrideTemplate(TelefonoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TelefonoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TelefonoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Telefono(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.telefonos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

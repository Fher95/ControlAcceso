import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaHorasExtrasDeleteDialogComponent } from 'app/entities/asistencia-horas-extras/asistencia-horas-extras-delete-dialog.component';
import { AsistenciaHorasExtrasService } from 'app/entities/asistencia-horas-extras/asistencia-horas-extras.service';

describe('Component Tests', () => {
  describe('AsistenciaHorasExtras Management Delete Component', () => {
    let comp: AsistenciaHorasExtrasDeleteDialogComponent;
    let fixture: ComponentFixture<AsistenciaHorasExtrasDeleteDialogComponent>;
    let service: AsistenciaHorasExtrasService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaHorasExtrasDeleteDialogComponent]
      })
        .overrideTemplate(AsistenciaHorasExtrasDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsistenciaHorasExtrasDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsistenciaHorasExtrasService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});

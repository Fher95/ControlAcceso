import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { IntercambioTurnoDeleteDialogComponent } from 'app/entities/intercambio-turno/intercambio-turno-delete-dialog.component';
import { IntercambioTurnoService } from 'app/entities/intercambio-turno/intercambio-turno.service';

describe('Component Tests', () => {
  describe('IntercambioTurno Management Delete Component', () => {
    let comp: IntercambioTurnoDeleteDialogComponent;
    let fixture: ComponentFixture<IntercambioTurnoDeleteDialogComponent>;
    let service: IntercambioTurnoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [IntercambioTurnoDeleteDialogComponent]
      })
        .overrideTemplate(IntercambioTurnoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IntercambioTurnoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IntercambioTurnoService);
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

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsignacionTurnoDeleteDialogComponent } from 'app/entities/asignacion-turno/asignacion-turno-delete-dialog.component';
import { AsignacionTurnoService } from 'app/entities/asignacion-turno/asignacion-turno.service';

describe('Component Tests', () => {
  describe('AsignacionTurno Management Delete Component', () => {
    let comp: AsignacionTurnoDeleteDialogComponent;
    let fixture: ComponentFixture<AsignacionTurnoDeleteDialogComponent>;
    let service: AsignacionTurnoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsignacionTurnoDeleteDialogComponent]
      })
        .overrideTemplate(AsignacionTurnoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsignacionTurnoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsignacionTurnoService);
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

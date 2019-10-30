import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaPlaneacionDeleteDialogComponent } from 'app/entities/asistencia-planeacion/asistencia-planeacion-delete-dialog.component';
import { AsistenciaPlaneacionService } from 'app/entities/asistencia-planeacion/asistencia-planeacion.service';

describe('Component Tests', () => {
  describe('AsistenciaPlaneacion Management Delete Component', () => {
    let comp: AsistenciaPlaneacionDeleteDialogComponent;
    let fixture: ComponentFixture<AsistenciaPlaneacionDeleteDialogComponent>;
    let service: AsistenciaPlaneacionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaPlaneacionDeleteDialogComponent]
      })
        .overrideTemplate(AsistenciaPlaneacionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsistenciaPlaneacionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsistenciaPlaneacionService);
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

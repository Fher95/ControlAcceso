import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { AsistenciaDeleteDialogComponent } from 'app/entities/asistencia/asistencia-delete-dialog.component';
import { AsistenciaService } from 'app/entities/asistencia/asistencia.service';

describe('Component Tests', () => {
  describe('Asistencia Management Delete Component', () => {
    let comp: AsistenciaDeleteDialogComponent;
    let fixture: ComponentFixture<AsistenciaDeleteDialogComponent>;
    let service: AsistenciaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AsistenciaDeleteDialogComponent]
      })
        .overrideTemplate(AsistenciaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsistenciaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsistenciaService);
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

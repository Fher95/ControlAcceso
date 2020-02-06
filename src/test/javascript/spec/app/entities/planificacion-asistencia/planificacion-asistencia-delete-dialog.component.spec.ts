import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { PlanificacionAsistenciaDeleteDialogComponent } from 'app/entities/planificacion-asistencia/planificacion-asistencia-delete-dialog.component';
import { PlanificacionAsistenciaService } from 'app/entities/planificacion-asistencia/planificacion-asistencia.service';

describe('Component Tests', () => {
  describe('PlanificacionAsistencia Management Delete Component', () => {
    let comp: PlanificacionAsistenciaDeleteDialogComponent;
    let fixture: ComponentFixture<PlanificacionAsistenciaDeleteDialogComponent>;
    let service: PlanificacionAsistenciaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [PlanificacionAsistenciaDeleteDialogComponent]
      })
        .overrideTemplate(PlanificacionAsistenciaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanificacionAsistenciaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanificacionAsistenciaService);
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

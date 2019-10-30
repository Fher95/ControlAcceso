import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { ReporteAsistenciaDeleteDialogComponent } from 'app/entities/reporte-asistencia/reporte-asistencia-delete-dialog.component';
import { ReporteAsistenciaService } from 'app/entities/reporte-asistencia/reporte-asistencia.service';

describe('Component Tests', () => {
  describe('ReporteAsistencia Management Delete Component', () => {
    let comp: ReporteAsistenciaDeleteDialogComponent;
    let fixture: ComponentFixture<ReporteAsistenciaDeleteDialogComponent>;
    let service: ReporteAsistenciaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ReporteAsistenciaDeleteDialogComponent]
      })
        .overrideTemplate(ReporteAsistenciaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReporteAsistenciaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReporteAsistenciaService);
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

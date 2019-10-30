import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { ReporteAsistenciaHorasExtrasDeleteDialogComponent } from 'app/entities/reporte-asistencia-horas-extras/reporte-asistencia-horas-extras-delete-dialog.component';
import { ReporteAsistenciaHorasExtrasService } from 'app/entities/reporte-asistencia-horas-extras/reporte-asistencia-horas-extras.service';

describe('Component Tests', () => {
  describe('ReporteAsistenciaHorasExtras Management Delete Component', () => {
    let comp: ReporteAsistenciaHorasExtrasDeleteDialogComponent;
    let fixture: ComponentFixture<ReporteAsistenciaHorasExtrasDeleteDialogComponent>;
    let service: ReporteAsistenciaHorasExtrasService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ReporteAsistenciaHorasExtrasDeleteDialogComponent]
      })
        .overrideTemplate(ReporteAsistenciaHorasExtrasDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReporteAsistenciaHorasExtrasDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReporteAsistenciaHorasExtrasService);
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

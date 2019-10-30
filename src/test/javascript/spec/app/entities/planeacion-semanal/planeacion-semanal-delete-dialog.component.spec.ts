import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { PlaneacionSemanalDeleteDialogComponent } from 'app/entities/planeacion-semanal/planeacion-semanal-delete-dialog.component';
import { PlaneacionSemanalService } from 'app/entities/planeacion-semanal/planeacion-semanal.service';

describe('Component Tests', () => {
  describe('PlaneacionSemanal Management Delete Component', () => {
    let comp: PlaneacionSemanalDeleteDialogComponent;
    let fixture: ComponentFixture<PlaneacionSemanalDeleteDialogComponent>;
    let service: PlaneacionSemanalService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [PlaneacionSemanalDeleteDialogComponent]
      })
        .overrideTemplate(PlaneacionSemanalDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaneacionSemanalDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaneacionSemanalService);
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

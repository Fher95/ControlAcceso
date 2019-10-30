import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { DevengoNominaDeleteDialogComponent } from 'app/entities/devengo-nomina/devengo-nomina-delete-dialog.component';
import { DevengoNominaService } from 'app/entities/devengo-nomina/devengo-nomina.service';

describe('Component Tests', () => {
  describe('DevengoNomina Management Delete Component', () => {
    let comp: DevengoNominaDeleteDialogComponent;
    let fixture: ComponentFixture<DevengoNominaDeleteDialogComponent>;
    let service: DevengoNominaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [DevengoNominaDeleteDialogComponent]
      })
        .overrideTemplate(DevengoNominaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DevengoNominaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DevengoNominaService);
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

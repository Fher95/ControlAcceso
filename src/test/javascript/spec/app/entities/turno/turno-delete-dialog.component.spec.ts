import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { TurnoDeleteDialogComponent } from 'app/entities/turno/turno-delete-dialog.component';
import { TurnoService } from 'app/entities/turno/turno.service';

describe('Component Tests', () => {
  describe('Turno Management Delete Component', () => {
    let comp: TurnoDeleteDialogComponent;
    let fixture: ComponentFixture<TurnoDeleteDialogComponent>;
    let service: TurnoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [TurnoDeleteDialogComponent]
      })
        .overrideTemplate(TurnoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TurnoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TurnoService);
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

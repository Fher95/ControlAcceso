import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { NovedadesDeleteDialogComponent } from 'app/entities/novedades/novedades-delete-dialog.component';
import { NovedadesService } from 'app/entities/novedades/novedades.service';

describe('Component Tests', () => {
  describe('Novedades Management Delete Component', () => {
    let comp: NovedadesDeleteDialogComponent;
    let fixture: ComponentFixture<NovedadesDeleteDialogComponent>;
    let service: NovedadesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [NovedadesDeleteDialogComponent]
      })
        .overrideTemplate(NovedadesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NovedadesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NovedadesService);
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

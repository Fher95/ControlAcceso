import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { CentroCostoDeleteDialogComponent } from 'app/entities/centro-costo/centro-costo-delete-dialog.component';
import { CentroCostoService } from 'app/entities/centro-costo/centro-costo.service';

describe('Component Tests', () => {
  describe('CentroCosto Management Delete Component', () => {
    let comp: CentroCostoDeleteDialogComponent;
    let fixture: ComponentFixture<CentroCostoDeleteDialogComponent>;
    let service: CentroCostoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [CentroCostoDeleteDialogComponent]
      })
        .overrideTemplate(CentroCostoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CentroCostoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CentroCostoService);
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

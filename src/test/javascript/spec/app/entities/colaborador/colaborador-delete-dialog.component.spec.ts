import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { ColaboradorDeleteDialogComponent } from 'app/entities/colaborador/colaborador-delete-dialog.component';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';

describe('Component Tests', () => {
  describe('Colaborador Management Delete Component', () => {
    let comp: ColaboradorDeleteDialogComponent;
    let fixture: ComponentFixture<ColaboradorDeleteDialogComponent>;
    let service: ColaboradorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [ColaboradorDeleteDialogComponent]
      })
        .overrideTemplate(ColaboradorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ColaboradorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ColaboradorService);
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

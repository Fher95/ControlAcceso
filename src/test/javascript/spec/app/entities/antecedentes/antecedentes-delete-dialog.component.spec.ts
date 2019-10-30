import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAccesoTestModule } from '../../../test.module';
import { AntecedentesDeleteDialogComponent } from 'app/entities/antecedentes/antecedentes-delete-dialog.component';
import { AntecedentesService } from 'app/entities/antecedentes/antecedentes.service';

describe('Component Tests', () => {
  describe('Antecedentes Management Delete Component', () => {
    let comp: AntecedentesDeleteDialogComponent;
    let fixture: ComponentFixture<AntecedentesDeleteDialogComponent>;
    let service: AntecedentesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [AntecedentesDeleteDialogComponent]
      })
        .overrideTemplate(AntecedentesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AntecedentesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AntecedentesService);
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

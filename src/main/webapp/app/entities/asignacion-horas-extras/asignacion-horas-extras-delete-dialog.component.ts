import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';
import { AsignacionHorasExtrasService } from './asignacion-horas-extras.service';

@Component({
  selector: 'jhi-asignacion-horas-extras-delete-dialog',
  templateUrl: './asignacion-horas-extras-delete-dialog.component.html'
})
export class AsignacionHorasExtrasDeleteDialogComponent {
  asignacionHorasExtras: IAsignacionHorasExtras;

  constructor(
    protected asignacionHorasExtrasService: AsignacionHorasExtrasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.asignacionHorasExtrasService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'asignacionHorasExtrasListModification',
        content: 'Deleted an asignacionHorasExtras'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-asignacion-horas-extras-delete-popup',
  template: ''
})
export class AsignacionHorasExtrasDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asignacionHorasExtras }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AsignacionHorasExtrasDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.asignacionHorasExtras = asignacionHorasExtras;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/asignacion-horas-extras', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/asignacion-horas-extras', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

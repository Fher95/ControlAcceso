import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITelefono } from 'app/shared/model/telefono.model';
import { TelefonoService } from './telefono.service';

@Component({
  selector: 'jhi-telefono-delete-dialog',
  templateUrl: './telefono-delete-dialog.component.html'
})
export class TelefonoDeleteDialogComponent {
  telefono: ITelefono;

  constructor(protected telefonoService: TelefonoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.telefonoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'telefonoListModification',
        content: 'Deleted an telefono'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-telefono-delete-popup',
  template: ''
})
export class TelefonoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ telefono }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TelefonoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.telefono = telefono;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/telefono', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/telefono', { outlets: { popup: null } }]);
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

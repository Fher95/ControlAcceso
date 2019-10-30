import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { CentroCostoService } from './centro-costo.service';

@Component({
  selector: 'jhi-centro-costo-delete-dialog',
  templateUrl: './centro-costo-delete-dialog.component.html'
})
export class CentroCostoDeleteDialogComponent {
  centroCosto: ICentroCosto;

  constructor(
    protected centroCostoService: CentroCostoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.centroCostoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'centroCostoListModification',
        content: 'Deleted an centroCosto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-centro-costo-delete-popup',
  template: ''
})
export class CentroCostoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ centroCosto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CentroCostoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.centroCosto = centroCosto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/centro-costo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/centro-costo', { outlets: { popup: null } }]);
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

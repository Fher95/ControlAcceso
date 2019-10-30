import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDevengoNomina } from 'app/shared/model/devengo-nomina.model';
import { DevengoNominaService } from './devengo-nomina.service';

@Component({
  selector: 'jhi-devengo-nomina-delete-dialog',
  templateUrl: './devengo-nomina-delete-dialog.component.html'
})
export class DevengoNominaDeleteDialogComponent {
  devengoNomina: IDevengoNomina;

  constructor(
    protected devengoNominaService: DevengoNominaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.devengoNominaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'devengoNominaListModification',
        content: 'Deleted an devengoNomina'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-devengo-nomina-delete-popup',
  template: ''
})
export class DevengoNominaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ devengoNomina }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DevengoNominaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.devengoNomina = devengoNomina;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/devengo-nomina', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/devengo-nomina', { outlets: { popup: null } }]);
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

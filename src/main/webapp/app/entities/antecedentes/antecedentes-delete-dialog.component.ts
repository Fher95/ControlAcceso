import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAntecedentes } from 'app/shared/model/antecedentes.model';
import { AntecedentesService } from './antecedentes.service';

@Component({
  selector: 'jhi-antecedentes-delete-dialog',
  templateUrl: './antecedentes-delete-dialog.component.html'
})
export class AntecedentesDeleteDialogComponent {
  antecedentes: IAntecedentes;

  constructor(
    protected antecedentesService: AntecedentesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.antecedentesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'antecedentesListModification',
        content: 'Deleted an antecedentes'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-antecedentes-delete-popup',
  template: ''
})
export class AntecedentesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ antecedentes }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AntecedentesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.antecedentes = antecedentes;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/antecedentes', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/antecedentes', { outlets: { popup: null } }]);
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

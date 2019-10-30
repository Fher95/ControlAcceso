import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INovedades } from 'app/shared/model/novedades.model';
import { NovedadesService } from './novedades.service';

@Component({
  selector: 'jhi-novedades-delete-dialog',
  templateUrl: './novedades-delete-dialog.component.html'
})
export class NovedadesDeleteDialogComponent {
  novedades: INovedades;

  constructor(protected novedadesService: NovedadesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.novedadesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'novedadesListModification',
        content: 'Deleted an novedades'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-novedades-delete-popup',
  template: ''
})
export class NovedadesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ novedades }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NovedadesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.novedades = novedades;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/novedades', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/novedades', { outlets: { popup: null } }]);
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

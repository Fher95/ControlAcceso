import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';
import { PlaneacionSemanalService } from './planeacion-semanal.service';

@Component({
  selector: 'jhi-planeacion-semanal-delete-dialog',
  templateUrl: './planeacion-semanal-delete-dialog.component.html'
})
export class PlaneacionSemanalDeleteDialogComponent {
  planeacionSemanal: IPlaneacionSemanal;

  constructor(
    protected planeacionSemanalService: PlaneacionSemanalService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.planeacionSemanalService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'planeacionSemanalListModification',
        content: 'Deleted an planeacionSemanal'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-planeacion-semanal-delete-popup',
  template: ''
})
export class PlaneacionSemanalDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ planeacionSemanal }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaneacionSemanalDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.planeacionSemanal = planeacionSemanal;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/planeacion-semanal', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/planeacion-semanal', { outlets: { popup: null } }]);
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

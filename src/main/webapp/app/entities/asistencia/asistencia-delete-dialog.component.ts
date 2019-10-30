import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAsistencia } from 'app/shared/model/asistencia.model';
import { AsistenciaService } from './asistencia.service';

@Component({
  selector: 'jhi-asistencia-delete-dialog',
  templateUrl: './asistencia-delete-dialog.component.html'
})
export class AsistenciaDeleteDialogComponent {
  asistencia: IAsistencia;

  constructor(
    protected asistenciaService: AsistenciaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.asistenciaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'asistenciaListModification',
        content: 'Deleted an asistencia'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-asistencia-delete-popup',
  template: ''
})
export class AsistenciaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asistencia }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AsistenciaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.asistencia = asistencia;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/asistencia', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/asistencia', { outlets: { popup: null } }]);
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

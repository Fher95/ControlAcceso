import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { AsistenciaPlaneacionService } from './asistencia-planeacion.service';

@Component({
  selector: 'jhi-asistencia-planeacion-delete-dialog',
  templateUrl: './asistencia-planeacion-delete-dialog.component.html'
})
export class AsistenciaPlaneacionDeleteDialogComponent {
  asistenciaPlaneacion: IAsistenciaPlaneacion;

  constructor(
    protected asistenciaPlaneacionService: AsistenciaPlaneacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.asistenciaPlaneacionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'asistenciaPlaneacionListModification',
        content: 'Deleted an asistenciaPlaneacion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-asistencia-planeacion-delete-popup',
  template: ''
})
export class AsistenciaPlaneacionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asistenciaPlaneacion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AsistenciaPlaneacionDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.asistenciaPlaneacion = asistenciaPlaneacion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/asistencia-planeacion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/asistencia-planeacion', { outlets: { popup: null } }]);
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

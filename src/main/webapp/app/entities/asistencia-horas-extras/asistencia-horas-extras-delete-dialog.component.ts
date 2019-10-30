import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';
import { AsistenciaHorasExtrasService } from './asistencia-horas-extras.service';

@Component({
  selector: 'jhi-asistencia-horas-extras-delete-dialog',
  templateUrl: './asistencia-horas-extras-delete-dialog.component.html'
})
export class AsistenciaHorasExtrasDeleteDialogComponent {
  asistenciaHorasExtras: IAsistenciaHorasExtras;

  constructor(
    protected asistenciaHorasExtrasService: AsistenciaHorasExtrasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.asistenciaHorasExtrasService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'asistenciaHorasExtrasListModification',
        content: 'Deleted an asistenciaHorasExtras'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-asistencia-horas-extras-delete-popup',
  template: ''
})
export class AsistenciaHorasExtrasDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asistenciaHorasExtras }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AsistenciaHorasExtrasDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.asistenciaHorasExtras = asistenciaHorasExtras;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/asistencia-horas-extras', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/asistencia-horas-extras', { outlets: { popup: null } }]);
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

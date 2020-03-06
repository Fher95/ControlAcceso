import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from './asignacion-turno.service';

@Component({
  selector: 'jhi-asignacion-turno-delete-dialog',
  templateUrl: './asignacion-turno-delete-dialog.component.html'
})
export class AsignacionTurnoDeleteDialogComponent {
  asignacionTurno: IAsignacionTurno;

  constructor(
    protected asignacionTurnoService: AsignacionTurnoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.asignacionTurnoService.finalizarAsignacion(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'asignacionTurnoListModification',
        content: 'Deleted an asignacionTurno'
      });
      this.activeModal.dismiss(true);
    });
  }
  /*
    this.asignacionTurnoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'asignacionTurnoListModification',
        content: 'Deleted an asignacionTurno'
      });
      this.activeModal.dismiss(true);
    });
  } */
}

@Component({
  selector: 'jhi-asignacion-turno-delete-popup',
  template: ''
})
export class AsignacionTurnoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asignacionTurno }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AsignacionTurnoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.asignacionTurno = asignacionTurno;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/asignacion-turno', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/asignacion-turno', { outlets: { popup: null } }]);
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { IntercambioTurnoService } from './intercambio-turno.service';

@Component({
  selector: 'jhi-intercambio-turno-delete-dialog',
  templateUrl: './intercambio-turno-delete-dialog.component.html'
})
export class IntercambioTurnoDeleteDialogComponent {
  intercambioTurno: IIntercambioTurno;

  constructor(
    protected intercambioTurnoService: IntercambioTurnoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.intercambioTurnoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'intercambioTurnoListModification',
        content: 'Deleted an intercambioTurno'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-intercambio-turno-delete-popup',
  template: ''
})
export class IntercambioTurnoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ intercambioTurno }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(IntercambioTurnoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.intercambioTurno = intercambioTurno;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/intercambio-turno', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/intercambio-turno', { outlets: { popup: null } }]);
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

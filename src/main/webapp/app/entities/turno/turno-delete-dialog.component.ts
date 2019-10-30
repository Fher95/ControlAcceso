import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITurno } from 'app/shared/model/turno.model';
import { TurnoService } from './turno.service';

@Component({
  selector: 'jhi-turno-delete-dialog',
  templateUrl: './turno-delete-dialog.component.html'
})
export class TurnoDeleteDialogComponent {
  turno: ITurno;

  constructor(protected turnoService: TurnoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.turnoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'turnoListModification',
        content: 'Deleted an turno'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-turno-delete-popup',
  template: ''
})
export class TurnoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ turno }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TurnoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.turno = turno;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/turno', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/turno', { outlets: { popup: null } }]);
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { PlanificacionAsistenciaService } from './planificacion-asistencia.service';

@Component({
  selector: 'jhi-generar-planificacion-dialog',
  templateUrl: './generar-planificacion-dialog.html'
})
export class GenerarPlanificacionDialogComponent {
  constructor(
    protected planificacionAsistenciaService: PlanificacionAsistenciaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {}
}

@Component({
  selector: 'jhi-generar-planificacion-dialog-popup',
  template: ''
})
export class GenerarPlanificacionPopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    setTimeout(() => {
      this.ngbModalRef = this.modalService.open(GenerarPlanificacionDialogComponent as Component, {
        size: 'lg',
        backdrop: 'static'
      });
      this.ngbModalRef.result.then(
        result => {
          this.router.navigate(['/planificacion-asistencia', { outlets: { popup: null } }]);
          this.ngbModalRef = null;
        },
        reason => {
          this.router.navigate(['/planificacion-asistencia', { outlets: { popup: null } }]);
          this.ngbModalRef = null;
        }
      );
    }, 0);
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

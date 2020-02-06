import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { PlanificacionAsistenciaService } from './planificacion-asistencia.service';

@Component({
  selector: 'jhi-planificacion-asistencia-delete-dialog',
  templateUrl: './planificacion-asistencia-delete-dialog.component.html'
})
export class PlanificacionAsistenciaDeleteDialogComponent {
  planificacionAsistencia: IPlanificacionAsistencia;

  constructor(
    protected planificacionAsistenciaService: PlanificacionAsistenciaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.planificacionAsistenciaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'planificacionAsistenciaListModification',
        content: 'Deleted an planificacionAsistencia'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-planificacion-asistencia-delete-popup',
  template: ''
})
export class PlanificacionAsistenciaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ planificacionAsistencia }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlanificacionAsistenciaDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.planificacionAsistencia = planificacionAsistencia;
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
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

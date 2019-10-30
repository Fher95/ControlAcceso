import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReporteAsistencia } from 'app/shared/model/reporte-asistencia.model';
import { ReporteAsistenciaService } from './reporte-asistencia.service';

@Component({
  selector: 'jhi-reporte-asistencia-delete-dialog',
  templateUrl: './reporte-asistencia-delete-dialog.component.html'
})
export class ReporteAsistenciaDeleteDialogComponent {
  reporteAsistencia: IReporteAsistencia;

  constructor(
    protected reporteAsistenciaService: ReporteAsistenciaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.reporteAsistenciaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'reporteAsistenciaListModification',
        content: 'Deleted an reporteAsistencia'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reporte-asistencia-delete-popup',
  template: ''
})
export class ReporteAsistenciaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reporteAsistencia }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReporteAsistenciaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reporteAsistencia = reporteAsistencia;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reporte-asistencia', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reporte-asistencia', { outlets: { popup: null } }]);
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

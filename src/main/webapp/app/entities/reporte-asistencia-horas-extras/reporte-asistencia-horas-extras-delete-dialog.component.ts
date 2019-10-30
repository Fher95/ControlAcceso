import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';
import { ReporteAsistenciaHorasExtrasService } from './reporte-asistencia-horas-extras.service';

@Component({
  selector: 'jhi-reporte-asistencia-horas-extras-delete-dialog',
  templateUrl: './reporte-asistencia-horas-extras-delete-dialog.component.html'
})
export class ReporteAsistenciaHorasExtrasDeleteDialogComponent {
  reporteAsistenciaHorasExtras: IReporteAsistenciaHorasExtras;

  constructor(
    protected reporteAsistenciaHorasExtrasService: ReporteAsistenciaHorasExtrasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.reporteAsistenciaHorasExtrasService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'reporteAsistenciaHorasExtrasListModification',
        content: 'Deleted an reporteAsistenciaHorasExtras'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reporte-asistencia-horas-extras-delete-popup',
  template: ''
})
export class ReporteAsistenciaHorasExtrasDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reporteAsistenciaHorasExtras }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReporteAsistenciaHorasExtrasDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.reporteAsistenciaHorasExtras = reporteAsistenciaHorasExtras;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reporte-asistencia-horas-extras', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reporte-asistencia-horas-extras', { outlets: { popup: null } }]);
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

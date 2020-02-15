import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlanificacionAsistencia, PlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { PlanificacionAsistenciaService } from './planificacion-asistencia.service';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { HttpResponse } from '@angular/common/http';
import { Respuesta } from 'app/shared/model/respuesta';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'jhi-generar-planificacion-dialog',
  templateUrl: './generar-planificacion-dialog.html'
})
export class GenerarPlanificacionDialogComponent {
  fromDate: string;
  toDate: string;
  seleccionInvalida = false;
  fechaInicioInvalida: boolean;
  dateInicio: Date;
  dateActual: Date;
  dateFin: Date;
  confirmado = false;
  todoCorrecto = false;
  constructor(
    protected planificacionAsistenciaService: PlanificacionAsistenciaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager,
    protected jhiAlertService: JhiAlertService
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }
  validar() {
    const dateActual = new Date();
    dateActual.setHours(0, 0, 0, 0);
    const dateInicio = this.getDate(this.fromDate);

    this.dateInicio = dateInicio;
    this.dateActual = dateActual;

    if (this.toDate !== undefined) {
      const dateFin = this.getDate(this.toDate);
      this.dateFin = dateFin;
      if (dateInicio > dateFin) {
        this.seleccionInvalida = true;
      } else {
        this.seleccionInvalida = false;
      }
    }

    if (dateInicio < dateActual) {
      this.fechaInicioInvalida = true;
    } else {
      this.fechaInicioInvalida = false;
    }

    this.verificarTodo();
  }

  generarAsistenciaPlanificacion() {
    const planificacionAsisAGenerar: IPlanificacionAsistencia = new PlanificacionAsistencia();
    planificacionAsisAGenerar.fechaInicioPlanificacion = moment(this.fromDate, DATE_FORMAT);
    planificacionAsisAGenerar.fechaFinPlanificacion = moment(this.toDate, DATE_FORMAT);
    this.planificacionAsistenciaService
      .generarPlaneacion(planificacionAsisAGenerar)
      .pipe(
        filter((res: HttpResponse<Respuesta>) => res.ok),
        map((res: HttpResponse<Respuesta>) => res.body)
      )
      .subscribe((res: Respuesta) => {
        this.mostrarMensaje(res.tipoMensaje, res.mensaje);
        this.eventManager.broadcast({
          name: 'planificacionAsistenciaListModification',
          content: 'Generar una planificacionAsistencia'
        });
        this.activeModal.dismiss(true);
      });
  }

  mostrarMensaje(parMensaje: string, tipoMensaje: string) {
    this.jhiAlertService.i18nEnabled = false;
    if (tipoMensaje === 'Exito') {
      this.jhiAlertService.info(parMensaje);
    } else if (tipoMensaje === 'Error') {
      this.jhiAlertService.error(parMensaje);
    }
    this.jhiAlertService.i18nEnabled = true;
  }

  getDate(strFecha: string): Date {
    const vecFecha: string[] = strFecha.split('-');
    const dateInicio = new Date(parseInt(vecFecha[0], 10), parseInt(vecFecha[1], 10) - 1, parseInt(vecFecha[2], 10));
    return dateInicio;
  }

  confirmDelete(id: number) {}

  confirmar() {
    const planificacionAsisAGenerar: IPlanificacionAsistencia = new PlanificacionAsistencia();
    planificacionAsisAGenerar.fechaInicioPlanificacion = moment(this.fromDate, DATE_FORMAT);
    planificacionAsisAGenerar.fechaFinPlanificacion = moment(this.toDate, DATE_FORMAT);
    this.planificacionAsistenciaService
      .verificarNuevaPlanificacion(planificacionAsisAGenerar)
      .pipe(
        filter((res: HttpResponse<Respuesta>) => res.ok),
        map((res: HttpResponse<Respuesta>) => res.body)
      )
      .subscribe((res: Respuesta) => {
        this.procesarRespuesta(res);
      });

    if (this.confirmado) {
      this.confirmado = false;
    } else {
      this.confirmado = true;
    }
  }

  procesarRespuesta(res: Respuesta) {
    if (res.tipoMensaje === 'Exito') {
      if (this.confirmado) {
        this.confirmado = false;
      } else {
        this.confirmado = true;
      }
    } else if (res.tipoMensaje === 'Error') {
      this.mostrarMensaje(res.tipoMensaje, res.mensaje);
    }
  }

  verificarTodo() {
    if (!this.seleccionInvalida && !this.fechaInicioInvalida && this.dateFin && this.dateFin) {
      this.todoCorrecto = true;
    } else {
      this.todoCorrecto = false;
    }
  }
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

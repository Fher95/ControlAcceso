import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { AccountService } from 'app/core/auth/account.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PlanificacionAsistenciaService } from './planificacion-asistencia.service';
import { DatePipe } from '@angular/common';
import { Respuesta } from 'app/shared/model/respuesta';

@Component({
  selector: 'jhi-planificacion-asistencia',
  templateUrl: './planificacion-asistencia.component.html'
})
export class PlanificacionAsistenciaComponent implements OnInit, OnDestroy {
  currentAccount: any;
  planificacionAsistencias: IPlanificacionAsistencia[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  fromDate: string;
  toDate: string;

  constructor(
    protected planificacionAsistenciaService: PlanificacionAsistenciaService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private datePipe: DatePipe,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.planificacionAsistenciaService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        fromDate: this.fromDate,
        toDate: this.toDate
      })
      .subscribe(
        (res: HttpResponse<IPlanificacionAsistencia[]>) => this.paginatePlanificacionAsistencias(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/planificacion-asistencia'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/planificacion-asistencia',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.today();
    this.previousMonth();
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlanificacionAsistencias();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlanificacionAsistencia) {
    return item.id;
  }

  registerChangeInPlanificacionAsistencias() {
    this.eventSubscriber = this.eventManager.subscribe('planificacionAsistenciaListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePlanificacionAsistencias(data: IPlanificacionAsistencia[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.planificacionAsistencias = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  today() {
    const dateFormat = 'yyyy-MM-dd';
    // Today + 1 day - needed if the current day must be included
    const today: Date = new Date();
    today.setDate(today.getDate());
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.toDate = this.datePipe.transform(date, dateFormat);
  }

  previousMonth() {
    const dateFormat = 'yyyy-MM-dd';
    let fromDate: Date = new Date();

    if (fromDate.getMonth() === 0) {
      fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
    } else {
      fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
    }

    this.fromDate = this.datePipe.transform(fromDate, dateFormat);
  }

  cargarAsistencias() {
    this.planificacionAsistenciaService
      .cargarAsistencias()
      .pipe(
        filter((res: HttpResponse<Respuesta>) => res.ok),
        map((res: HttpResponse<Respuesta>) => res.body)
      )
      .subscribe((res: Respuesta) => {
        this.mostrarMensaje(res.mensaje, res.tipoMensaje);
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
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';
import { AccountService } from 'app/core/auth/account.service';
import { ReporteAsistenciaHorasExtrasService } from './reporte-asistencia-horas-extras.service';

@Component({
  selector: 'jhi-reporte-asistencia-horas-extras',
  templateUrl: './reporte-asistencia-horas-extras.component.html'
})
export class ReporteAsistenciaHorasExtrasComponent implements OnInit, OnDestroy {
  reporteAsistenciaHorasExtras: IReporteAsistenciaHorasExtras[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected reporteAsistenciaHorasExtrasService: ReporteAsistenciaHorasExtrasService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.reporteAsistenciaHorasExtrasService
      .query()
      .pipe(
        filter((res: HttpResponse<IReporteAsistenciaHorasExtras[]>) => res.ok),
        map((res: HttpResponse<IReporteAsistenciaHorasExtras[]>) => res.body)
      )
      .subscribe(
        (res: IReporteAsistenciaHorasExtras[]) => {
          this.reporteAsistenciaHorasExtras = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInReporteAsistenciaHorasExtras();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReporteAsistenciaHorasExtras) {
    return item.id;
  }

  registerChangeInReporteAsistenciaHorasExtras() {
    this.eventSubscriber = this.eventManager.subscribe('reporteAsistenciaHorasExtrasListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

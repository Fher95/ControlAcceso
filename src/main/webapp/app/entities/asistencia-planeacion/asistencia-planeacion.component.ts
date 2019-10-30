import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { AccountService } from 'app/core/auth/account.service';
import { AsistenciaPlaneacionService } from './asistencia-planeacion.service';

@Component({
  selector: 'jhi-asistencia-planeacion',
  templateUrl: './asistencia-planeacion.component.html'
})
export class AsistenciaPlaneacionComponent implements OnInit, OnDestroy {
  asistenciaPlaneacions: IAsistenciaPlaneacion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected asistenciaPlaneacionService: AsistenciaPlaneacionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.asistenciaPlaneacionService
      .query()
      .pipe(
        filter((res: HttpResponse<IAsistenciaPlaneacion[]>) => res.ok),
        map((res: HttpResponse<IAsistenciaPlaneacion[]>) => res.body)
      )
      .subscribe(
        (res: IAsistenciaPlaneacion[]) => {
          this.asistenciaPlaneacions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAsistenciaPlaneacions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAsistenciaPlaneacion) {
    return item.id;
  }

  registerChangeInAsistenciaPlaneacions() {
    this.eventSubscriber = this.eventManager.subscribe('asistenciaPlaneacionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

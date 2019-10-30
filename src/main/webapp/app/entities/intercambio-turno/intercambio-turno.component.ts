import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { AccountService } from 'app/core/auth/account.service';
import { IntercambioTurnoService } from './intercambio-turno.service';

@Component({
  selector: 'jhi-intercambio-turno',
  templateUrl: './intercambio-turno.component.html'
})
export class IntercambioTurnoComponent implements OnInit, OnDestroy {
  intercambioTurnos: IIntercambioTurno[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected intercambioTurnoService: IntercambioTurnoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.intercambioTurnoService
      .query()
      .pipe(
        filter((res: HttpResponse<IIntercambioTurno[]>) => res.ok),
        map((res: HttpResponse<IIntercambioTurno[]>) => res.body)
      )
      .subscribe(
        (res: IIntercambioTurno[]) => {
          this.intercambioTurnos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInIntercambioTurnos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IIntercambioTurno) {
    return item.id;
  }

  registerChangeInIntercambioTurnos() {
    this.eventSubscriber = this.eventManager.subscribe('intercambioTurnoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

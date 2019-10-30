import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AccountService } from 'app/core/auth/account.service';
import { AsignacionTurnoService } from './asignacion-turno.service';

@Component({
  selector: 'jhi-asignacion-turno',
  templateUrl: './asignacion-turno.component.html'
})
export class AsignacionTurnoComponent implements OnInit, OnDestroy {
  asignacionTurnos: IAsignacionTurno[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected asignacionTurnoService: AsignacionTurnoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.asignacionTurnoService
      .query()
      .pipe(
        filter((res: HttpResponse<IAsignacionTurno[]>) => res.ok),
        map((res: HttpResponse<IAsignacionTurno[]>) => res.body)
      )
      .subscribe(
        (res: IAsignacionTurno[]) => {
          this.asignacionTurnos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAsignacionTurnos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAsignacionTurno) {
    return item.id;
  }

  registerChangeInAsignacionTurnos() {
    this.eventSubscriber = this.eventManager.subscribe('asignacionTurnoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

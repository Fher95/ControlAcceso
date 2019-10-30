import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';
import { AccountService } from 'app/core/auth/account.service';
import { AsignacionHorasExtrasService } from './asignacion-horas-extras.service';

@Component({
  selector: 'jhi-asignacion-horas-extras',
  templateUrl: './asignacion-horas-extras.component.html'
})
export class AsignacionHorasExtrasComponent implements OnInit, OnDestroy {
  asignacionHorasExtras: IAsignacionHorasExtras[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected asignacionHorasExtrasService: AsignacionHorasExtrasService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.asignacionHorasExtrasService
      .query()
      .pipe(
        filter((res: HttpResponse<IAsignacionHorasExtras[]>) => res.ok),
        map((res: HttpResponse<IAsignacionHorasExtras[]>) => res.body)
      )
      .subscribe(
        (res: IAsignacionHorasExtras[]) => {
          this.asignacionHorasExtras = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAsignacionHorasExtras();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAsignacionHorasExtras) {
    return item.id;
  }

  registerChangeInAsignacionHorasExtras() {
    this.eventSubscriber = this.eventManager.subscribe('asignacionHorasExtrasListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

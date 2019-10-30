import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDevengoNomina } from 'app/shared/model/devengo-nomina.model';
import { AccountService } from 'app/core/auth/account.service';
import { DevengoNominaService } from './devengo-nomina.service';

@Component({
  selector: 'jhi-devengo-nomina',
  templateUrl: './devengo-nomina.component.html'
})
export class DevengoNominaComponent implements OnInit, OnDestroy {
  devengoNominas: IDevengoNomina[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected devengoNominaService: DevengoNominaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.devengoNominaService
      .query()
      .pipe(
        filter((res: HttpResponse<IDevengoNomina[]>) => res.ok),
        map((res: HttpResponse<IDevengoNomina[]>) => res.body)
      )
      .subscribe(
        (res: IDevengoNomina[]) => {
          this.devengoNominas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDevengoNominas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDevengoNomina) {
    return item.id;
  }

  registerChangeInDevengoNominas() {
    this.eventSubscriber = this.eventManager.subscribe('devengoNominaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

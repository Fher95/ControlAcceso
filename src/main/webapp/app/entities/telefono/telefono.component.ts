import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITelefono } from 'app/shared/model/telefono.model';
import { AccountService } from 'app/core/auth/account.service';
import { TelefonoService } from './telefono.service';

@Component({
  selector: 'jhi-telefono',
  templateUrl: './telefono.component.html'
})
export class TelefonoComponent implements OnInit, OnDestroy {
  telefonos: ITelefono[];
  currentAccount: any;
  eventSubscriber: Subscription;
  telefonosColaborador: ITelefono[];

  constructor(
    protected telefonoService: TelefonoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.telefonoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITelefono[]>) => res.ok),
        map((res: HttpResponse<ITelefono[]>) => res.body)
      )
      .subscribe(
        (res: ITelefono[]) => {
          this.telefonos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadTelefonosColaborador(id: number) {
    this.telefonoService
      .findTelefonosColaborador(id)
      .pipe(
        filter((res: HttpResponse<ITelefono[]>) => res.ok),
        map((res: HttpResponse<ITelefono[]>) => res.body)
      )
      .subscribe((res: ITelefono[]) => {
        this.telefonos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    // this.loadTelefonosColaborador(2);
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTelefonos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITelefono) {
    return item.id;
  }

  registerChangeInTelefonos() {
    this.eventSubscriber = this.eventManager.subscribe('telefonoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

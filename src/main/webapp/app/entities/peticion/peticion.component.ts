import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPeticion } from 'app/shared/model/peticion.model';
import { AccountService } from 'app/core/auth/account.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PeticionService } from './peticion.service';
import { UtilidadesColaborador } from 'app/shared/util/utilidades-generales';
import { EstadoPeticion } from 'app/shared/model/enumerations/estado-peticion.model';

@Component({
  selector: 'jhi-peticion',
  templateUrl: './peticion.component.html'
})
export class PeticionComponent implements OnInit, OnDestroy {
  currentAccount: any;
  peticions: IPeticion[];
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
  mostrando = 'Pendientes';
  filtro = 'estado-is-null';

  constructor(
    protected peticionService: PeticionService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    public utilidadesCol: UtilidadesColaborador
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
    this.peticionService
      .query({
        filter: this.filtro,
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IPeticion[]>) => this.paginatePeticions(res.body, res.headers),
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
    this.router.navigate(['/peticion'], {
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
      '/peticion',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.predicate = 'fechaPeticion';
    this.reverse = false;
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPeticions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPeticion) {
    return item.id;
  }

  registerChangeInPeticions() {
    this.eventSubscriber = this.eventManager.subscribe('peticionListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePeticions(data: IPeticion[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.peticions = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  guardarCambioDeEstado(parPeticion: IPeticion, aceptado: boolean) {
    if (aceptado) {
      parPeticion.estado = EstadoPeticion.Autorizada;
    } else {
      parPeticion.estado = EstadoPeticion.NoAutorizada;
    }
    const autorizadoPor = this.currentAccount.firstName + ' ' + this.currentAccount.lastName;
    parPeticion.autorizadoPor = autorizadoPor;
    this.peticionService.update(parPeticion).subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.loadAll();
    // this.jhiAlertService.success('Estado de peticion actualziado', null, null);
  }

  protected onSaveError() {
    this.jhiAlertService.error('Problema al intentar actualizar el estado de la peticion', null, null);
  }

  cambiarListado() {
    this.filtro = '';
    if (this.mostrando === 'Pendientes') {
      this.filtro = 'estado-is-null';
    } else if (this.mostrando === 'Historial') {
      this.filtro = 'estado-is-not-null';
    } else if (this.mostrando === 'Todo') {
      this.filtro = '';
    }
    if (this.page !== 1) {
      this.page = 1;
      this.previousPage = 0;
    }
    this.transition();
  }
}

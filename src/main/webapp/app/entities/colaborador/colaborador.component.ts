import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IColaborador } from 'app/shared/model/colaborador.model';
import { AccountService } from 'app/core/auth/account.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ColaboradorService } from './colaborador.service';

@Component({
  selector: 'jhi-colaborador',
  templateUrl: './colaborador.component.html'
})
export class ColaboradorComponent implements OnInit, OnDestroy {
  currentAccount: any;
  colaboradors: IColaborador[];
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
  currentSearch = '';

  constructor(
    protected colaboradorService: ColaboradorService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
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

  getUltomoColaborador(): number {
    return this.colaboradorService.idUltimoColaborador;
  }

  loadAll() {
    this.colaboradorService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IColaborador[]>) => this.paginateColaboradors(res.body, res.headers),
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
    this.router.navigate(['/colaborador'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.page = 0;
    this.router.navigate([
      '/colaborador',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInColaboradors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IColaborador) {
    return item.id;
  }

  registerChangeInColaboradors() {
    this.eventSubscriber = this.eventManager.subscribe('colaboradorListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateColaboradors(data: IColaborador[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.colaboradors = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  search(parStrNombres: string) {
    this.previousPage = 0;
    this.page = 1;
    // Si la cadena de busqueda contiene numero, entonces la busca de colaboradores se hará por id.
    if (this.contieneNumeros(parStrNombres)) {
      this.colaboradorService
        .findByNumDocumento(parStrNombres)
        .subscribe(
          (res: HttpResponse<IColaborador[]>) => this.paginateColaboradors(res.body, res.headers),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    } else {
      // De lo contrario se busca por los nombres
      const listaDatos: string[] = this.getArrayPalabras(parStrNombres);
      this.colaboradorService
        .findByNombres(listaDatos)
        .subscribe(
          (res: HttpResponse<IColaborador[]>) => this.paginateColaboradors(res.body, res.headers),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  /**
   * Recibe una cadena de texto a la cual se deben separar sus palabras por espacios, para devolver un
   * vector de datos string[] con las palabras de la cadena de texto.
   * @param nombres
   */
  getArrayPalabras(nombres: string): string[] {
    const arrayInicial = nombres.split(' ');
    const arrayFinal = arrayInicial.filter((valor: string) => valor !== '');
    return arrayFinal;
  }

  contieneNumeros(parCadena: string): boolean {
    const str = parCadena.trim();
    if (
      str.includes('0') ||
      str.includes('1') ||
      str.includes('2') ||
      str.includes('3') ||
      str.includes('4') ||
      str.includes('5') ||
      str.includes('6') ||
      str.includes('7') ||
      str.includes('8') ||
      str.includes('9')
    ) {
      return true;
    } else {
      return false;
    }
  }
}

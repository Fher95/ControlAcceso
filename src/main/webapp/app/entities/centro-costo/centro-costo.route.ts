import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CentroCosto } from 'app/shared/model/centro-costo.model';
import { CentroCostoService } from './centro-costo.service';
import { CentroCostoComponent } from './centro-costo.component';
import { CentroCostoDetailComponent } from './centro-costo-detail.component';
import { CentroCostoUpdateComponent } from './centro-costo-update.component';
import { CentroCostoDeletePopupComponent } from './centro-costo-delete-dialog.component';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';

@Injectable({ providedIn: 'root' })
export class CentroCostoResolve implements Resolve<ICentroCosto> {
  constructor(private service: CentroCostoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICentroCosto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CentroCosto>) => response.ok),
        map((centroCosto: HttpResponse<CentroCosto>) => centroCosto.body)
      );
    }
    return of(new CentroCosto());
  }
}

export const centroCostoRoute: Routes = [
  {
    path: '',
    component: CentroCostoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_ADMIN', 'JEFE_GESTION_HUMANA', 'ASISTENTE_GESTION_HUMANA', 'JEFE_PRODUCCION', 'ASISTENTE_PRODUCCION'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.centroCosto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CentroCostoDetailComponent,
    resolve: {
      centroCosto: CentroCostoResolve
    },
    data: {
      authorities: ['ROLE_ADMIN', 'JEFE_GESTION_HUMANA', 'ASISTENTE_GESTION_HUMANA', 'JEFE_PRODUCCION', 'ASISTENTE_PRODUCCION'],
      pageTitle: 'controlAccesoApp.centroCosto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CentroCostoUpdateComponent,
    resolve: {
      centroCosto: CentroCostoResolve
    },
    data: {
      authorities: ['ROLE_ADMIN', 'JEFE_GESTION_HUMANA', 'ASISTENTE_GESTION_HUMANA', 'JEFE_PRODUCCION', 'ASISTENTE_PRODUCCION'],
      pageTitle: 'controlAccesoApp.centroCosto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CentroCostoUpdateComponent,
    resolve: {
      centroCosto: CentroCostoResolve
    },
    data: {
      authorities: ['ROLE_ADMIN', 'JEFE_GESTION_HUMANA', 'ASISTENTE_GESTION_HUMANA', 'JEFE_PRODUCCION', 'ASISTENTE_PRODUCCION'],
      pageTitle: 'controlAccesoApp.centroCosto.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const centroCostoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CentroCostoDeletePopupComponent,
    resolve: {
      centroCosto: CentroCostoResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'controlAccesoApp.centroCosto.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

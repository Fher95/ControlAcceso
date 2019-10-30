import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Novedades } from 'app/shared/model/novedades.model';
import { NovedadesService } from './novedades.service';
import { NovedadesComponent } from './novedades.component';
import { NovedadesDetailComponent } from './novedades-detail.component';
import { NovedadesUpdateComponent } from './novedades-update.component';
import { NovedadesDeletePopupComponent } from './novedades-delete-dialog.component';
import { INovedades } from 'app/shared/model/novedades.model';

@Injectable({ providedIn: 'root' })
export class NovedadesResolve implements Resolve<INovedades> {
  constructor(private service: NovedadesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INovedades> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Novedades>) => response.ok),
        map((novedades: HttpResponse<Novedades>) => novedades.body)
      );
    }
    return of(new Novedades());
  }
}

export const novedadesRoute: Routes = [
  {
    path: '',
    component: NovedadesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.novedades.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NovedadesDetailComponent,
    resolve: {
      novedades: NovedadesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.novedades.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NovedadesUpdateComponent,
    resolve: {
      novedades: NovedadesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.novedades.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NovedadesUpdateComponent,
    resolve: {
      novedades: NovedadesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.novedades.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const novedadesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NovedadesDeletePopupComponent,
    resolve: {
      novedades: NovedadesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.novedades.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

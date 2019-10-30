import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';
import { PlaneacionSemanalService } from './planeacion-semanal.service';
import { PlaneacionSemanalComponent } from './planeacion-semanal.component';
import { PlaneacionSemanalDetailComponent } from './planeacion-semanal-detail.component';
import { PlaneacionSemanalUpdateComponent } from './planeacion-semanal-update.component';
import { PlaneacionSemanalDeletePopupComponent } from './planeacion-semanal-delete-dialog.component';
import { IPlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';

@Injectable({ providedIn: 'root' })
export class PlaneacionSemanalResolve implements Resolve<IPlaneacionSemanal> {
  constructor(private service: PlaneacionSemanalService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlaneacionSemanal> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlaneacionSemanal>) => response.ok),
        map((planeacionSemanal: HttpResponse<PlaneacionSemanal>) => planeacionSemanal.body)
      );
    }
    return of(new PlaneacionSemanal());
  }
}

export const planeacionSemanalRoute: Routes = [
  {
    path: '',
    component: PlaneacionSemanalComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.planeacionSemanal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaneacionSemanalDetailComponent,
    resolve: {
      planeacionSemanal: PlaneacionSemanalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.planeacionSemanal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaneacionSemanalUpdateComponent,
    resolve: {
      planeacionSemanal: PlaneacionSemanalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.planeacionSemanal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaneacionSemanalUpdateComponent,
    resolve: {
      planeacionSemanal: PlaneacionSemanalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.planeacionSemanal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const planeacionSemanalPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlaneacionSemanalDeletePopupComponent,
    resolve: {
      planeacionSemanal: PlaneacionSemanalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.planeacionSemanal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

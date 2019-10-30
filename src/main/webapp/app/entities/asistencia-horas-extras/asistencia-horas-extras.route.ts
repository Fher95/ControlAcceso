import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';
import { AsistenciaHorasExtrasService } from './asistencia-horas-extras.service';
import { AsistenciaHorasExtrasComponent } from './asistencia-horas-extras.component';
import { AsistenciaHorasExtrasDetailComponent } from './asistencia-horas-extras-detail.component';
import { AsistenciaHorasExtrasUpdateComponent } from './asistencia-horas-extras-update.component';
import { AsistenciaHorasExtrasDeletePopupComponent } from './asistencia-horas-extras-delete-dialog.component';
import { IAsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';

@Injectable({ providedIn: 'root' })
export class AsistenciaHorasExtrasResolve implements Resolve<IAsistenciaHorasExtras> {
  constructor(private service: AsistenciaHorasExtrasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAsistenciaHorasExtras> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AsistenciaHorasExtras>) => response.ok),
        map((asistenciaHorasExtras: HttpResponse<AsistenciaHorasExtras>) => asistenciaHorasExtras.body)
      );
    }
    return of(new AsistenciaHorasExtras());
  }
}

export const asistenciaHorasExtrasRoute: Routes = [
  {
    path: '',
    component: AsistenciaHorasExtrasComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.asistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AsistenciaHorasExtrasDetailComponent,
    resolve: {
      asistenciaHorasExtras: AsistenciaHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AsistenciaHorasExtrasUpdateComponent,
    resolve: {
      asistenciaHorasExtras: AsistenciaHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AsistenciaHorasExtrasUpdateComponent,
    resolve: {
      asistenciaHorasExtras: AsistenciaHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const asistenciaHorasExtrasPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AsistenciaHorasExtrasDeletePopupComponent,
    resolve: {
      asistenciaHorasExtras: AsistenciaHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

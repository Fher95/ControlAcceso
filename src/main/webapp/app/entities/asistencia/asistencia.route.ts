import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Asistencia } from 'app/shared/model/asistencia.model';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaComponent } from './asistencia.component';
import { AsistenciaDetailComponent } from './asistencia-detail.component';
import { AsistenciaUpdateComponent } from './asistencia-update.component';
import { AsistenciaDeletePopupComponent } from './asistencia-delete-dialog.component';
import { IAsistencia } from 'app/shared/model/asistencia.model';

@Injectable({ providedIn: 'root' })
export class AsistenciaResolve implements Resolve<IAsistencia> {
  constructor(private service: AsistenciaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAsistencia> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Asistencia>) => response.ok),
        map((asistencia: HttpResponse<Asistencia>) => asistencia.body)
      );
    }
    return of(new Asistencia());
  }
}

export const asistenciaRoute: Routes = [
  {
    path: '',
    component: AsistenciaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.asistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AsistenciaDetailComponent,
    resolve: {
      asistencia: AsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AsistenciaUpdateComponent,
    resolve: {
      asistencia: AsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AsistenciaUpdateComponent,
    resolve: {
      asistencia: AsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const asistenciaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AsistenciaDeletePopupComponent,
    resolve: {
      asistencia: AsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistencia.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

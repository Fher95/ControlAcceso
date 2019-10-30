import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReporteAsistencia } from 'app/shared/model/reporte-asistencia.model';
import { ReporteAsistenciaService } from './reporte-asistencia.service';
import { ReporteAsistenciaComponent } from './reporte-asistencia.component';
import { ReporteAsistenciaDetailComponent } from './reporte-asistencia-detail.component';
import { ReporteAsistenciaUpdateComponent } from './reporte-asistencia-update.component';
import { ReporteAsistenciaDeletePopupComponent } from './reporte-asistencia-delete-dialog.component';
import { IReporteAsistencia } from 'app/shared/model/reporte-asistencia.model';

@Injectable({ providedIn: 'root' })
export class ReporteAsistenciaResolve implements Resolve<IReporteAsistencia> {
  constructor(private service: ReporteAsistenciaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReporteAsistencia> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ReporteAsistencia>) => response.ok),
        map((reporteAsistencia: HttpResponse<ReporteAsistencia>) => reporteAsistencia.body)
      );
    }
    return of(new ReporteAsistencia());
  }
}

export const reporteAsistenciaRoute: Routes = [
  {
    path: '',
    component: ReporteAsistenciaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.reporteAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReporteAsistenciaDetailComponent,
    resolve: {
      reporteAsistencia: ReporteAsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.reporteAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReporteAsistenciaUpdateComponent,
    resolve: {
      reporteAsistencia: ReporteAsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.reporteAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReporteAsistenciaUpdateComponent,
    resolve: {
      reporteAsistencia: ReporteAsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.reporteAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const reporteAsistenciaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReporteAsistenciaDeletePopupComponent,
    resolve: {
      reporteAsistencia: ReporteAsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.reporteAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

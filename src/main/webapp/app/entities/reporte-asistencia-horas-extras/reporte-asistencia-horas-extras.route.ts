import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';
import { ReporteAsistenciaHorasExtrasService } from './reporte-asistencia-horas-extras.service';
import { ReporteAsistenciaHorasExtrasComponent } from './reporte-asistencia-horas-extras.component';
import { ReporteAsistenciaHorasExtrasDetailComponent } from './reporte-asistencia-horas-extras-detail.component';
import { ReporteAsistenciaHorasExtrasUpdateComponent } from './reporte-asistencia-horas-extras-update.component';
import { ReporteAsistenciaHorasExtrasDeletePopupComponent } from './reporte-asistencia-horas-extras-delete-dialog.component';
import { IReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';

@Injectable({ providedIn: 'root' })
export class ReporteAsistenciaHorasExtrasResolve implements Resolve<IReporteAsistenciaHorasExtras> {
  constructor(private service: ReporteAsistenciaHorasExtrasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReporteAsistenciaHorasExtras> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ReporteAsistenciaHorasExtras>) => response.ok),
        map((reporteAsistenciaHorasExtras: HttpResponse<ReporteAsistenciaHorasExtras>) => reporteAsistenciaHorasExtras.body)
      );
    }
    return of(new ReporteAsistenciaHorasExtras());
  }
}

export const reporteAsistenciaHorasExtrasRoute: Routes = [
  {
    path: '',
    component: ReporteAsistenciaHorasExtrasComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.reporteAsistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReporteAsistenciaHorasExtrasDetailComponent,
    resolve: {
      reporteAsistenciaHorasExtras: ReporteAsistenciaHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.reporteAsistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReporteAsistenciaHorasExtrasUpdateComponent,
    resolve: {
      reporteAsistenciaHorasExtras: ReporteAsistenciaHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.reporteAsistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReporteAsistenciaHorasExtrasUpdateComponent,
    resolve: {
      reporteAsistenciaHorasExtras: ReporteAsistenciaHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.reporteAsistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const reporteAsistenciaHorasExtrasPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReporteAsistenciaHorasExtrasDeletePopupComponent,
    resolve: {
      reporteAsistenciaHorasExtras: ReporteAsistenciaHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.reporteAsistenciaHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

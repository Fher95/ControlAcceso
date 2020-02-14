import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { PlanificacionAsistenciaService } from './planificacion-asistencia.service';
import { PlanificacionAsistenciaComponent } from './planificacion-asistencia.component';
import { PlanificacionAsistenciaDetailComponent } from './planificacion-asistencia-detail.component';
import { PlanificacionAsistenciaUpdateComponent } from './planificacion-asistencia-update.component';
import { PlanificacionAsistenciaDeletePopupComponent } from './planificacion-asistencia-delete-dialog.component';
import { IPlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { GenerarPlanificacionPopupComponent } from './generar-planificacion-dialog';

@Injectable({ providedIn: 'root' })
export class PlanificacionAsistenciaResolve implements Resolve<IPlanificacionAsistencia> {
  constructor(private service: PlanificacionAsistenciaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlanificacionAsistencia> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlanificacionAsistencia>) => response.ok),
        map((planificacionAsistencia: HttpResponse<PlanificacionAsistencia>) => planificacionAsistencia.body)
      );
    }
    return of(new PlanificacionAsistencia());
  }
}

export const planificacionAsistenciaRoute: Routes = [
  {
    path: '',
    component: PlanificacionAsistenciaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER', 'ROLE_ADMIN'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.planificacionAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlanificacionAsistenciaDetailComponent,
    resolve: {
      planificacionAsistencia: PlanificacionAsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.planificacionAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlanificacionAsistenciaUpdateComponent,
    resolve: {
      planificacionAsistencia: PlanificacionAsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.planificacionAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlanificacionAsistenciaUpdateComponent,
    resolve: {
      planificacionAsistencia: PlanificacionAsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.planificacionAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const planificacionAsistenciaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlanificacionAsistenciaDeletePopupComponent,
    resolve: {
      planificacionAsistencia: PlanificacionAsistenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.planificacionAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

export const generarPlanificacionPopupRoute: Routes = [
  {
    path: '/generar-planificacion',
    component: GenerarPlanificacionPopupComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.planificacionAsistencia.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

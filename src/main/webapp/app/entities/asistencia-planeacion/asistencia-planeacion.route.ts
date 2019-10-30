import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { AsistenciaPlaneacionService } from './asistencia-planeacion.service';
import { AsistenciaPlaneacionComponent } from './asistencia-planeacion.component';
import { AsistenciaPlaneacionDetailComponent } from './asistencia-planeacion-detail.component';
import { AsistenciaPlaneacionUpdateComponent } from './asistencia-planeacion-update.component';
import { AsistenciaPlaneacionDeletePopupComponent } from './asistencia-planeacion-delete-dialog.component';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';

@Injectable({ providedIn: 'root' })
export class AsistenciaPlaneacionResolve implements Resolve<IAsistenciaPlaneacion> {
  constructor(private service: AsistenciaPlaneacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAsistenciaPlaneacion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AsistenciaPlaneacion>) => response.ok),
        map((asistenciaPlaneacion: HttpResponse<AsistenciaPlaneacion>) => asistenciaPlaneacion.body)
      );
    }
    return of(new AsistenciaPlaneacion());
  }
}

export const asistenciaPlaneacionRoute: Routes = [
  {
    path: '',
    component: AsistenciaPlaneacionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistenciaPlaneacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AsistenciaPlaneacionDetailComponent,
    resolve: {
      asistenciaPlaneacion: AsistenciaPlaneacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistenciaPlaneacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AsistenciaPlaneacionUpdateComponent,
    resolve: {
      asistenciaPlaneacion: AsistenciaPlaneacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistenciaPlaneacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AsistenciaPlaneacionUpdateComponent,
    resolve: {
      asistenciaPlaneacion: AsistenciaPlaneacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistenciaPlaneacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const asistenciaPlaneacionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AsistenciaPlaneacionDeletePopupComponent,
    resolve: {
      asistenciaPlaneacion: AsistenciaPlaneacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asistenciaPlaneacion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

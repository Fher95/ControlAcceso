import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { AsignacionTurnoService } from './asignacion-turno.service';
import { AsignacionTurnoComponent } from './asignacion-turno.component';
import { AsignacionTurnoDetailComponent } from './asignacion-turno-detail.component';
import { AsignacionTurnoUpdateComponent } from './asignacion-turno-update.component';
import { AsignacionTurnoDeletePopupComponent } from './asignacion-turno-delete-dialog.component';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';

@Injectable({ providedIn: 'root' })
export class AsignacionTurnoResolve implements Resolve<IAsignacionTurno> {
  constructor(private service: AsignacionTurnoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAsignacionTurno> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AsignacionTurno>) => response.ok),
        map((asignacionTurno: HttpResponse<AsignacionTurno>) => asignacionTurno.body)
      );
    }
    return of(new AsignacionTurno());
  }
}

export const asignacionTurnoRoute: Routes = [
  {
    path: '',
    component: AsignacionTurnoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionTurno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AsignacionTurnoDetailComponent,
    resolve: {
      asignacionTurno: AsignacionTurnoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionTurno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AsignacionTurnoUpdateComponent,
    resolve: {
      asignacionTurno: AsignacionTurnoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionTurno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AsignacionTurnoUpdateComponent,
    resolve: {
      asignacionTurno: AsignacionTurnoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionTurno.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const asignacionTurnoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AsignacionTurnoDeletePopupComponent,
    resolve: {
      asignacionTurno: AsignacionTurnoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionTurno.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

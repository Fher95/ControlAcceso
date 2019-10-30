import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';
import { AsignacionHorasExtrasService } from './asignacion-horas-extras.service';
import { AsignacionHorasExtrasComponent } from './asignacion-horas-extras.component';
import { AsignacionHorasExtrasDetailComponent } from './asignacion-horas-extras-detail.component';
import { AsignacionHorasExtrasUpdateComponent } from './asignacion-horas-extras-update.component';
import { AsignacionHorasExtrasDeletePopupComponent } from './asignacion-horas-extras-delete-dialog.component';
import { IAsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';

@Injectable({ providedIn: 'root' })
export class AsignacionHorasExtrasResolve implements Resolve<IAsignacionHorasExtras> {
  constructor(private service: AsignacionHorasExtrasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAsignacionHorasExtras> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AsignacionHorasExtras>) => response.ok),
        map((asignacionHorasExtras: HttpResponse<AsignacionHorasExtras>) => asignacionHorasExtras.body)
      );
    }
    return of(new AsignacionHorasExtras());
  }
}

export const asignacionHorasExtrasRoute: Routes = [
  {
    path: '',
    component: AsignacionHorasExtrasComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AsignacionHorasExtrasDetailComponent,
    resolve: {
      asignacionHorasExtras: AsignacionHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AsignacionHorasExtrasUpdateComponent,
    resolve: {
      asignacionHorasExtras: AsignacionHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AsignacionHorasExtrasUpdateComponent,
    resolve: {
      asignacionHorasExtras: AsignacionHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const asignacionHorasExtrasPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AsignacionHorasExtrasDeletePopupComponent,
    resolve: {
      asignacionHorasExtras: AsignacionHorasExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.asignacionHorasExtras.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

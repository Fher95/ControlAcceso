import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Telefono } from 'app/shared/model/telefono.model';
import { TelefonoService } from './telefono.service';
import { TelefonoComponent } from './telefono.component';
import { TelefonoDetailComponent } from './telefono-detail.component';
import { TelefonoUpdateComponent } from './telefono-update.component';
import { TelefonoDeletePopupComponent } from './telefono-delete-dialog.component';
import { ITelefono } from 'app/shared/model/telefono.model';

@Injectable({ providedIn: 'root' })
export class TelefonoResolve implements Resolve<ITelefono> {
  constructor(private service: TelefonoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITelefono> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Telefono>) => response.ok),
        map((telefono: HttpResponse<Telefono>) => telefono.body)
      );
    }
    return of(new Telefono());
  }
}

export const telefonoRoute: Routes = [
  {
    path: '',
    component: TelefonoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.telefono.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TelefonoDetailComponent,
    resolve: {
      telefono: TelefonoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.telefono.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TelefonoUpdateComponent,
    resolve: {
      telefono: TelefonoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.telefono.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TelefonoUpdateComponent,
    resolve: {
      telefono: TelefonoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.telefono.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const telefonoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TelefonoDeletePopupComponent,
    resolve: {
      telefono: TelefonoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.telefono.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

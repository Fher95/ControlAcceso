import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DevengoNomina } from 'app/shared/model/devengo-nomina.model';
import { DevengoNominaService } from './devengo-nomina.service';
import { DevengoNominaComponent } from './devengo-nomina.component';
import { DevengoNominaDetailComponent } from './devengo-nomina-detail.component';
import { DevengoNominaUpdateComponent } from './devengo-nomina-update.component';
import { DevengoNominaDeletePopupComponent } from './devengo-nomina-delete-dialog.component';
import { IDevengoNomina } from 'app/shared/model/devengo-nomina.model';

@Injectable({ providedIn: 'root' })
export class DevengoNominaResolve implements Resolve<IDevengoNomina> {
  constructor(private service: DevengoNominaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDevengoNomina> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DevengoNomina>) => response.ok),
        map((devengoNomina: HttpResponse<DevengoNomina>) => devengoNomina.body)
      );
    }
    return of(new DevengoNomina());
  }
}

export const devengoNominaRoute: Routes = [
  {
    path: '',
    component: DevengoNominaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.devengoNomina.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DevengoNominaDetailComponent,
    resolve: {
      devengoNomina: DevengoNominaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.devengoNomina.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DevengoNominaUpdateComponent,
    resolve: {
      devengoNomina: DevengoNominaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.devengoNomina.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DevengoNominaUpdateComponent,
    resolve: {
      devengoNomina: DevengoNominaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.devengoNomina.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const devengoNominaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DevengoNominaDeletePopupComponent,
    resolve: {
      devengoNomina: DevengoNominaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.devengoNomina.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Turno } from 'app/shared/model/turno.model';
import { TurnoService } from './turno.service';
import { TurnoComponent } from './turno.component';
import { TurnoDetailComponent } from './turno-detail.component';
import { TurnoUpdateComponent } from './turno-update.component';
import { TurnoDeletePopupComponent } from './turno-delete-dialog.component';
import { ITurno } from 'app/shared/model/turno.model';

@Injectable({ providedIn: 'root' })
export class TurnoResolve implements Resolve<ITurno> {
  constructor(private service: TurnoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITurno> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Turno>) => response.ok),
        map((turno: HttpResponse<Turno>) => turno.body)
      );
    }
    return of(new Turno());
  }
}

export const turnoRoute: Routes = [
  {
    path: '',
    component: TurnoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.turno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TurnoDetailComponent,
    resolve: {
      turno: TurnoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.turno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TurnoUpdateComponent,
    resolve: {
      turno: TurnoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.turno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TurnoUpdateComponent,
    resolve: {
      turno: TurnoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.turno.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const turnoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TurnoDeletePopupComponent,
    resolve: {
      turno: TurnoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.turno.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

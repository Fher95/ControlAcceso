import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { IntercambioTurnoService } from './intercambio-turno.service';
import { IntercambioTurnoComponent } from './intercambio-turno.component';
import { IntercambioTurnoDetailComponent } from './intercambio-turno-detail.component';
import { IntercambioTurnoUpdateComponent } from './intercambio-turno-update.component';
import { IntercambioTurnoDeletePopupComponent } from './intercambio-turno-delete-dialog.component';
import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { JhiResolvePagingParams } from 'ng-jhipster';

@Injectable({ providedIn: 'root' })
export class IntercambioTurnoResolve implements Resolve<IIntercambioTurno> {
  constructor(private service: IntercambioTurnoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIntercambioTurno> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<IntercambioTurno>) => response.ok),
        map((intercambioTurno: HttpResponse<IntercambioTurno>) => intercambioTurno.body)
      );
    }
    return of(new IntercambioTurno());
  }
}

export const intercambioTurnoRoute: Routes = [
  {
    path: '',
    component: IntercambioTurnoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [
        'ROLE_ADMIN',
        'JEFE_GESTION_HUMANA',
        'ASISTENTE_GESTION_HUMANA',
        'JEFE_PRODUCCION',
        'ASISTENTE_PRODUCCION',
        'SUPERVISOR'
      ],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.intercambioTurno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IntercambioTurnoDetailComponent,
    resolve: {
      intercambioTurno: IntercambioTurnoResolve
    },
    data: {
      authorities: [
        'ROLE_ADMIN',
        'JEFE_GESTION_HUMANA',
        'ASISTENTE_GESTION_HUMANA',
        'JEFE_PRODUCCION',
        'ASISTENTE_PRODUCCION',
        'SUPERVISOR'
      ],
      pageTitle: 'controlAccesoApp.intercambioTurno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IntercambioTurnoUpdateComponent,
    resolve: {
      intercambioTurno: IntercambioTurnoResolve
    },
    data: {
      authorities: ['ROLE_ADMIN', 'JEFE_PRODUCCION', 'ASISTENTE_PRODUCCION', 'SUPERVISOR'],
      pageTitle: 'controlAccesoApp.intercambioTurno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IntercambioTurnoUpdateComponent,
    resolve: {
      intercambioTurno: IntercambioTurnoResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'controlAccesoApp.intercambioTurno.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const intercambioTurnoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: IntercambioTurnoDeletePopupComponent,
    resolve: {
      intercambioTurno: IntercambioTurnoResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'controlAccesoApp.intercambioTurno.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

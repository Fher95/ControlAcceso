import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Colaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorComponent } from './colaborador.component';
import { ColaboradorDetailComponent } from './colaborador-detail.component';
import { ColaboradorUpdateComponent } from './colaborador-update.component';
import { ColaboradorDeletePopupComponent } from './colaborador-delete-dialog.component';
import { IColaborador } from 'app/shared/model/colaborador.model';

@Injectable({ providedIn: 'root' })
export class ColaboradorResolve implements Resolve<IColaborador> {
  constructor(private service: ColaboradorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IColaborador> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Colaborador>) => response.ok),
        map((colaborador: HttpResponse<Colaborador>) => colaborador.body)
      );
    }
    return of(new Colaborador());
  }
}

export const colaboradorRoute: Routes = [
  {
    path: '',
    component: ColaboradorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_ADMIN', 'JEFE_GESTION_HUMANA', 'ASISTENTE_GESTION_HUMANA', 'JEFE_PRODUCCION', 'ASISTENTE_PRODUCCION', 'GERENTE'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.colaborador.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ColaboradorDetailComponent,
    resolve: {
      colaborador: ColaboradorResolve
    },
    data: {
      authorities: ['ROLE_ADMIN', 'JEFE_GESTION_HUMANA', 'ASISTENTE_GESTION_HUMANA', 'JEFE_PRODUCCION', 'ASISTENTE_PRODUCCION', 'GERENTE'],
      pageTitle: 'controlAccesoApp.colaborador.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ColaboradorUpdateComponent,
    resolve: {
      colaborador: ColaboradorResolve
    },
    data: {
      authorities: ['ROLE_ADMIN', 'JEFE_GESTION_HUMANA', 'ASISTENTE_GESTION_HUMANA'],
      pageTitle: 'controlAccesoApp.colaborador.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ColaboradorUpdateComponent,
    resolve: {
      colaborador: ColaboradorResolve
    },
    data: {
      authorities: ['ROLE_ADMIN', 'JEFE_GESTION_HUMANA', 'ASISTENTE_GESTION_HUMANA'],
      pageTitle: 'controlAccesoApp.colaborador.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const colaboradorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ColaboradorDeletePopupComponent,
    resolve: {
      colaborador: ColaboradorResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'controlAccesoApp.colaborador.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

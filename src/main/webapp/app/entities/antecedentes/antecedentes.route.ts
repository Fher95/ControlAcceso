import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Antecedentes } from 'app/shared/model/antecedentes.model';
import { AntecedentesService } from './antecedentes.service';
import { AntecedentesComponent } from './antecedentes.component';
import { AntecedentesDetailComponent } from './antecedentes-detail.component';
import { AntecedentesUpdateComponent } from './antecedentes-update.component';
import { AntecedentesDeletePopupComponent } from './antecedentes-delete-dialog.component';
import { IAntecedentes } from 'app/shared/model/antecedentes.model';

@Injectable({ providedIn: 'root' })
export class AntecedentesResolve implements Resolve<IAntecedentes> {
  constructor(private service: AntecedentesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAntecedentes> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Antecedentes>) => response.ok),
        map((antecedentes: HttpResponse<Antecedentes>) => antecedentes.body)
      );
    }
    return of(new Antecedentes());
  }
}

export const antecedentesRoute: Routes = [
  {
    path: '',
    component: AntecedentesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'controlAccesoApp.antecedentes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AntecedentesDetailComponent,
    resolve: {
      antecedentes: AntecedentesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.antecedentes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AntecedentesUpdateComponent,
    resolve: {
      antecedentes: AntecedentesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.antecedentes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AntecedentesUpdateComponent,
    resolve: {
      antecedentes: AntecedentesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.antecedentes.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const antecedentesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AntecedentesDeletePopupComponent,
    resolve: {
      antecedentes: AntecedentesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'controlAccesoApp.antecedentes.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

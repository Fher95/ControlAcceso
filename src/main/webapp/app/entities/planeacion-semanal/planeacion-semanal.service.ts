import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';

type EntityResponseType = HttpResponse<IPlaneacionSemanal>;
type EntityArrayResponseType = HttpResponse<IPlaneacionSemanal[]>;

@Injectable({ providedIn: 'root' })
export class PlaneacionSemanalService {
  public resourceUrl = SERVER_API_URL + 'api/planeacion-semanals';

  constructor(protected http: HttpClient) {}

  create(planeacionSemanal: IPlaneacionSemanal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planeacionSemanal);
    return this.http
      .post<IPlaneacionSemanal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(planeacionSemanal: IPlaneacionSemanal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planeacionSemanal);
    return this.http
      .put<IPlaneacionSemanal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlaneacionSemanal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlaneacionSemanal[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(planeacionSemanal: IPlaneacionSemanal): IPlaneacionSemanal {
    const copy: IPlaneacionSemanal = Object.assign({}, planeacionSemanal, {
      fechaInicio:
        planeacionSemanal.fechaInicio != null && planeacionSemanal.fechaInicio.isValid() ? planeacionSemanal.fechaInicio.toJSON() : null,
      fechaFin: planeacionSemanal.fechaFin != null && planeacionSemanal.fechaFin.isValid() ? planeacionSemanal.fechaFin.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio != null ? moment(res.body.fechaInicio) : null;
      res.body.fechaFin = res.body.fechaFin != null ? moment(res.body.fechaFin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((planeacionSemanal: IPlaneacionSemanal) => {
        planeacionSemanal.fechaInicio = planeacionSemanal.fechaInicio != null ? moment(planeacionSemanal.fechaInicio) : null;
        planeacionSemanal.fechaFin = planeacionSemanal.fechaFin != null ? moment(planeacionSemanal.fechaFin) : null;
      });
    }
    return res;
  }
}

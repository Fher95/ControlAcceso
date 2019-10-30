import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDevengoNomina } from 'app/shared/model/devengo-nomina.model';

type EntityResponseType = HttpResponse<IDevengoNomina>;
type EntityArrayResponseType = HttpResponse<IDevengoNomina[]>;

@Injectable({ providedIn: 'root' })
export class DevengoNominaService {
  public resourceUrl = SERVER_API_URL + 'api/devengo-nominas';

  constructor(protected http: HttpClient) {}

  create(devengoNomina: IDevengoNomina): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(devengoNomina);
    return this.http
      .post<IDevengoNomina>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(devengoNomina: IDevengoNomina): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(devengoNomina);
    return this.http
      .put<IDevengoNomina>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDevengoNomina>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDevengoNomina[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(devengoNomina: IDevengoNomina): IDevengoNomina {
    const copy: IDevengoNomina = Object.assign({}, devengoNomina, {
      fechaInicio: devengoNomina.fechaInicio != null && devengoNomina.fechaInicio.isValid() ? devengoNomina.fechaInicio.toJSON() : null,
      fechaFin: devengoNomina.fechaFin != null && devengoNomina.fechaFin.isValid() ? devengoNomina.fechaFin.toJSON() : null
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
      res.body.forEach((devengoNomina: IDevengoNomina) => {
        devengoNomina.fechaInicio = devengoNomina.fechaInicio != null ? moment(devengoNomina.fechaInicio) : null;
        devengoNomina.fechaFin = devengoNomina.fechaFin != null ? moment(devengoNomina.fechaFin) : null;
      });
    }
    return res;
  }
}

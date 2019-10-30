import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INovedades } from 'app/shared/model/novedades.model';

type EntityResponseType = HttpResponse<INovedades>;
type EntityArrayResponseType = HttpResponse<INovedades[]>;

@Injectable({ providedIn: 'root' })
export class NovedadesService {
  public resourceUrl = SERVER_API_URL + 'api/novedades';

  constructor(protected http: HttpClient) {}

  create(novedades: INovedades): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(novedades);
    return this.http
      .post<INovedades>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(novedades: INovedades): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(novedades);
    return this.http
      .put<INovedades>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INovedades>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INovedades[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(novedades: INovedades): INovedades {
    const copy: INovedades = Object.assign({}, novedades, {
      fechaInicial: novedades.fechaInicial != null && novedades.fechaInicial.isValid() ? novedades.fechaInicial.toJSON() : null,
      fechaFinal: novedades.fechaFinal != null && novedades.fechaFinal.isValid() ? novedades.fechaFinal.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicial = res.body.fechaInicial != null ? moment(res.body.fechaInicial) : null;
      res.body.fechaFinal = res.body.fechaFinal != null ? moment(res.body.fechaFinal) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((novedades: INovedades) => {
        novedades.fechaInicial = novedades.fechaInicial != null ? moment(novedades.fechaInicial) : null;
        novedades.fechaFinal = novedades.fechaFinal != null ? moment(novedades.fechaFinal) : null;
      });
    }
    return res;
  }
}

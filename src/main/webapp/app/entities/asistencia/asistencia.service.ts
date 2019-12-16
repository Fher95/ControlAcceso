import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAsistencia } from 'app/shared/model/asistencia.model';

type EntityResponseType = HttpResponse<IAsistencia>;
type EntityArrayResponseType = HttpResponse<IAsistencia[]>;

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
  public resourceUrl = SERVER_API_URL + 'api/asistencias';

  constructor(protected http: HttpClient) {}

  create(asistencia: IAsistencia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asistencia);
    return this.http
      .post<IAsistencia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(asistencia: IAsistencia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asistencia);
    return this.http
      .put<IAsistencia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAsistencia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAsistencia[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(asistencia: IAsistencia): IAsistencia {
    const copy: IAsistencia = Object.assign({}, asistencia, {
      entrada: asistencia.entrada != null && asistencia.entrada.isValid() ? asistencia.entrada.toJSON() : null,
      salida: asistencia.salida != null && asistencia.salida.isValid() ? asistencia.salida.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.entrada = res.body.entrada != null ? moment(res.body.entrada) : null;
      res.body.salida = res.body.salida != null ? moment(res.body.salida) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((asistencia: IAsistencia) => {
        asistencia.entrada = asistencia.entrada != null ? moment(asistencia.entrada) : null;
        asistencia.salida = asistencia.salida != null ? moment(asistencia.salida) : null;
      });
    }
    return res;
  }
}

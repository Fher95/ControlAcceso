import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';

type EntityResponseType = HttpResponse<IIntercambioTurno>;
type EntityArrayResponseType = HttpResponse<IIntercambioTurno[]>;

@Injectable({ providedIn: 'root' })
export class IntercambioTurnoService {
  public resourceUrl = SERVER_API_URL + 'api/intercambio-turnos';

  constructor(protected http: HttpClient) {}

  create(intercambioTurno: IIntercambioTurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(intercambioTurno);
    return this.http
      .post<IIntercambioTurno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(intercambioTurno: IIntercambioTurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(intercambioTurno);
    return this.http
      .put<IIntercambioTurno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IIntercambioTurno>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IIntercambioTurno[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(intercambioTurno: IIntercambioTurno): IIntercambioTurno {
    const copy: IIntercambioTurno = Object.assign({}, intercambioTurno, {
      fecha: intercambioTurno.fecha != null && intercambioTurno.fecha.isValid() ? intercambioTurno.fecha.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((intercambioTurno: IIntercambioTurno) => {
        intercambioTurno.fecha = intercambioTurno.fecha != null ? moment(intercambioTurno.fecha) : null;
      });
    }
    return res;
  }
}

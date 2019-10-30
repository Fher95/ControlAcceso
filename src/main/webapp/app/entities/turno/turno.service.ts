import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITurno } from 'app/shared/model/turno.model';

type EntityResponseType = HttpResponse<ITurno>;
type EntityArrayResponseType = HttpResponse<ITurno[]>;

@Injectable({ providedIn: 'root' })
export class TurnoService {
  public resourceUrl = SERVER_API_URL + 'api/turnos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/turnos';

  constructor(protected http: HttpClient) {}

  create(turno: ITurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turno);
    return this.http
      .post<ITurno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(turno: ITurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turno);
    return this.http
      .put<ITurno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITurno>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITurno[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITurno[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(turno: ITurno): ITurno {
    const copy: ITurno = Object.assign({}, turno, {
      horaInicio: turno.horaInicio != null && turno.horaInicio.isValid() ? turno.horaInicio.toJSON() : null,
      umbralInicio: turno.umbralInicio != null && turno.umbralInicio.isValid() ? turno.umbralInicio.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.horaInicio = res.body.horaInicio != null ? moment(res.body.horaInicio) : null;
      res.body.umbralInicio = res.body.umbralInicio != null ? moment(res.body.umbralInicio) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((turno: ITurno) => {
        turno.horaInicio = turno.horaInicio != null ? moment(turno.horaInicio) : null;
        turno.umbralInicio = turno.umbralInicio != null ? moment(turno.umbralInicio) : null;
      });
    }
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';

type EntityResponseType = HttpResponse<IAsignacionTurno>;
type EntityArrayResponseType = HttpResponse<IAsignacionTurno[]>;

@Injectable({ providedIn: 'root' })
export class AsignacionTurnoService {
  public resourceUrl = SERVER_API_URL + 'api/asignacion-turnos';

  constructor(protected http: HttpClient) {}

  create(asignacionTurno: IAsignacionTurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asignacionTurno);
    return this.http
      .post<IAsignacionTurno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(asignacionTurno: IAsignacionTurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asignacionTurno);
    return this.http
      .put<IAsignacionTurno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAsignacionTurno>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAsignacionTurno[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(asignacionTurno: IAsignacionTurno): IAsignacionTurno {
    const copy: IAsignacionTurno = Object.assign({}, asignacionTurno, {
      fecha: asignacionTurno.fecha != null && asignacionTurno.fecha.isValid() ? asignacionTurno.fecha.toJSON() : null
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
      res.body.forEach((asignacionTurno: IAsignacionTurno) => {
        asignacionTurno.fecha = asignacionTurno.fecha != null ? moment(asignacionTurno.fecha) : null;
      });
    }
    return res;
  }
}

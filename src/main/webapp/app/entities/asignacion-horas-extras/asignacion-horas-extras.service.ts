import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';

type EntityResponseType = HttpResponse<IAsignacionHorasExtras>;
type EntityArrayResponseType = HttpResponse<IAsignacionHorasExtras[]>;

@Injectable({ providedIn: 'root' })
export class AsignacionHorasExtrasService {
  public resourceUrl = SERVER_API_URL + 'api/asignacion-horas-extras';

  constructor(protected http: HttpClient) {}

  create(asignacionHorasExtras: IAsignacionHorasExtras): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asignacionHorasExtras);
    return this.http
      .post<IAsignacionHorasExtras>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(asignacionHorasExtras: IAsignacionHorasExtras): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asignacionHorasExtras);
    return this.http
      .put<IAsignacionHorasExtras>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAsignacionHorasExtras>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAsignacionHorasExtras[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(asignacionHorasExtras: IAsignacionHorasExtras): IAsignacionHorasExtras {
    const copy: IAsignacionHorasExtras = Object.assign({}, asignacionHorasExtras, {
      fecha: asignacionHorasExtras.fecha != null && asignacionHorasExtras.fecha.isValid() ? asignacionHorasExtras.fecha.toJSON() : null,
      horaInicio:
        asignacionHorasExtras.horaInicio != null && asignacionHorasExtras.horaInicio.isValid()
          ? asignacionHorasExtras.horaInicio.toJSON()
          : null,
      horaFin:
        asignacionHorasExtras.horaFin != null && asignacionHorasExtras.horaFin.isValid() ? asignacionHorasExtras.horaFin.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
      res.body.horaInicio = res.body.horaInicio != null ? moment(res.body.horaInicio) : null;
      res.body.horaFin = res.body.horaFin != null ? moment(res.body.horaFin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((asignacionHorasExtras: IAsignacionHorasExtras) => {
        asignacionHorasExtras.fecha = asignacionHorasExtras.fecha != null ? moment(asignacionHorasExtras.fecha) : null;
        asignacionHorasExtras.horaInicio = asignacionHorasExtras.horaInicio != null ? moment(asignacionHorasExtras.horaInicio) : null;
        asignacionHorasExtras.horaFin = asignacionHorasExtras.horaFin != null ? moment(asignacionHorasExtras.horaFin) : null;
      });
    }
    return res;
  }
}

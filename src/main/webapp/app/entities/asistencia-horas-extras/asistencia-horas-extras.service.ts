import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';

type EntityResponseType = HttpResponse<IAsistenciaHorasExtras>;
type EntityArrayResponseType = HttpResponse<IAsistenciaHorasExtras[]>;

@Injectable({ providedIn: 'root' })
export class AsistenciaHorasExtrasService {
  public resourceUrl = SERVER_API_URL + 'api/asistencia-horas-extras';

  constructor(protected http: HttpClient) {}

  create(asistenciaHorasExtras: IAsistenciaHorasExtras): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asistenciaHorasExtras);
    return this.http
      .post<IAsistenciaHorasExtras>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(asistenciaHorasExtras: IAsistenciaHorasExtras): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asistenciaHorasExtras);
    return this.http
      .put<IAsistenciaHorasExtras>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAsistenciaHorasExtras>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAsistenciaHorasExtras[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(asistenciaHorasExtras: IAsistenciaHorasExtras): IAsistenciaHorasExtras {
    const copy: IAsistenciaHorasExtras = Object.assign({}, asistenciaHorasExtras, {
      fecha: asistenciaHorasExtras.fecha != null && asistenciaHorasExtras.fecha.isValid() ? asistenciaHorasExtras.fecha.toJSON() : null,
      horaLlegada:
        asistenciaHorasExtras.horaLlegada != null && asistenciaHorasExtras.horaLlegada.isValid()
          ? asistenciaHorasExtras.horaLlegada.toJSON()
          : null,
      horaSalida:
        asistenciaHorasExtras.horaSalida != null && asistenciaHorasExtras.horaSalida.isValid()
          ? asistenciaHorasExtras.horaSalida.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
      res.body.horaLlegada = res.body.horaLlegada != null ? moment(res.body.horaLlegada) : null;
      res.body.horaSalida = res.body.horaSalida != null ? moment(res.body.horaSalida) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((asistenciaHorasExtras: IAsistenciaHorasExtras) => {
        asistenciaHorasExtras.fecha = asistenciaHorasExtras.fecha != null ? moment(asistenciaHorasExtras.fecha) : null;
        asistenciaHorasExtras.horaLlegada = asistenciaHorasExtras.horaLlegada != null ? moment(asistenciaHorasExtras.horaLlegada) : null;
        asistenciaHorasExtras.horaSalida = asistenciaHorasExtras.horaSalida != null ? moment(asistenciaHorasExtras.horaSalida) : null;
      });
    }
    return res;
  }
}

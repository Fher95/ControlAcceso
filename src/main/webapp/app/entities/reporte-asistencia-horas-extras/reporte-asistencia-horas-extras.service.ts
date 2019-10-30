import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReporteAsistenciaHorasExtras } from 'app/shared/model/reporte-asistencia-horas-extras.model';

type EntityResponseType = HttpResponse<IReporteAsistenciaHorasExtras>;
type EntityArrayResponseType = HttpResponse<IReporteAsistenciaHorasExtras[]>;

@Injectable({ providedIn: 'root' })
export class ReporteAsistenciaHorasExtrasService {
  public resourceUrl = SERVER_API_URL + 'api/reporte-asistencia-horas-extras';

  constructor(protected http: HttpClient) {}

  create(reporteAsistenciaHorasExtras: IReporteAsistenciaHorasExtras): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reporteAsistenciaHorasExtras);
    return this.http
      .post<IReporteAsistenciaHorasExtras>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reporteAsistenciaHorasExtras: IReporteAsistenciaHorasExtras): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reporteAsistenciaHorasExtras);
    return this.http
      .put<IReporteAsistenciaHorasExtras>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReporteAsistenciaHorasExtras>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReporteAsistenciaHorasExtras[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reporteAsistenciaHorasExtras: IReporteAsistenciaHorasExtras): IReporteAsistenciaHorasExtras {
    const copy: IReporteAsistenciaHorasExtras = Object.assign({}, reporteAsistenciaHorasExtras, {
      fechaInicio:
        reporteAsistenciaHorasExtras.fechaInicio != null && reporteAsistenciaHorasExtras.fechaInicio.isValid()
          ? reporteAsistenciaHorasExtras.fechaInicio.toJSON()
          : null,
      fechaFin:
        reporteAsistenciaHorasExtras.fechaFin != null && reporteAsistenciaHorasExtras.fechaFin.isValid()
          ? reporteAsistenciaHorasExtras.fechaFin.toJSON()
          : null
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
      res.body.forEach((reporteAsistenciaHorasExtras: IReporteAsistenciaHorasExtras) => {
        reporteAsistenciaHorasExtras.fechaInicio =
          reporteAsistenciaHorasExtras.fechaInicio != null ? moment(reporteAsistenciaHorasExtras.fechaInicio) : null;
        reporteAsistenciaHorasExtras.fechaFin =
          reporteAsistenciaHorasExtras.fechaFin != null ? moment(reporteAsistenciaHorasExtras.fechaFin) : null;
      });
    }
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReporteAsistencia } from 'app/shared/model/reporte-asistencia.model';

type EntityResponseType = HttpResponse<IReporteAsistencia>;
type EntityArrayResponseType = HttpResponse<IReporteAsistencia[]>;

@Injectable({ providedIn: 'root' })
export class ReporteAsistenciaService {
  public resourceUrl = SERVER_API_URL + 'api/reporte-asistencias';

  constructor(protected http: HttpClient) {}

  create(reporteAsistencia: IReporteAsistencia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reporteAsistencia);
    return this.http
      .post<IReporteAsistencia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reporteAsistencia: IReporteAsistencia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reporteAsistencia);
    return this.http
      .put<IReporteAsistencia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReporteAsistencia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReporteAsistencia[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reporteAsistencia: IReporteAsistencia): IReporteAsistencia {
    const copy: IReporteAsistencia = Object.assign({}, reporteAsistencia, {
      fechaInicio:
        reporteAsistencia.fechaInicio != null && reporteAsistencia.fechaInicio.isValid() ? reporteAsistencia.fechaInicio.toJSON() : null,
      fechaFin: reporteAsistencia.fechaFin != null && reporteAsistencia.fechaFin.isValid() ? reporteAsistencia.fechaFin.toJSON() : null
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
      res.body.forEach((reporteAsistencia: IReporteAsistencia) => {
        reporteAsistencia.fechaInicio = reporteAsistencia.fechaInicio != null ? moment(reporteAsistencia.fechaInicio) : null;
        reporteAsistencia.fechaFin = reporteAsistencia.fechaFin != null ? moment(reporteAsistencia.fechaFin) : null;
      });
    }
    return res;
  }
}

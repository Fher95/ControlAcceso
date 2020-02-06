import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';

type EntityResponseType = HttpResponse<IPlanificacionAsistencia>;
type EntityArrayResponseType = HttpResponse<IPlanificacionAsistencia[]>;

@Injectable({ providedIn: 'root' })
export class PlanificacionAsistenciaService {
  public resourceUrl = SERVER_API_URL + 'api/planificacion-asistencias';

  constructor(protected http: HttpClient) {}

  create(planificacionAsistencia: IPlanificacionAsistencia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planificacionAsistencia);
    return this.http
      .post<IPlanificacionAsistencia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(planificacionAsistencia: IPlanificacionAsistencia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planificacionAsistencia);
    return this.http
      .put<IPlanificacionAsistencia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlanificacionAsistencia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlanificacionAsistencia[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(planificacionAsistencia: IPlanificacionAsistencia): IPlanificacionAsistencia {
    const copy: IPlanificacionAsistencia = Object.assign({}, planificacionAsistencia, {
      fechaInicioPlanificacion:
        planificacionAsistencia.fechaInicioPlanificacion != null && planificacionAsistencia.fechaInicioPlanificacion.isValid()
          ? planificacionAsistencia.fechaInicioPlanificacion.toJSON()
          : null,
      fechaFinPlanificacion:
        planificacionAsistencia.fechaFinPlanificacion != null && planificacionAsistencia.fechaFinPlanificacion.isValid()
          ? planificacionAsistencia.fechaFinPlanificacion.toJSON()
          : null,
      fechaAsistenciaTurno:
        planificacionAsistencia.fechaAsistenciaTurno != null && planificacionAsistencia.fechaAsistenciaTurno.isValid()
          ? planificacionAsistencia.fechaAsistenciaTurno.toJSON()
          : null,
      horaInicioTurno:
        planificacionAsistencia.horaInicioTurno != null && planificacionAsistencia.horaInicioTurno.isValid()
          ? planificacionAsistencia.horaInicioTurno.toJSON()
          : null,
      horaFinTurno:
        planificacionAsistencia.horaFinTurno != null && planificacionAsistencia.horaFinTurno.isValid()
          ? planificacionAsistencia.horaFinTurno.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicioPlanificacion = res.body.fechaInicioPlanificacion != null ? moment(res.body.fechaInicioPlanificacion) : null;
      res.body.fechaFinPlanificacion = res.body.fechaFinPlanificacion != null ? moment(res.body.fechaFinPlanificacion) : null;
      res.body.fechaAsistenciaTurno = res.body.fechaAsistenciaTurno != null ? moment(res.body.fechaAsistenciaTurno) : null;
      res.body.horaInicioTurno = res.body.horaInicioTurno != null ? moment(res.body.horaInicioTurno) : null;
      res.body.horaFinTurno = res.body.horaFinTurno != null ? moment(res.body.horaFinTurno) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((planificacionAsistencia: IPlanificacionAsistencia) => {
        planificacionAsistencia.fechaInicioPlanificacion =
          planificacionAsistencia.fechaInicioPlanificacion != null ? moment(planificacionAsistencia.fechaInicioPlanificacion) : null;
        planificacionAsistencia.fechaFinPlanificacion =
          planificacionAsistencia.fechaFinPlanificacion != null ? moment(planificacionAsistencia.fechaFinPlanificacion) : null;
        planificacionAsistencia.fechaAsistenciaTurno =
          planificacionAsistencia.fechaAsistenciaTurno != null ? moment(planificacionAsistencia.fechaAsistenciaTurno) : null;
        planificacionAsistencia.horaInicioTurno =
          planificacionAsistencia.horaInicioTurno != null ? moment(planificacionAsistencia.horaInicioTurno) : null;
        planificacionAsistencia.horaFinTurno =
          planificacionAsistencia.horaFinTurno != null ? moment(planificacionAsistencia.horaFinTurno) : null;
      });
    }
    return res;
  }
}

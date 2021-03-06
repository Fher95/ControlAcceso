import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { Respuesta } from 'app/shared/model/respuesta';
import { IPlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';

type EntityResponseType = HttpResponse<IAsistenciaPlaneacion>;
type EntityArrayResponseType = HttpResponse<IAsistenciaPlaneacion[]>;

@Injectable({ providedIn: 'root' })
export class AsistenciaPlaneacionService {
  public resourceUrl = SERVER_API_URL + 'api/asistencia-planeacions';

  constructor(protected http: HttpClient) {}

  create(asistenciaPlaneacion: IAsistenciaPlaneacion): Observable<EntityResponseType> {
    return this.http.post<IAsistenciaPlaneacion>(this.resourceUrl, asistenciaPlaneacion, { observe: 'response' });
  }

  update(asistenciaPlaneacion: IAsistenciaPlaneacion): Observable<EntityResponseType> {
    return this.http.put<IAsistenciaPlaneacion>(this.resourceUrl, asistenciaPlaneacion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAsistenciaPlaneacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAsistenciaPlaneacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  cargarAsistencia(): Observable<HttpResponse<Respuesta>> {
    return this.http.get<Respuesta>(`${this.resourceUrl}/cargar-asistencias`, { observe: 'response' });
  }

  getAsistenciasPlanificacion(req?: any): Observable<HttpResponse<IPlanificacionAsistencia[]>> {
    const options = createRequestOption(req);
    const urlNueva = SERVER_API_URL + 'api/planificacion-asistencias/tipoAsistencia';
    return this.http.get<IPlanificacionAsistencia[]>(urlNueva, { params: options, observe: 'response' });
  }
}

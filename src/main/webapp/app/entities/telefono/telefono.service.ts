import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITelefono } from 'app/shared/model/telefono.model';

type EntityResponseType = HttpResponse<ITelefono>;
type EntityArrayResponseType = HttpResponse<ITelefono[]>;

@Injectable({ providedIn: 'root' })
export class TelefonoService {
  public resourceUrl = SERVER_API_URL + 'api/telefonos';

  constructor(protected http: HttpClient) {}

  create(telefono: ITelefono): Observable<EntityResponseType> {
    return this.http.post<ITelefono>(this.resourceUrl, telefono, { observe: 'response' });
  }

  update(telefono: ITelefono): Observable<EntityResponseType> {
    return this.http.put<ITelefono>(this.resourceUrl, telefono, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITelefono>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITelefono[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findTelefonosColaborador(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<ITelefono[]>(`${this.resourceUrl}/colaborador/${id}`, { observe: 'response' });
  }
}

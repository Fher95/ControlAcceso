import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';

type EntityResponseType = HttpResponse<ICentroCosto>;
type EntityArrayResponseType = HttpResponse<ICentroCosto[]>;

@Injectable({ providedIn: 'root' })
export class CentroCostoService {
  public resourceUrl = SERVER_API_URL + 'api/centro-costos';

  constructor(protected http: HttpClient) {}

  create(centroCosto: ICentroCosto): Observable<EntityResponseType> {
    return this.http.post<ICentroCosto>(this.resourceUrl, centroCosto, { observe: 'response' });
  }

  update(centroCosto: ICentroCosto): Observable<EntityResponseType> {
    return this.http.put<ICentroCosto>(this.resourceUrl, centroCosto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICentroCosto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICentroCosto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAntecedentes } from 'app/shared/model/antecedentes.model';

type EntityResponseType = HttpResponse<IAntecedentes>;
type EntityArrayResponseType = HttpResponse<IAntecedentes[]>;

@Injectable({ providedIn: 'root' })
export class AntecedentesService {
  public resourceUrl = SERVER_API_URL + 'api/antecedentes';

  constructor(protected http: HttpClient) {}

  create(antecedentes: IAntecedentes): Observable<EntityResponseType> {
    return this.http.post<IAntecedentes>(this.resourceUrl, antecedentes, { observe: 'response' });
  }

  update(antecedentes: IAntecedentes): Observable<EntityResponseType> {
    return this.http.put<IAntecedentes>(this.resourceUrl, antecedentes, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAntecedentes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAntecedentes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

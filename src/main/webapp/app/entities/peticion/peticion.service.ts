import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPeticion } from 'app/shared/model/peticion.model';

type EntityResponseType = HttpResponse<IPeticion>;
type EntityArrayResponseType = HttpResponse<IPeticion[]>;

@Injectable({ providedIn: 'root' })
export class PeticionService {
  public resourceUrl = SERVER_API_URL + 'api/peticions';

  constructor(protected http: HttpClient) {}

  create(peticion: IPeticion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(peticion);
    return this.http
      .post<IPeticion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(peticion: IPeticion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(peticion);
    return this.http
      .put<IPeticion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPeticion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPeticion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(peticion: IPeticion): IPeticion {
    const copy: IPeticion = Object.assign({}, peticion, {
      fechaPeticion: peticion.fechaPeticion != null && peticion.fechaPeticion.isValid() ? peticion.fechaPeticion.toJSON() : null,
      fechaInicio: peticion.fechaInicio != null && peticion.fechaInicio.isValid() ? peticion.fechaInicio.toJSON() : null,
      fechaFin: peticion.fechaFin != null && peticion.fechaFin.isValid() ? peticion.fechaFin.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaPeticion = res.body.fechaPeticion != null ? moment(res.body.fechaPeticion) : null;
      res.body.fechaInicio = res.body.fechaInicio != null ? moment(res.body.fechaInicio) : null;
      res.body.fechaFin = res.body.fechaFin != null ? moment(res.body.fechaFin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((peticion: IPeticion) => {
        peticion.fechaPeticion = peticion.fechaPeticion != null ? moment(peticion.fechaPeticion) : null;
        peticion.fechaInicio = peticion.fechaInicio != null ? moment(peticion.fechaInicio) : null;
        peticion.fechaFin = peticion.fechaFin != null ? moment(peticion.fechaFin) : null;
      });
    }
    return res;
  }
}

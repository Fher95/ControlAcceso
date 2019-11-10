import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map, tap } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IColaborador } from 'app/shared/model/colaborador.model';

type EntityResponseType = HttpResponse<IColaborador>;
type EntityArrayResponseType = HttpResponse<IColaborador[]>;
@Injectable({ providedIn: 'root' })
export class ColaboradorService {
  public resourceUrl = SERVER_API_URL + 'api/colaboradors';
  public idUltimoColaborador: number;

  constructor(protected http: HttpClient) {}

  create(colaborador: IColaborador): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(colaborador);
    return this.http.post<IColaborador>(this.resourceUrl, copy, { observe: 'response' }).pipe(
      map((res: EntityResponseType) => this.convertDateFromServer(res)),
      tap((nuevoCol: EntityResponseType) => this.setUltimoColaborador(nuevoCol))
    );
  }

  update(colaborador: IColaborador): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(colaborador);
    return this.http
      .put<IColaborador>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  setUltimoColaborador(parColReq: EntityResponseType): void {
    if (parColReq.body) {
      this.idUltimoColaborador = parColReq.body.id;
    }
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IColaborador>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByNumDocumento(numDocumento: string): Observable<EntityResponseType> {
    return this.http
      .get<IColaborador>(`${this.resourceUrl}/documento/${numDocumento}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IColaborador[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(colaborador: IColaborador): IColaborador {
    const copy: IColaborador = Object.assign({}, colaborador, {
      fechaExpedicion:
        colaborador.fechaExpedicion != null && colaborador.fechaExpedicion.isValid() ? colaborador.fechaExpedicion.toJSON() : null,
      fechaNacimiento:
        colaborador.fechaNacimiento != null && colaborador.fechaNacimiento.isValid() ? colaborador.fechaNacimiento.toJSON() : null,
      fechaIngreso: colaborador.fechaIngreso != null && colaborador.fechaIngreso.isValid() ? colaborador.fechaIngreso.toJSON() : null,
      fechaBaja: colaborador.fechaBaja != null && colaborador.fechaBaja.isValid() ? colaborador.fechaBaja.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaExpedicion = res.body.fechaExpedicion != null ? moment(res.body.fechaExpedicion) : null;
      res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
      res.body.fechaIngreso = res.body.fechaIngreso != null ? moment(res.body.fechaIngreso) : null;
      res.body.fechaBaja = res.body.fechaBaja != null ? moment(res.body.fechaBaja) : null;
      // this.idUltimoColaborador = res.body.id;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((colaborador: IColaborador) => {
        colaborador.fechaExpedicion = colaborador.fechaExpedicion != null ? moment(colaborador.fechaExpedicion) : null;
        colaborador.fechaNacimiento = colaborador.fechaNacimiento != null ? moment(colaborador.fechaNacimiento) : null;
        colaborador.fechaIngreso = colaborador.fechaIngreso != null ? moment(colaborador.fechaIngreso) : null;
        colaborador.fechaBaja = colaborador.fechaBaja != null ? moment(colaborador.fechaBaja) : null;
      });
    }
    return res;
  }
}

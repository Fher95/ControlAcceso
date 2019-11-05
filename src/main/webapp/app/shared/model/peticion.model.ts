import { Moment } from 'moment';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { TipoPeticion } from 'app/shared/model/enumerations/tipo-peticion.model';
import { TipoPermiso } from 'app/shared/model/enumerations/tipo-permiso.model';
import { EstadoPeticion } from 'app/shared/model/enumerations/estado-peticion.model';

export interface IPeticion {
  id?: number;
  tipo?: TipoPeticion;
  tipoPermiso?: TipoPermiso;
  fechaPeticion?: Moment;
  motivo?: string;
  constancia?: string;
  fechaInicio?: Moment;
  fechaFin?: Moment;
  estado?: EstadoPeticion;
  autorizadoPor?: string;
  colaboradors?: IColaborador[];
}

export class Peticion implements IPeticion {
  constructor(
    public id?: number,
    public tipo?: TipoPeticion,
    public tipoPermiso?: TipoPermiso,
    public fechaPeticion?: Moment,
    public motivo?: string,
    public constancia?: string,
    public fechaInicio?: Moment,
    public fechaFin?: Moment,
    public estado?: EstadoPeticion,
    public autorizadoPor?: string,
    public colaboradors?: IColaborador[]
  ) {}
}

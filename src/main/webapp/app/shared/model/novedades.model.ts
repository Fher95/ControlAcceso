import { Moment } from 'moment';
import { EstadoPeticion } from 'app/shared/model/enumerations/estado-peticion.model';

export interface INovedades {
  id?: number;
  justificacion?: string;
  estado?: EstadoPeticion;
  fechaInicial?: Moment;
  fechaFinal?: Moment;
}

export class Novedades implements INovedades {
  constructor(
    public id?: number,
    public justificacion?: string,
    public estado?: EstadoPeticion,
    public fechaInicial?: Moment,
    public fechaFinal?: Moment
  ) {}
}

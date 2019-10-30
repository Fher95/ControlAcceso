import { Moment } from 'moment';
import { TipoTurno } from 'app/shared/model/enumerations/tipo-turno.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';

export interface ITurno {
  id?: number;
  tipo?: TipoTurno;
  nombre?: string;
  descripcion?: string;
  horaInicio?: Moment;
  umbralInicio?: Moment;
  duracion?: number;
  color?: string;
  estado?: Estado;
}

export class Turno implements ITurno {
  constructor(
    public id?: number,
    public tipo?: TipoTurno,
    public nombre?: string,
    public descripcion?: string,
    public horaInicio?: Moment,
    public umbralInicio?: Moment,
    public duracion?: number,
    public color?: string,
    public estado?: Estado
  ) {}
}

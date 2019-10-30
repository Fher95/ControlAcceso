import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { ICentroCosto } from 'app/shared/model/centro-costo.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';

export interface ICargo {
  id?: number;
  nombre?: string;
  estado?: Estado;
  asignacionTurnos?: IAsignacionTurno[];
  centroCosto?: ICentroCosto;
}

export class Cargo implements ICargo {
  constructor(
    public id?: number,
    public nombre?: string,
    public estado?: Estado,
    public asignacionTurnos?: IAsignacionTurno[],
    public centroCosto?: ICentroCosto
  ) {}
}

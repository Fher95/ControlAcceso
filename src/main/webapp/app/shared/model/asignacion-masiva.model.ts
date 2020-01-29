import { IAsignacionTurno } from './asignacion-turno.model';
import { ITurno } from './turno.model';
import { ICargo } from './cargo.model';

export interface IAsignacionMasiva {
  asignacionesTurno?: IAsignacionTurno[];
  turno?: ITurno;
  cargo?: ICargo;
}

export class AsignacionMasiva implements IAsignacionMasiva {
  constructor(public asignacionesTurno?: IAsignacionTurno[], turno?: ITurno, cargo?: ICargo) {}
}

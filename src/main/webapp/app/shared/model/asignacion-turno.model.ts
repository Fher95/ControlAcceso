import { Moment } from 'moment';
import { ITurno } from 'app/shared/model/turno.model';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ICargo } from 'app/shared/model/cargo.model';

export interface IAsignacionTurno {
  id?: number;
  fecha?: Moment;
  fechaFin?: Moment;
  turno?: ITurno;
  colaboradors?: IColaborador[];
  cargo?: ICargo;
}

export class AsignacionTurno implements IAsignacionTurno {
  constructor(
    public id?: number,
    public fecha?: Moment,
    public fechaFin?: Moment,
    public turno?: ITurno,
    public colaboradors?: IColaborador[],
    public cargo?: ICargo
  ) {}
}

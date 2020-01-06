import { Moment } from 'moment';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { IColaborador } from 'app/shared/model/colaborador.model';

export interface IIntercambioTurno {
  id?: number;
  fecha?: Moment;
  autorizadoPor?: string;
  observaciones?: string;
  asignacionTurno1?: IAsignacionTurno;
  colaborador1?: IColaborador;
  colaborador2?: IColaborador;
}

export class IntercambioTurno implements IIntercambioTurno {
  constructor(
    public id?: number,
    public fecha?: Moment,
    public autorizadoPor?: string,
    public observaciones?: string,
    public asignacionTurno1?: IAsignacionTurno,
    public colaborador1?: IColaborador,
    public colaborador2?: IColaborador
  ) {}
}

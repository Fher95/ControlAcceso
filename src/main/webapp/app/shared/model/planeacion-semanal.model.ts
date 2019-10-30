import { Moment } from 'moment';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { EstadoPlaneacion } from 'app/shared/model/enumerations/estado-planeacion.model';

export interface IPlaneacionSemanal {
  id?: number;
  fechaInicio?: Moment;
  fechaFin?: Moment;
  estado?: EstadoPlaneacion;
  asignacionTurnos?: IAsignacionTurno[];
}

export class PlaneacionSemanal implements IPlaneacionSemanal {
  constructor(
    public id?: number,
    public fechaInicio?: Moment,
    public fechaFin?: Moment,
    public estado?: EstadoPlaneacion,
    public asignacionTurnos?: IAsignacionTurno[]
  ) {}
}

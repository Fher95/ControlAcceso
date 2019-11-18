import { IAsistencia } from 'app/shared/model/asistencia.model';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { IColaborador } from 'app/shared/model/colaborador.model';

export interface IAsistenciaPlaneacion {
  id?: number;
  asistencia?: IAsistencia;
  asignacionTurno?: IAsignacionTurno;
  colaborador?: IColaborador;
}

export class AsistenciaPlaneacion implements IAsistenciaPlaneacion {
  constructor(
    public id?: number,
    public asistencia?: IAsistencia,
    public asignacionTurno?: IAsignacionTurno,
    public colaborador?: IColaborador
  ) {}
}

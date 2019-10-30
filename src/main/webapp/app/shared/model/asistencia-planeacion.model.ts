import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { IAsistencia } from 'app/shared/model/asistencia.model';
import { IColaborador } from 'app/shared/model/colaborador.model';

export interface IAsistenciaPlaneacion {
  id?: number;
  asignacionTurno?: IAsignacionTurno;
  asistencia?: IAsistencia;
  colaborador?: IColaborador;
}

export class AsistenciaPlaneacion implements IAsistenciaPlaneacion {
  constructor(
    public id?: number,
    public asignacionTurno?: IAsignacionTurno,
    public asistencia?: IAsistencia,
    public colaborador?: IColaborador
  ) {}
}

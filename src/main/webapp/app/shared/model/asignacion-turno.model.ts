import { Moment } from 'moment';
import { ITurno } from 'app/shared/model/turno.model';
import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { IPlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';
import { ICargo } from 'app/shared/model/cargo.model';

export interface IAsignacionTurno {
  id?: number;
  fecha?: Moment;
  turno?: ITurno;
  intercambioTurno?: IIntercambioTurno;
  colaboradors?: IColaborador[];
  asistenciaPlaneacion?: IAsistenciaPlaneacion;
  planeacionSemanal?: IPlaneacionSemanal;
  cargo?: ICargo;
}

export class AsignacionTurno implements IAsignacionTurno {
  constructor(
    public id?: number,
    public fecha?: Moment,
    public turno?: ITurno,
    public intercambioTurno?: IIntercambioTurno,
    public colaboradors?: IColaborador[],
    public asistenciaPlaneacion?: IAsistenciaPlaneacion,
    public planeacionSemanal?: IPlaneacionSemanal,
    public cargo?: ICargo
  ) {}
}

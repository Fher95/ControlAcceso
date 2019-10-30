import { Moment } from 'moment';
import { ITurno } from 'app/shared/model/turno.model';
import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { IPlaneacionSemanal } from 'app/shared/model/planeacion-semanal.model';
import { ICargo } from 'app/shared/model/cargo.model';

export interface IAsignacionTurno {
  id?: number;
  fecha?: Moment;
  turno?: ITurno;
  intercambioTurno?: IIntercambioTurno;
  asistenciaPlaneacion?: IAsistenciaPlaneacion;
  colaboradors?: IColaborador[];
  planeacionSemanal?: IPlaneacionSemanal;
  cargo?: ICargo;
}

export class AsignacionTurno implements IAsignacionTurno {
  constructor(
    public id?: number,
    public fecha?: Moment,
    public turno?: ITurno,
    public intercambioTurno?: IIntercambioTurno,
    public asistenciaPlaneacion?: IAsistenciaPlaneacion,
    public colaboradors?: IColaborador[],
    public planeacionSemanal?: IPlaneacionSemanal,
    public cargo?: ICargo
  ) {}
}

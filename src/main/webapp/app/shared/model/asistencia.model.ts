import { Moment } from 'moment';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';

export interface IAsistencia {
  id?: number;
  documentoColaborador?: string;
  entrada?: Moment;
  salida?: Moment;
  asistenciaPlaneacion?: IAsistenciaPlaneacion;
}

export class Asistencia implements IAsistencia {
  constructor(
    public id?: number,
    public documentoColaborador?: string,
    public entrada?: Moment,
    public salida?: Moment,
    public asistenciaPlaneacion?: IAsistenciaPlaneacion
  ) {}
}

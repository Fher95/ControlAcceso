import { Moment } from 'moment';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';

export interface IAsistencia {
  id?: number;
  nombre1?: string;
  nombre2?: string;
  apellido1?: string;
  apellido2?: string;
  fecha?: Moment;
  turno?: string;
  entrada?: Moment;
  salida?: Moment;
  sinEntrada?: boolean;
  sinSalida?: boolean;
  ausente?: boolean;
  minutosTrabajados?: number;
  asistenciaPlaneacion?: IAsistenciaPlaneacion;
}

export class Asistencia implements IAsistencia {
  constructor(
    public id?: number,
    public nombre1?: string,
    public nombre2?: string,
    public apellido1?: string,
    public apellido2?: string,
    public fecha?: Moment,
    public turno?: string,
    public entrada?: Moment,
    public salida?: Moment,
    public sinEntrada?: boolean,
    public sinSalida?: boolean,
    public ausente?: boolean,
    public minutosTrabajados?: number,
    public asistenciaPlaneacion?: IAsistenciaPlaneacion
  ) {
    this.sinEntrada = this.sinEntrada || false;
    this.sinSalida = this.sinSalida || false;
    this.ausente = this.ausente || false;
  }
}

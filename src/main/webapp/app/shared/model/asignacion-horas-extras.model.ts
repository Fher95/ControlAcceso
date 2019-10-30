import { Moment } from 'moment';
import { IAsistenciaHorasExtras } from 'app/shared/model/asistencia-horas-extras.model';
import { IColaborador } from 'app/shared/model/colaborador.model';

export interface IAsignacionHorasExtras {
  id?: number;
  justificacion?: string;
  observaciones?: string;
  fecha?: Moment;
  horaInicio?: Moment;
  horaFin?: Moment;
  compensatorio?: boolean;
  autorizadasPor?: string;
  asistenciaHorasExtras?: IAsistenciaHorasExtras;
  colaboradors?: IColaborador[];
}

export class AsignacionHorasExtras implements IAsignacionHorasExtras {
  constructor(
    public id?: number,
    public justificacion?: string,
    public observaciones?: string,
    public fecha?: Moment,
    public horaInicio?: Moment,
    public horaFin?: Moment,
    public compensatorio?: boolean,
    public autorizadasPor?: string,
    public asistenciaHorasExtras?: IAsistenciaHorasExtras,
    public colaboradors?: IColaborador[]
  ) {
    this.compensatorio = this.compensatorio || false;
  }
}

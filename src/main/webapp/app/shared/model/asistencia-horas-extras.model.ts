import { Moment } from 'moment';
import { IAsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';

export interface IAsistenciaHorasExtras {
  id?: number;
  fecha?: Moment;
  horaLlegada?: Moment;
  horaSalida?: Moment;
  asignacionHorasExtras?: IAsignacionHorasExtras;
}

export class AsistenciaHorasExtras implements IAsistenciaHorasExtras {
  constructor(
    public id?: number,
    public fecha?: Moment,
    public horaLlegada?: Moment,
    public horaSalida?: Moment,
    public asignacionHorasExtras?: IAsignacionHorasExtras
  ) {}
}

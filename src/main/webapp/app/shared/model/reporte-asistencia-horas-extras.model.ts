import { Moment } from 'moment';

export interface IReporteAsistenciaHorasExtras {
  id?: number;
  tipo?: string;
  fechaInicio?: Moment;
  fechaFin?: Moment;
}

export class ReporteAsistenciaHorasExtras implements IReporteAsistenciaHorasExtras {
  constructor(public id?: number, public tipo?: string, public fechaInicio?: Moment, public fechaFin?: Moment) {}
}

import { Moment } from 'moment';

export interface IReporteAsistencia {
  id?: number;
  tipo?: string;
  fechaInicio?: Moment;
  fechaFin?: Moment;
}

export class ReporteAsistencia implements IReporteAsistencia {
  constructor(public id?: number, public tipo?: string, public fechaInicio?: Moment, public fechaFin?: Moment) {}
}

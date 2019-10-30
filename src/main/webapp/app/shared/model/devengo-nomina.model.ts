import { Moment } from 'moment';

export interface IDevengoNomina {
  id?: number;
  fechaInicio?: Moment;
  fechaFin?: Moment;
}

export class DevengoNomina implements IDevengoNomina {
  constructor(public id?: number, public fechaInicio?: Moment, public fechaFin?: Moment) {}
}

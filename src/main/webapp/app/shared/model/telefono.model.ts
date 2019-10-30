import { IColaborador } from 'app/shared/model/colaborador.model';

export interface ITelefono {
  id?: number;
  numero?: number;
  tipo?: number;
  colaborador?: IColaborador;
}

export class Telefono implements ITelefono {
  constructor(public id?: number, public numero?: number, public tipo?: number, public colaborador?: IColaborador) {}
}

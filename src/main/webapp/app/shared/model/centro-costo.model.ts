import { ICargo } from 'app/shared/model/cargo.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';

export interface ICentroCosto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  estado?: Estado;
  cargos?: ICargo[];
}

export class CentroCosto implements ICentroCosto {
  constructor(public id?: number, public nombre?: string, public descripcion?: string, public estado?: Estado, public cargos?: ICargo[]) {}
}

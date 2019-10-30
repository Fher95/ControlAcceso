import { IColaborador } from 'app/shared/model/colaborador.model';
import { TipoAntecedente } from 'app/shared/model/enumerations/tipo-antecedente.model';

export interface IAntecedentes {
  id?: number;
  tipo?: TipoAntecedente;
  soporte?: string;
  colaborador?: IColaborador;
}

export class Antecedentes implements IAntecedentes {
  constructor(public id?: number, public tipo?: TipoAntecedente, public soporte?: string, public colaborador?: IColaborador) {}
}

import { Moment } from 'moment';
import { IColaborador } from 'app/shared/model/colaborador.model';

export interface IPlanificacionAsistencia {
  id?: number;
  fechaInicioPlanificacion?: Moment;
  fechaFinPlanificacion?: Moment;
  fechaAsistenciaTurno?: Moment;
  horaInicioTurno?: Moment;
  horaFinTurno?: Moment;
  nombreCargo?: string;
  tiposAsistencia?: string;
  minDiferenciaEntrada?: number;
  minDiferenciaSalida?: number;
  nombreTurno?: string;
  inasistenciaJustificada?: boolean;
  colaborador?: IColaborador;
}

export class PlanificacionAsistencia implements IPlanificacionAsistencia {
  constructor(
    public id?: number,
    public fechaInicioPlanificacion?: Moment,
    public fechaFinPlanificacion?: Moment,
    public fechaAsistenciaTurno?: Moment,
    public horaInicioTurno?: Moment,
    public horaFinTurno?: Moment,
    public nombreCargo?: string,
    public tiposAsistencia?: string,
    public minDiferenciaEntrada?: number,
    public minDiferenciaSalida?: number,
    public nombreTurno?: string,
    public inasistenciaJustificada?: boolean,
    public colaborador?: IColaborador
  ) {
    this.inasistenciaJustificada = this.inasistenciaJustificada || false;
  }
}

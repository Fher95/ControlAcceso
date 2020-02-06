import { Moment } from 'moment';
import { IIntercambioTurno } from 'app/shared/model/intercambio-turno.model';
import { ITelefono } from 'app/shared/model/telefono.model';
import { IAntecedentes } from 'app/shared/model/antecedentes.model';
import { IAsistenciaPlaneacion } from 'app/shared/model/asistencia-planeacion.model';
import { IPeticion } from 'app/shared/model/peticion.model';
import { IPlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';
import { IAsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';
import { IAsignacionTurno } from 'app/shared/model/asignacion-turno.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';
import { NivelEducativo } from 'app/shared/model/enumerations/nivel-educativo.model';

export interface IColaborador {
  id?: number;
  nombre1?: string;
  nombre2?: string;
  apellido1?: string;
  apellido2?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  lugarExpedicion?: string;
  fechaExpedicion?: Moment;
  fechaNacimiento?: Moment;
  direccionResidencia?: string;
  barrio?: string;
  fechaIngreso?: Moment;
  tiempoRequerido?: number;
  cargoDesempeniar?: string;
  salario?: number;
  eps?: string;
  estado?: Estado;
  fechaBaja?: Moment;
  nivelEducativo?: NivelEducativo;
  intercambioTurnos?: IIntercambioTurno[];
  intercambioTurno2S?: IIntercambioTurno[];
  telefonos?: ITelefono[];
  antecedentes?: IAntecedentes[];
  asistenciaPlaneacions?: IAsistenciaPlaneacion[];
  peticions?: IPeticion[];
  planificacionAsistencias?: IPlanificacionAsistencia[];
  asignacionHorasExtras?: IAsignacionHorasExtras[];
  asignacionTurnos?: IAsignacionTurno[];
}

export class Colaborador implements IColaborador {
  constructor(
    public id?: number,
    public nombre1?: string,
    public nombre2?: string,
    public apellido1?: string,
    public apellido2?: string,
    public tipoDocumento?: string,
    public numeroDocumento?: string,
    public lugarExpedicion?: string,
    public fechaExpedicion?: Moment,
    public fechaNacimiento?: Moment,
    public direccionResidencia?: string,
    public barrio?: string,
    public fechaIngreso?: Moment,
    public tiempoRequerido?: number,
    public cargoDesempeniar?: string,
    public salario?: number,
    public eps?: string,
    public estado?: Estado,
    public fechaBaja?: Moment,
    public nivelEducativo?: NivelEducativo,
    public intercambioTurnos?: IIntercambioTurno[],
    public intercambioTurno2S?: IIntercambioTurno[],
    public telefonos?: ITelefono[],
    public antecedentes?: IAntecedentes[],
    public asistenciaPlaneacions?: IAsistenciaPlaneacion[],
    public peticions?: IPeticion[],
    public planificacionAsistencias?: IPlanificacionAsistencia[],
    public asignacionHorasExtras?: IAsignacionHorasExtras[],
    public asignacionTurnos?: IAsignacionTurno[]
  ) {}
}

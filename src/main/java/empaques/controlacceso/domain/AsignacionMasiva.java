package empaques.controlacceso.domain;

import java.io.Serializable;

public class AsignacionMasiva implements Serializable {
    
    public AsignacionTurno[] asignacionesTurno;
    public Cargo cargo;
    public Turno turno;

}
package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A PlanificacionAsistencia.
 */
@Entity
@Table(name = "planificacion_asistencia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlanificacionAsistencia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_inicio_planificacion")
    private Instant fechaInicioPlanificacion;

    @Column(name = "fecha_fin_planificacion")
    private Instant fechaFinPlanificacion;

    @Column(name = "fecha_asistencia_turno")
    private Instant fechaAsistenciaTurno;

    @Column(name = "hora_inicio_turno")
    private Instant horaInicioTurno;

    @Column(name = "hora_fin_turno")
    private Instant horaFinTurno;

    @Column(name = "nombre_cargo")
    private String nombreCargo;

    @Column(name = "tipos_asistencia")
    private String tiposAsistencia;

    @Column(name = "min_diferencia_entrada")
    private int minDiferenciaEntrada;

    @Column(name = "min_diferencia_salida")
    private int minDiferenciaSalida;

    @Column(name = "nombre_turno")
    private String nombreTurno;

    @Column(name = "inasistencia_justificada")
    private Boolean inasistenciaJustificada;

    @ManyToOne
    @JsonIgnoreProperties("planificacionAsistencias")
    private Colaborador colaborador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaInicioPlanificacion() {
        return fechaInicioPlanificacion;
    }

    public PlanificacionAsistencia fechaInicioPlanificacion(Instant fechaInicioPlanificacion) {
        this.fechaInicioPlanificacion = fechaInicioPlanificacion;
        return this;
    }

    public void setFechaInicioPlanificacion(Instant fechaInicioPlanificacion) {
        this.fechaInicioPlanificacion = fechaInicioPlanificacion;
    }

    public Instant getFechaFinPlanificacion() {
        return fechaFinPlanificacion;
    }

    public PlanificacionAsistencia fechaFinPlanificacion(Instant fechaFinPlanificacion) {
        this.fechaFinPlanificacion = fechaFinPlanificacion;
        return this;
    }

    public void setFechaFinPlanificacion(Instant fechaFinPlanificacion) {
        this.fechaFinPlanificacion = fechaFinPlanificacion;
    }

    public Instant getFechaAsistenciaTurno() {
        return fechaAsistenciaTurno;
    }

    public PlanificacionAsistencia fechaAsistenciaTurno(Instant fechaAsistenciaTurno) {
        this.fechaAsistenciaTurno = fechaAsistenciaTurno;
        return this;
    }

    public void setFechaAsistenciaTurno(Instant fechaAsistenciaTurno) {
        this.fechaAsistenciaTurno = fechaAsistenciaTurno;
    }

    public Instant getHoraInicioTurno() {
        return horaInicioTurno;
    }

    public PlanificacionAsistencia horaInicioTurno(Instant horaInicioTurno) {
        this.horaInicioTurno = horaInicioTurno;
        return this;
    }

    public void setHoraInicioTurno(Instant horaInicioTurno) {
        this.horaInicioTurno = horaInicioTurno;
    }

    public Instant getHoraFinTurno() {
        return horaFinTurno;
    }

    public PlanificacionAsistencia horaFinTurno(Instant horaFinTurno) {
        this.horaFinTurno = horaFinTurno;
        return this;
    }

    public void setHoraFinTurno(Instant horaFinTurno) {
        this.horaFinTurno = horaFinTurno;
    }

    public String getNombreCargo() {
        return nombreCargo;
    }

    public PlanificacionAsistencia nombreCargo(String nombreCargo) {
        this.nombreCargo = nombreCargo;
        return this;
    }

    public void setNombreCargo(String nombreCargo) {
        this.nombreCargo = nombreCargo;
    }

    public String getTiposAsistencia() {
        return tiposAsistencia;
    }

    public PlanificacionAsistencia tiposAsistencia(String tiposAsistencia) {
        this.tiposAsistencia = tiposAsistencia;
        return this;
    }

    public void setTiposAsistencia(String tiposAsistencia) {
        this.tiposAsistencia = tiposAsistencia;
    }

    public int getMinDiferenciaEntrada() {
        return minDiferenciaEntrada;
    }

    public int getMinDiferenciaSalida() {
        return minDiferenciaSalida;
    }

    public PlanificacionAsistencia minutosDiferencia(int minDiferenciaEntrada, int minDiferenciaSalida) {
        this.minDiferenciaEntrada = minDiferenciaEntrada;
        this.minDiferenciaEntrada = minDiferenciaEntrada;
        return this;
    }

    public void setMinDiferenciaEntrada(int minutosDiferencia) {
        this.minDiferenciaEntrada = minutosDiferencia;
    }

    public void setMinDiferenciaSalida(int minutosDiferencia) {
        this.minDiferenciaSalida = minutosDiferencia;
    }

    public String getNombreTurno() {
        return nombreTurno;
    }

    public PlanificacionAsistencia nombreTurno(String nombreTurno) {
        this.nombreTurno = nombreTurno;
        return this;
    }

    public void setNombreTurno(String nombreTurno) {
        this.nombreTurno = nombreTurno;
    }

    public Boolean isInasistenciaJustificada() {
        return inasistenciaJustificada;
    }

    public PlanificacionAsistencia inasistenciaJustificada(Boolean inasistenciaJustificada) {
        this.inasistenciaJustificada = inasistenciaJustificada;
        return this;
    }

    public void setInasistenciaJustificada(Boolean inasistenciaJustificada) {
        this.inasistenciaJustificada = inasistenciaJustificada;
    }

    public Colaborador getColaborador() {
        return colaborador;
    }

    public PlanificacionAsistencia colaborador(Colaborador colaborador) {
        this.colaborador = colaborador;
        return this;
    }

    public void setColaborador(Colaborador colaborador) {
        this.colaborador = colaborador;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanificacionAsistencia)) {
            return false;
        }
        return id != null && id.equals(((PlanificacionAsistencia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlanificacionAsistencia{" +
            "id=" + getId() +
            ", fechaInicioPlanificacion='" + getFechaInicioPlanificacion() + "'" +
            ", fechaFinPlanificacion='" + getFechaFinPlanificacion() + "'" +
            ", fechaAsistenciaTurno='" + getFechaAsistenciaTurno() + "'" +
            ", horaInicioTurno='" + getHoraInicioTurno() + "'" +
            ", horaFinTurno='" + getHoraFinTurno() + "'" +
            ", nombreCargo='" + getNombreCargo() + "'" +
            ", tiposAsistencia='" + getTiposAsistencia() + "'" +
            ", minDiferenciaEntrada='" + getMinDiferenciaEntrada() + "'" +
            ", minDiferenciaEntrada='" + getMinDiferenciaSalida() + "'" +
            ", nombreTurno='" + getNombreTurno() + "'" +
            ", inasistenciaJustificada='" + isInasistenciaJustificada() + "'" +
            "}";
    }
}

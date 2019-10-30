package empaques.controlacceso.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import empaques.controlacceso.domain.enumeration.EstadoPlaneacion;

/**
 * A PlaneacionSemanal.
 */
@Entity
@Table(name = "planeacion_semanal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlaneacionSemanal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_inicio")
    private Instant fechaInicio;

    @Column(name = "fecha_fin")
    private Instant fechaFin;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoPlaneacion estado;

    @OneToMany(mappedBy = "planeacionSemanal")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AsignacionTurno> asignacionTurnos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaInicio() {
        return fechaInicio;
    }

    public PlaneacionSemanal fechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Instant getFechaFin() {
        return fechaFin;
    }

    public PlaneacionSemanal fechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
    }

    public EstadoPlaneacion getEstado() {
        return estado;
    }

    public PlaneacionSemanal estado(EstadoPlaneacion estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoPlaneacion estado) {
        this.estado = estado;
    }

    public Set<AsignacionTurno> getAsignacionTurnos() {
        return asignacionTurnos;
    }

    public PlaneacionSemanal asignacionTurnos(Set<AsignacionTurno> asignacionTurnos) {
        this.asignacionTurnos = asignacionTurnos;
        return this;
    }

    public PlaneacionSemanal addAsignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurnos.add(asignacionTurno);
        asignacionTurno.setPlaneacionSemanal(this);
        return this;
    }

    public PlaneacionSemanal removeAsignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurnos.remove(asignacionTurno);
        asignacionTurno.setPlaneacionSemanal(null);
        return this;
    }

    public void setAsignacionTurnos(Set<AsignacionTurno> asignacionTurnos) {
        this.asignacionTurnos = asignacionTurnos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlaneacionSemanal)) {
            return false;
        }
        return id != null && id.equals(((PlaneacionSemanal) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlaneacionSemanal{" +
            "id=" + getId() +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}

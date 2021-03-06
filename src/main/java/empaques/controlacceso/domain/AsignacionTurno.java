package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A AsignacionTurno.
 */
@Entity
@Table(name = "asignacion_turno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AsignacionTurno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "fecha_fin")
    private Instant fechaFin;

    @OneToOne
    @JoinColumn(unique = false)
    private Turno turno;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "asignacion_turno_colaborador",
               joinColumns = @JoinColumn(name = "asignacion_turno_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "colaborador_id", referencedColumnName = "id"))
    private Set<Colaborador> colaboradors = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("asignacionTurnos")
    private Cargo cargo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFecha() {
        return fecha;
    }

    public AsignacionTurno fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Instant getFechaFin() {
        return fechaFin;
    }

    public AsignacionTurno fechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Turno getTurno() {
        return turno;
    }

    public AsignacionTurno turno(Turno turno) {
        this.turno = turno;
        return this;
    }

    public void setTurno(Turno turno) {
        this.turno = turno;
    }

    public Set<Colaborador> getColaboradors() {
        return colaboradors;
    }

    public AsignacionTurno colaboradors(Set<Colaborador> colaboradors) {
        this.colaboradors = colaboradors;
        return this;
    }

    public AsignacionTurno addColaborador(Colaborador colaborador) {
        this.colaboradors.add(colaborador);
        colaborador.getAsignacionTurnos().add(this);
        return this;
    }

    public AsignacionTurno removeColaborador(Colaborador colaborador) {
        this.colaboradors.remove(colaborador);
        colaborador.getAsignacionTurnos().remove(this);
        return this;
    }

    public void setColaboradors(Set<Colaborador> colaboradors) {
        this.colaboradors = colaboradors;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public AsignacionTurno cargo(Cargo cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AsignacionTurno)) {
            return false;
        }
        return id != null && id.equals(((AsignacionTurno) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AsignacionTurno{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            "}";
    }
}

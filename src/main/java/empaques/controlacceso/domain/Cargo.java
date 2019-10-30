package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import empaques.controlacceso.domain.enumeration.Estado;

/**
 * A Cargo.
 */
@Entity
@Table(name = "cargo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cargo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private Estado estado;

    @OneToMany(mappedBy = "cargo")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AsignacionTurno> asignacionTurnos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("cargos")
    private CentroCosto centroCosto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Cargo nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Estado getEstado() {
        return estado;
    }

    public Cargo estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Set<AsignacionTurno> getAsignacionTurnos() {
        return asignacionTurnos;
    }

    public Cargo asignacionTurnos(Set<AsignacionTurno> asignacionTurnos) {
        this.asignacionTurnos = asignacionTurnos;
        return this;
    }

    public Cargo addAsignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurnos.add(asignacionTurno);
        asignacionTurno.setCargo(this);
        return this;
    }

    public Cargo removeAsignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurnos.remove(asignacionTurno);
        asignacionTurno.setCargo(null);
        return this;
    }

    public void setAsignacionTurnos(Set<AsignacionTurno> asignacionTurnos) {
        this.asignacionTurnos = asignacionTurnos;
    }

    public CentroCosto getCentroCosto() {
        return centroCosto;
    }

    public Cargo centroCosto(CentroCosto centroCosto) {
        this.centroCosto = centroCosto;
        return this;
    }

    public void setCentroCosto(CentroCosto centroCosto) {
        this.centroCosto = centroCosto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cargo)) {
            return false;
        }
        return id != null && id.equals(((Cargo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cargo{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}

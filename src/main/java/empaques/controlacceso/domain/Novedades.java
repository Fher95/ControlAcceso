package empaques.controlacceso.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import empaques.controlacceso.domain.enumeration.EstadoPeticion;

/**
 * A Novedades.
 */
@Entity
@Table(name = "novedades")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Novedades implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "justificacion")
    private String justificacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoPeticion estado;

    @Column(name = "fecha_inicial")
    private Instant fechaInicial;

    @Column(name = "fecha_final")
    private Instant fechaFinal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJustificacion() {
        return justificacion;
    }

    public Novedades justificacion(String justificacion) {
        this.justificacion = justificacion;
        return this;
    }

    public void setJustificacion(String justificacion) {
        this.justificacion = justificacion;
    }

    public EstadoPeticion getEstado() {
        return estado;
    }

    public Novedades estado(EstadoPeticion estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoPeticion estado) {
        this.estado = estado;
    }

    public Instant getFechaInicial() {
        return fechaInicial;
    }

    public Novedades fechaInicial(Instant fechaInicial) {
        this.fechaInicial = fechaInicial;
        return this;
    }

    public void setFechaInicial(Instant fechaInicial) {
        this.fechaInicial = fechaInicial;
    }

    public Instant getFechaFinal() {
        return fechaFinal;
    }

    public Novedades fechaFinal(Instant fechaFinal) {
        this.fechaFinal = fechaFinal;
        return this;
    }

    public void setFechaFinal(Instant fechaFinal) {
        this.fechaFinal = fechaFinal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Novedades)) {
            return false;
        }
        return id != null && id.equals(((Novedades) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Novedades{" +
            "id=" + getId() +
            ", justificacion='" + getJustificacion() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fechaInicial='" + getFechaInicial() + "'" +
            ", fechaFinal='" + getFechaFinal() + "'" +
            "}";
    }
}

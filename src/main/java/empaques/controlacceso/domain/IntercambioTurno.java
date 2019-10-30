package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A IntercambioTurno.
 */
@Entity
@Table(name = "intercambio_turno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IntercambioTurno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "autorizado_por")
    private String autorizadoPor;

    @Column(name = "observaciones")
    private String observaciones;

    @OneToOne(mappedBy = "intercambioTurno")
    @JsonIgnore
    private AsignacionTurno asignacionTurno;

    @ManyToOne
    @JsonIgnoreProperties("intercambioTurnos")
    private Colaborador colaborador;

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

    public IntercambioTurno fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getAutorizadoPor() {
        return autorizadoPor;
    }

    public IntercambioTurno autorizadoPor(String autorizadoPor) {
        this.autorizadoPor = autorizadoPor;
        return this;
    }

    public void setAutorizadoPor(String autorizadoPor) {
        this.autorizadoPor = autorizadoPor;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public IntercambioTurno observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public AsignacionTurno getAsignacionTurno() {
        return asignacionTurno;
    }

    public IntercambioTurno asignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurno = asignacionTurno;
        return this;
    }

    public void setAsignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurno = asignacionTurno;
    }

    public Colaborador getColaborador() {
        return colaborador;
    }

    public IntercambioTurno colaborador(Colaborador colaborador) {
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
        if (!(o instanceof IntercambioTurno)) {
            return false;
        }
        return id != null && id.equals(((IntercambioTurno) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "IntercambioTurno{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", autorizadoPor='" + getAutorizadoPor() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
}

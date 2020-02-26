package empaques.controlacceso.domain;
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

    @Column(name = "fecha_fin")
    private Instant fechaFin;

    @Column(name = "autorizado_por")
    private String autorizadoPor;

    @Column(name = "observaciones")
    private String observaciones;

    @OneToOne
    @JoinColumn(unique = true)
    private AsignacionTurno asignacionTurno1;

    @OneToOne
    @JoinColumn(unique = true)
    private AsignacionTurno asignacionTurno2;

    @ManyToOne
    @JsonIgnoreProperties("intercambioTurnos")
    private Colaborador colaborador1;

    @ManyToOne
    @JsonIgnoreProperties("intercambioTurno2S")
    private Colaborador colaborador2;

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

    public Instant getFechaFin() {
        return fechaFin;
    }

    public IntercambioTurno fechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
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

    public AsignacionTurno getAsignacionTurno1() {
        return asignacionTurno1;
    }

    public IntercambioTurno asignacionTurno1(AsignacionTurno asignacionTurno) {
        this.asignacionTurno1 = asignacionTurno;
        return this;
    }

    public void setAsignacionTurno1(AsignacionTurno asignacionTurno) {
        this.asignacionTurno1 = asignacionTurno;
    }

    public AsignacionTurno getAsignacionTurno2() {
        return asignacionTurno2;
    }

    public IntercambioTurno asignacionTurno2(AsignacionTurno asignacionTurno) {
        this.asignacionTurno2 = asignacionTurno;
        return this;
    }

    public void setAsignacionTurno2(AsignacionTurno asignacionTurno) {
        this.asignacionTurno2 = asignacionTurno;
    }

    public Colaborador getColaborador1() {
        return colaborador1;
    }

    public IntercambioTurno colaborador1(Colaborador colaborador) {
        this.colaborador1 = colaborador;
        return this;
    }

    public void setColaborador1(Colaborador colaborador) {
        this.colaborador1 = colaborador;
    }

    public Colaborador getColaborador2() {
        return colaborador2;
    }

    public IntercambioTurno colaborador2(Colaborador colaborador) {
        this.colaborador2 = colaborador;
        return this;
    }

    public void setColaborador2(Colaborador colaborador) {
        this.colaborador2 = colaborador;
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
            ", fechaFin='" + getFechaFin() + "'" +
            ", autorizadoPor='" + getAutorizadoPor() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
        
}

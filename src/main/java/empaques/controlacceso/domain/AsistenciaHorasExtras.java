package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A AsistenciaHorasExtras.
 */
@Entity
@Table(name = "asistencia_horas_extras")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AsistenciaHorasExtras implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "hora_llegada")
    private Instant horaLlegada;

    @Column(name = "hora_salida")
    private Instant horaSalida;

    @OneToOne(mappedBy = "asistenciaHorasExtras")
    @JsonIgnore
    private AsignacionHorasExtras asignacionHorasExtras;

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

    public AsistenciaHorasExtras fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Instant getHoraLlegada() {
        return horaLlegada;
    }

    public AsistenciaHorasExtras horaLlegada(Instant horaLlegada) {
        this.horaLlegada = horaLlegada;
        return this;
    }

    public void setHoraLlegada(Instant horaLlegada) {
        this.horaLlegada = horaLlegada;
    }

    public Instant getHoraSalida() {
        return horaSalida;
    }

    public AsistenciaHorasExtras horaSalida(Instant horaSalida) {
        this.horaSalida = horaSalida;
        return this;
    }

    public void setHoraSalida(Instant horaSalida) {
        this.horaSalida = horaSalida;
    }

    public AsignacionHorasExtras getAsignacionHorasExtras() {
        return asignacionHorasExtras;
    }

    public AsistenciaHorasExtras asignacionHorasExtras(AsignacionHorasExtras asignacionHorasExtras) {
        this.asignacionHorasExtras = asignacionHorasExtras;
        return this;
    }

    public void setAsignacionHorasExtras(AsignacionHorasExtras asignacionHorasExtras) {
        this.asignacionHorasExtras = asignacionHorasExtras;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AsistenciaHorasExtras)) {
            return false;
        }
        return id != null && id.equals(((AsistenciaHorasExtras) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AsistenciaHorasExtras{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", horaLlegada='" + getHoraLlegada() + "'" +
            ", horaSalida='" + getHoraSalida() + "'" +
            "}";
    }
}

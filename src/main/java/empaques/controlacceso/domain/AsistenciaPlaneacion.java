package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A AsistenciaPlaneacion.
 */
@Entity
@Table(name = "asistencia_planeacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AsistenciaPlaneacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private AsignacionTurno asignacionTurno;

    @OneToOne
    @JoinColumn(unique = true)
    private Asistencia asistencia;

    @ManyToOne
    @JsonIgnoreProperties("asistenciaPlaneacions")
    private Colaborador colaborador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AsignacionTurno getAsignacionTurno() {
        return asignacionTurno;
    }

    public AsistenciaPlaneacion asignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurno = asignacionTurno;
        return this;
    }

    public void setAsignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurno = asignacionTurno;
    }

    public Asistencia getAsistencia() {
        return asistencia;
    }

    public AsistenciaPlaneacion asistencia(Asistencia asistencia) {
        this.asistencia = asistencia;
        return this;
    }

    public void setAsistencia(Asistencia asistencia) {
        this.asistencia = asistencia;
    }

    public Colaborador getColaborador() {
        return colaborador;
    }

    public AsistenciaPlaneacion colaborador(Colaborador colaborador) {
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
        if (!(o instanceof AsistenciaPlaneacion)) {
            return false;
        }
        return id != null && id.equals(((AsistenciaPlaneacion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AsistenciaPlaneacion{" +
            "id=" + getId() +
            "}";
    }
}

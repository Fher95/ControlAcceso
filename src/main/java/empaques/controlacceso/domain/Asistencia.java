package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Asistencia.
 */
@Entity
@Table(name = "asistencia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Asistencia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "documento_colaborador")
    private String documentoColaborador;

    @Column(name = "entrada")
    private Instant entrada;

    @Column(name = "salida")
    private Instant salida;

    @OneToOne(mappedBy = "asistencia")
    @JsonIgnore
    private AsistenciaPlaneacion asistenciaPlaneacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentoColaborador() {
        return documentoColaborador;
    }

    public Asistencia documentoColaborador(String documentoColaborador) {
        this.documentoColaborador = documentoColaborador;
        return this;
    }

    public void setDocumentoColaborador(String documentoColaborador) {
        this.documentoColaborador = documentoColaborador;
    }

    public Instant getEntrada() {
        return entrada;
    }

    public Asistencia entrada(Instant entrada) {
        this.entrada = entrada;
        return this;
    }

    public void setEntrada(Instant entrada) {
        this.entrada = entrada;
    }

    public Instant getSalida() {
        return salida;
    }

    public Asistencia salida(Instant salida) {
        this.salida = salida;
        return this;
    }

    public void setSalida(Instant salida) {
        this.salida = salida;
    }

    public AsistenciaPlaneacion getAsistenciaPlaneacion() {
        return asistenciaPlaneacion;
    }

    public Asistencia asistenciaPlaneacion(AsistenciaPlaneacion asistenciaPlaneacion) {
        this.asistenciaPlaneacion = asistenciaPlaneacion;
        return this;
    }

    public void setAsistenciaPlaneacion(AsistenciaPlaneacion asistenciaPlaneacion) {
        this.asistenciaPlaneacion = asistenciaPlaneacion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Asistencia)) {
            return false;
        }
        return id != null && id.equals(((Asistencia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Asistencia{" +
            "id=" + getId() +
            ", documentoColaborador='" + getDocumentoColaborador() + "'" +
            ", entrada='" + getEntrada() + "'" +
            ", salida='" + getSalida() + "'" +
            "}";
    }
}

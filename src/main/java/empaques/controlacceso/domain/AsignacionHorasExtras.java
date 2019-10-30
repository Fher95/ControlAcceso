package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A AsignacionHorasExtras.
 */
@Entity
@Table(name = "asignacion_horas_extras")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AsignacionHorasExtras implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "justificacion")
    private String justificacion;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "hora_inicio")
    private Instant horaInicio;

    @Column(name = "hora_fin")
    private Instant horaFin;

    @Column(name = "compensatorio")
    private Boolean compensatorio;

    @Column(name = "autorizadas_por")
    private String autorizadasPor;

    @OneToOne
    @JoinColumn(unique = true)
    private AsistenciaHorasExtras asistenciaHorasExtras;

    @ManyToMany(mappedBy = "asignacionHorasExtras")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Colaborador> colaboradors = new HashSet<>();

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

    public AsignacionHorasExtras justificacion(String justificacion) {
        this.justificacion = justificacion;
        return this;
    }

    public void setJustificacion(String justificacion) {
        this.justificacion = justificacion;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public AsignacionHorasExtras observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Instant getFecha() {
        return fecha;
    }

    public AsignacionHorasExtras fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Instant getHoraInicio() {
        return horaInicio;
    }

    public AsignacionHorasExtras horaInicio(Instant horaInicio) {
        this.horaInicio = horaInicio;
        return this;
    }

    public void setHoraInicio(Instant horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Instant getHoraFin() {
        return horaFin;
    }

    public AsignacionHorasExtras horaFin(Instant horaFin) {
        this.horaFin = horaFin;
        return this;
    }

    public void setHoraFin(Instant horaFin) {
        this.horaFin = horaFin;
    }

    public Boolean isCompensatorio() {
        return compensatorio;
    }

    public AsignacionHorasExtras compensatorio(Boolean compensatorio) {
        this.compensatorio = compensatorio;
        return this;
    }

    public void setCompensatorio(Boolean compensatorio) {
        this.compensatorio = compensatorio;
    }

    public String getAutorizadasPor() {
        return autorizadasPor;
    }

    public AsignacionHorasExtras autorizadasPor(String autorizadasPor) {
        this.autorizadasPor = autorizadasPor;
        return this;
    }

    public void setAutorizadasPor(String autorizadasPor) {
        this.autorizadasPor = autorizadasPor;
    }

    public AsistenciaHorasExtras getAsistenciaHorasExtras() {
        return asistenciaHorasExtras;
    }

    public AsignacionHorasExtras asistenciaHorasExtras(AsistenciaHorasExtras asistenciaHorasExtras) {
        this.asistenciaHorasExtras = asistenciaHorasExtras;
        return this;
    }

    public void setAsistenciaHorasExtras(AsistenciaHorasExtras asistenciaHorasExtras) {
        this.asistenciaHorasExtras = asistenciaHorasExtras;
    }

    public Set<Colaborador> getColaboradors() {
        return colaboradors;
    }

    public AsignacionHorasExtras colaboradors(Set<Colaborador> colaboradors) {
        this.colaboradors = colaboradors;
        return this;
    }

    public AsignacionHorasExtras addColaborador(Colaborador colaborador) {
        this.colaboradors.add(colaborador);
        colaborador.getAsignacionHorasExtras().add(this);
        return this;
    }

    public AsignacionHorasExtras removeColaborador(Colaborador colaborador) {
        this.colaboradors.remove(colaborador);
        colaborador.getAsignacionHorasExtras().remove(this);
        return this;
    }

    public void setColaboradors(Set<Colaborador> colaboradors) {
        this.colaboradors = colaboradors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AsignacionHorasExtras)) {
            return false;
        }
        return id != null && id.equals(((AsignacionHorasExtras) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AsignacionHorasExtras{" +
            "id=" + getId() +
            ", justificacion='" + getJustificacion() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", horaInicio='" + getHoraInicio() + "'" +
            ", horaFin='" + getHoraFin() + "'" +
            ", compensatorio='" + isCompensatorio() + "'" +
            ", autorizadasPor='" + getAutorizadasPor() + "'" +
            "}";
    }
}

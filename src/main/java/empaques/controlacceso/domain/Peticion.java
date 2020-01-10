package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import empaques.controlacceso.domain.enumeration.TipoPeticion;

import empaques.controlacceso.domain.enumeration.TipoPermiso;

import empaques.controlacceso.domain.enumeration.EstadoPeticion;

/**
 * A Peticion.
 */
@Entity
@Table(name = "peticion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Peticion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoPeticion tipo;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_permiso")
    private TipoPermiso tipoPermiso;

    @Column(name = "fecha_peticion")
    private Instant fechaPeticion;

    @Column(name = "motivo")
    private String motivo;

    @Column(name = "constancia")
    private String constancia;

    @Column(name = "fecha_inicio")
    private Instant fechaInicio;

    @Column(name = "fecha_fin")
    private Instant fechaFin;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoPeticion estado;

    @Column(name = "autorizado_por")
    private String autorizadoPor;

    @ManyToOne
    @JsonIgnoreProperties("peticions")
    private Colaborador colaborador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoPeticion getTipo() {
        return tipo;
    }

    public Peticion tipo(TipoPeticion tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoPeticion tipo) {
        this.tipo = tipo;
    }

    public TipoPermiso getTipoPermiso() {
        return tipoPermiso;
    }

    public Peticion tipoPermiso(TipoPermiso tipoPermiso) {
        this.tipoPermiso = tipoPermiso;
        return this;
    }

    public void setTipoPermiso(TipoPermiso tipoPermiso) {
        this.tipoPermiso = tipoPermiso;
    }

    public Instant getFechaPeticion() {
        return fechaPeticion;
    }

    public Peticion fechaPeticion(Instant fechaPeticion) {
        this.fechaPeticion = fechaPeticion;
        return this;
    }

    public void setFechaPeticion(Instant fechaPeticion) {
        this.fechaPeticion = fechaPeticion;
    }

    public String getMotivo() {
        return motivo;
    }

    public Peticion motivo(String motivo) {
        this.motivo = motivo;
        return this;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getConstancia() {
        return constancia;
    }

    public Peticion constancia(String constancia) {
        this.constancia = constancia;
        return this;
    }

    public void setConstancia(String constancia) {
        this.constancia = constancia;
    }

    public Instant getFechaInicio() {
        return fechaInicio;
    }

    public Peticion fechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Instant getFechaFin() {
        return fechaFin;
    }

    public Peticion fechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
    }

    public EstadoPeticion getEstado() {
        return estado;
    }

    public Peticion estado(EstadoPeticion estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoPeticion estado) {
        this.estado = estado;
    }

    public String getAutorizadoPor() {
        return autorizadoPor;
    }

    public Peticion autorizadoPor(String autorizadoPor) {
        this.autorizadoPor = autorizadoPor;
        return this;
    }

    public void setAutorizadoPor(String autorizadoPor) {
        this.autorizadoPor = autorizadoPor;
    }

    public Colaborador getColaborador() {
        return colaborador;
    }

    public Peticion colaborador(Colaborador colaborador) {
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
        if (!(o instanceof Peticion)) {
            return false;
        }
        return id != null && id.equals(((Peticion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Peticion{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", tipoPermiso='" + getTipoPermiso() + "'" +
            ", fechaPeticion='" + getFechaPeticion() + "'" +
            ", motivo='" + getMotivo() + "'" +
            ", constancia='" + getConstancia() + "'" +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            ", estado='" + getEstado() + "'" +
            ", autorizadoPor='" + getAutorizadoPor() + "'" +
            "}";
    }
}

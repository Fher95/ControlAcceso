package empaques.controlacceso.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import empaques.controlacceso.domain.enumeration.TipoTurno;

import empaques.controlacceso.domain.enumeration.Estado;

/**
 * A Turno.
 */
@Entity
@Table(name = "turno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Turno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoTurno tipo;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "hora_inicio")
    private Instant horaInicio;

    @Column(name = "umbral_inicio")
    private Instant umbralInicio;

    @Column(name = "duracion")
    private Integer duracion;

    @Column(name = "color")
    private String color;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private Estado estado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoTurno getTipo() {
        return tipo;
    }

    public Turno tipo(TipoTurno tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoTurno tipo) {
        this.tipo = tipo;
    }

    public String getNombre() {
        return nombre;
    }

    public Turno nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Turno descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Instant getHoraInicio() {
        return horaInicio;
    }

    public Turno horaInicio(Instant horaInicio) {
        this.horaInicio = horaInicio;
        return this;
    }

    public void setHoraInicio(Instant horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Instant getUmbralInicio() {
        return umbralInicio;
    }

    public Turno umbralInicio(Instant umbralInicio) {
        this.umbralInicio = umbralInicio;
        return this;
    }

    public void setUmbralInicio(Instant umbralInicio) {
        this.umbralInicio = umbralInicio;
    }

    public Integer getDuracion() {
        return duracion;
    }

    public Turno duracion(Integer duracion) {
        this.duracion = duracion;
        return this;
    }

    public void setDuracion(Integer duracion) {
        this.duracion = duracion;
    }

    public String getColor() {
        return color;
    }

    public Turno color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Estado getEstado() {
        return estado;
    }

    public Turno estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Turno)) {
            return false;
        }
        return id != null && id.equals(((Turno) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Turno{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", horaInicio='" + getHoraInicio() + "'" +
            ", umbralInicio='" + getUmbralInicio() + "'" +
            ", duracion=" + getDuracion() +
            ", color='" + getColor() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}

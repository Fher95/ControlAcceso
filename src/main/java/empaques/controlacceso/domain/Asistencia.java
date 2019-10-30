package empaques.controlacceso.domain;
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

    @Column(name = "nombre_1")
    private String nombre1;

    @Column(name = "nombre_2")
    private String nombre2;

    @Column(name = "apellido_1")
    private String apellido1;

    @Column(name = "apellido_2")
    private String apellido2;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "turno")
    private String turno;

    @Column(name = "entrada")
    private Instant entrada;

    @Column(name = "salida")
    private Instant salida;

    @Column(name = "sin_entrada")
    private Boolean sinEntrada;

    @Column(name = "sin_salida")
    private Boolean sinSalida;

    @Column(name = "ausente")
    private Boolean ausente;

    @Column(name = "minutos_trabajados")
    private Integer minutosTrabajados;

    @OneToOne
    @JoinColumn(unique = true)
    private AsistenciaPlaneacion asistenciaPlaneacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre1() {
        return nombre1;
    }

    public Asistencia nombre1(String nombre1) {
        this.nombre1 = nombre1;
        return this;
    }

    public void setNombre1(String nombre1) {
        this.nombre1 = nombre1;
    }

    public String getNombre2() {
        return nombre2;
    }

    public Asistencia nombre2(String nombre2) {
        this.nombre2 = nombre2;
        return this;
    }

    public void setNombre2(String nombre2) {
        this.nombre2 = nombre2;
    }

    public String getApellido1() {
        return apellido1;
    }

    public Asistencia apellido1(String apellido1) {
        this.apellido1 = apellido1;
        return this;
    }

    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }

    public String getApellido2() {
        return apellido2;
    }

    public Asistencia apellido2(String apellido2) {
        this.apellido2 = apellido2;
        return this;
    }

    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Asistencia fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getTurno() {
        return turno;
    }

    public Asistencia turno(String turno) {
        this.turno = turno;
        return this;
    }

    public void setTurno(String turno) {
        this.turno = turno;
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

    public Boolean isSinEntrada() {
        return sinEntrada;
    }

    public Asistencia sinEntrada(Boolean sinEntrada) {
        this.sinEntrada = sinEntrada;
        return this;
    }

    public void setSinEntrada(Boolean sinEntrada) {
        this.sinEntrada = sinEntrada;
    }

    public Boolean isSinSalida() {
        return sinSalida;
    }

    public Asistencia sinSalida(Boolean sinSalida) {
        this.sinSalida = sinSalida;
        return this;
    }

    public void setSinSalida(Boolean sinSalida) {
        this.sinSalida = sinSalida;
    }

    public Boolean isAusente() {
        return ausente;
    }

    public Asistencia ausente(Boolean ausente) {
        this.ausente = ausente;
        return this;
    }

    public void setAusente(Boolean ausente) {
        this.ausente = ausente;
    }

    public Integer getMinutosTrabajados() {
        return minutosTrabajados;
    }

    public Asistencia minutosTrabajados(Integer minutosTrabajados) {
        this.minutosTrabajados = minutosTrabajados;
        return this;
    }

    public void setMinutosTrabajados(Integer minutosTrabajados) {
        this.minutosTrabajados = minutosTrabajados;
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
            ", nombre1='" + getNombre1() + "'" +
            ", nombre2='" + getNombre2() + "'" +
            ", apellido1='" + getApellido1() + "'" +
            ", apellido2='" + getApellido2() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", turno='" + getTurno() + "'" +
            ", entrada='" + getEntrada() + "'" +
            ", salida='" + getSalida() + "'" +
            ", sinEntrada='" + isSinEntrada() + "'" +
            ", sinSalida='" + isSinSalida() + "'" +
            ", ausente='" + isAusente() + "'" +
            ", minutosTrabajados=" + getMinutosTrabajados() +
            "}";
    }
}

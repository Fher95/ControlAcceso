package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import empaques.controlacceso.domain.enumeration.Estado;

import empaques.controlacceso.domain.enumeration.NivelEducativo;

/**
 * A Colaborador.
 */
@Entity
@Table(name = "colaborador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Colaborador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre_1", nullable = false)
    private String nombre1;

    @Column(name = "nombre_2")
    private String nombre2;

    @NotNull
    @Column(name = "apellido_1", nullable = false)
    private String apellido1;

    @Column(name = "apellido_2")
    private String apellido2;

    @Column(name = "tipo_documento")
    private String tipoDocumento;

    @Column(name = "numero_documento")
    private String numeroDocumento;

    @Column(name = "lugar_expedicion")
    private String lugarExpedicion;

    @Column(name = "fecha_expedicion")
    private Instant fechaExpedicion;

    @Column(name = "fecha_nacimiento")
    private Instant fechaNacimiento;

    @Column(name = "direccion_residencia")
    private String direccionResidencia;

    @Column(name = "barrio")
    private String barrio;

    @Column(name = "fecha_ingreso")
    private Instant fechaIngreso;

    @Column(name = "tiempo_requerido")
    private Integer tiempoRequerido;

    @Column(name = "cargo_desempeniar")
    private String cargoDesempeniar;

    @Column(name = "salario")
    private Integer salario;

    @Column(name = "eps")
    private String eps;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private Estado estado;

    @Column(name = "fecha_baja")
    private Instant fechaBaja;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_educativo")
    private NivelEducativo nivelEducativo;

    @OneToMany(mappedBy = "colaborador")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IntercambioTurno> intercambioTurnos = new HashSet<>();

    @OneToMany(mappedBy = "colaborador")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Telefono> telefonos = new HashSet<>();

    @OneToMany(mappedBy = "colaborador")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Antecedentes> antecedentes = new HashSet<>();

    @OneToMany(mappedBy = "colaborador")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AsistenciaPlaneacion> asistenciaPlaneacions = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "colaborador_peticion",
               joinColumns = @JoinColumn(name = "colaborador_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "peticion_id", referencedColumnName = "id"))
    @JsonIgnore
    private Set<Peticion> peticions = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "colaborador_asignacion_horas_extras",
               joinColumns = @JoinColumn(name = "colaborador_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "asignacion_horas_extras_id", referencedColumnName = "id"))
    private Set<AsignacionHorasExtras> asignacionHorasExtras = new HashSet<>();

    @ManyToMany(mappedBy = "colaboradors")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<AsignacionTurno> asignacionTurnos = new HashSet<>();

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

    public Colaborador nombre1(String nombre1) {
        this.nombre1 = nombre1;
        return this;
    }

    public void setNombre1(String nombre1) {
        this.nombre1 = nombre1;
    }

    public String getNombre2() {
        return nombre2;
    }

    public Colaborador nombre2(String nombre2) {
        this.nombre2 = nombre2;
        return this;
    }

    public void setNombre2(String nombre2) {
        this.nombre2 = nombre2;
    }

    public String getApellido1() {
        return apellido1;
    }

    public Colaborador apellido1(String apellido1) {
        this.apellido1 = apellido1;
        return this;
    }

    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }

    public String getApellido2() {
        return apellido2;
    }

    public Colaborador apellido2(String apellido2) {
        this.apellido2 = apellido2;
        return this;
    }

    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public Colaborador tipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
        return this;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public Colaborador numeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getLugarExpedicion() {
        return lugarExpedicion;
    }

    public Colaborador lugarExpedicion(String lugarExpedicion) {
        this.lugarExpedicion = lugarExpedicion;
        return this;
    }

    public void setLugarExpedicion(String lugarExpedicion) {
        this.lugarExpedicion = lugarExpedicion;
    }

    public Instant getFechaExpedicion() {
        return fechaExpedicion;
    }

    public Colaborador fechaExpedicion(Instant fechaExpedicion) {
        this.fechaExpedicion = fechaExpedicion;
        return this;
    }

    public void setFechaExpedicion(Instant fechaExpedicion) {
        this.fechaExpedicion = fechaExpedicion;
    }

    public Instant getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Colaborador fechaNacimiento(Instant fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(Instant fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getDireccionResidencia() {
        return direccionResidencia;
    }

    public Colaborador direccionResidencia(String direccionResidencia) {
        this.direccionResidencia = direccionResidencia;
        return this;
    }

    public void setDireccionResidencia(String direccionResidencia) {
        this.direccionResidencia = direccionResidencia;
    }

    public String getBarrio() {
        return barrio;
    }

    public Colaborador barrio(String barrio) {
        this.barrio = barrio;
        return this;
    }

    public void setBarrio(String barrio) {
        this.barrio = barrio;
    }

    public Instant getFechaIngreso() {
        return fechaIngreso;
    }

    public Colaborador fechaIngreso(Instant fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
        return this;
    }

    public void setFechaIngreso(Instant fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Integer getTiempoRequerido() {
        return tiempoRequerido;
    }

    public Colaborador tiempoRequerido(Integer tiempoRequerido) {
        this.tiempoRequerido = tiempoRequerido;
        return this;
    }

    public void setTiempoRequerido(Integer tiempoRequerido) {
        this.tiempoRequerido = tiempoRequerido;
    }

    public String getCargoDesempeniar() {
        return cargoDesempeniar;
    }

    public Colaborador cargoDesempeniar(String cargoDesempeniar) {
        this.cargoDesempeniar = cargoDesempeniar;
        return this;
    }

    public void setCargoDesempeniar(String cargoDesempeniar) {
        this.cargoDesempeniar = cargoDesempeniar;
    }

    public Integer getSalario() {
        return salario;
    }

    public Colaborador salario(Integer salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Integer salario) {
        this.salario = salario;
    }

    public String getEps() {
        return eps;
    }

    public Colaborador eps(String eps) {
        this.eps = eps;
        return this;
    }

    public void setEps(String eps) {
        this.eps = eps;
    }

    public Estado getEstado() {
        return estado;
    }

    public Colaborador estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Instant getFechaBaja() {
        return fechaBaja;
    }

    public Colaborador fechaBaja(Instant fechaBaja) {
        this.fechaBaja = fechaBaja;
        return this;
    }

    public void setFechaBaja(Instant fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public NivelEducativo getNivelEducativo() {
        return nivelEducativo;
    }

    public Colaborador nivelEducativo(NivelEducativo nivelEducativo) {
        this.nivelEducativo = nivelEducativo;
        return this;
    }

    public void setNivelEducativo(NivelEducativo nivelEducativo) {
        this.nivelEducativo = nivelEducativo;
    }

    public Set<IntercambioTurno> getIntercambioTurnos() {
        return intercambioTurnos;
    }

    public Colaborador intercambioTurnos(Set<IntercambioTurno> intercambioTurnos) {
        this.intercambioTurnos = intercambioTurnos;
        return this;
    }

    public Colaborador addIntercambioTurno(IntercambioTurno intercambioTurno) {
        this.intercambioTurnos.add(intercambioTurno);
        intercambioTurno.setColaborador(this);
        return this;
    }

    public Colaborador removeIntercambioTurno(IntercambioTurno intercambioTurno) {
        this.intercambioTurnos.remove(intercambioTurno);
        intercambioTurno.setColaborador(null);
        return this;
    }

    public void setIntercambioTurnos(Set<IntercambioTurno> intercambioTurnos) {
        this.intercambioTurnos = intercambioTurnos;
    }

    public Set<Telefono> getTelefonos() {
        return telefonos;
    }

    public Colaborador telefonos(Set<Telefono> telefonos) {
        this.telefonos = telefonos;
        return this;
    }

    public Colaborador addTelefono(Telefono telefono) {
        this.telefonos.add(telefono);
        telefono.setColaborador(this);
        return this;
    }

    public Colaborador removeTelefono(Telefono telefono) {
        this.telefonos.remove(telefono);
        telefono.setColaborador(null);
        return this;
    }

    public void setTelefonos(Set<Telefono> telefonos) {
        this.telefonos = telefonos;
    }

    public Set<Antecedentes> getAntecedentes() {
        return antecedentes;
    }

    public Colaborador antecedentes(Set<Antecedentes> antecedentes) {
        this.antecedentes = antecedentes;
        return this;
    }

    public Colaborador addAntecedentes(Antecedentes antecedentes) {
        this.antecedentes.add(antecedentes);
        antecedentes.setColaborador(this);
        return this;
    }

    public Colaborador removeAntecedentes(Antecedentes antecedentes) {
        this.antecedentes.remove(antecedentes);
        antecedentes.setColaborador(null);
        return this;
    }

    public void setAntecedentes(Set<Antecedentes> antecedentes) {
        this.antecedentes = antecedentes;
    }

    public Set<AsistenciaPlaneacion> getAsistenciaPlaneacions() {
        return asistenciaPlaneacions;
    }

    public Colaborador asistenciaPlaneacions(Set<AsistenciaPlaneacion> asistenciaPlaneacions) {
        this.asistenciaPlaneacions = asistenciaPlaneacions;
        return this;
    }

    public Colaborador addAsistenciaPlaneacion(AsistenciaPlaneacion asistenciaPlaneacion) {
        this.asistenciaPlaneacions.add(asistenciaPlaneacion);
        asistenciaPlaneacion.setColaborador(this);
        return this;
    }

    public Colaborador removeAsistenciaPlaneacion(AsistenciaPlaneacion asistenciaPlaneacion) {
        this.asistenciaPlaneacions.remove(asistenciaPlaneacion);
        asistenciaPlaneacion.setColaborador(null);
        return this;
    }

    public void setAsistenciaPlaneacions(Set<AsistenciaPlaneacion> asistenciaPlaneacions) {
        this.asistenciaPlaneacions = asistenciaPlaneacions;
    }

    public Set<Peticion> getPeticions() {
        return peticions;
    }

    public Colaborador peticions(Set<Peticion> peticions) {
        this.peticions = peticions;
        return this;
    }

    public Colaborador addPeticion(Peticion peticion) {
        this.peticions.add(peticion);
        peticion.getColaboradors().add(this);
        return this;
    }

    public Colaborador removePeticion(Peticion peticion) {
        this.peticions.remove(peticion);
        peticion.getColaboradors().remove(this);
        return this;
    }

    public void setPeticions(Set<Peticion> peticions) {
        this.peticions = peticions;
    }

    public Set<AsignacionHorasExtras> getAsignacionHorasExtras() {
        return asignacionHorasExtras;
    }

    public Colaborador asignacionHorasExtras(Set<AsignacionHorasExtras> asignacionHorasExtras) {
        this.asignacionHorasExtras = asignacionHorasExtras;
        return this;
    }

    public Colaborador addAsignacionHorasExtras(AsignacionHorasExtras asignacionHorasExtras) {
        this.asignacionHorasExtras.add(asignacionHorasExtras);
        asignacionHorasExtras.getColaboradors().add(this);
        return this;
    }

    public Colaborador removeAsignacionHorasExtras(AsignacionHorasExtras asignacionHorasExtras) {
        this.asignacionHorasExtras.remove(asignacionHorasExtras);
        asignacionHorasExtras.getColaboradors().remove(this);
        return this;
    }

    public void setAsignacionHorasExtras(Set<AsignacionHorasExtras> asignacionHorasExtras) {
        this.asignacionHorasExtras = asignacionHorasExtras;
    }

    public Set<AsignacionTurno> getAsignacionTurnos() {
        return asignacionTurnos;
    }

    public Colaborador asignacionTurnos(Set<AsignacionTurno> asignacionTurnos) {
        this.asignacionTurnos = asignacionTurnos;
        return this;
    }

    public Colaborador addAsignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurnos.add(asignacionTurno);
        asignacionTurno.getColaboradors().add(this);
        return this;
    }

    public Colaborador removeAsignacionTurno(AsignacionTurno asignacionTurno) {
        this.asignacionTurnos.remove(asignacionTurno);
        asignacionTurno.getColaboradors().remove(this);
        return this;
    }

    public void setAsignacionTurnos(Set<AsignacionTurno> asignacionTurnos) {
        this.asignacionTurnos = asignacionTurnos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Colaborador)) {
            return false;
        }
        return id != null && id.equals(((Colaborador) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Colaborador{" +
            "id=" + getId() +
            ", nombre1='" + getNombre1() + "'" +
            ", nombre2='" + getNombre2() + "'" +
            ", apellido1='" + getApellido1() + "'" +
            ", apellido2='" + getApellido2() + "'" +
            ", tipoDocumento='" + getTipoDocumento() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            ", lugarExpedicion='" + getLugarExpedicion() + "'" +
            ", fechaExpedicion='" + getFechaExpedicion() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", direccionResidencia='" + getDireccionResidencia() + "'" +
            ", barrio='" + getBarrio() + "'" +
            ", fechaIngreso='" + getFechaIngreso() + "'" +
            ", tiempoRequerido=" + getTiempoRequerido() +
            ", cargoDesempeniar='" + getCargoDesempeniar() + "'" +
            ", salario=" + getSalario() +
            ", eps='" + getEps() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fechaBaja='" + getFechaBaja() + "'" +
            ", nivelEducativo='" + getNivelEducativo() + "'" +
            "}";
    }
}

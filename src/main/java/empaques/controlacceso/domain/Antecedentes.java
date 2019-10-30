package empaques.controlacceso.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import empaques.controlacceso.domain.enumeration.TipoAntecedente;

/**
 * A Antecedentes.
 */
@Entity
@Table(name = "antecedentes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Antecedentes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoAntecedente tipo;

    @Column(name = "soporte")
    private String soporte;

    @ManyToOne
    @JsonIgnoreProperties("antecedentes")
    private Colaborador colaborador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoAntecedente getTipo() {
        return tipo;
    }

    public Antecedentes tipo(TipoAntecedente tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoAntecedente tipo) {
        this.tipo = tipo;
    }

    public String getSoporte() {
        return soporte;
    }

    public Antecedentes soporte(String soporte) {
        this.soporte = soporte;
        return this;
    }

    public void setSoporte(String soporte) {
        this.soporte = soporte;
    }

    public Colaborador getColaborador() {
        return colaborador;
    }

    public Antecedentes colaborador(Colaborador colaborador) {
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
        if (!(o instanceof Antecedentes)) {
            return false;
        }
        return id != null && id.equals(((Antecedentes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Antecedentes{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", soporte='" + getSoporte() + "'" +
            "}";
    }
}

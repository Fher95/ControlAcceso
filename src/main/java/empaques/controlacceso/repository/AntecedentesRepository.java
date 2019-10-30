package empaques.controlacceso.repository;
import empaques.controlacceso.domain.Antecedentes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Antecedentes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AntecedentesRepository extends JpaRepository<Antecedentes, Long> {

}

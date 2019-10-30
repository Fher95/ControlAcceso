package empaques.controlacceso.repository;
import empaques.controlacceso.domain.DevengoNomina;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DevengoNomina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DevengoNominaRepository extends JpaRepository<DevengoNomina, Long> {

}

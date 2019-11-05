package empaques.controlacceso.repository;
import empaques.controlacceso.domain.CentroCosto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CentroCosto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CentroCostoRepository extends JpaRepository<CentroCosto, Long> {
}

package empaques.controlacceso.repository;
import empaques.controlacceso.domain.AsignacionHorasExtras;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AsignacionHorasExtras entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsignacionHorasExtrasRepository extends JpaRepository<AsignacionHorasExtras, Long> {

}

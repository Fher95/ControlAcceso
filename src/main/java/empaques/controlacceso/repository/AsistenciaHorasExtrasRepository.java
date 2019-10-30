package empaques.controlacceso.repository;
import empaques.controlacceso.domain.AsistenciaHorasExtras;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AsistenciaHorasExtras entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsistenciaHorasExtrasRepository extends JpaRepository<AsistenciaHorasExtras, Long> {

}

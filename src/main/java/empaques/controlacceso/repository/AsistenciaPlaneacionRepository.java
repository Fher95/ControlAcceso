package empaques.controlacceso.repository;
import empaques.controlacceso.domain.AsistenciaPlaneacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AsistenciaPlaneacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsistenciaPlaneacionRepository extends JpaRepository<AsistenciaPlaneacion, Long> {

}

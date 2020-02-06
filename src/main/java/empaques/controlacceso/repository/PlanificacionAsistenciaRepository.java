package empaques.controlacceso.repository;
import empaques.controlacceso.domain.PlanificacionAsistencia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlanificacionAsistencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanificacionAsistenciaRepository extends JpaRepository<PlanificacionAsistencia, Long> {

}

package empaques.controlacceso.repository;
import empaques.controlacceso.domain.ReporteAsistencia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReporteAsistencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReporteAsistenciaRepository extends JpaRepository<ReporteAsistencia, Long> {

}

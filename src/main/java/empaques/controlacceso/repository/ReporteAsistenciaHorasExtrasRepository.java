package empaques.controlacceso.repository;
import empaques.controlacceso.domain.ReporteAsistenciaHorasExtras;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReporteAsistenciaHorasExtras entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReporteAsistenciaHorasExtrasRepository extends JpaRepository<ReporteAsistenciaHorasExtras, Long> {

}

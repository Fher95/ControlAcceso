package empaques.controlacceso.repository;

import empaques.controlacceso.domain.AsistenciaPlaneacion;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Spring Data  repository for the AsistenciaPlaneacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsistenciaPlaneacionRepository extends JpaRepository<AsistenciaPlaneacion, Long> {

    
    @Query("select asisntenciaPlaneacion from AsistenciaPlaneacion asisntenciaPlaneacion inner join fetch asisntenciaPlaneacion.asignacionTurno")
    List<AsistenciaPlaneacion> findAllWithEagerRelationships();
}

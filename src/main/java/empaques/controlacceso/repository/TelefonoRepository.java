package empaques.controlacceso.repository;
import empaques.controlacceso.domain.Telefono;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data  repository for the Telefono entity.
 */

@Repository
public interface TelefonoRepository extends JpaRepository<Telefono, Long> {
    @Query("from Telefono tel where colaborador_id =:id")
    List<Telefono> findByIdColaborador(@Param("id") Long id);
    
}

package empaques.controlacceso.repository;
import empaques.controlacceso.domain.Turno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Turno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    
@Query("select distinct turno from Turno turno where nombre like %:nombre%")
    Page<Turno> findTurnoByNombre(Pageable pageable, @Param("nombre") String nombre);
}

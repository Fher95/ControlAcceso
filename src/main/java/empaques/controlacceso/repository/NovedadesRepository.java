package empaques.controlacceso.repository;
import empaques.controlacceso.domain.Novedades;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Novedades entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NovedadesRepository extends JpaRepository<Novedades, Long> {

}

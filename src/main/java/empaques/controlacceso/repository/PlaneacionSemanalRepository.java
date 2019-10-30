package empaques.controlacceso.repository;
import empaques.controlacceso.domain.PlaneacionSemanal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlaneacionSemanal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaneacionSemanalRepository extends JpaRepository<PlaneacionSemanal, Long> {

}

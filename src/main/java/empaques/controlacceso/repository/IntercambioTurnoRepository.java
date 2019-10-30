package empaques.controlacceso.repository;
import empaques.controlacceso.domain.IntercambioTurno;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IntercambioTurno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntercambioTurnoRepository extends JpaRepository<IntercambioTurno, Long> {

}

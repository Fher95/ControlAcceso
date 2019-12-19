package empaques.controlacceso.repository;
import empaques.controlacceso.domain.Asistencia;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Asistencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {
    @Query("select asistencia from Asistencia asistencia where documento_colaborador =:documento "
            + "and entrada =:entrada and salida =:salida")
    Optional<Asistencia> findAllByEntradaSalida(@Param("documento") String documento, @Param("entrada") Instant entrada
    , @Param("salida") Instant salida);

}

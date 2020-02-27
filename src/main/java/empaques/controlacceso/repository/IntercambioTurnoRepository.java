package empaques.controlacceso.repository;
import empaques.controlacceso.domain.IntercambioTurno;
import java.time.Instant;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IntercambioTurno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntercambioTurnoRepository extends JpaRepository<IntercambioTurno, Long> {
    
    @Query("select distinct intercambioTurno from IntercambioTurno intercambioTurno join intercambioTurno.colaborador1 col1 join intercambioTurno.colaborador2 col2"
    +" where (col1.numeroDocumento =:numDoc or col2.numeroDocumento =:numDoc) and intercambioTurno.fecha <=:parFecha and intercambioTurno.fechaFin >=: parFecha")
    public Optional<IntercambioTurno> findIntercambioEntreFechas(@Param("numDoc") String numDoc, @Param("parFecha") Instant parFecha);
    
    @Query("select distinct intercambioTurno from IntercambioTurno intercambioTurno join intercambioTurno.colaborador1 col1 join intercambioTurno.colaborador2 col2"
    +" where (col1.numeroDocumento =:numDoc or col2.numeroDocumento =:numDoc) and intercambioTurno.fecha =:parFecha")
    public Optional<IntercambioTurno> findIntercambioConFecha(@Param("numDoc") String numDoc, @Param("parFecha") Instant parFecha);
}

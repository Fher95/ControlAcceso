package empaques.controlacceso.repository;

import empaques.controlacceso.domain.AsignacionTurno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data repository for the AsignacionTurno entity.
 */
@Repository
public interface AsignacionTurnoRepository extends JpaRepository<AsignacionTurno, Long> {

    @Query(value = "select distinct asignacionTurno from AsignacionTurno asignacionTurno left join fetch asignacionTurno.colaboradors",
            countQuery = "select count(distinct asignacionTurno) from AsignacionTurno asignacionTurno")
    Page<AsignacionTurno> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct asignacionTurno from AsignacionTurno asignacionTurno left join fetch asignacionTurno.colaboradors")
    List<AsignacionTurno> findAllWithEagerRelationships();

    @Query("select asignacionTurno from AsignacionTurno asignacionTurno left join fetch asignacionTurno.colaboradors where asignacionTurno.id =:id")
    Optional<AsignacionTurno> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select asignacionTurno from AsignacionTurno asignacionTurno inner join fetch asignacionTurno.colaboradors col where colaborador_id =:id")
    Optional<AsignacionTurno> findCargoColaborador(@Param("id") Long id);

    /**
     * Esta consulta devuelve una lista de turnos Actuales, considerando que
     * turnos actuales son aquellos que no tienen una fechaFin
     *
     * @return List<AsignacionTurno> turnosActuales
     */
    @Query("select distinct asignacionTurno from AsignacionTurno asignacionTurno left join fetch asignacionTurno.colaboradors"
            + " where fecha_fin = null")
    List<AsignacionTurno> findAllAsignacionesActuales();
    
    @Query("select distinct asignacionTurno from AsignacionTurno asignacionTurno inner join fetch asignacionTurno.colaboradors"
            + " where colaborador_id =:num")
    List<AsignacionTurno> findAllAsignacionesNumColaborador(@Param("num") Long num);
    
    /**
     * Devuelve todos las asignaciones de turnos actuales del colaborador con el id dado
     * @param id
     * @return 
     */
    @Query("select distinct asignacionTurno from AsignacionTurno asignacionTurno inner join fetch asignacionTurno.colaboradors col"
            + " where colaborador_id =:id and fecha_fin = null")
    List<AsignacionTurno> findAsignacionesActualesColaborador(@Param("id") Long id);

}

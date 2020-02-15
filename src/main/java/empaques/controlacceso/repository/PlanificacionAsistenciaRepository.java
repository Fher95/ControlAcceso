package empaques.controlacceso.repository;

import empaques.controlacceso.domain.PlanificacionAsistencia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;


/**
 * Spring Data  repository for the PlanificacionAsistencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanificacionAsistenciaRepository extends JpaRepository<PlanificacionAsistencia, Long> {
    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where fechaInicioPlanificacion >= :fromDate and fechaFinPlanificacion <= :toDate")
    List<PlanificacionAsistencia> findAllBetweenDates(@Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate);    
    
    @Query("select count(*) from PlanificacionAsistencia pAsistencia where fechaInicioPlanificacion >= :fromDate and fechaFinPlanificacion <= :toDate")
    int countdAllBetweenDates(@Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate);    

}

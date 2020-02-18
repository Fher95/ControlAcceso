package empaques.controlacceso.repository;

import empaques.controlacceso.domain.PlanificacionAsistencia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.List;


/**
 * Spring Data  repository for the PlanificacionAsistencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanificacionAsistenciaRepository extends JpaRepository<PlanificacionAsistencia, Long> {
    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where fechaAsistenciaTurno >= :fromDate and fechaAsistenciaTurno <= :toDate")
    List<PlanificacionAsistencia> findAllBetweenDates(@Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate);    
    
    @Query("select count(*) from PlanificacionAsistencia pAsistencia where fechaAsistenciaTurno >= :fromDate and fechaAsistenciaTurno <= :toDate")
    int countdAllBetweenDates(@Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate);    
    
    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where fechaAsistenciaTurno >= :fromDate and fechaAsistenciaTurno <= :toDate")
    Page<PlanificacionAsistencia> findAllByDates(@Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate,Pageable pageable);


    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where tipoAsistencia = null and inasistenciaJustificada = null")
    List<PlanificacionAsistencia> findPlanificacionesActuales();    

}

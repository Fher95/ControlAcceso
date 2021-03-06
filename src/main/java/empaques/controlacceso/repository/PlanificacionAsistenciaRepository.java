package empaques.controlacceso.repository;

import empaques.controlacceso.domain.PlanificacionAsistencia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;

/**
 * Spring Data repository for the PlanificacionAsistencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanificacionAsistenciaRepository extends JpaRepository<PlanificacionAsistencia, Long> {

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where fechaAsistenciaTurno >= :fromDate and fechaAsistenciaTurno <= :toDate")
    List<PlanificacionAsistencia> findAllBetweenDates(@Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate);

    @Query("select count(*) from PlanificacionAsistencia pAsistencia where fechaAsistenciaTurno >= :fromDate and fechaAsistenciaTurno <= :toDate")
    int countdAllBetweenDates(@Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate);

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where fechaAsistenciaTurno >= :fromDate and fechaAsistenciaTurno <= :toDate")
    Page<PlanificacionAsistencia> findAllByDates(@Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate, Pageable pageable);

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where tiposAsistencia = null and minDiferenciaEntrada = 0")
    List<PlanificacionAsistencia> findPlanificacionesActuales();

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia join pAsistencia.colaborador col where "
            + " col.numeroDocumento =:numDoc and pAsistencia.fechaAsistenciaTurno =:parFecha and pAsistencia.tiposAsistencia = null and pAsistencia.minDiferenciaEntrada = 0 "
            + " and pAsistencia.nombreTurno =:nomTurno")
    Optional<PlanificacionAsistencia> encontrarPlanActualColFecha(@Param("numDoc") String numDoc, @Param("nomTurno") String nomTurno, @Param("parFecha") Instant parFecha);

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia join pAsistencia.colaborador col where "
            + "col.numeroDocumento =:numDoc and fechaAsistenciaTurno >= :fromDate and fechaAsistenciaTurno <= :toDate and pAsistencia.tiposAsistencia = null and pAsistencia.minDiferenciaEntrada = 0 "
            + " and pAsistencia.nombreTurno =:nomTurno")
    List<PlanificacionAsistencia> encontrarPlanActualColEntreFechas(@Param("numDoc") String numDoc, @Param("nomTurno") String nomTurno, @Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate);

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia join pAsistencia.colaborador col where "
            + " col.numeroDocumento =:numDoc and pAsistencia.fechaAsistenciaTurno =:parFecha and pAsistencia.tiposAsistencia = null and pAsistencia.minDiferenciaEntrada = 0 ")
    List<PlanificacionAsistencia> encontrarPlanActualColFecha(@Param("numDoc") String numDoc, @Param("parFecha") Instant parFecha);

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where tiposAsistencia like %:tipoAsistencia%")
    List<PlanificacionAsistencia> encontrarAsistenciasConTipo(@Param("tipoAsistencia") String tipoAsistencia);

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where tiposAsistencia like %:tipoAsistencia% and fechaAsistenciaTurno >= :fromDate and fechaAsistenciaTurno <= :toDate")
    List<PlanificacionAsistencia> encontrarAsistenciasConTipoYFechas(@Param("tipoAsistencia") String tipoAsistencia, @Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate, 
    Sort objSort);    

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where tiposAsistencia = null")
    List<PlanificacionAsistencia> encontrarAsistenciasSinRegistro();
    
    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where tiposAsistencia = null and fechaAsistenciaTurno >= :fromDate and fechaAsistenciaTurno <= :toDate")
    List<PlanificacionAsistencia> encontrarAsistenciasSinRegistroConFechas( @Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate, Sort objSort);

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia where fechaAsistenciaTurno =:parFecha")
    List<PlanificacionAsistencia> listaAsistenciaPorFecha(@Param("parFecha") Instant parFecha);

    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia join pAsistencia.colaborador col " + 
    " where pAsistencia.fechaAsistenciaTurno >= :fromDate and pAsistencia.fechaAsistenciaTurno <= :toDate and LOWER(CONCAT(col.nombre1, col.nombre2, col.apellido1, col.apellido2)) LIKE %:nombres%")
    Page<PlanificacionAsistencia> findAllPorFehchasYNombresCol(Pageable pageable, @Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate, @Param("nombres") String nombres);
    
    @Query("select distinct pAsistencia from PlanificacionAsistencia pAsistencia join pAsistencia.colaborador col " + 
    " where pAsistencia.fechaAsistenciaTurno >= :fromDate and pAsistencia.fechaAsistenciaTurno <= :toDate and col.numeroDocumento LIKE %:numDoc%")
    Page<PlanificacionAsistencia> findAllPorFehchasYNumCol(Pageable pageable, @Param("fromDate") Instant fromDate, @Param("toDate") Instant toDate, @Param("numDoc") String numDoc);
    
}

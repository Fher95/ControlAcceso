package empaques.controlacceso.repository;

import empaques.controlacceso.domain.Peticion;
import java.time.Instant;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Peticion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeticionRepository extends JpaRepository<Peticion, Long> {
    @Query(value = "select distinct peticion from Peticion peticion where estado = null",
    countQuery = "select count(distinct peticion) from Peticion peticion where estado = null")
    Page<Peticion> findAllWithEstadoNull (Pageable pageable);

    @Query(value = "select distinct peticion from Peticion peticion where estado != null",
    countQuery = "select count(distinct peticion) from Peticion peticion where estado != null")
    Page<Peticion> findAllWithEstadoNotNull (Pageable pageable);
    
    @Query("select count(*) from Peticion peticion join peticion.colaborador col where col.numeroDocumento =:docCol "
    +"and peticion.fechaInicio <=:fecha and peticion.fechaFin >=:fecha and peticion.estado = 'Autorizada'")
    int findVacacionesAutorizadas(@Param("docCol") String docCol, @Param("fecha") Instant fecha);
}

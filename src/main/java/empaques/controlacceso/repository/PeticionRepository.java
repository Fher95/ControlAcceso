package empaques.controlacceso.repository;

import empaques.controlacceso.domain.Peticion;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Peticion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeticionRepository extends JpaRepository<Peticion, Long> {
    @Query(value = "select distinct peticion from Peticion peticion where estado = null",
    countQuery = "select count(distinct peticion) from Peticion peticion")
    Page<Peticion> findAllWithEstadoNull (Pageable pageable);

    @Query(value = "select distinct peticion from Peticion peticion where estado != null",
    countQuery = "select count(distinct peticion) from Peticion peticion")
    Page<Peticion> findAllWithEstadoNotNull (Pageable pageable);
}

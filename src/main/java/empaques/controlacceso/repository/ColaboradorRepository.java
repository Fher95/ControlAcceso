package empaques.controlacceso.repository;
import empaques.controlacceso.domain.Colaborador;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Colaborador entity.
 */
@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {

    @Query(value = "select distinct colaborador from Colaborador colaborador left join fetch colaborador.peticions left join fetch colaborador.asignacionHorasExtras",
        countQuery = "select count(distinct colaborador) from Colaborador colaborador")
    Page<Colaborador> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct colaborador from Colaborador colaborador left join fetch colaborador.peticions left join fetch colaborador.asignacionHorasExtras")
    List<Colaborador> findAllWithEagerRelationships();

    @Query("select colaborador from Colaborador colaborador left join fetch colaborador.peticions left join fetch colaborador.asignacionHorasExtras where colaborador.id =:id")
    Optional<Colaborador> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select distinct colaborador from Colaborador colaborador where numero_documento like %:id%")
    Page<Colaborador> findColaboradorByNumDocumento(Pageable pageable, @Param("id") String id);
    
    @Query("select distinct colaborador from Colaborador colaborador where (lower(nombre_1) like %:nombre1% or nombre_1 is null) "
            + "and (lower(nombre_2) like %:nombre2% or nombre_2 is null) and (lower(apellido_1) like %:apellido1% or apellido_1 is null) "
            + "and (lower(apellido_2) like %:apellido2% or apellido_2 is null)")
    Page<Colaborador> findByNombres(Pageable pageable, @Param("nombre1") String nombre1, @Param("nombre2") String nombre2,
            @Param("apellido1") String apellido1, @Param("apellido2") String apellido2);

}

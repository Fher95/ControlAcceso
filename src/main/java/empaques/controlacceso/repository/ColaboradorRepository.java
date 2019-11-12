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

    @Query("from Colaborador colaborador where numero_documento =:id")
    Optional<Colaborador> findColaboradorByNumDocumento(@Param("id") String id);

    @Query("select colaborador from Colaborador colaborador left join fetch colaborador.peticions pets where numero_documento =:id")
    Optional<Colaborador> findOneWithPeticions(@Param("id") String id);

    @Query("select colaborador from Colaborador colaborador inner join fetch colaborador.peticions pets where peticion_id =:id")
    Optional<Colaborador> findByIdPeticion(@Param("id") Long id);
}


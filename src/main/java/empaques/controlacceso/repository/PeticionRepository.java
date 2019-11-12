package empaques.controlacceso.repository;
import empaques.controlacceso.domain.Peticion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;


/**
 * Spring Data  repository for the Peticion entity.
 */

@Repository
public interface PeticionRepository extends JpaRepository<Peticion, Long> {

    @Query(value = "from Peticion peticion inner join peticion.colaboradors col")        
    Page<Peticion> findAllWithColaboradores(Pageable pageable);

}

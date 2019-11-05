package empaques.controlacceso.repository;
import empaques.controlacceso.domain.Cargo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import java.util.List;


/**
 * Spring Data  repository for the Cargo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {

    @Query("from Cargo cargo where centro_costo_id =:id")
    List<Cargo> findByIdCentroCosto(@Param("id") Long id);

}

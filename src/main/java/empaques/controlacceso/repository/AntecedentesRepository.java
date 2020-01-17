package empaques.controlacceso.repository;
import empaques.controlacceso.domain.Antecedentes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import java.util.List;


/**
 * Spring Data  repository for the Antecedentes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AntecedentesRepository extends JpaRepository<Antecedentes, Long> {

    @Query("select distinct antecedente from Antecedentes antecedente where colaborador_id =:id")    
    List<Antecedentes> findAllWithIdColaborador (@Param("id") Long id);
}

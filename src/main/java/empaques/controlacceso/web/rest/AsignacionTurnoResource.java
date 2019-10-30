package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.AsignacionTurno;
import empaques.controlacceso.repository.AsignacionTurnoRepository;
import empaques.controlacceso.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link empaques.controlacceso.domain.AsignacionTurno}.
 */
@RestController
@RequestMapping("/api")
public class AsignacionTurnoResource {

    private final Logger log = LoggerFactory.getLogger(AsignacionTurnoResource.class);

    private static final String ENTITY_NAME = "asignacionTurno";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsignacionTurnoRepository asignacionTurnoRepository;

    public AsignacionTurnoResource(AsignacionTurnoRepository asignacionTurnoRepository) {
        this.asignacionTurnoRepository = asignacionTurnoRepository;
    }

    /**
     * {@code POST  /asignacion-turnos} : Create a new asignacionTurno.
     *
     * @param asignacionTurno the asignacionTurno to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asignacionTurno, or with status {@code 400 (Bad Request)} if the asignacionTurno has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asignacion-turnos")
    public ResponseEntity<AsignacionTurno> createAsignacionTurno(@RequestBody AsignacionTurno asignacionTurno) throws URISyntaxException {
        log.debug("REST request to save AsignacionTurno : {}", asignacionTurno);
        if (asignacionTurno.getId() != null) {
            throw new BadRequestAlertException("A new asignacionTurno cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AsignacionTurno result = asignacionTurnoRepository.save(asignacionTurno);
        return ResponseEntity.created(new URI("/api/asignacion-turnos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asignacion-turnos} : Updates an existing asignacionTurno.
     *
     * @param asignacionTurno the asignacionTurno to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignacionTurno,
     * or with status {@code 400 (Bad Request)} if the asignacionTurno is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asignacionTurno couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asignacion-turnos")
    public ResponseEntity<AsignacionTurno> updateAsignacionTurno(@RequestBody AsignacionTurno asignacionTurno) throws URISyntaxException {
        log.debug("REST request to update AsignacionTurno : {}", asignacionTurno);
        if (asignacionTurno.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AsignacionTurno result = asignacionTurnoRepository.save(asignacionTurno);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignacionTurno.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /asignacion-turnos} : get all the asignacionTurnos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asignacionTurnos in body.
     */
    @GetMapping("/asignacion-turnos")
    public List<AsignacionTurno> getAllAsignacionTurnos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all AsignacionTurnos");
        return asignacionTurnoRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /asignacion-turnos/:id} : get the "id" asignacionTurno.
     *
     * @param id the id of the asignacionTurno to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asignacionTurno, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asignacion-turnos/{id}")
    public ResponseEntity<AsignacionTurno> getAsignacionTurno(@PathVariable Long id) {
        log.debug("REST request to get AsignacionTurno : {}", id);
        Optional<AsignacionTurno> asignacionTurno = asignacionTurnoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(asignacionTurno);
    }

    /**
     * {@code DELETE  /asignacion-turnos/:id} : delete the "id" asignacionTurno.
     *
     * @param id the id of the asignacionTurno to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asignacion-turnos/{id}")
    public ResponseEntity<Void> deleteAsignacionTurno(@PathVariable Long id) {
        log.debug("REST request to delete AsignacionTurno : {}", id);
        asignacionTurnoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

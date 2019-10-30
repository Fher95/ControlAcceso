package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.Turno;
import empaques.controlacceso.repository.TurnoRepository;
import empaques.controlacceso.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link empaques.controlacceso.domain.Turno}.
 */
@RestController
@RequestMapping("/api")
public class TurnoResource {

    private final Logger log = LoggerFactory.getLogger(TurnoResource.class);

    private static final String ENTITY_NAME = "turno";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TurnoRepository turnoRepository;

    public TurnoResource(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    /**
     * {@code POST  /turnos} : Create a new turno.
     *
     * @param turno the turno to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new turno, or with status {@code 400 (Bad Request)} if the turno has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/turnos")
    public ResponseEntity<Turno> createTurno(@Valid @RequestBody Turno turno) throws URISyntaxException {
        log.debug("REST request to save Turno : {}", turno);
        if (turno.getId() != null) {
            throw new BadRequestAlertException("A new turno cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Turno result = turnoRepository.save(turno);
        return ResponseEntity.created(new URI("/api/turnos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /turnos} : Updates an existing turno.
     *
     * @param turno the turno to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated turno,
     * or with status {@code 400 (Bad Request)} if the turno is not valid,
     * or with status {@code 500 (Internal Server Error)} if the turno couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/turnos")
    public ResponseEntity<Turno> updateTurno(@Valid @RequestBody Turno turno) throws URISyntaxException {
        log.debug("REST request to update Turno : {}", turno);
        if (turno.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Turno result = turnoRepository.save(turno);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, turno.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /turnos} : get all the turnos.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of turnos in body.
     */
    @GetMapping("/turnos")
    public ResponseEntity<List<Turno>> getAllTurnos(Pageable pageable) {
        log.debug("REST request to get a page of Turnos");
        Page<Turno> page = turnoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /turnos/:id} : get the "id" turno.
     *
     * @param id the id of the turno to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the turno, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/turnos/{id}")
    public ResponseEntity<Turno> getTurno(@PathVariable Long id) {
        log.debug("REST request to get Turno : {}", id);
        Optional<Turno> turno = turnoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(turno);
    }

    /**
     * {@code DELETE  /turnos/:id} : delete the "id" turno.
     *
     * @param id the id of the turno to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/turnos/{id}")
    public ResponseEntity<Void> deleteTurno(@PathVariable Long id) {
        log.debug("REST request to delete Turno : {}", id);
        turnoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

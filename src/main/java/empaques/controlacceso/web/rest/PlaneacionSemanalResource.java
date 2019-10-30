package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.PlaneacionSemanal;
import empaques.controlacceso.repository.PlaneacionSemanalRepository;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link empaques.controlacceso.domain.PlaneacionSemanal}.
 */
@RestController
@RequestMapping("/api")
public class PlaneacionSemanalResource {

    private final Logger log = LoggerFactory.getLogger(PlaneacionSemanalResource.class);

    private static final String ENTITY_NAME = "planeacionSemanal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlaneacionSemanalRepository planeacionSemanalRepository;

    public PlaneacionSemanalResource(PlaneacionSemanalRepository planeacionSemanalRepository) {
        this.planeacionSemanalRepository = planeacionSemanalRepository;
    }

    /**
     * {@code POST  /planeacion-semanals} : Create a new planeacionSemanal.
     *
     * @param planeacionSemanal the planeacionSemanal to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planeacionSemanal, or with status {@code 400 (Bad Request)} if the planeacionSemanal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planeacion-semanals")
    public ResponseEntity<PlaneacionSemanal> createPlaneacionSemanal(@RequestBody PlaneacionSemanal planeacionSemanal) throws URISyntaxException {
        log.debug("REST request to save PlaneacionSemanal : {}", planeacionSemanal);
        if (planeacionSemanal.getId() != null) {
            throw new BadRequestAlertException("A new planeacionSemanal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaneacionSemanal result = planeacionSemanalRepository.save(planeacionSemanal);
        return ResponseEntity.created(new URI("/api/planeacion-semanals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /planeacion-semanals} : Updates an existing planeacionSemanal.
     *
     * @param planeacionSemanal the planeacionSemanal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planeacionSemanal,
     * or with status {@code 400 (Bad Request)} if the planeacionSemanal is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planeacionSemanal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planeacion-semanals")
    public ResponseEntity<PlaneacionSemanal> updatePlaneacionSemanal(@RequestBody PlaneacionSemanal planeacionSemanal) throws URISyntaxException {
        log.debug("REST request to update PlaneacionSemanal : {}", planeacionSemanal);
        if (planeacionSemanal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaneacionSemanal result = planeacionSemanalRepository.save(planeacionSemanal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planeacionSemanal.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /planeacion-semanals} : get all the planeacionSemanals.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planeacionSemanals in body.
     */
    @GetMapping("/planeacion-semanals")
    public ResponseEntity<List<PlaneacionSemanal>> getAllPlaneacionSemanals(Pageable pageable) {
        log.debug("REST request to get a page of PlaneacionSemanals");
        Page<PlaneacionSemanal> page = planeacionSemanalRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /planeacion-semanals/:id} : get the "id" planeacionSemanal.
     *
     * @param id the id of the planeacionSemanal to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planeacionSemanal, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planeacion-semanals/{id}")
    public ResponseEntity<PlaneacionSemanal> getPlaneacionSemanal(@PathVariable Long id) {
        log.debug("REST request to get PlaneacionSemanal : {}", id);
        Optional<PlaneacionSemanal> planeacionSemanal = planeacionSemanalRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(planeacionSemanal);
    }

    /**
     * {@code DELETE  /planeacion-semanals/:id} : delete the "id" planeacionSemanal.
     *
     * @param id the id of the planeacionSemanal to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planeacion-semanals/{id}")
    public ResponseEntity<Void> deletePlaneacionSemanal(@PathVariable Long id) {
        log.debug("REST request to delete PlaneacionSemanal : {}", id);
        planeacionSemanalRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

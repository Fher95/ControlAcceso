package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.DevengoNomina;
import empaques.controlacceso.repository.DevengoNominaRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.DevengoNomina}.
 */
@RestController
@RequestMapping("/api")
public class DevengoNominaResource {

    private final Logger log = LoggerFactory.getLogger(DevengoNominaResource.class);

    private static final String ENTITY_NAME = "devengoNomina";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DevengoNominaRepository devengoNominaRepository;

    public DevengoNominaResource(DevengoNominaRepository devengoNominaRepository) {
        this.devengoNominaRepository = devengoNominaRepository;
    }

    /**
     * {@code POST  /devengo-nominas} : Create a new devengoNomina.
     *
     * @param devengoNomina the devengoNomina to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new devengoNomina, or with status {@code 400 (Bad Request)} if the devengoNomina has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/devengo-nominas")
    public ResponseEntity<DevengoNomina> createDevengoNomina(@RequestBody DevengoNomina devengoNomina) throws URISyntaxException {
        log.debug("REST request to save DevengoNomina : {}", devengoNomina);
        if (devengoNomina.getId() != null) {
            throw new BadRequestAlertException("A new devengoNomina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DevengoNomina result = devengoNominaRepository.save(devengoNomina);
        return ResponseEntity.created(new URI("/api/devengo-nominas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /devengo-nominas} : Updates an existing devengoNomina.
     *
     * @param devengoNomina the devengoNomina to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated devengoNomina,
     * or with status {@code 400 (Bad Request)} if the devengoNomina is not valid,
     * or with status {@code 500 (Internal Server Error)} if the devengoNomina couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/devengo-nominas")
    public ResponseEntity<DevengoNomina> updateDevengoNomina(@RequestBody DevengoNomina devengoNomina) throws URISyntaxException {
        log.debug("REST request to update DevengoNomina : {}", devengoNomina);
        if (devengoNomina.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DevengoNomina result = devengoNominaRepository.save(devengoNomina);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, devengoNomina.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /devengo-nominas} : get all the devengoNominas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of devengoNominas in body.
     */
    @GetMapping("/devengo-nominas")
    public List<DevengoNomina> getAllDevengoNominas() {
        log.debug("REST request to get all DevengoNominas");
        return devengoNominaRepository.findAll();
    }

    /**
     * {@code GET  /devengo-nominas/:id} : get the "id" devengoNomina.
     *
     * @param id the id of the devengoNomina to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the devengoNomina, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/devengo-nominas/{id}")
    public ResponseEntity<DevengoNomina> getDevengoNomina(@PathVariable Long id) {
        log.debug("REST request to get DevengoNomina : {}", id);
        Optional<DevengoNomina> devengoNomina = devengoNominaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(devengoNomina);
    }

    /**
     * {@code DELETE  /devengo-nominas/:id} : delete the "id" devengoNomina.
     *
     * @param id the id of the devengoNomina to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/devengo-nominas/{id}")
    public ResponseEntity<Void> deleteDevengoNomina(@PathVariable Long id) {
        log.debug("REST request to delete DevengoNomina : {}", id);
        devengoNominaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

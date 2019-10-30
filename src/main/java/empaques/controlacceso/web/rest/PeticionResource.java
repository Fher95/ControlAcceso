package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.Peticion;
import empaques.controlacceso.repository.PeticionRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.Peticion}.
 */
@RestController
@RequestMapping("/api")
public class PeticionResource {

    private final Logger log = LoggerFactory.getLogger(PeticionResource.class);

    private static final String ENTITY_NAME = "peticion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PeticionRepository peticionRepository;

    public PeticionResource(PeticionRepository peticionRepository) {
        this.peticionRepository = peticionRepository;
    }

    /**
     * {@code POST  /peticions} : Create a new peticion.
     *
     * @param peticion the peticion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new peticion, or with status {@code 400 (Bad Request)} if the peticion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/peticions")
    public ResponseEntity<Peticion> createPeticion(@RequestBody Peticion peticion) throws URISyntaxException {
        log.debug("REST request to save Peticion : {}", peticion);
        if (peticion.getId() != null) {
            throw new BadRequestAlertException("A new peticion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Peticion result = peticionRepository.save(peticion);
        return ResponseEntity.created(new URI("/api/peticions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /peticions} : Updates an existing peticion.
     *
     * @param peticion the peticion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated peticion,
     * or with status {@code 400 (Bad Request)} if the peticion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the peticion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/peticions")
    public ResponseEntity<Peticion> updatePeticion(@RequestBody Peticion peticion) throws URISyntaxException {
        log.debug("REST request to update Peticion : {}", peticion);
        if (peticion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Peticion result = peticionRepository.save(peticion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, peticion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /peticions} : get all the peticions.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of peticions in body.
     */
    @GetMapping("/peticions")
    public ResponseEntity<List<Peticion>> getAllPeticions(Pageable pageable) {
        log.debug("REST request to get a page of Peticions");
        Page<Peticion> page = peticionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /peticions/:id} : get the "id" peticion.
     *
     * @param id the id of the peticion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the peticion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/peticions/{id}")
    public ResponseEntity<Peticion> getPeticion(@PathVariable Long id) {
        log.debug("REST request to get Peticion : {}", id);
        Optional<Peticion> peticion = peticionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(peticion);
    }

    /**
     * {@code DELETE  /peticions/:id} : delete the "id" peticion.
     *
     * @param id the id of the peticion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/peticions/{id}")
    public ResponseEntity<Void> deletePeticion(@PathVariable Long id) {
        log.debug("REST request to delete Peticion : {}", id);
        peticionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

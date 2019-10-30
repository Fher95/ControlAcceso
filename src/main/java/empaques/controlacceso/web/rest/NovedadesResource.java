package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.Novedades;
import empaques.controlacceso.repository.NovedadesRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.Novedades}.
 */
@RestController
@RequestMapping("/api")
public class NovedadesResource {

    private final Logger log = LoggerFactory.getLogger(NovedadesResource.class);

    private static final String ENTITY_NAME = "novedades";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NovedadesRepository novedadesRepository;

    public NovedadesResource(NovedadesRepository novedadesRepository) {
        this.novedadesRepository = novedadesRepository;
    }

    /**
     * {@code POST  /novedades} : Create a new novedades.
     *
     * @param novedades the novedades to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new novedades, or with status {@code 400 (Bad Request)} if the novedades has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/novedades")
    public ResponseEntity<Novedades> createNovedades(@RequestBody Novedades novedades) throws URISyntaxException {
        log.debug("REST request to save Novedades : {}", novedades);
        if (novedades.getId() != null) {
            throw new BadRequestAlertException("A new novedades cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Novedades result = novedadesRepository.save(novedades);
        return ResponseEntity.created(new URI("/api/novedades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /novedades} : Updates an existing novedades.
     *
     * @param novedades the novedades to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated novedades,
     * or with status {@code 400 (Bad Request)} if the novedades is not valid,
     * or with status {@code 500 (Internal Server Error)} if the novedades couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/novedades")
    public ResponseEntity<Novedades> updateNovedades(@RequestBody Novedades novedades) throws URISyntaxException {
        log.debug("REST request to update Novedades : {}", novedades);
        if (novedades.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Novedades result = novedadesRepository.save(novedades);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, novedades.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /novedades} : get all the novedades.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of novedades in body.
     */
    @GetMapping("/novedades")
    public ResponseEntity<List<Novedades>> getAllNovedades(Pageable pageable) {
        log.debug("REST request to get a page of Novedades");
        Page<Novedades> page = novedadesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /novedades/:id} : get the "id" novedades.
     *
     * @param id the id of the novedades to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the novedades, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/novedades/{id}")
    public ResponseEntity<Novedades> getNovedades(@PathVariable Long id) {
        log.debug("REST request to get Novedades : {}", id);
        Optional<Novedades> novedades = novedadesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(novedades);
    }

    /**
     * {@code DELETE  /novedades/:id} : delete the "id" novedades.
     *
     * @param id the id of the novedades to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/novedades/{id}")
    public ResponseEntity<Void> deleteNovedades(@PathVariable Long id) {
        log.debug("REST request to delete Novedades : {}", id);
        novedadesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

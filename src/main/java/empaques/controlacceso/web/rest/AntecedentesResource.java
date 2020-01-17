package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.Antecedentes;
import empaques.controlacceso.repository.AntecedentesRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.Antecedentes}.
 */
@RestController
@RequestMapping("/api")
public class AntecedentesResource {

    private final Logger log = LoggerFactory.getLogger(AntecedentesResource.class);

    private static final String ENTITY_NAME = "antecedentes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AntecedentesRepository antecedentesRepository;

    public AntecedentesResource(AntecedentesRepository antecedentesRepository) {
        this.antecedentesRepository = antecedentesRepository;
    }

    /**
     * {@code POST  /antecedentes} : Create a new antecedentes.
     *
     * @param antecedentes the antecedentes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new antecedentes, or with status {@code 400 (Bad Request)} if the antecedentes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/antecedentes")
    public ResponseEntity<Antecedentes> createAntecedentes(@RequestBody Antecedentes antecedentes) throws URISyntaxException {
        log.debug("REST request to save Antecedentes : {}", antecedentes);
        if (antecedentes.getId() != null) {
            throw new BadRequestAlertException("A new antecedentes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Antecedentes result = antecedentesRepository.save(antecedentes);
        return ResponseEntity.created(new URI("/api/antecedentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /antecedentes} : Updates an existing antecedentes.
     *
     * @param antecedentes the antecedentes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated antecedentes,
     * or with status {@code 400 (Bad Request)} if the antecedentes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the antecedentes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/antecedentes")
    public ResponseEntity<Antecedentes> updateAntecedentes(@RequestBody Antecedentes antecedentes) throws URISyntaxException {
        log.debug("REST request to update Antecedentes : {}", antecedentes);
        if (antecedentes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Antecedentes result = antecedentesRepository.save(antecedentes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, antecedentes.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /antecedentes} : get all the antecedentes.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of antecedentes in body.
     */
    @GetMapping("/antecedentes")
    public ResponseEntity<List<Antecedentes>> getAllAntecedentes(Pageable pageable) {
        log.debug("REST request to get a page of Antecedentes");
        Page<Antecedentes> page = antecedentesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /antecedentes/:id} : get the "id" antecedentes.
     *
     * @param id the id of the antecedentes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the antecedentes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/antecedentes/{id}")
    public ResponseEntity<Antecedentes> getAntecedentes(@PathVariable Long id) {
        log.debug("REST request to get Antecedentes : {}", id);
        Optional<Antecedentes> antecedentes = antecedentesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(antecedentes);
    }

    /**
     * {@code DELETE  /antecedentes/:id} : delete the "id" antecedentes.
     *
     * @param id the id of the antecedentes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/antecedentes/{id}")
    public ResponseEntity<Void> deleteAntecedentes(@PathVariable Long id) {
        log.debug("REST request to delete Antecedentes : {}", id);
        antecedentesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/antecedentes/col/{id}")
    public List<Antecedentes> getAntecedentesColaboradorID(@PathVariable Long id) {
        log.debug("REST request to get a page of Antecedentes de un COLABORADOR");
        return this.antecedentesRepository.findAllWithIdColaborador(id);
    }
}

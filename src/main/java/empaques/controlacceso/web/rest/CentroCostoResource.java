package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.CentroCosto;
import empaques.controlacceso.repository.CentroCostoRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.CentroCosto}.
 */
@RestController
@RequestMapping("/api")
public class CentroCostoResource {

    private final Logger log = LoggerFactory.getLogger(CentroCostoResource.class);

    private static final String ENTITY_NAME = "centroCosto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CentroCostoRepository centroCostoRepository;

    public CentroCostoResource(CentroCostoRepository centroCostoRepository) {
        this.centroCostoRepository = centroCostoRepository;
    }

    /**
     * {@code POST  /centro-costos} : Create a new centroCosto.
     *
     * @param centroCosto the centroCosto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new centroCosto, or with status {@code 400 (Bad Request)} if the centroCosto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/centro-costos")
    public ResponseEntity<CentroCosto> createCentroCosto(@Valid @RequestBody CentroCosto centroCosto) throws URISyntaxException {
        log.debug("REST request to save CentroCosto : {}", centroCosto);
        if (centroCosto.getId() != null) {
            throw new BadRequestAlertException("A new centroCosto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CentroCosto result = centroCostoRepository.save(centroCosto);
        return ResponseEntity.created(new URI("/api/centro-costos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /centro-costos} : Updates an existing centroCosto.
     *
     * @param centroCosto the centroCosto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated centroCosto,
     * or with status {@code 400 (Bad Request)} if the centroCosto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the centroCosto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/centro-costos")
    public ResponseEntity<CentroCosto> updateCentroCosto(@Valid @RequestBody CentroCosto centroCosto) throws URISyntaxException {
        log.debug("REST request to update CentroCosto : {}", centroCosto);
        if (centroCosto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CentroCosto result = centroCostoRepository.save(centroCosto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, centroCosto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /centro-costos} : get all the centroCostos.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of centroCostos in body.
     */
    @GetMapping("/centro-costos")
    public ResponseEntity<List<CentroCosto>> getAllCentroCostos(Pageable pageable) {
        log.debug("REST request to get a page of CentroCostos");
        Page<CentroCosto> page = centroCostoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /centro-costos/:id} : get the "id" centroCosto.
     *
     * @param id the id of the centroCosto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the centroCosto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/centro-costos/{id}")
    public ResponseEntity<CentroCosto> getCentroCosto(@PathVariable Long id) {
        log.debug("REST request to get CentroCosto : {}", id);
        Optional<CentroCosto> centroCosto = centroCostoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(centroCosto);
    }

    /**
     * {@code DELETE  /centro-costos/:id} : delete the "id" centroCosto.
     *
     * @param id the id of the centroCosto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/centro-costos/{id}")
    public ResponseEntity<Void> deleteCentroCosto(@PathVariable Long id) {
        log.debug("REST request to delete CentroCosto : {}", id);
        centroCostoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.Asistencia;
import empaques.controlacceso.repository.AsistenciaRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link empaques.controlacceso.domain.Asistencia}.
 */
@RestController
@RequestMapping("/api")
public class AsistenciaResource {

    private final Logger log = LoggerFactory.getLogger(AsistenciaResource.class);

    private static final String ENTITY_NAME = "asistencia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsistenciaRepository asistenciaRepository;

    public AsistenciaResource(AsistenciaRepository asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }

    /**
     * {@code POST  /asistencias} : Create a new asistencia.
     *
     * @param asistencia the asistencia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asistencia, or with status {@code 400 (Bad Request)} if the asistencia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asistencias")
    public ResponseEntity<Asistencia> createAsistencia(@RequestBody Asistencia asistencia) throws URISyntaxException {
        log.debug("REST request to save Asistencia : {}", asistencia);
        if (asistencia.getId() != null) {
            throw new BadRequestAlertException("A new asistencia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Asistencia result = asistenciaRepository.save(asistencia);
        return ResponseEntity.created(new URI("/api/asistencias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asistencias} : Updates an existing asistencia.
     *
     * @param asistencia the asistencia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asistencia,
     * or with status {@code 400 (Bad Request)} if the asistencia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asistencia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asistencias")
    public ResponseEntity<Asistencia> updateAsistencia(@RequestBody Asistencia asistencia) throws URISyntaxException {
        log.debug("REST request to update Asistencia : {}", asistencia);
        if (asistencia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Asistencia result = asistenciaRepository.save(asistencia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asistencia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /asistencias} : get all the asistencias.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asistencias in body.
     */
    @GetMapping("/asistencias")
    public ResponseEntity<List<Asistencia>> getAllAsistencias(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("asistenciaplaneacion-is-null".equals(filter)) {
            log.debug("REST request to get all Asistencias where asistenciaPlaneacion is null");
            return new ResponseEntity<>(StreamSupport
                .stream(asistenciaRepository.findAll().spliterator(), false)
                .filter(asistencia -> asistencia.getAsistenciaPlaneacion() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of Asistencias");
        Page<Asistencia> page = asistenciaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /asistencias/:id} : get the "id" asistencia.
     *
     * @param id the id of the asistencia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asistencia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asistencias/{id}")
    public ResponseEntity<Asistencia> getAsistencia(@PathVariable Long id) {
        log.debug("REST request to get Asistencia : {}", id);
        Optional<Asistencia> asistencia = asistenciaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(asistencia);
    }

    /**
     * {@code DELETE  /asistencias/:id} : delete the "id" asistencia.
     *
     * @param id the id of the asistencia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asistencias/{id}")
    public ResponseEntity<Void> deleteAsistencia(@PathVariable Long id) {
        log.debug("REST request to delete Asistencia : {}", id);
        asistenciaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

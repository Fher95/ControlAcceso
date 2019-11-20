package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.AsistenciaPlaneacion;
import empaques.controlacceso.repository.AsistenciaPlaneacionRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.AsistenciaPlaneacion}.
 */
@RestController
@RequestMapping("/api")
public class AsistenciaPlaneacionResource {

    private final Logger log = LoggerFactory.getLogger(AsistenciaPlaneacionResource.class);

    private static final String ENTITY_NAME = "asistenciaPlaneacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsistenciaPlaneacionRepository asistenciaPlaneacionRepository;

    public AsistenciaPlaneacionResource(AsistenciaPlaneacionRepository asistenciaPlaneacionRepository) {
        this.asistenciaPlaneacionRepository = asistenciaPlaneacionRepository;
    }

    /**
     * {@code POST  /asistencia-planeacions} : Create a new asistenciaPlaneacion.
     *
     * @param asistenciaPlaneacion the asistenciaPlaneacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asistenciaPlaneacion, or with status {@code 400 (Bad Request)} if the asistenciaPlaneacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asistencia-planeacions")
    public ResponseEntity<AsistenciaPlaneacion> createAsistenciaPlaneacion(@RequestBody AsistenciaPlaneacion asistenciaPlaneacion) throws URISyntaxException {
        log.debug("REST request to save AsistenciaPlaneacion : {}", asistenciaPlaneacion);
        if (asistenciaPlaneacion.getId() != null) {
            throw new BadRequestAlertException("A new asistenciaPlaneacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AsistenciaPlaneacion result = asistenciaPlaneacionRepository.save(asistenciaPlaneacion);
        return ResponseEntity.created(new URI("/api/asistencia-planeacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asistencia-planeacions} : Updates an existing asistenciaPlaneacion.
     *
     * @param asistenciaPlaneacion the asistenciaPlaneacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asistenciaPlaneacion,
     * or with status {@code 400 (Bad Request)} if the asistenciaPlaneacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asistenciaPlaneacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asistencia-planeacions")
    public ResponseEntity<AsistenciaPlaneacion> updateAsistenciaPlaneacion(@RequestBody AsistenciaPlaneacion asistenciaPlaneacion) throws URISyntaxException {
        log.debug("REST request to update AsistenciaPlaneacion : {}", asistenciaPlaneacion);
        if (asistenciaPlaneacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AsistenciaPlaneacion result = asistenciaPlaneacionRepository.save(asistenciaPlaneacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asistenciaPlaneacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /asistencia-planeacions} : get all the asistenciaPlaneacions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asistenciaPlaneacions in body.
     */
    @GetMapping("/asistencia-planeacions")
    public List<AsistenciaPlaneacion> getAllAsistenciaPlaneacions() {
        log.debug("REST request to get all AsistenciaPlaneacions");
        return asistenciaPlaneacionRepository.findAll();
    }

    /**
     * {@code GET  /asistencia-planeacions/:id} : get the "id" asistenciaPlaneacion.
     *
     * @param id the id of the asistenciaPlaneacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asistenciaPlaneacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asistencia-planeacions/{id}")
    public ResponseEntity<AsistenciaPlaneacion> getAsistenciaPlaneacion(@PathVariable Long id) {
        log.debug("REST request to get AsistenciaPlaneacion : {}", id);
        Optional<AsistenciaPlaneacion> asistenciaPlaneacion = asistenciaPlaneacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(asistenciaPlaneacion);
    }

    /**
     * {@code DELETE  /asistencia-planeacions/:id} : delete the "id" asistenciaPlaneacion.
     *
     * @param id the id of the asistenciaPlaneacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asistencia-planeacions/{id}")
    public ResponseEntity<Void> deleteAsistenciaPlaneacion(@PathVariable Long id) {
        log.debug("REST request to delete AsistenciaPlaneacion : {}", id);
        asistenciaPlaneacionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

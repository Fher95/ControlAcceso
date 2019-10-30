package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.AsistenciaHorasExtras;
import empaques.controlacceso.repository.AsistenciaHorasExtrasRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.AsistenciaHorasExtras}.
 */
@RestController
@RequestMapping("/api")
public class AsistenciaHorasExtrasResource {

    private final Logger log = LoggerFactory.getLogger(AsistenciaHorasExtrasResource.class);

    private static final String ENTITY_NAME = "asistenciaHorasExtras";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsistenciaHorasExtrasRepository asistenciaHorasExtrasRepository;

    public AsistenciaHorasExtrasResource(AsistenciaHorasExtrasRepository asistenciaHorasExtrasRepository) {
        this.asistenciaHorasExtrasRepository = asistenciaHorasExtrasRepository;
    }

    /**
     * {@code POST  /asistencia-horas-extras} : Create a new asistenciaHorasExtras.
     *
     * @param asistenciaHorasExtras the asistenciaHorasExtras to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asistenciaHorasExtras, or with status {@code 400 (Bad Request)} if the asistenciaHorasExtras has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asistencia-horas-extras")
    public ResponseEntity<AsistenciaHorasExtras> createAsistenciaHorasExtras(@RequestBody AsistenciaHorasExtras asistenciaHorasExtras) throws URISyntaxException {
        log.debug("REST request to save AsistenciaHorasExtras : {}", asistenciaHorasExtras);
        if (asistenciaHorasExtras.getId() != null) {
            throw new BadRequestAlertException("A new asistenciaHorasExtras cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AsistenciaHorasExtras result = asistenciaHorasExtrasRepository.save(asistenciaHorasExtras);
        return ResponseEntity.created(new URI("/api/asistencia-horas-extras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asistencia-horas-extras} : Updates an existing asistenciaHorasExtras.
     *
     * @param asistenciaHorasExtras the asistenciaHorasExtras to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asistenciaHorasExtras,
     * or with status {@code 400 (Bad Request)} if the asistenciaHorasExtras is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asistenciaHorasExtras couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asistencia-horas-extras")
    public ResponseEntity<AsistenciaHorasExtras> updateAsistenciaHorasExtras(@RequestBody AsistenciaHorasExtras asistenciaHorasExtras) throws URISyntaxException {
        log.debug("REST request to update AsistenciaHorasExtras : {}", asistenciaHorasExtras);
        if (asistenciaHorasExtras.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AsistenciaHorasExtras result = asistenciaHorasExtrasRepository.save(asistenciaHorasExtras);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asistenciaHorasExtras.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /asistencia-horas-extras} : get all the asistenciaHorasExtras.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asistenciaHorasExtras in body.
     */
    @GetMapping("/asistencia-horas-extras")
    public ResponseEntity<List<AsistenciaHorasExtras>> getAllAsistenciaHorasExtras(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("asignacionhorasextras-is-null".equals(filter)) {
            log.debug("REST request to get all AsistenciaHorasExtrass where asignacionHorasExtras is null");
            return new ResponseEntity<>(StreamSupport
                .stream(asistenciaHorasExtrasRepository.findAll().spliterator(), false)
                .filter(asistenciaHorasExtras -> asistenciaHorasExtras.getAsignacionHorasExtras() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of AsistenciaHorasExtras");
        Page<AsistenciaHorasExtras> page = asistenciaHorasExtrasRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /asistencia-horas-extras/:id} : get the "id" asistenciaHorasExtras.
     *
     * @param id the id of the asistenciaHorasExtras to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asistenciaHorasExtras, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asistencia-horas-extras/{id}")
    public ResponseEntity<AsistenciaHorasExtras> getAsistenciaHorasExtras(@PathVariable Long id) {
        log.debug("REST request to get AsistenciaHorasExtras : {}", id);
        Optional<AsistenciaHorasExtras> asistenciaHorasExtras = asistenciaHorasExtrasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(asistenciaHorasExtras);
    }

    /**
     * {@code DELETE  /asistencia-horas-extras/:id} : delete the "id" asistenciaHorasExtras.
     *
     * @param id the id of the asistenciaHorasExtras to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asistencia-horas-extras/{id}")
    public ResponseEntity<Void> deleteAsistenciaHorasExtras(@PathVariable Long id) {
        log.debug("REST request to delete AsistenciaHorasExtras : {}", id);
        asistenciaHorasExtrasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

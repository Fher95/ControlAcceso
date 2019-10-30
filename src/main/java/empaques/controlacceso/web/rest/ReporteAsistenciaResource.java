package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.ReporteAsistencia;
import empaques.controlacceso.repository.ReporteAsistenciaRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.ReporteAsistencia}.
 */
@RestController
@RequestMapping("/api")
public class ReporteAsistenciaResource {

    private final Logger log = LoggerFactory.getLogger(ReporteAsistenciaResource.class);

    private static final String ENTITY_NAME = "reporteAsistencia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReporteAsistenciaRepository reporteAsistenciaRepository;

    public ReporteAsistenciaResource(ReporteAsistenciaRepository reporteAsistenciaRepository) {
        this.reporteAsistenciaRepository = reporteAsistenciaRepository;
    }

    /**
     * {@code POST  /reporte-asistencias} : Create a new reporteAsistencia.
     *
     * @param reporteAsistencia the reporteAsistencia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reporteAsistencia, or with status {@code 400 (Bad Request)} if the reporteAsistencia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reporte-asistencias")
    public ResponseEntity<ReporteAsistencia> createReporteAsistencia(@RequestBody ReporteAsistencia reporteAsistencia) throws URISyntaxException {
        log.debug("REST request to save ReporteAsistencia : {}", reporteAsistencia);
        if (reporteAsistencia.getId() != null) {
            throw new BadRequestAlertException("A new reporteAsistencia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReporteAsistencia result = reporteAsistenciaRepository.save(reporteAsistencia);
        return ResponseEntity.created(new URI("/api/reporte-asistencias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reporte-asistencias} : Updates an existing reporteAsistencia.
     *
     * @param reporteAsistencia the reporteAsistencia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reporteAsistencia,
     * or with status {@code 400 (Bad Request)} if the reporteAsistencia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reporteAsistencia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reporte-asistencias")
    public ResponseEntity<ReporteAsistencia> updateReporteAsistencia(@RequestBody ReporteAsistencia reporteAsistencia) throws URISyntaxException {
        log.debug("REST request to update ReporteAsistencia : {}", reporteAsistencia);
        if (reporteAsistencia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReporteAsistencia result = reporteAsistenciaRepository.save(reporteAsistencia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reporteAsistencia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reporte-asistencias} : get all the reporteAsistencias.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reporteAsistencias in body.
     */
    @GetMapping("/reporte-asistencias")
    public ResponseEntity<List<ReporteAsistencia>> getAllReporteAsistencias(Pageable pageable) {
        log.debug("REST request to get a page of ReporteAsistencias");
        Page<ReporteAsistencia> page = reporteAsistenciaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /reporte-asistencias/:id} : get the "id" reporteAsistencia.
     *
     * @param id the id of the reporteAsistencia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reporteAsistencia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reporte-asistencias/{id}")
    public ResponseEntity<ReporteAsistencia> getReporteAsistencia(@PathVariable Long id) {
        log.debug("REST request to get ReporteAsistencia : {}", id);
        Optional<ReporteAsistencia> reporteAsistencia = reporteAsistenciaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reporteAsistencia);
    }

    /**
     * {@code DELETE  /reporte-asistencias/:id} : delete the "id" reporteAsistencia.
     *
     * @param id the id of the reporteAsistencia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reporte-asistencias/{id}")
    public ResponseEntity<Void> deleteReporteAsistencia(@PathVariable Long id) {
        log.debug("REST request to delete ReporteAsistencia : {}", id);
        reporteAsistenciaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.ReporteAsistenciaHorasExtras;
import empaques.controlacceso.repository.ReporteAsistenciaHorasExtrasRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.ReporteAsistenciaHorasExtras}.
 */
@RestController
@RequestMapping("/api")
public class ReporteAsistenciaHorasExtrasResource {

    private final Logger log = LoggerFactory.getLogger(ReporteAsistenciaHorasExtrasResource.class);

    private static final String ENTITY_NAME = "reporteAsistenciaHorasExtras";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReporteAsistenciaHorasExtrasRepository reporteAsistenciaHorasExtrasRepository;

    public ReporteAsistenciaHorasExtrasResource(ReporteAsistenciaHorasExtrasRepository reporteAsistenciaHorasExtrasRepository) {
        this.reporteAsistenciaHorasExtrasRepository = reporteAsistenciaHorasExtrasRepository;
    }

    /**
     * {@code POST  /reporte-asistencia-horas-extras} : Create a new reporteAsistenciaHorasExtras.
     *
     * @param reporteAsistenciaHorasExtras the reporteAsistenciaHorasExtras to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reporteAsistenciaHorasExtras, or with status {@code 400 (Bad Request)} if the reporteAsistenciaHorasExtras has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reporte-asistencia-horas-extras")
    public ResponseEntity<ReporteAsistenciaHorasExtras> createReporteAsistenciaHorasExtras(@RequestBody ReporteAsistenciaHorasExtras reporteAsistenciaHorasExtras) throws URISyntaxException {
        log.debug("REST request to save ReporteAsistenciaHorasExtras : {}", reporteAsistenciaHorasExtras);
        if (reporteAsistenciaHorasExtras.getId() != null) {
            throw new BadRequestAlertException("A new reporteAsistenciaHorasExtras cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReporteAsistenciaHorasExtras result = reporteAsistenciaHorasExtrasRepository.save(reporteAsistenciaHorasExtras);
        return ResponseEntity.created(new URI("/api/reporte-asistencia-horas-extras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reporte-asistencia-horas-extras} : Updates an existing reporteAsistenciaHorasExtras.
     *
     * @param reporteAsistenciaHorasExtras the reporteAsistenciaHorasExtras to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reporteAsistenciaHorasExtras,
     * or with status {@code 400 (Bad Request)} if the reporteAsistenciaHorasExtras is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reporteAsistenciaHorasExtras couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reporte-asistencia-horas-extras")
    public ResponseEntity<ReporteAsistenciaHorasExtras> updateReporteAsistenciaHorasExtras(@RequestBody ReporteAsistenciaHorasExtras reporteAsistenciaHorasExtras) throws URISyntaxException {
        log.debug("REST request to update ReporteAsistenciaHorasExtras : {}", reporteAsistenciaHorasExtras);
        if (reporteAsistenciaHorasExtras.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReporteAsistenciaHorasExtras result = reporteAsistenciaHorasExtrasRepository.save(reporteAsistenciaHorasExtras);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reporteAsistenciaHorasExtras.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reporte-asistencia-horas-extras} : get all the reporteAsistenciaHorasExtras.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reporteAsistenciaHorasExtras in body.
     */
    @GetMapping("/reporte-asistencia-horas-extras")
    public List<ReporteAsistenciaHorasExtras> getAllReporteAsistenciaHorasExtras() {
        log.debug("REST request to get all ReporteAsistenciaHorasExtras");
        return reporteAsistenciaHorasExtrasRepository.findAll();
    }

    /**
     * {@code GET  /reporte-asistencia-horas-extras/:id} : get the "id" reporteAsistenciaHorasExtras.
     *
     * @param id the id of the reporteAsistenciaHorasExtras to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reporteAsistenciaHorasExtras, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reporte-asistencia-horas-extras/{id}")
    public ResponseEntity<ReporteAsistenciaHorasExtras> getReporteAsistenciaHorasExtras(@PathVariable Long id) {
        log.debug("REST request to get ReporteAsistenciaHorasExtras : {}", id);
        Optional<ReporteAsistenciaHorasExtras> reporteAsistenciaHorasExtras = reporteAsistenciaHorasExtrasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reporteAsistenciaHorasExtras);
    }

    /**
     * {@code DELETE  /reporte-asistencia-horas-extras/:id} : delete the "id" reporteAsistenciaHorasExtras.
     *
     * @param id the id of the reporteAsistenciaHorasExtras to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reporte-asistencia-horas-extras/{id}")
    public ResponseEntity<Void> deleteReporteAsistenciaHorasExtras(@PathVariable Long id) {
        log.debug("REST request to delete ReporteAsistenciaHorasExtras : {}", id);
        reporteAsistenciaHorasExtrasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

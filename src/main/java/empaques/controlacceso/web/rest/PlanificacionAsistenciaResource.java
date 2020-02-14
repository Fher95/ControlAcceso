package empaques.controlacceso.web.rest;

import empaques.controlacceso.config.DateTimeFormatConfiguration;
import empaques.controlacceso.domain.AsignacionTurno;
import empaques.controlacceso.domain.PlanificacionAsistencia;
import empaques.controlacceso.repository.AsignacionTurnoRepository;
import empaques.controlacceso.repository.PlanificacionAsistenciaRepository;
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
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing
 * {@link empaques.controlacceso.domain.PlanificacionAsistencia}.
 */
@RestController
@RequestMapping("/api")
public class PlanificacionAsistenciaResource {

    private final Logger log = LoggerFactory.getLogger(PlanificacionAsistenciaResource.class);

    private static final String ENTITY_NAME = "planificacionAsistencia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanificacionAsistenciaRepository planificacionAsistenciaRepository;
    private final AsignacionTurnoRepository asignacionTurnoReposity;

    public PlanificacionAsistenciaResource(PlanificacionAsistenciaRepository planificacionAsistenciaRepository,
            AsignacionTurnoRepository asignacionTurnoRepository) {
        this.planificacionAsistenciaRepository = planificacionAsistenciaRepository;
        this.asignacionTurnoReposity = asignacionTurnoRepository;
    }

    /**
     * {@code POST  /planificacion-asistencias} : Create a new
     * planificacionAsistencia.
     *
     * @param planificacionAsistencia the planificacionAsistencia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new planificacionAsistencia, or with status
     *         {@code 400 (Bad Request)} if the planificacionAsistencia has already
     *         an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planificacion-asistencias")
    public ResponseEntity<PlanificacionAsistencia> createPlanificacionAsistencia(
            @RequestBody PlanificacionAsistencia planificacionAsistencia) throws URISyntaxException {
        log.debug("REST request to save PlanificacionAsistencia : {}", planificacionAsistencia);
        if (planificacionAsistencia.getId() != null) {
            throw new BadRequestAlertException("A new planificacionAsistencia cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        PlanificacionAsistencia result = planificacionAsistenciaRepository.save(planificacionAsistencia);
        return ResponseEntity
                .created(new URI("/api/planificacion-asistencias/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /planificacion-asistencias} : Updates an existing
     * planificacionAsistencia.
     *
     * @param planificacionAsistencia the planificacionAsistencia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated planificacionAsistencia, or with status
     *         {@code 400 (Bad Request)} if the planificacionAsistencia is not
     *         valid, or with status {@code 500 (Internal Server Error)} if the
     *         planificacionAsistencia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planificacion-asistencias")
    public ResponseEntity<PlanificacionAsistencia> updatePlanificacionAsistencia(
            @RequestBody PlanificacionAsistencia planificacionAsistencia) throws URISyntaxException {
        log.debug("REST request to update PlanificacionAsistencia : {}", planificacionAsistencia);
        if (planificacionAsistencia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlanificacionAsistencia result = planificacionAsistenciaRepository.save(planificacionAsistencia);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
                planificacionAsistencia.getId().toString())).body(result);
    }

    /**
     * {@code GET  /planificacion-asistencias} : get all the
     * planificacionAsistencias.
     *
     * 
     * @param pageable the pagination information.
     * 
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of planificacionAsistencias in body.
     */
    @GetMapping("/planificacion-asistencias")
    public ResponseEntity<List<PlanificacionAsistencia>> getAllPlanificacionAsistencias(Pageable pageable) {
        log.debug("REST request to get a page of PlanificacionAsistencias");
        Page<PlanificacionAsistencia> page = planificacionAsistenciaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /planificacion-asistencias/:id} : get the "id"
     * planificacionAsistencia.
     *
     * @param id the id of the planificacionAsistencia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the planificacionAsistencia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planificacion-asistencias/{id}")
    public ResponseEntity<PlanificacionAsistencia> getPlanificacionAsistencia(@PathVariable Long id) {
        log.debug("REST request to get PlanificacionAsistencia : {}", id);
        Optional<PlanificacionAsistencia> planificacionAsistencia = planificacionAsistenciaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(planificacionAsistencia);
    }

    /**
     * {@code DELETE  /planificacion-asistencias/:id} : delete the "id"
     * planificacionAsistencia.
     *
     * @param id the id of the planificacionAsistencia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planificacion-asistencias/{id}")
    public ResponseEntity<Void> deletePlanificacionAsistencia(@PathVariable Long id) {
        log.debug("REST request to delete PlanificacionAsistencia : {}", id);
        planificacionAsistenciaRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    /**
     * -------------------------------Nuevas
     * Funciones-------------------------------
     */

    @PutMapping("/planificacion-asistencias/generar-planificacion")
    public ResponseEntity<String> generarPlanificacion(@RequestBody Instant fechaInicio,
            @RequestBody Instant fechaFin) {
        String respuesta = "";
        if (fechaInicio.isBefore(fechaFin)) {
            // Se obtiene la lista de asignaciones actuales
            List<AsignacionTurno> asignacionesActuales = this.asignacionTurnoReposity.findAllAsignacionesActuales();
            // Se empieza a recorrer cada asignacion para sacar sus datos
            for (int i = 0; i < asignacionesActuales.size(); i++) {
                AsignacionTurno asignacion = asignacionesActuales.get(i);
                // Se crea el nuevo registro que será creado en bd
                PlanificacionAsistencia nuevoRegistroAsistencia = new PlanificacionAsistencia();
                // Se extrae el primer y unico colaborador de la lista de cols (en teoría solo debería haber uno)
                if (asignacion.getColaboradors().iterator().hasNext()) {
                    // Se obtienen los días comprendidos entre las dos fechas dadas.
                    Date dateInicio = new Date(fechaInicio.toString());                    
                    Date dateFin = new Date(fechaFin.toString());
                    // Obtengo el numero de días entre las dos fechas
                    int dias=(int) ((dateFin.getTime()-dateInicio.getTime())/86400000);                    
                    for (int i2 = 0; i2 < dias ; i2 ++) {  

                        Date fechaAsistencia = dateInicio;
                        fechaAsistencia.setDate(dateInicio.getDate() + i2);
                        nuevoRegistroAsistencia.setColaborador(asignacion.getColaboradors().iterator().next());
                        nuevoRegistroAsistencia.setFechaInicioPlanificacion(fechaInicio);
                        nuevoRegistroAsistencia.setFechaFinPlanificacion(fechaFin);
                        nuevoRegistroAsistencia.setNombreTurno(asignacion.getTurno().getNombre());
                        nuevoRegistroAsistencia.setNombreCargo(asignacion.getCargo().getNombre());
                        nuevoRegistroAsistencia.setFechaAsistenciaTurno(fechaAsistencia.toInstant());                        
                        this.planificacionAsistenciaRepository.save(nuevoRegistroAsistencia);

                }

                }
            }
            respuesta = "Planeacion generada";
            return ResponseEntity.ok(respuesta);
        } else {
            respuesta = "La fecha de inicio es superior a la fecha fin.";
            return ResponseEntity.badRequest().body(respuesta);
        }
    }
}

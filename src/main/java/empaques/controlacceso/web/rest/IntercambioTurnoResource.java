package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.Colaborador;
import empaques.controlacceso.domain.IntercambioTurno;
import empaques.controlacceso.domain.PlanificacionAsistencia;
import empaques.controlacceso.domain.Turno;
import empaques.controlacceso.repository.IntercambioTurnoRepository;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Example;

/**
 * REST controller for managing
 * {@link empaques.controlacceso.domain.IntercambioTurno}.
 */
@RestController
@RequestMapping("/api")
public class IntercambioTurnoResource {

    private final Logger log = LoggerFactory.getLogger(IntercambioTurnoResource.class);

    private static final String ENTITY_NAME = "intercambioTurno";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IntercambioTurnoRepository intercambioTurnoRepository;

    private final PlanificacionAsistenciaRepository planificacionAsistenciaRepository;

    public IntercambioTurnoResource(IntercambioTurnoRepository intercambioTurnoRepository,
            PlanificacionAsistenciaRepository planificacionAsistenciaRepository) {
        this.intercambioTurnoRepository = intercambioTurnoRepository;
        this.planificacionAsistenciaRepository = planificacionAsistenciaRepository;
    }

    /**
     * {@code POST  /intercambio-turnos} : Create a new intercambioTurno.
     *
     * @param intercambioTurno the intercambioTurno to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and
     * with body the new intercambioTurno, or with status
     * {@code 400 (Bad Request)} if the intercambioTurno has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/intercambio-turnos")
    public ResponseEntity<IntercambioTurno> createIntercambioTurno(@RequestBody IntercambioTurno intercambioTurno) throws URISyntaxException {
        log.debug("REST request to save IntercambioTurno : {}", intercambioTurno);
        if (intercambioTurno.getId() != null) {
            throw new BadRequestAlertException("A new intercambioTurno cannot already have an ID", ENTITY_NAME, "idexists");
        }
        // Se modifican los registros de planificacion para las fechas en que se programó el intercambio
        this.procesarPlanificacion(intercambioTurno);
        IntercambioTurno result = intercambioTurnoRepository.save(intercambioTurno);
        
        return ResponseEntity.created(new URI("/api/intercambio-turnos/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /intercambio-turnos} : Updates an existing intercambioTurno.
     *
     * @param intercambioTurno the intercambioTurno to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
     * body the updated intercambioTurno, or with status
     * {@code 400 (Bad Request)} if the intercambioTurno is not valid, or with
     * status {@code 500 (Internal Server Error)} if the intercambioTurno
     * couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/intercambio-turnos")
    public ResponseEntity<IntercambioTurno> updateIntercambioTurno(@RequestBody IntercambioTurno intercambioTurno) throws URISyntaxException {
        log.debug("REST request to update IntercambioTurno : {}", intercambioTurno);
        if (intercambioTurno.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IntercambioTurno result = intercambioTurnoRepository.save(intercambioTurno);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, intercambioTurno.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /intercambio-turnos} : get all the intercambioTurnos.
     *
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the
     * list of intercambioTurnos in body.
     */
    @GetMapping("/intercambio-turnos")
    public ResponseEntity<List<IntercambioTurno>> getAllIntercambioTurnos(Pageable pageable) {
        log.debug("REST request to get all IntercambioTurnos");
        Page<IntercambioTurno> page;
        page = intercambioTurnoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /intercambio-turnos/:id} : get the "id" intercambioTurno.
     *
     * @param id the id of the intercambioTurno to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
     * body the intercambioTurno, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/intercambio-turnos/{id}")
    public ResponseEntity<IntercambioTurno> getIntercambioTurno(@PathVariable Long id) {
        log.debug("REST request to get IntercambioTurno : {}", id);
        Optional<IntercambioTurno> intercambioTurno = intercambioTurnoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(intercambioTurno);
    }

    /**
     * {@code DELETE  /intercambio-turnos/:id} : delete the "id"
     * intercambioTurno.
     *
     * @param id the id of the intercambioTurno to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/intercambio-turnos/{id}")
    public ResponseEntity<Void> deleteIntercambioTurno(@PathVariable Long id) {
        log.debug("REST request to delete IntercambioTurno : {}", id);
        intercambioTurnoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    public IntercambioTurno getIntercambioTurno(String parNumDoc, Date parFecha) {
        IntercambioTurno objResultado;
        Optional<IntercambioTurno> result = this.intercambioTurnoRepository.findIntercambioConFecha(parNumDoc, parFecha.toInstant());
        // Primero pregunta si hay un intermcabio para la fecha acordada con el colaborador 1
        if (result.isPresent()) {
            objResultado = result.get();
        } else {
            // Sino existe un registro solo con fecha, se busca uno que comprenda la fecha entre fecha y fechaFin
            result = this.intercambioTurnoRepository.findIntercambioEntreFechas(parNumDoc, parFecha.toInstant());
            if (result.isPresent()) {
                return result.get();
            }
        }
        return null;
    }

    private void procesarPlanificacion(IntercambioTurno intercambioTurno) {
        // En caso de que el intercambio sea solo por un día
        if (intercambioTurno.getFechaFin() == null) {
            // Se crea un objeto de ejemplo para realizar la búsqueda del colaborador 1.
            PlanificacionAsistencia objPlanificacionEncontrada = this.buscarPlanificacion(intercambioTurno, 1);
            // Si se encuentra, se cambian los registros de la planificacion encontrada para el colaborador 1.
            if (objPlanificacionEncontrada != null) {
                this.actualizarRegistroPlanificacion(intercambioTurno, objPlanificacionEncontrada, 1);
            }
            // Se crea un objeto de ejemplo para realizar la búsqueda del colaborador 2.
            objPlanificacionEncontrada = this.buscarPlanificacion(intercambioTurno, 2);
            // Si se encuentra, se cambian los registros de la planificacion encontrada para el colaborador 2.
            if (objPlanificacionEncontrada != null) {
                this.actualizarRegistroPlanificacion(intercambioTurno, objPlanificacionEncontrada, 2);
            }
        } else {
            Date fechaInicio = Date.from(intercambioTurno.getFecha());
            Date fechaFin = Date.from(intercambioTurno.getFechaFin());
            int dias = this.getDiasEntreFechas(fechaInicio, fechaFin);
            for (int i = 0; i < dias; i++) {                
                IntercambioTurno intercambioBusqueda = this.getCopiaIntercambio(intercambioTurno);                                
                Date fechaBusqueda = new Date(fechaInicio.getYear(), fechaInicio.getMonth(), fechaInicio.getDate() + i);
                intercambioBusqueda.setFecha(fechaBusqueda.toInstant());
                PlanificacionAsistencia objPlanificacionEncontrada = this.buscarPlanificacion(intercambioBusqueda, 1);
                // Si se encuentra, se cambian los registros de la planificacion encontrada para el colaborador 1.
                if (objPlanificacionEncontrada != null) {
                    this.actualizarRegistroPlanificacion(intercambioBusqueda, objPlanificacionEncontrada, 1);
                }
                // Se crea un objeto de ejemplo para realizar la búsqueda del colaborador 2.
                objPlanificacionEncontrada = this.buscarPlanificacion(intercambioBusqueda, 2);
                // Si se encuentra, se cambian los registros de la planificacion encontrada para el colaborador 2.
                if (objPlanificacionEncontrada != null) {
                    this.actualizarRegistroPlanificacion(intercambioBusqueda, objPlanificacionEncontrada, 2);
                }
            }
        }
    }

    private boolean actualizarRegistroPlanificacion(IntercambioTurno intercambioTurno, PlanificacionAsistencia objPlanificacionEncontrada,
            int numColaborador) {
        switch (numColaborador) {
            case 1: {
                objPlanificacionEncontrada.setNombreTurno(intercambioTurno.getAsignacionTurno2().getTurno().getNombre());
                objPlanificacionEncontrada.setNombreCargo(intercambioTurno.getAsignacionTurno2().getCargo().getNombre());
                // Modificar horas
                Date dateTurnoReprogramado = Date.from(intercambioTurno.getAsignacionTurno2().getTurno().getHoraInicio());
                Date fechaHoraEntrada = Date.from(objPlanificacionEncontrada.getHoraInicioTurno());
                fechaHoraEntrada.setHours(dateTurnoReprogramado.getHours()); fechaHoraEntrada.setMinutes(dateTurnoReprogramado.getMinutes());
                int duracion = intercambioTurno.getAsignacionTurno2().getTurno().getDuracion();
                Date fechaHoraSalida = new Date(fechaHoraEntrada.getYear(), fechaHoraEntrada.getMonth(), fechaHoraEntrada.getDate(),
                        dateTurnoReprogramado.getHours() + duracion, dateTurnoReprogramado.getMinutes());

                objPlanificacionEncontrada.setHoraInicioTurno(fechaHoraEntrada.toInstant());
                objPlanificacionEncontrada.setHoraFinTurno(fechaHoraSalida.toInstant());

                this.planificacionAsistenciaRepository.save(objPlanificacionEncontrada);
                return true;
            }
            case 2: {
                objPlanificacionEncontrada.setNombreTurno(intercambioTurno.getAsignacionTurno1().getTurno().getNombre());
                objPlanificacionEncontrada.setNombreCargo(intercambioTurno.getAsignacionTurno1().getCargo().getNombre());
                // Modificar horas
                Date dateTurnoReprogramado = Date.from(intercambioTurno.getAsignacionTurno1().getTurno().getHoraInicio());
                Date fechaHoraEntrada = Date.from(objPlanificacionEncontrada.getHoraInicioTurno());
                fechaHoraEntrada.setHours(dateTurnoReprogramado.getHours()); fechaHoraEntrada.setMinutes(dateTurnoReprogramado.getMinutes());
                int duracion = intercambioTurno.getAsignacionTurno1().getTurno().getDuracion();
                Date fechaHoraSalida = new Date(fechaHoraEntrada.getYear(), fechaHoraEntrada.getMonth(), fechaHoraEntrada.getDate(),
                        dateTurnoReprogramado.getHours() + duracion, dateTurnoReprogramado.getMinutes());

                objPlanificacionEncontrada.setHoraInicioTurno(fechaHoraEntrada.toInstant());
                objPlanificacionEncontrada.setHoraFinTurno(fechaHoraSalida.toInstant());

                this.planificacionAsistenciaRepository.save(objPlanificacionEncontrada);
                return true;
            }
            default:
                return false;
        }
    }

    private int getDiasEntreFechas(Date fecha1, Date fecha2) {
        int contador = 0;
        Date fechaAux1 = new Date(fecha1.getYear(), fecha1.getMonth(),fecha1.getDate(),0,0);
        Date fechaAux2 = new Date(fecha2.getYear(), fecha2.getMonth(),fecha2.getDate(),0,0);        
        while (fechaAux1.compareTo(fechaAux2) <= 0) {
            fechaAux1.setDate(fechaAux1.getDate() + 1);
            contador++;
        }
        return contador;
    }

    private PlanificacionAsistencia buscarPlanificacion(IntercambioTurno intercambioTurno, int numColaborador) {        
        String docCol, nombreTurno;        
        switch (numColaborador) {
            case 1:
                docCol = intercambioTurno.getColaborador1().getNumeroDocumento();
                nombreTurno = intercambioTurno.getAsignacionTurno1().getTurno().getNombre();                
                break;
            case 2:
                docCol = intercambioTurno.getColaborador2().getNumeroDocumento();
                nombreTurno = intercambioTurno.getAsignacionTurno2().getTurno().getNombre();                
                break;
            default:
                return null;
        }
        
        
        Optional<PlanificacionAsistencia> objResult 
                = this.planificacionAsistenciaRepository.encontrarPlanActualColFecha(docCol, nombreTurno, intercambioTurno.getFecha());
        if (objResult.isPresent()) {
            return objResult.get();
        } else {
            return null;
        }
    }
    
    private IntercambioTurno getCopiaIntercambio(IntercambioTurno objIntercambio) {        
        IntercambioTurno objRes = new IntercambioTurno();        
        objRes.setColaborador1(objIntercambio.getColaborador1());
        objRes.setColaborador2(objIntercambio.getColaborador2());
        objRes.setAsignacionTurno1(objIntercambio.getAsignacionTurno1());
        objRes.setAsignacionTurno2(objIntercambio.getAsignacionTurno2());
        objRes.setFecha(objIntercambio.getFecha());
        objRes.setFechaFin(objIntercambio.getFechaFin());
        objRes.setAutorizadoPor(objIntercambio.getAutorizadoPor());
        objRes.setObservaciones(objIntercambio.getObservaciones());
        objRes.setId(objIntercambio.getId());
        return objRes;    
    }

}

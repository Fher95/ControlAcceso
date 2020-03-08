package empaques.controlacceso.web.rest;

import empaques.controlacceso.config.DateTimeFormatConfiguration;
import empaques.controlacceso.domain.AsignacionTurno;
import empaques.controlacceso.domain.Asistencia;
import empaques.controlacceso.domain.Colaborador;
import empaques.controlacceso.domain.IntercambioTurno;
import empaques.controlacceso.domain.PlanificacionAsistencia;
import empaques.controlacceso.domain.Respuesta;
import empaques.controlacceso.domain.Turno;
import empaques.controlacceso.repository.AsignacionTurnoRepository;
import empaques.controlacceso.repository.AsistenciaRepository;
import empaques.controlacceso.repository.IntercambioTurnoRepository;
import empaques.controlacceso.repository.PeticionRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import empaques.controlacceso.service.util.GestionArchivos;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;

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
    private final AsistenciaRepository asistenciaReposity;
    private final PeticionRepository peticionRepository;
    private final IntercambioTurnoRepository intercambioTurnoRepository;
    PeticionResource objPeticionResource;

    public PlanificacionAsistenciaResource(PlanificacionAsistenciaRepository planificacionAsistenciaRepository,
            AsignacionTurnoRepository asignacionTurnoRepository, AsistenciaRepository asistenciaRep,
            PeticionRepository peticionRepository, IntercambioTurnoRepository intercambioTurnoRepository) {
        this.planificacionAsistenciaRepository = planificacionAsistenciaRepository;
        this.asignacionTurnoReposity = asignacionTurnoRepository;
        this.asistenciaReposity = asistenciaRep;
        this.peticionRepository = peticionRepository;
        this.intercambioTurnoRepository = intercambioTurnoRepository;
    }

    /**
     * {@code POST  /planificacion-asistencias} : Create a new
     * planificacionAsistencia.
     *
     * @param planificacionAsistencia the planificacionAsistencia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and
     * with body the new planificacionAsistencia, or with status
     * {@code 400 (Bad Request)} if the planificacionAsistencia has already an
     * ID.
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
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
     * body the updated planificacionAsistencia, or with status
     * {@code 400 (Bad Request)} if the planificacionAsistencia is not valid, or
     * with status {@code 500 (Internal Server Error)} if the
     * planificacionAsistencia couldn't be updated.
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
     * @param toDate
     * @param fromDate
     * @param nombreCol
     * @param pageable the pagination information.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the
     * list of planificacionAsistencias in body.
     */
    @GetMapping(path = "/planificacion-asistencias", params = {"fromDate", "toDate", "nombreCol"})
    public ResponseEntity<List<PlanificacionAsistencia>> getAllPlanificacionAsistencias(
            @RequestParam(value = "fromDate") LocalDate fromDate, @RequestParam(value = "toDate") LocalDate toDate,
            @RequestParam(value = "nombreCol") String nombreCol,
            Pageable pageable) {
        Instant from = fromDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
        // Instant to =
        // toDate.atStartOfDay(ZoneId.systemDefault()).plusDays(1).toInstant();
        Instant to = toDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
        log.debug("REST request to get a page of PlanificacionAsistencias");
        // Page<PlanificacionAsistencia> page =
        // planificacionAsistenciaRepository.findAll(pageable);        
        //Page<PlanificacionAsistencia> page = planificacionAsistenciaRepository.findAllByDates(from, to, pageable);
        Page<PlanificacionAsistencia> page;
        if (this.esNumero(nombreCol)) {
            page = planificacionAsistenciaRepository.findAllPorFehchasYNumCol(pageable, from, to, nombreCol);
        } else {
            page = planificacionAsistenciaRepository.findAllPorFehchasYNombresCol(pageable, from, to, nombreCol);
        }

        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    private boolean esNumero(String cadena) {
        try {
            Integer.parseInt(cadena);
            return true;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }

    @GetMapping(path = "/planificacion-asistencias/tipoAsistencia", params = {"fromDate", "toDate", "orden"})
    public ResponseEntity<List<PlanificacionAsistencia>> getAsistenciasTipo(
            @RequestParam(required = false) String filter, @RequestParam(value = "fromDate") LocalDate fromDate,
            @RequestParam(value = "toDate") LocalDate toDate, @RequestParam(value = "orden") String orden) {
        String tipoAsistencia = "EntradaTarde";
        String[] vecOrden = orden.split(" ");
        Sort objSort;
        if (vecOrden[1].equals("desc")) {
            objSort = Sort.by(Sort.Direction.DESC, vecOrden[0]);
        } else {
            objSort = Sort.by(Sort.Direction.ASC, vecOrden[0]);
        }
        Instant from = fromDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant to = toDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
        if ("entradas-temprano".equals(filter)) {
            tipoAsistencia = "EntradaTemprano";
        }
        if ("entradas-tarde".equals(filter)) {
            tipoAsistencia = "EntradaTarde";
        }
        if ("salidas-temprano".equals(filter)) {
            tipoAsistencia = "SalidaTemprano";
        }
        if ("salidas-tarde".equals(filter)) {
            tipoAsistencia = "SalidaTarde";
        }
        if ("sin-registro".equals(filter)) {
            return ResponseEntity.ok().body(
                    this.planificacionAsistenciaRepository.encontrarAsistenciasSinRegistroConFechas(from, to, objSort));
        }
        return ResponseEntity.ok().body(this.planificacionAsistenciaRepository
                .encontrarAsistenciasConTipoYFechas(tipoAsistencia, from, to, objSort));
    }

    /**
     * {@code GET  /planificacion-asistencias/:id} : get the "id"
     * planificacionAsistencia.
     *
     * @param id the id of the planificacionAsistencia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
     * body the planificacionAsistencia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planificacion-asistencias/{id}")
    public ResponseEntity<PlanificacionAsistencia> getPlanificacionAsistencia(@PathVariable Long id) {
        log.debug("REST request to get PlanificacionAsistencia : {}", id);
        Optional<PlanificacionAsistencia> planificacionAsistencia = planificacionAsistenciaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(planificacionAsistencia);
    }

    /**
     * Recibe una fecha dentro de la ruta para procesarla y posteriormente
     * buscar una lista de registros con esa fecha
     *
     * @param fecha
     * @return un unico objeto de ejemplo PlanificacionAsistencia
     * (ResponseEntity)
     */
    @GetMapping("/planificacion-asistencias/comprobarFecha/{fecha}")
    public ResponseEntity<PlanificacionAsistencia> getRegistroPlanActual(@PathVariable String fecha) {
        if (fecha.equals("")) {
            return ResponseEntity.noContent().build();
        }
        String fechaCompleta = fecha + " 00:00";
        Date objFecha = this.convertirStringADate(fechaCompleta);
        log.debug("REST request to get PlanificacionAsistencia : {}", objFecha.toInstant().toString());
        List<PlanificacionAsistencia> planificacionAsistencias = planificacionAsistenciaRepository
                .listaAsistenciaPorFecha(objFecha.toInstant());
        if (planificacionAsistencias.size() > 0) {
            return ResponseEntity.ok().body(planificacionAsistencias.get(0));
        }
        return ResponseEntity.noContent().build();
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
     *
     * @param planificacionAsistencia
     * @return
     */
    @PutMapping("/planificacion-asistencias/generar-planificacion")
    public ResponseEntity<Respuesta> generarPlanificacion(
            @RequestBody PlanificacionAsistencia planificacionAsistencia) {
        this.objPeticionResource = new PeticionResource(peticionRepository, planificacionAsistenciaRepository);
        int numAsignaciones = 0, numRegistros = 0;
        Instant fechaInicio = planificacionAsistencia.getFechaInicioPlanificacion();
        Instant fechaFin = planificacionAsistencia.getFechaFinPlanificacion();
        if (fechaInicio.compareTo(fechaFin) <= 0) {
            // Se obtiene la lista de asignaciones actuales
            List<AsignacionTurno> asignacionesActuales = this.asignacionTurnoReposity.findAllAsignacionesActualesLaborales();
            numAsignaciones = asignacionesActuales.size();
            // Se empieza a recorrer cada asignacion para sacar sus datos
            for (int i = 0; i < asignacionesActuales.size(); i++) {
                AsignacionTurno asignacion = asignacionesActuales.get(i);
                // Se extrae el primer y unico colaborador de la lista de cols (en teoría solo
                // debería haber uno)
                if (asignacion.getColaboradors().iterator().hasNext()) {
                    // Se obtienen los días comprendidos entre las dos fechas dadas.
                    Date dateInicio = Date.from(fechaInicio);
                    Date dateFin = Date.from(fechaFin);
                    // Obtengo el numero de días entre las dos fechas
                    int dias = (int) ((dateFin.getTime() - dateInicio.getTime()) / 86400000);
                    for (int i2 = 0; i2 <= dias; i2++) {
                        // Se crea el nuevo registro que será creado en bd
                        PlanificacionAsistencia nuevoRegistroAsistencia = this.generarRegistro(dateInicio, dateFin,
                                asignacion, i2);
                        this.planificacionAsistenciaRepository.save(nuevoRegistroAsistencia);
                        numRegistros++;
                    }
                }
            }
            Respuesta varRespuesta = new Respuesta();
            varRespuesta.tipoMensaje = "Exito";
            varRespuesta.mensaje = "Se generó una nueva planilla de asistencia. " + "\n" + numAsignaciones
                    + " turnos asignados actualmente. \n" + numRegistros + " registros de asistencia generados";
            return ResponseEntity.ok().body(varRespuesta);
        } else {
            Respuesta varRespuesta = new Respuesta();
            varRespuesta.tipoMensaje = "Error";
            varRespuesta.mensaje = "La fecha de inicio no puede ser superior a la fecha fin.";
            return ResponseEntity.ok().body(varRespuesta);
        }
    }

    @PutMapping("/planificacion-asistencias/verificar-fechas")
    ResponseEntity<Respuesta> verificarFechasPlaneacion(@RequestBody PlanificacionAsistencia planificacionAsistencia) {
        int contadorPlanificaciones = this.planificacionAsistenciaRepository.countdAllBetweenDates(
                planificacionAsistencia.getFechaInicioPlanificacion(),
                planificacionAsistencia.getFechaFinPlanificacion());

        Respuesta nuevaRespuesta = new Respuesta();
        if (contadorPlanificaciones == 0) {
            nuevaRespuesta.tipoMensaje = "Exito";
        } else {
            nuevaRespuesta.tipoMensaje = "Error";
            nuevaRespuesta.mensaje = "Ya existen registros de planeación entre esas dos fechas.";
        }

        return ResponseEntity.ok().body(nuevaRespuesta);
    }

    public int getDiasEntreFechas(Date fecha1, Date fecha2) {
        int contador = 0;
        while (fecha1.compareTo(fecha2) <= 0) {
            fecha1.setDate(fecha1.getDate() + 1);
            contador++;
        }
        return contador;
    }

    public PlanificacionAsistencia generarRegistro(Date dateInicio, Date dateFin, AsignacionTurno asignacion,
            int numDia) {
        PlanificacionAsistencia nuevoRegistroAsistencia = new PlanificacionAsistencia();
        Colaborador objCol = asignacion.getColaboradors().iterator().next();
        Turno objTurno = asignacion.getTurno();
        Date fechaAsistencia = new Date(dateInicio.getYear(), dateInicio.getMonth(), dateInicio.getDate() + numDia);
        IntercambioTurno objIntercambio = findIntermcabioTurno(objCol, fechaAsistencia.toInstant());
        // Veirifica si hay algun intercambio turno para ese colaborador en una fecha
        // dada
        if (objIntercambio != null) {
            // Si el numero del documento es el del colaborador1, el turno a programar será
            // el del 2,
            if (objIntercambio.getColaborador1().getNumeroDocumento().equals(objCol.getNumeroDocumento())) {
                objTurno = objIntercambio.getAsignacionTurno2().getTurno();
            } // De lo contrario, si el colaborador en cuestión es el dos, el turno
            // reprogramado sera el del 1
            else {
                objTurno = objIntercambio.getAsignacionTurno1().getTurno();
            }
        }

        Date dateTurno = Date.from(objTurno.getHoraInicio());
        Date dateInicioTurnoAsis = new Date(dateInicio.getYear(), dateInicio.getMonth(), dateInicio.getDate() + numDia,
                dateTurno.getHours(), dateTurno.getMinutes());
        // dateInicioTurnoAsis.setDate(dateInicio.getDate() + numDia);

        nuevoRegistroAsistencia.setColaborador(objCol);
        nuevoRegistroAsistencia.setFechaInicioPlanificacion(dateInicio.toInstant());
        nuevoRegistroAsistencia.setFechaFinPlanificacion(dateFin.toInstant());
        nuevoRegistroAsistencia.setNombreTurno(objTurno.getNombre());
        nuevoRegistroAsistencia.setNombreCargo(asignacion.getCargo().getNombre());
        nuevoRegistroAsistencia.setFechaAsistenciaTurno(fechaAsistencia.toInstant());
        nuevoRegistroAsistencia.setHoraInicioTurno(dateInicioTurnoAsis.toInstant());
        Date dateHoraFinTurno = new Date();
        dateHoraFinTurno = dateInicioTurnoAsis;
        dateHoraFinTurno.setHours(dateInicioTurnoAsis.getHours() + objTurno.getDuracion());
        nuevoRegistroAsistencia.setHoraFinTurno(dateHoraFinTurno.toInstant());

        Date fechaPeticion = new Date(dateInicio.getYear(), dateInicio.getMonth(), dateInicio.getDate() + numDia);
        boolean tienePermiso = this.objPeticionResource.existePeticionAprobada(objCol.getNumeroDocumento(),
                fechaPeticion, "Permiso");
        boolean tieneVacaciones = this.objPeticionResource.existePeticionAprobada(objCol.getNumeroDocumento(),
                fechaPeticion, "Vacaciones");
        if (tienePermiso || tieneVacaciones) {
            nuevoRegistroAsistencia.setInasistenciaJustificada(true);
            // nuevoRegistroAsistencia.setMinDiferenciaEntrada(0);
            // nuevoRegistroAsistencia.setMinDiferenciaSalida(0);
            nuevoRegistroAsistencia.setTiposAsistencia("NoAplica");
        } else {
            nuevoRegistroAsistencia.setInasistenciaJustificada(false);
        }
        return nuevoRegistroAsistencia;
    }

    private IntercambioTurno findIntermcabioTurno(Colaborador parCol, Instant parFecha) {
        Optional<IntercambioTurno> opIntercambio = this.intercambioTurnoRepository
                .findIntercambioConFecha(parCol.getNumeroDocumento(), parFecha);
        if (!opIntercambio.isPresent()) {
            opIntercambio = this.intercambioTurnoRepository.findIntercambioEntreFechas(parCol.getNumeroDocumento(),
                    parFecha);
            if (opIntercambio.isPresent()) {
                return opIntercambio.get();
            } else {
                return null;
            }
        } else {
            return opIntercambio.get();
        }
    }

    /* Metodos para la carga de la asistencia */
    @GetMapping("/planificacion-asistencias/cargar-asistencias")
    public ResponseEntity<Respuesta> cargarAsistencias() {
        GestionArchivos gestorArchivos = new GestionArchivos();
        // Primero compruba la existencia del archivo
        if (!gestorArchivos.existeArchivo()) {
            Respuesta varRes = new Respuesta();
            varRes.tipoMensaje = "Error";
            varRes.mensaje = "No se encontró el archivo de asistencias";
            return ResponseEntity.ok().body(varRes);
        }

        // Creación del arreglo de lectura del archivo
        ArrayList<String> lineasArchivo = gestorArchivos.leerLineasArchivo();
        // Se crea una matriz de datos para facilitar la manipulación de los datos de
        // cada linea del archivo
        ArrayList<String[]> matrizDatos = this.generarMatrizDeDatos(lineasArchivo);
        int contRegistroActualizados = 0;
        int fechasIncongruentes = 0;
        int registrosRepetidosEnBD = 0;
        // Se obtiene la lista planificaciones (planilla de asistencia) para empezar a
        // comparar los registros de asistencia
        List<PlanificacionAsistencia> planificacionesActuales = this.planificacionAsistenciaRepository
                .findPlanificacionesActuales();
        // Se recorre la matriz
        for (int iterador2 = 0; iterador2 < matrizDatos.size(); iterador2++) {
            // Se obtienen los datos a buscar de cada linea
            String varNumDocumento = matrizDatos.get(iterador2)[0];
            Date varFechaHoraEntrada = this.convertirStringADate(matrizDatos.get(iterador2)[1]);
            Date varFechaHoraSalida = this.convertirStringADate(matrizDatos.get(iterador2)[2]);
            if (varFechaHoraEntrada.before(varFechaHoraSalida)) {
                if (!this.existeRegistroAsistencia(varNumDocumento, varFechaHoraEntrada.toInstant(),
                        varFechaHoraSalida.toInstant())) {
                    if (this.procesarAsistencia(planificacionesActuales, varNumDocumento, varFechaHoraEntrada,
                            varFechaHoraSalida)) {
                        contRegistroActualizados++;
                        Asistencia nuevoRegAsis = new Asistencia();
                        nuevoRegAsis.setDocumentoColaborador(varNumDocumento);
                        nuevoRegAsis.setEntrada(varFechaHoraEntrada.toInstant());
                        nuevoRegAsis.setSalida(varFechaHoraSalida.toInstant());
                        this.asistenciaReposity.save(nuevoRegAsis);
                    }
                } else {
                    registrosRepetidosEnBD++;
                }
            } else {
                fechasIncongruentes++;
            }
        }
        Respuesta varRes = new Respuesta();
        varRes.tipoMensaje = "Exito";
        varRes.mensaje = "Se ha realizado la carga de asistencias. \n" + contRegistroActualizados
                + " registros fueron actualizados. \n" + fechasIncongruentes
                + " registros tenían inconsistencias en las fechas. \n" + registrosRepetidosEnBD
                + " registros ya estaban registrados en la base de datos.";
        return ResponseEntity.ok().body(varRes);
    }

    /**
     * Recibe el numero de documento del colaborador, las fechas de entrada y de
     * salida de su asistencia y con eso Buscar el registro correspondiente en
     * la planilla de asistencia y determina si llegó tarde o si llegó temprano
     * y por cuánto tiempo de diferencia
     *
     * @param parLista
     * @param parDocCol
     * @param parEntradaAsist
     * @param parSalidaAsist
     * @return
     */
    private boolean procesarAsistencia(List<PlanificacionAsistencia> parLista, String parDocCol, Date parEntradaAsist,
            Date parSalidaAsist) {
        boolean asistenciaRegistrada = false;
        for (PlanificacionAsistencia planAsist : parLista) {
            if (parDocCol.equals(planAsist.getColaborador().getNumeroDocumento())) {
                Date fechaHoraEntrada = Date.from(planAsist.getHoraInicioTurno());
                if (this.mismaFecha(parEntradaAsist, fechaHoraEntrada)) {
                    // Si de entrada encuentra que la asistencia está justificada, se modifica el
                    // tio de asistencia, se guarda y se devuelve true
                    if (planAsist.isInasistenciaJustificada()) {
                        planAsist.setMinDiferenciaEntrada(0);
                        planAsist.setMinDiferenciaSalida(0);
                        planAsist.setTiposAsistencia("NoAplica");
                        this.planificacionAsistenciaRepository.save(planAsist);
                        return true;
                    }
                    String tipoEntrada = null;
                    String tipoSalida = null;
                    boolean regEntrada = false, regSalida = false;
                    if (this.horaDentroDeUmbral(parEntradaAsist, fechaHoraEntrada, 1)) {
                        long difMilisegundos = (parEntradaAsist.getTime() - fechaHoraEntrada.getTime());
                        int numMinutosEntrada = (int) ((difMilisegundos / 1000) / 60);
                        if (numMinutosEntrada <= 0) {
                            tipoEntrada = "EntradaTemprano";
                        } else {
                            tipoEntrada = "EntradaTarde";
                        }
                        planAsist.setMinDiferenciaEntrada(numMinutosEntrada);
                        planAsist.setTiposAsistencia(tipoEntrada);
                        regEntrada = true;
                    }
                    Date fechaHoraSalida = Date.from(planAsist.getHoraFinTurno());
                    if (this.mismaFecha(parSalidaAsist, fechaHoraSalida)) {
                        long difMilisegundos = (parSalidaAsist.getTime() - fechaHoraSalida.getTime());
                        int numMinutosSalida = (int) ((difMilisegundos / 1000) / 60);
                        if (numMinutosSalida <= 0) {
                            tipoSalida = "SalidaTemprano";
                        } else {
                            tipoSalida = "SalidaTarde";
                        }
                        planAsist.setMinDiferenciaSalida(numMinutosSalida);
                        planAsist.setTiposAsistencia(planAsist.getTiposAsistencia() + "-" + tipoSalida);
                        regSalida = true;
                    }
                    if (regEntrada || regSalida) {
                        this.planificacionAsistenciaRepository.save(planAsist);
                        return true;
                    }

                }
            }
        }
        return asistenciaRegistrada;
    }

    /**
     * Recibe dos fechas, y verifica que no estén a mas de un determinado número
     * de horas de diferencia (horasUmbral)
     *
     * @param parFecha1
     * @param parFecha2
     * @param horasUmbral
     * @return
     */
    private boolean horaDentroDeUmbral(Date parFecha1, Date parFecha2, int horasUmbral) {
        long difMilisegundos = parFecha1.getTime() - parFecha2.getTime();
        int numMinutos = (int) ((difMilisegundos / 1000) / 60);
        if (numMinutos < 0) {
            numMinutos = (-1) * numMinutos;
        }
        return numMinutos <= (60 * horasUmbral);
    }

    /**
     * Recibe dos fechas y comprueba que tanto su año, como su mes, y su día
     * sean iguales
     *
     * @param parFecha1
     * @param parFecha2
     * @return true si las fechas tienen el mismo años, mes y día, false en caso
     * contrario
     */
    private boolean mismaFecha(Date parFecha1, Date parFecha2) {
        int anio1 = parFecha1.getYear(), mes1 = parFecha1.getMonth(), dia1 = parFecha1.getDate();
        int anio2 = parFecha2.getYear(), mes2 = parFecha2.getMonth(), dia2 = parFecha2.getDate();

        return anio1 == anio2 && mes1 == mes2 && dia1 == dia2;
    }

    private boolean existeRegistroAsistencia(String docColaborador, Instant entrada, Instant salida) {
        Asistencia objAsistencia = new Asistencia();
        objAsistencia.setDocumentoColaborador(docColaborador);
        objAsistencia.setEntrada(entrada);
        objAsistencia.setSalida(salida);
        Example<Asistencia> registroAsistencia = Example.of(objAsistencia);
        boolean respuesta = this.asistenciaReposity.exists(registroAsistencia);
        return respuesta;
    }

    /**
     * Recibe un lista con cadenas o strings para proceder a separar cada una de
     * esas cadenas en vectores de strings por medio de algun caracter separador
     * como ";"
     *
     * @param parLista Lista de strings
     * @return Un arreglo de arreglos
     */
    private ArrayList<String[]> generarMatrizDeDatos(ArrayList<String> parLista) {
        System.out.println("Comienza generacion de matriz de datos.");
        ArrayList<String[]> matrizResult = new ArrayList<>();
        for (int iterador = 0; iterador < parLista.size(); iterador++) {
            String[] datosLinea = parLista.get(iterador).split(";");
            matrizResult.add(datosLinea);
        }
        System.out.println("Finaliza generacio de matriz de datos.");
        return matrizResult;
    }

    private Date convertirStringADate(String parString) {
        Date fechaResult = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        try {
            fechaResult = sdf.parse(parString);
        } catch (ParseException ex) {
            fechaResult = null;
        }
        return fechaResult;
    }
}

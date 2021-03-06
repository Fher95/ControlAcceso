package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.AsignacionMasiva;
import empaques.controlacceso.domain.AsignacionTurno;
import empaques.controlacceso.domain.Colaborador;
import empaques.controlacceso.domain.Respuesta;
import empaques.controlacceso.domain.Turno;
import empaques.controlacceso.repository.AsignacionTurnoRepository;
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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing
 * {@link empaques.controlacceso.domain.AsignacionTurno}.
 */
@RestController
@RequestMapping("/api")
public class AsignacionTurnoResource {

    private final Logger log = LoggerFactory.getLogger(AsignacionTurnoResource.class);

    private static final String ENTITY_NAME = "asignacionTurno";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsignacionTurnoRepository asignacionTurnoRepository;

    public AsignacionTurnoResource(AsignacionTurnoRepository asignacionTurnoRepository) {
        this.asignacionTurnoRepository = asignacionTurnoRepository;
    }

    /**
     * {@code POST  /asignacion-turnos} : Create a new asignacionTurno.
     *
     * @param asignacionTurno the asignacionTurno to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and
     * with body the new asignacionTurno, or with status
     * {@code 400 (Bad Request)} if the asignacionTurno has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asignacion-turnos")
    public ResponseEntity<AsignacionTurno> createAsignacionTurno(@RequestBody AsignacionTurno asignacionTurno)
            throws URISyntaxException {
        log.debug("REST request to save AsignacionTurno : {}", asignacionTurno);
        if (asignacionTurno.getId() != null) {
            throw new BadRequestAlertException("A new asignacionTurno cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        AsignacionTurno result = asignacionTurnoRepository.save(asignacionTurno);
        return ResponseEntity
                .created(new URI("/api/asignacion-turnos/" + result.getId())).headers(HeaderUtil
                .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /asignacion-turnos} : Updates an existing asignacionTurno.
     *
     * @param asignacionTurno the asignacionTurno to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
     * body the updated asignacionTurno, or with status
     * {@code 400 (Bad Request)} if the asignacionTurno is not valid, or with
     * status {@code 500 (Internal Server Error)} if the asignacionTurno
     * couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asignacion-turnos")
    public ResponseEntity<AsignacionTurno> updateAsignacionTurno(@RequestBody AsignacionTurno asignacionTurno)
            throws URISyntaxException {
        log.debug("REST request to update AsignacionTurno : {}", asignacionTurno);
        if (asignacionTurno.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AsignacionTurno result = asignacionTurnoRepository.save(asignacionTurno);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
                asignacionTurno.getId().toString())).body(result);
    }

    /**
     * {@code GET  /asignacion-turnos} : get all the asignacionTurnos.
     *
     * @param eagerload flag to eager load entities from relationships (This is
     * applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the
     * list of asignacionTurnos in body.
     */
    @GetMapping("/asignacion-turnos")
    public ResponseEntity<List<AsignacionTurno>> getAllAsignacionTurnos(Pageable pageable,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all AsignacionTurnos");
        /*
         * if ("fechaFin-is-null".equals(filter)) { log.
         * debug("REST request to get all AsignacionTurnos where asistenciaPlaneacion is null"
         * ); return
         * StreamSupport.stream(asignacionTurnoRepository.findAllWithEagerRelationships(
         * ).spliterator(), false) /* .filter(asignacionTurno ->
         * asignacionTurno.getAsistenciaPlaneacion() == null)
         */
        // .filter(asignacionTurno -> asignacionTurno.getFechaFin() == null)
        // .collect(Collectors.toList());
        // }
        if ("fechaFin-is-null-all".equals(filter)) {
            return ResponseEntity.ok().body(this.asignacionTurnoRepository.findAllAsignacionesActuales());
        }
        if ("fechaFin-is-null".equals(filter)) {
            Page<AsignacionTurno> page = asignacionTurnoRepository.findAllAsignacionesActuales2(pageable);
            HttpHeaders headers = PaginationUtil
                    .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        // return asignacionTurnoRepository.findAllWithEagerRelationships();
        Page<AsignacionTurno> page = asignacionTurnoRepository.findAllWithEagerRelationships(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /asignacion-turnos/:id} : get the "id" asignacionTurno.
     *
     * @param id the id of the asignacionTurno to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
     * body the asignacionTurno, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asignacion-turnos/{id}")
    public ResponseEntity<AsignacionTurno> getAsignacionTurno(@PathVariable Long id) {
        log.debug("REST request to get AsignacionTurno : {}", id);
        Optional<AsignacionTurno> asignacionTurno = asignacionTurnoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(asignacionTurno);
    }

    /**
     * {@code DELETE  /asignacion-turnos/:id} : delete the "id" asignacionTurno.
     *
     * @param id the id of the asignacionTurno to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asignacion-turnos/{id}")
    public ResponseEntity<Void> deleteAsignacionTurno(@PathVariable Long id) {
        log.debug("REST request to delete AsignacionTurno : {}", id);
        asignacionTurnoRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    /* Nuevos metodos */
    /**
     * En vez de llamar al metodo Delete, se llama a este para no eliminar el
     * registro de asignación, sino darlo por finalizado asignandole una fecha
     * de fin
     *
     * @param id
     * @return
     */
    @DeleteMapping("/asignacion-turnos/finalizar/{id}")
    public ResponseEntity<Void> finalizarAsignacionTurno(@PathVariable Long id) {
        Date fechaActual = new Date();
        Optional<AsignacionTurno> optional = this.asignacionTurnoRepository.findById(id);
        AsignacionTurno objAsignacion = optional.get();
        objAsignacion.setFechaFin(fechaActual.toInstant());
        log.debug("REST request to delete AsignacionTurno : {}", id);
        asignacionTurnoRepository.save(objAsignacion);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @GetMapping("/asignacion-turnos/colaborador/{id}")
    public List<AsignacionTurno> getAsignacionTurnoColaborador(@PathVariable Long id) {
        log.debug("REST request to get AsignacionTurno : {}", id);
        List<AsignacionTurno> asignacionesTurnos = asignacionTurnoRepository.findAsignacionesActualesColaborador(id);
        return asignacionesTurnos;
    }

    @PutMapping("/asignacion-turnos/rotar-turnos")
    public ResponseEntity<AsignacionTurno> rotarTurnos() {

        System.out.print("Entra a la rotación de turnos");
        this.leerArchivo();

        /*
         * Turno turnoPivote = new Turno(); turnoPivote.setNombre("Pivote");
         * ArrayList<Turno> listaTurnos = new ArrayList<Turno>(); List<AsignacionTurno>
         * varLista = this.asignacionTurnoRepository.findAllWithEagerRelationships();
         * for (AsignacionTurno asignacionTurno : varLista) { if (!enLista(listaTurnos,
         * asignacionTurno.getTurno())) { listaTurnos.add(asignacionTurno.getTurno()); }
         * } ArrayList<Turno> nuevaListaTurnos = this.desfazarListaTurnos(listaTurnos);
         * for (int iterador = 0; iterador < listaTurnos.size(); iterador++) {
         * 
         * for (AsignacionTurno asignacionTurno : varLista) { if
         * (asignacionTurno.getTurno().getId() == listaTurnos.get(iterador).getId()) {
         * AsignacionTurno varAsignacionActualizar = asignacionTurno;
         * varAsignacionActualizar.setTurno(nuevaListaTurnos.get(iterador));
         * asignacionTurnoRepository.save(varAsignacionActualizar); } }
         * 
         * }
         */
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, null))
                .body(null);

    }

    @PutMapping("/asignacion-turnos/asignacionMasiva")
    public ResponseEntity<Respuesta> asignacionMasiva(
            @RequestBody AsignacionMasiva asignacionMasiva) throws URISyntaxException {
        int contadorAsignaciones = asignacionMasiva.asignacionesTurno.length;
        for (AsignacionTurno asignacion : asignacionMasiva.asignacionesTurno) {
            Date fechaActual = new Date();
            asignacion.setFechaFin(fechaActual.toInstant());
            this.asignacionTurnoRepository.save(asignacion);
            AsignacionTurno nuevaAsignacion = new AsignacionTurno();
            nuevaAsignacion.setColaboradors(asignacion.getColaboradors());
            if (asignacionMasiva.cargo != null) {
                nuevaAsignacion.setCargo(asignacionMasiva.cargo);    
            } else {
                nuevaAsignacion.setCargo(asignacion.getCargo());
            }            
            nuevaAsignacion.setTurno(asignacionMasiva.turno);
            nuevaAsignacion.setFecha(fechaActual.toInstant());
            this.asignacionTurnoRepository.save(nuevaAsignacion);
        }
        Respuesta respuesta = new Respuesta(-3, -2);
        System.out.println("LA CANTIDAD DE ASIGNACIONES MASIVAS ES: " + contadorAsignaciones);        
        return ResponseEntity.ok().headers(HeaderUtil.createAlert(applicationName, "controlAccesoApp.asignacionTurno.asignados",
                 Integer.toString(contadorAsignaciones))).body(respuesta);
        
        /*return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName,false, "Se reasignaron "+contadorAsignaciones+" colaboradores",
                 Integer.toString(contadorAsignaciones))).body(respuesta);
        */
    }

    @PutMapping("/asignacion-turnos/cargar-asistencias")
    public ResponseEntity<AsignacionTurno> cargarAsignacion() {
        System.out.print("Carga de datos iniciada");
        boolean resultado = false;
        ArrayList<String> lineasArchivo = this.leerArchivo();
        ArrayList<String[]> matrizDatos = new ArrayList<>();
        for (int iterador = 0; iterador < lineasArchivo.size(); iterador++) {
            String[] datosLinea = lineasArchivo.get(iterador).split(";");
            matrizDatos.add(datosLinea);
        }

        for (int iterador2 = 0; iterador2 < matrizDatos.size(); iterador2++) {
            String varNumDocumento = matrizDatos.get(iterador2)[0];
        }

        System.out.print("Carga de datos finalizada");
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, null))
                .body(null);
    }

    private ArrayList<Turno> desfazarListaTurnos(ArrayList<Turno> parListaTurnos) {
        ArrayList<Turno> nuevaLista = new ArrayList();
        if (!parListaTurnos.isEmpty()) {
            for (int i = 1; i < parListaTurnos.size(); i++) {
                nuevaLista.add(parListaTurnos.get(i));
            }
            nuevaLista.add(parListaTurnos.get(0));
        }
        return nuevaLista;
    }

    private boolean enLista(ArrayList<Turno> parLista, Turno parTurno) {
        boolean result = false;
        if (parTurno == null) {
            result = true;
        } else {
            if (parLista.isEmpty()) {
                result = false;
            } else {

                for (int i = 0; i < parLista.size(); i++) {
                    if (parLista.get(i).getId() == parTurno.getId()) {
                        result = true;
                    }
                }

            }
        }
        return result;
    }

    /**
     * Este método lee un archivo en la ruta raíz del proyecto y retorna todas
     * las lineas leidas en un vector de Strings
     *
     * @return ArrayList<String> lineasLeídas
     */
    private ArrayList<String> leerArchivo() {
        File archivo = null;
        FileReader fr = null;
        BufferedReader br = null;
        ArrayList<String> listaLineas = new ArrayList();
        try {
            // Apertura del fichero y creacion de BufferedReader para poder
            // hacer una lectura comoda (disponer del metodo readLine()).
            archivo = new File("datosAsistencia.txt");
            System.out.println(archivo.getAbsolutePath());

            fr = new FileReader(archivo);
            br = new BufferedReader(fr);

            // Lectura del fichero
            String linea;
            while ((linea = br.readLine()) != null) {
                System.out.println(linea);
                listaLineas.add(linea);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // En el finally cerramos el fichero, para asegurarnos
            // que se cierra tanto si todo va bien como si salta
            // una excepcion.
            try {
                if (null != fr) {
                    fr.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return listaLineas;
    }

    /**
     * Verifica si el turno que se pretende asignar al colaborador, ya ha sido
     *
     * @param parAsignacionTurno
     * @throws URISyntaxException
     */
    private void verificarAsignacionTurno(AsignacionTurno parAsignacionTurno) throws URISyntaxException {
        // Se obtiene el primer elemento (y unico)
        Set<Colaborador> cols = parAsignacionTurno.getColaboradors();
        Iterator it = cols.iterator();
        Colaborador colaborador = (Colaborador) it.next();
        List<AsignacionTurno> asignaciones = this.asignacionTurnoRepository
                .findAsignacionesActualesColaborador(colaborador.getId());
        // Se verigica si el colaborador tiene asignaciones actualmente
        if (asignaciones.size() != 0) {
            // Si las tiene, se verifica cual es el turno que se quiere reasignar
            Turno turnoAsignacion = parAsignacionTurno.getTurno();
            for (int i = 0; i < asignaciones.size(); i++) {

                Instant momentoActual = Instant.now();
                AsignacionTurno asignacionActulizar = asignaciones.get(i);
                asignacionActulizar.setFechaFin(momentoActual);
                this.updateAsignacionTurno(asignacionActulizar);
                break;
            }
        }

    }

    @GetMapping("/asignacion-turnos/turnos/{turno_id}")
    public int getNumAsignacionesTurno(@PathVariable Long turno_id) {
        log.debug("REST request to get numero asignaciones turno : {}", turno_id);
        int cantidad = 0;
        cantidad = asignacionTurnoRepository.asignacionesPorTurno(turno_id);
        System.out.println("NUMERO DE TURNOS CONTADOS: " + cantidad);
        return cantidad;
    }
}

package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.AsignacionTurno;
import empaques.controlacceso.domain.Asistencia;
import empaques.controlacceso.domain.AsistenciaPlaneacion;
import empaques.controlacceso.domain.Colaborador;
import empaques.controlacceso.domain.Respuesta;
import empaques.controlacceso.repository.AsignacionTurnoRepository;
import empaques.controlacceso.repository.AsistenciaPlaneacionRepository;
import empaques.controlacceso.repository.AsistenciaRepository;
import empaques.controlacceso.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Level;

/**
 * REST controller for managing
 * {@link empaques.controlacceso.domain.AsistenciaPlaneacion}.
 */
@RestController
@RequestMapping("/api")
public class AsistenciaPlaneacionResource {

    private final Logger log = LoggerFactory.getLogger(AsistenciaPlaneacionResource.class);

    private static final String ENTITY_NAME = "asistenciaPlaneacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsistenciaPlaneacionRepository asistenciaPlaneacionRepository;
    private final AsignacionTurnoRepository asignacionTurnoReposity;
    private final AsistenciaRepository asistenciaRepository;

    public AsistenciaPlaneacionResource(AsistenciaPlaneacionRepository asistenciaPlaneacionRepository,
            AsignacionTurnoRepository asignacionTurnoRepository, AsistenciaRepository asistenciaRepository) {
        this.asistenciaPlaneacionRepository = asistenciaPlaneacionRepository;
        this.asignacionTurnoReposity = asignacionTurnoRepository;
        this.asistenciaRepository = asistenciaRepository;
    }

    /**
     * {@code POST  /asistencia-planeacions} : Create a new asistenciaPlaneacion.
     *
     * @param asistenciaPlaneacion the asistenciaPlaneacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new asistenciaPlaneacion, or with status
     *         {@code 400 (Bad Request)} if the asistenciaPlaneacion has already an
     *         ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asistencia-planeacions")
    public ResponseEntity<AsistenciaPlaneacion> createAsistenciaPlaneacion(
            @RequestBody AsistenciaPlaneacion asistenciaPlaneacion) throws URISyntaxException {
        log.debug("REST request to save AsistenciaPlaneacion : {}", asistenciaPlaneacion);
        if (asistenciaPlaneacion.getId() != null) {
            throw new BadRequestAlertException("A new asistenciaPlaneacion cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        AsistenciaPlaneacion result = asistenciaPlaneacionRepository.save(asistenciaPlaneacion);
        return ResponseEntity
                .created(new URI("/api/asistencia-planeacions/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /asistencia-planeacions} : Updates an existing
     * asistenciaPlaneacion.
     *
     * @param asistenciaPlaneacion the asistenciaPlaneacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated asistenciaPlaneacion, or with status
     *         {@code 400 (Bad Request)} if the asistenciaPlaneacion is not valid,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         asistenciaPlaneacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asistencia-planeacions")
    public ResponseEntity<AsistenciaPlaneacion> updateAsistenciaPlaneacion(
            @RequestBody AsistenciaPlaneacion asistenciaPlaneacion) throws URISyntaxException {
        log.debug("REST request to update AsistenciaPlaneacion : {}", asistenciaPlaneacion);
        if (asistenciaPlaneacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AsistenciaPlaneacion result = asistenciaPlaneacionRepository.save(asistenciaPlaneacion);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
                asistenciaPlaneacion.getId().toString())).body(result);
    }

    /**
     * {@code GET  /asistencia-planeacions} : get all the asistenciaPlaneacions.
     *
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of asistenciaPlaneacions in body.
     */
    @GetMapping("/asistencia-planeacions")
    public List<AsistenciaPlaneacion> getAllAsistenciaPlaneacions() {
        log.debug("REST request to get all AsistenciaPlaneacions");
        return asistenciaPlaneacionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /asistencia-planeacions/:id} : get the "id" asistenciaPlaneacion.
     *
     * @param id the id of the asistenciaPlaneacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the asistenciaPlaneacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asistencia-planeacions/{id}")
    public ResponseEntity<AsistenciaPlaneacion> getAsistenciaPlaneacion(@PathVariable Long id) {
        log.debug("REST request to get AsistenciaPlaneacion : {}", id);
        Optional<AsistenciaPlaneacion> asistenciaPlaneacion = asistenciaPlaneacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(asistenciaPlaneacion);
    }

    /**
     * {@code DELETE  /asistencia-planeacions/:id} : delete the "id"
     * asistenciaPlaneacion.
     *
     * @param id the id of the asistenciaPlaneacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asistencia-planeacions/{id}")
    public ResponseEntity<Void> deleteAsistenciaPlaneacion(@PathVariable Long id) {
        log.debug("REST request to delete AsistenciaPlaneacion : {}", id);
        asistenciaPlaneacionRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    // ***************Métodos Nuevos**********************/
    @GetMapping("/asistencia-planeacions/cargar-asistencias")
    public ResponseEntity<Respuesta> cargarAsignacion() {
        System.out.println("Carga de datos iniciada");
        // Creación del arreglo de lectura del archivo
        ArrayList<String> lineasArchivo = this.leerArchivo();
        // Se crea una matriz de datos para facilitar la manipulación de los datos de
        // cada linea del archivo
        ArrayList<String[]> matrizDatos = this.generarMatrizDeDatos(lineasArchivo);
        // Se obtiene la lista de asignaciones actuales para verificar la existencia de
        // colaboradores (this.existeColEnAsignacion())
        List<AsignacionTurno> asignacionesActuales = this.asignacionTurnoReposity.findAllAsignacionesActuales();
        int contadorInserciones = 0;
        int numAsigDobles = 0;
        int contadorRechazadas = 0;
        // Se recorre la matriz
        for (int iterador2 = 0; iterador2 < matrizDatos.size(); iterador2++) {
            // Se obtiene el numero de documento del registro de asistencia
            String varNumDocumento = matrizDatos.get(iterador2)[0];
            // Y se compruba si el numero de ese colaborador existen en las asignaciones
            // actuales
            if (this.existeColEnAsignacion(asignacionesActuales, varNumDocumento)) {
                // Si existe, se procede a sacar las fechas y horas registradas en el archivo de
                // asistencia
                Date varFechaHoraEntrada = this.convertirStringADate(matrizDatos.get(iterador2)[1]);
                Date varFechaHoraSalida = this.convertirStringADate(matrizDatos.get(iterador2)[2]);

                if ( varFechaHoraEntrada.before(varFechaHoraSalida)) {

                    Instant varInstantEntrada = varFechaHoraEntrada.toInstant();
                Instant varInstantSalida = varFechaHoraSalida.toInstant();
                // Optional<Asistencia> varAsistencias =
                // this.asistenciaRepository.findAllByEntradaSalida(varNumDocumento,
                // varInstantEntrada, varInstantSalida);
                // Se comprueba si esa asistencia leida del archivo de asistencias ya fue
                // registrada                
                boolean existeAsistencia = this.existeAsistencia(varNumDocumento, varInstantEntrada, varInstantSalida);
                if (!existeAsistencia) {

                    ArrayList<AsignacionTurno> vecAsignaciones = this.obtenerAsignacionesTurnos(asignacionesActuales,
                            varNumDocumento);
                    AsignacionTurno varAsignacionTurno = null;
                    if (vecAsignaciones.size() == 1) {
                        varAsignacionTurno = vecAsignaciones.get(0);
                    } else {
                        numAsigDobles ++ ;
                        varAsignacionTurno = this.determinarAsignacion(vecAsignaciones, varInstantEntrada, 1);
                    }
                    if (varAsignacionTurno != null) {
                        // Si no existe, se crea, se configura y se guarda en la base de datos
                        Asistencia nuevaAsistencia = new Asistencia();
                        nuevaAsistencia.setDocumentoColaborador(varNumDocumento);
                        nuevaAsistencia.setEntrada(varInstantEntrada);
                        nuevaAsistencia.setSalida(varInstantSalida);
                        Asistencia asistenciaCreada = this.asistenciaRepository.save(nuevaAsistencia);

                        // AsignacionTurno varAsignacionTurno =
                        // this.obtenerAsignacionTurno(asignacionesActuales, varNumDocumento);
                        AsistenciaPlaneacion nuevaAsistenciaPlaneacion = new AsistenciaPlaneacion();
                        nuevaAsistenciaPlaneacion.setAsignacionTurno(varAsignacionTurno);
                        nuevaAsistenciaPlaneacion.setAsistencia(asistenciaCreada);
                        nuevaAsistenciaPlaneacion
                                .setColaborador(varAsignacionTurno.getColaboradors().iterator().next());
                        this.asistenciaPlaneacionRepository.save(nuevaAsistenciaPlaneacion);
                        System.out.println("Asistencia planeacion creada: ");
                        contadorInserciones++;
                    }
                }

                } else {                    
                    contadorRechazadas++;
                }
            }
        }
        System.out.println("Se insertaron: " + contadorInserciones);
        System.out.println("Colaboradores con doble Asignación: " + numAsigDobles);
        System.out.println("Registros rechazados: " + contadorRechazadas);
        System.out.println("Carga de datos finalizada");
        Respuesta objRes = new Respuesta(contadorInserciones,contadorRechazadas);    
        return ResponseEntity.ok().body(objRes);
    }

    /**
     * En los casos en que un colaborador tenga más de 1 asignación de turnos al
     * mismo tiempo, se toma la hora de entrada de la asistencia, luego se intenta
     * determinar a cuál de esos turnos debería corresponder la asistencia en
     * cuestión. La forma en la que lo determina este algoritmo, es que si la hora
     * de llegada esté dentro del intervalo de una hora antes de la hora entrada del
     * turno y una hora después de la hora de salida del turno
     * 
     * @param vecAsignaciones   Vector de asignaciones de turnos para cuando un
     *                          colaborador tiene más de un turno asignado
     *                          actualmente
     * @param varInstantEntrada La fecha de entrada de la asistencia con respecto a
     *                          la cual se compararán las horas de entrada de los
     *                          turnos
     * @param desfaseHoras      determina cuántas horas después y antes de la hora
     *                          de asistencia del turno se valida la asistencia a
     *                          guardar
     * @return
     */
    private AsignacionTurno determinarAsignacion(ArrayList<AsignacionTurno> vecAsignaciones, Instant varInstantEntrada,
            int desfaseHoras) {
                System.out.println("ENTRA A DETERMINAR ASIGNACION MULTIPLE");
        AsignacionTurno asignacionRespuesta = null;
        for (AsignacionTurno asignacionTurno : vecAsignaciones) {
            Date horaInicioTurno = Date.from(asignacionTurno.getTurno().getHoraInicio());
            Date horaEntrada = Date.from(varInstantEntrada);
            int horasEntrada = horaEntrada.getHours();
            int horaTurno = horaInicioTurno.getHours();
            int minutosEntrada = horaEntrada.getMinutes();
            int minutosTurno = horaInicioTurno.getMinutes();
            if (horasEntrada <= (horaTurno + desfaseHoras)
                    && horasEntrada >= (horaTurno - desfaseHoras)) {                
                if (horasEntrada == horaTurno) {
                    asignacionRespuesta = asignacionTurno;
                } else if(horasEntrada > horaTurno && minutosEntrada <= minutosTurno) {
                    asignacionRespuesta = asignacionTurno;
                } else if (horasEntrada < horaTurno && minutosEntrada >= minutosTurno) {
                    asignacionRespuesta = asignacionTurno;
                }               
            }
        }
        return asignacionRespuesta;
    }

    private boolean existeAsistencia(String numDocumento, Instant parEntrada, Instant parSalida) {
        boolean respuesta = false;
        List<Asistencia> listaAsignaciones = this.asistenciaRepository.findAll();
        if (!listaAsignaciones.isEmpty()) {
            for (int iterador = 0; iterador < listaAsignaciones.size(); iterador++) {
                Asistencia varAsis = listaAsignaciones.get(iterador);                
                if (numDocumento.equals(varAsis.getDocumentoColaborador())
                        && (parEntrada.compareTo(varAsis.getEntrada()) == 0)
                        && parSalida.compareTo(varAsis.getSalida()) == 0) {
                    respuesta = true;
                    break;
                }
            }
        }
        return respuesta;
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

    private boolean existeColEnAsignacion(List<AsignacionTurno> parAsignaciones, String docColaborador) {
        System.out.println("Inicia comprobacion de existencia.");
        boolean respuesta = false;
        for (int i = 0; i < parAsignaciones.size(); i++) {
            AsignacionTurno asignacion = parAsignaciones.get(i);
            if (!asignacion.getColaboradors().isEmpty()) {
                Set<Colaborador> colaboradores = asignacion.getColaboradors();
                for (Iterator it = colaboradores.iterator(); it.hasNext();) {
                    Colaborador col = (Colaborador) it.next();
                    if (docColaborador == null ? col.getNumeroDocumento() == null
                            : docColaborador.equals(col.getNumeroDocumento())) {
                        respuesta = true;
                    }
                }
            }
        }
        System.out.println("Finaliza comprobacion de existencia.");
        return respuesta;
    }

    private ArrayList<AsignacionTurno> obtenerAsignacionesTurnos(List<AsignacionTurno> parAsignaciones,
            String docColaborador) {
        System.out.println("Inicia obtencion de asignacion turno.");
        ArrayList<AsignacionTurno> respuesta = new ArrayList<>();
        for (int i = 0; i < parAsignaciones.size(); i++) {
            AsignacionTurno asignacion = parAsignaciones.get(i);
            if (!asignacion.getColaboradors().isEmpty()) {
                Set<Colaborador> colaboradores = asignacion.getColaboradors();
                for (Iterator it = colaboradores.iterator(); it.hasNext();) {
                    Colaborador col = (Colaborador) it.next();
                    if (docColaborador == null ? col.getNumeroDocumento() == null
                            : docColaborador.equals(col.getNumeroDocumento())) {
                        respuesta.add(asignacion);
                    }
                }
            }
        }
        System.out.println("Obtencion de asignacion finalizada.");
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

    /**
     * Este método lee un archivo en la ruta raíz del proyecto y retorna todas las
     * lineas leidas en un vector de Strings
     *
     * @return ArrayList<String> lineasLeídas
     */
    private ArrayList<String> leerArchivo() {
        System.out.println("Comienza lectura de archivo.");
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
        System.out.println("Lectura Finalizada.");
        return listaLineas;
    }
    
}



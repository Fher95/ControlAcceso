package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.AsignacionTurno;
import empaques.controlacceso.domain.AsistenciaPlaneacion;
import empaques.controlacceso.domain.Colaborador;
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
import java.util.ArrayList;
import java.util.Iterator;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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
            AsignacionTurnoRepository asignacionTurnoRepository,
            AsistenciaRepository asistenciaRepository) {
        this.asistenciaPlaneacionRepository = asistenciaPlaneacionRepository;
        this.asignacionTurnoReposity = asignacionTurnoRepository;
        this.asistenciaRepository = asistenciaRepository;
    }

    /**
     * {@code POST  /asistencia-planeacions} : Create a new asistenciaPlaneacion.
     *
     * @param asistenciaPlaneacion the asistenciaPlaneacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and
     * with body the new asistenciaPlaneacion, or with status
     * {@code 400 (Bad Request)} if the asistenciaPlaneacion has already an ID.
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
     * {@code PUT  /asistencia-planeacions} : Updates an existing
     * asistenciaPlaneacion.
     *
     * @param asistenciaPlaneacion the asistenciaPlaneacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
     * body the updated asistenciaPlaneacion, or with status
     * {@code 400 (Bad Request)} if the asistenciaPlaneacion is not valid, or
     * with status {@code 500 (Internal Server Error)} if the
     * asistenciaPlaneacion couldn't be updated.
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
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the
     * list of asistenciaPlaneacions in body.
     */
    @GetMapping("/asistencia-planeacions")
    public List<AsistenciaPlaneacion> getAllAsistenciaPlaneacions() {
        log.debug("REST request to get all AsistenciaPlaneacions");
        return asistenciaPlaneacionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /asistencia-planeacions/:id} : get the "id"
     * asistenciaPlaneacion.
     *
     * @param id the id of the asistenciaPlaneacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
     * body the asistenciaPlaneacion, or with status {@code 404 (Not Found)}.
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
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    //***************Métodos Nuevos**********************/
    @PutMapping("/asistencia-planeacions/cargar-asistencias")
    public ResponseEntity<AsistenciaPlaneacion> cargarAsignacion() {
        System.out.println("Carga de datos iniciada");        
        ArrayList<String> lineasArchivo = this.leerArchivo();
        
        ArrayList<String[]> matrizDatos = this.generarMatrizDeDatos(lineasArchivo);
        List<AsignacionTurno> asignacionesActuales = this.asignacionTurnoReposity.findAllAsignacionesActuales();        
        int contadorCoincidencias = 0;
        for (int iterador2 = 0; iterador2 < matrizDatos.size(); iterador2++) {
            String varNumDocumento = matrizDatos.get(iterador2)[0];
            if(this.existeColEnAsignacion(asignacionesActuales,varNumDocumento)){
                contadorCoincidencias ++;
            }            
        }
        System.out.print("Colaboradores existentes: " + contadorCoincidencias);
        System.out.print("Carga de datos finalizada");
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, null))
                .body(null);
    }
    
    private boolean existeColEnAsignacion (List<AsignacionTurno> parAsignaciones, String docColaborador) {
        System.out.println("Inicia comprobacion de existencia.");
        boolean respuesta = false;
        for (int i = 0; i < parAsignaciones.size(); i ++){
            AsignacionTurno asignacion = parAsignaciones.get(i);
            if(!asignacion.getColaboradors().isEmpty()){
                Set<Colaborador> colaboradores = asignacion.getColaboradors();
                for (Iterator it = colaboradores.iterator(); it.hasNext();){
                    Colaborador col = (Colaborador)it.next();
                    if (docColaborador == null ? col.getNumeroDocumento() == null : docColaborador.equals(col.getNumeroDocumento())){
                        respuesta = true;
                    }
                }                
            }
        }
        System.out.println("Finaliza comprobacion de existencia.");
        return respuesta;
    }
    
    /**
     * Recibe un lista con cadenas o strings para proceder a separar cada una de esas cadenas
     * en vectores de strings por medio de algun caracter separador como ";"
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
     * Este método lee un archivo en la ruta raíz del proyecto y retorna todas
     * las lineas leidas en un vector de Strings
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

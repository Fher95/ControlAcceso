package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.Colaborador;
import empaques.controlacceso.repository.ColaboradorRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing
 * {@link empaques.controlacceso.domain.Colaborador}.
 */
@RestController
@RequestMapping("/api")
public class ColaboradorResource {

    private final Logger log = LoggerFactory.getLogger(ColaboradorResource.class);

    private static final String ENTITY_NAME = "colaborador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ColaboradorRepository colaboradorRepository;

    public ColaboradorResource(ColaboradorRepository colaboradorRepository) {
        this.colaboradorRepository = colaboradorRepository;
    }

    /**
     * {@code POST  /colaboradors} : Create a new colaborador.
     *
     * @param colaborador the colaborador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new colaborador, or with status {@code 400 (Bad Request)} if
     *         the colaborador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/colaboradors")
    public ResponseEntity<Colaborador> createColaborador(@Valid @RequestBody Colaborador colaborador)
            throws URISyntaxException {
        log.debug("REST request to save Colaborador : {}", colaborador);
        if (colaborador.getId() != null) {
            throw new BadRequestAlertException("A new colaborador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Colaborador result = colaboradorRepository.save(colaborador);
        return ResponseEntity
                .created(new URI("/api/colaboradors/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /colaboradors} : Updates an existing colaborador.
     *
     * @param colaborador the colaborador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated colaborador, or with status {@code 400 (Bad Request)} if
     *         the colaborador is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the colaborador couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/colaboradors")
    public ResponseEntity<Colaborador> updateColaborador(@Valid @RequestBody Colaborador colaborador)
            throws URISyntaxException {
        log.debug("REST request to update Colaborador : {}", colaborador);
        if (colaborador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Colaborador result = colaboradorRepository.save(colaborador);
        return ResponseEntity.ok().headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, colaborador.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /colaboradors} : get all the colaboradors.
     *
     *
     * @param pageable  the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is
     *                  applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of colaboradors in body.
     */
    @GetMapping("/colaboradors")
    public ResponseEntity<List<Colaborador>> getAllColaboradors(Pageable pageable,
            @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Colaboradors");
        Page<Colaborador> page;
        if (eagerload) {
            page = colaboradorRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = colaboradorRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /colaboradors/:id} : get the "id" colaborador.
     *
     * @param id the id of the colaborador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the colaborador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/colaboradors/{id}")
    public ResponseEntity<Colaborador> getColaborador(@PathVariable Long id) {
        log.debug("REST request to get Colaborador : {}", id);
        Optional<Colaborador> colaborador = colaboradorRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(colaborador);
    }

    @GetMapping("/colaboradors/documento/{id}")
    public ResponseEntity<List<Colaborador>> getColaboradorByNumDocumento(Pageable pageable, @PathVariable String id) {
        log.debug("REST request to get Colaboradores by Documento : {}", id);
        Page<Colaborador> page;
        page = colaboradorRepository.findColaboradorByNumDocumento(pageable, id);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        System.out.println("Se obtuvieron: " + page.getTotalElements() + " elementos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code DELETE  /colaboradors/:id} : delete the "id" colaborador.
     *
     * @param id the id of the colaborador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/colaboradors/{id}")
    public ResponseEntity<Void> deleteColaborador(@PathVariable Long id) {
        log.debug("REST request to delete Colaborador : {}", id);
        colaboradorRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    /**
     * Este método recibe un arreglo de Strings, en el que en la posición 0 está el
     * nombre1, en la posición 1 el nombre 2. en la posición 2, el apellido1, y en
     * la posición 3 el apellido2
     *
     * @param pageable
     * @param vecNombres pos[0]: nombre1, pos[1]: nombre2, pos[2]: apellido1,
     *                   pos[3]: apellido2
     * @return
     */
    @PutMapping("/colaboradors/porNombres")
    public ResponseEntity<List<Colaborador>> getByNombres(Pageable pageable, @Valid @RequestBody String[] vecNombres) {
        log.debug("REST request to get Colaborador Por Nombre: {}", Arrays.toString(vecNombres));        
        int contElementos = 0;
        String[] vecDatos = {vecNombres[0].toLowerCase(), vecNombres[1].toLowerCase(),
            vecNombres[2].toLowerCase(), vecNombres[3].toLowerCase()};

        Page<Colaborador> page;
        page = colaboradorRepository.findByNombres(pageable, vecDatos[0], vecDatos[1],
        vecDatos[2], vecDatos[3]);
        contElementos = page.getTotalPages();
        if (contElementos < 1) {
            ArrayList<String[]> vecCombinaciones = this.getArrayCombinaciones(vecDatos);
            for (String[] vecOp : vecCombinaciones) {
                page = colaboradorRepository.findByNombres(pageable, vecOp[0], vecOp[1], vecOp[2], vecOp[3]);
                contElementos = page.getTotalPages();
                if (contElementos != 0) {
                    break;
                }
            }
        }
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        System.out.println("Se obtuvieron: " + page.getTotalElements() + " elementos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * Obtiene un arreglo con las posibles combinaciones de busqueda que se pueden
     * armar cuando solo se ha ingresado una palabra o nombre como parametro de
     * busqueda
     * 
     * @param parUnicoNombre el unico nombre detectado en la búsqueda
     * @return ArrayList de String[]
     */
    private ArrayList<String[]> getVecCombinaciones1(String parUnicoNombre) {
        ArrayList<String[]> arrayResult = new ArrayList<>();
        String[] combinacion1 = { parUnicoNombre, "", "", "" };
        arrayResult.add(combinacion1);
        String[] combinacion2 = { "", parUnicoNombre, "", "" };
        arrayResult.add(combinacion2);
        String[] combinacion3 = { "", "", parUnicoNombre, "" };
        arrayResult.add(combinacion3);
        String[] combinacion4 = { "", "", "", parUnicoNombre };
        arrayResult.add(combinacion4);
        return arrayResult;
    }

    /**
     * Obtiene un arreglo con las posibles combinaciones de busqueda que se pueden
     * armar cuando se han ingresado dos palabras o nombres como parametro de
     * busqueda
     * 
     * @param parPalabra1 primera palabra de la cadena de búsqueda * @param
     *                    parPalabra2 segunda palabra de la cadena de búsqueda
     * @return ArrayList de String[]
     */
    private ArrayList<String[]> getVecCombinaciones2(String parPalabra1, String parPalabra2) {
        ArrayList<String[]> arrayResult = new ArrayList<>();
        String[] combinacion1 = { parPalabra1, parPalabra2, "", "" };
        arrayResult.add(combinacion1);
        String[] combinacion2 = { parPalabra1, "", parPalabra2, "" };
        arrayResult.add(combinacion2);
        String[] combinacion3 = { "", "", parPalabra1, parPalabra2 };
        arrayResult.add(combinacion3);
        String[] combinacion4 = { parPalabra1, "", "", parPalabra2 };
        arrayResult.add(combinacion4);
        return arrayResult;
    }

    /**
     * Obtiene un arreglo con las posibles combinaciones de busqueda que se pueden
     * armar cuando se han ingresado tres palabras o nombres como parametro de
     * busqueda
     * 
     * @param parPalabra1 primera palabra de la cadena de búsqueda
     * @param parPalabra2 segunda palabra de la cadena de búsqueda
     * @param parPalabra3 tercera palabra de la cadena de búsqueda
     * @return ArrayList de String[]
     */
    private ArrayList<String[]> getVecCombinaciones3(String parPalabra1, String parPalabra2, String parPalabra3) {
        ArrayList<String[]> arrayResult = new ArrayList<>();
        String[] combinacion1 = { parPalabra1, parPalabra2, parPalabra3, "" };
        arrayResult.add(combinacion1);
        String[] combinacion2 = { parPalabra1, "", parPalabra2, parPalabra3 };
        arrayResult.add(combinacion2);
        String[] combinacion3 = { "", parPalabra1, parPalabra2, parPalabra3 };
        arrayResult.add(combinacion3);
        return arrayResult;
    }

    /**
     * Determina la cantidad de palabras en la cadena de buscade y con base a eso deduce las combinaciones de busqueda para esa cadena de palabras
     * @param parVecBusqueda
     * @return
     */
    private ArrayList<String[]> getArrayCombinaciones(String[] parVecBusqueda) {
        String nom1 = "", nom2 = "", nom3 = "", nom4 = "";
        ArrayList<String[]> vecCombinaciones = new ArrayList<>();
        int contNombres = 0;
        for (String varString : parVecBusqueda) {
            if (varString.equals("")) {
                contNombres++;
            }
        }
        switch (contNombres) {
        case 1:
            nom1 = parVecBusqueda[0].toLowerCase();
            vecCombinaciones = this.getVecCombinaciones1(nom1);
            break;
        case 2:
            nom1 = parVecBusqueda[0].toLowerCase();
            nom2 = parVecBusqueda[1].toLowerCase();
            vecCombinaciones = this.getVecCombinaciones2(nom1, nom2);
            break;
        case 3:
            nom1 = parVecBusqueda[0].toLowerCase();
            nom2 = parVecBusqueda[1].toLowerCase();
            nom3 = parVecBusqueda[2].toLowerCase();
            vecCombinaciones = this.getVecCombinaciones3(nom1, nom2, nom3);
            break;
        case 4:
            vecCombinaciones.add(parVecBusqueda);
            break;
        default:
            break;
        }
        return vecCombinaciones;
    }
}

package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.Colaborador;
import empaques.controlacceso.domain.IntercambioTurno;
import empaques.controlacceso.repository.IntercambioTurnoRepository;
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
import java.time.Instant;
import java.util.Date;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Example;

/**
 * REST controller for managing {@link empaques.controlacceso.domain.IntercambioTurno}.
 */
@RestController
@RequestMapping("/api")
public class IntercambioTurnoResource {

    private final Logger log = LoggerFactory.getLogger(IntercambioTurnoResource.class);

    private static final String ENTITY_NAME = "intercambioTurno";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IntercambioTurnoRepository intercambioTurnoRepository;

    public IntercambioTurnoResource(IntercambioTurnoRepository intercambioTurnoRepository) {
        this.intercambioTurnoRepository = intercambioTurnoRepository;
    }

    /**
     * {@code POST  /intercambio-turnos} : Create a new intercambioTurno.
     *
     * @param intercambioTurno the intercambioTurno to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new intercambioTurno, or with status {@code 400 (Bad Request)} if the intercambioTurno has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/intercambio-turnos")
    public ResponseEntity<IntercambioTurno> createIntercambioTurno(@RequestBody IntercambioTurno intercambioTurno) throws URISyntaxException {
        log.debug("REST request to save IntercambioTurno : {}", intercambioTurno);
        if (intercambioTurno.getId() != null) {
            throw new BadRequestAlertException("A new intercambioTurno cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IntercambioTurno result = intercambioTurnoRepository.save(intercambioTurno);
        return ResponseEntity.created(new URI("/api/intercambio-turnos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /intercambio-turnos} : Updates an existing intercambioTurno.
     *
     * @param intercambioTurno the intercambioTurno to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated intercambioTurno,
     * or with status {@code 400 (Bad Request)} if the intercambioTurno is not valid,
     * or with status {@code 500 (Internal Server Error)} if the intercambioTurno couldn't be updated.
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

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of intercambioTurnos in body.
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
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the intercambioTurno, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/intercambio-turnos/{id}")
    public ResponseEntity<IntercambioTurno> getIntercambioTurno(@PathVariable Long id) {
        log.debug("REST request to get IntercambioTurno : {}", id);
        Optional<IntercambioTurno> intercambioTurno = intercambioTurnoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(intercambioTurno);
    }

    /**
     * {@code DELETE  /intercambio-turnos/:id} : delete the "id" intercambioTurno.
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
        if (result.isPresent()){
            objResultado = result.get();
        } else {
            // Sino existe un registro solo con fecha, se busca uno que comprenda la fecha entre fecha y fechaFin
            result = this.intercambioTurnoRepository.findIntercambioEntreFechas(parNumDoc,parFecha.toInstant());
            if (result.isPresent()) {
                return result.get();
            }
        }        
        return null;
    }
}

package empaques.controlacceso.web.rest;

import empaques.controlacceso.domain.Telefono;
import empaques.controlacceso.repository.TelefonoRepository;
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
 * REST controller for managing {@link empaques.controlacceso.domain.Telefono}.
 */
@RestController
@RequestMapping("/api")
public class TelefonoResource {

    private final Logger log = LoggerFactory.getLogger(TelefonoResource.class);

    private static final String ENTITY_NAME = "telefono";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TelefonoRepository telefonoRepository;

    public TelefonoResource(TelefonoRepository telefonoRepository) {
        this.telefonoRepository = telefonoRepository;
    }

    /**
     * {@code POST  /telefonos} : Create a new telefono.
     *
     * @param telefono the telefono to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new telefono, or with status {@code 400 (Bad Request)} if the telefono has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/telefonos")
    public ResponseEntity<Telefono> createTelefono(@RequestBody Telefono telefono) throws URISyntaxException {
        log.debug("REST request to save Telefono : {}", telefono);
        if (telefono.getId() != null) {
            throw new BadRequestAlertException("A new telefono cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Telefono result = telefonoRepository.save(telefono);
        return ResponseEntity.created(new URI("/api/telefonos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /telefonos} : Updates an existing telefono.
     *
     * @param telefono the telefono to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated telefono,
     * or with status {@code 400 (Bad Request)} if the telefono is not valid,
     * or with status {@code 500 (Internal Server Error)} if the telefono couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/telefonos")
    public ResponseEntity<Telefono> updateTelefono(@RequestBody Telefono telefono) throws URISyntaxException {
        log.debug("REST request to update Telefono : {}", telefono);
        if (telefono.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Telefono result = telefonoRepository.save(telefono);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, telefono.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /telefonos} : get all the telefonos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of telefonos in body.
     */
    @GetMapping("/telefonos")
    public List<Telefono> getAllTelefonos() {
        log.debug("REST request to get all Telefonos");
        return telefonoRepository.findAll();
    }

    /**
     * {@code GET  /telefonos/:id} : get the "id" telefono.
     *
     * @param id the id of the telefono to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the telefono, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/telefonos/{id}")
    public ResponseEntity<Telefono> getTelefono(@PathVariable Long id) {
        log.debug("REST request to get Telefono : {}", id);
        Optional<Telefono> telefono = telefonoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(telefono);
    }

    /**
     * {@code DELETE  /telefonos/:id} : delete the "id" telefono.
     *
     * @param id the id of the telefono to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/telefonos/{id}")
    public ResponseEntity<Void> deleteTelefono(@PathVariable Long id) {
        log.debug("REST request to delete Telefono : {}", id);
        telefonoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/telefonos/colaborador/{id}")
    public List<Telefono> getTelefonosColaborador(@PathVariable Long id) {
        log.debug("REST request to get TelefonosColaborador : {}", id);
        List<Telefono> telefonos = telefonoRepository.findByIdColaborador(id);
        return telefonos;
    }
}

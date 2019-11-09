package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.Telefono;
import empaques.controlacceso.repository.TelefonoRepository;
import empaques.controlacceso.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static empaques.controlacceso.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TelefonoResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class TelefonoResourceIT {

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;
    private static final Integer SMALLER_NUMERO = 1 - 1;

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    @Autowired
    private TelefonoRepository telefonoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTelefonoMockMvc;

    private Telefono telefono;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TelefonoResource telefonoResource = new TelefonoResource(telefonoRepository);
        this.restTelefonoMockMvc = MockMvcBuilders.standaloneSetup(telefonoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Telefono createEntity(EntityManager em) {
        Telefono telefono = new Telefono()
            .numero(DEFAULT_NUMERO)
            .tipo(DEFAULT_TIPO);
        return telefono;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Telefono createUpdatedEntity(EntityManager em) {
        Telefono telefono = new Telefono()
            .numero(UPDATED_NUMERO)
            .tipo(UPDATED_TIPO);
        return telefono;
    }

    @BeforeEach
    public void initTest() {
        telefono = createEntity(em);
    }

    @Test
    @Transactional
    public void createTelefono() throws Exception {
        int databaseSizeBeforeCreate = telefonoRepository.findAll().size();

        // Create the Telefono
        restTelefonoMockMvc.perform(post("/api/telefonos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(telefono)))
            .andExpect(status().isCreated());

        // Validate the Telefono in the database
        List<Telefono> telefonoList = telefonoRepository.findAll();
        assertThat(telefonoList).hasSize(databaseSizeBeforeCreate + 1);
        Telefono testTelefono = telefonoList.get(telefonoList.size() - 1);
        assertThat(testTelefono.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testTelefono.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createTelefonoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = telefonoRepository.findAll().size();

        // Create the Telefono with an existing ID
        telefono.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTelefonoMockMvc.perform(post("/api/telefonos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(telefono)))
            .andExpect(status().isBadRequest());

        // Validate the Telefono in the database
        List<Telefono> telefonoList = telefonoRepository.findAll();
        assertThat(telefonoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTelefonos() throws Exception {
        // Initialize the database
        telefonoRepository.saveAndFlush(telefono);

        // Get all the telefonoList
        restTelefonoMockMvc.perform(get("/api/telefonos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(telefono.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }
    
    @Test
    @Transactional
    public void getTelefono() throws Exception {
        // Initialize the database
        telefonoRepository.saveAndFlush(telefono);

        // Get the telefono
        restTelefonoMockMvc.perform(get("/api/telefonos/{id}", telefono.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(telefono.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTelefono() throws Exception {
        // Get the telefono
        restTelefonoMockMvc.perform(get("/api/telefonos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTelefono() throws Exception {
        // Initialize the database
        telefonoRepository.saveAndFlush(telefono);

        int databaseSizeBeforeUpdate = telefonoRepository.findAll().size();

        // Update the telefono
        Telefono updatedTelefono = telefonoRepository.findById(telefono.getId()).get();
        // Disconnect from session so that the updates on updatedTelefono are not directly saved in db
        em.detach(updatedTelefono);
        updatedTelefono
            .numero(UPDATED_NUMERO)
            .tipo(UPDATED_TIPO);

        restTelefonoMockMvc.perform(put("/api/telefonos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTelefono)))
            .andExpect(status().isOk());

        // Validate the Telefono in the database
        List<Telefono> telefonoList = telefonoRepository.findAll();
        assertThat(telefonoList).hasSize(databaseSizeBeforeUpdate);
        Telefono testTelefono = telefonoList.get(telefonoList.size() - 1);
        assertThat(testTelefono.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testTelefono.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingTelefono() throws Exception {
        int databaseSizeBeforeUpdate = telefonoRepository.findAll().size();

        // Create the Telefono

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTelefonoMockMvc.perform(put("/api/telefonos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(telefono)))
            .andExpect(status().isBadRequest());

        // Validate the Telefono in the database
        List<Telefono> telefonoList = telefonoRepository.findAll();
        assertThat(telefonoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTelefono() throws Exception {
        // Initialize the database
        telefonoRepository.saveAndFlush(telefono);

        int databaseSizeBeforeDelete = telefonoRepository.findAll().size();

        // Delete the telefono
        restTelefonoMockMvc.perform(delete("/api/telefonos/{id}", telefono.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Telefono> telefonoList = telefonoRepository.findAll();
        assertThat(telefonoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Telefono.class);
        Telefono telefono1 = new Telefono();
        telefono1.setId(1L);
        Telefono telefono2 = new Telefono();
        telefono2.setId(telefono1.getId());
        assertThat(telefono1).isEqualTo(telefono2);
        telefono2.setId(2L);
        assertThat(telefono1).isNotEqualTo(telefono2);
        telefono1.setId(null);
        assertThat(telefono1).isNotEqualTo(telefono2);
    }
}

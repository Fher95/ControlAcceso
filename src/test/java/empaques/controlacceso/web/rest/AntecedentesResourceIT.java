package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.Antecedentes;
import empaques.controlacceso.repository.AntecedentesRepository;
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

import empaques.controlacceso.domain.enumeration.TipoAntecedente;
/**
 * Integration tests for the {@link AntecedentesResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class AntecedentesResourceIT {

    private static final TipoAntecedente DEFAULT_TIPO = TipoAntecedente.Disciplnario;
    private static final TipoAntecedente UPDATED_TIPO = TipoAntecedente.Penal;

    private static final String DEFAULT_SOPORTE = "AAAAAAAAAA";
    private static final String UPDATED_SOPORTE = "BBBBBBBBBB";

    @Autowired
    private AntecedentesRepository antecedentesRepository;

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

    private MockMvc restAntecedentesMockMvc;

    private Antecedentes antecedentes;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AntecedentesResource antecedentesResource = new AntecedentesResource(antecedentesRepository);
        this.restAntecedentesMockMvc = MockMvcBuilders.standaloneSetup(antecedentesResource)
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
    public static Antecedentes createEntity(EntityManager em) {
        Antecedentes antecedentes = new Antecedentes()
            .tipo(DEFAULT_TIPO)
            .soporte(DEFAULT_SOPORTE);
        return antecedentes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Antecedentes createUpdatedEntity(EntityManager em) {
        Antecedentes antecedentes = new Antecedentes()
            .tipo(UPDATED_TIPO)
            .soporte(UPDATED_SOPORTE);
        return antecedentes;
    }

    @BeforeEach
    public void initTest() {
        antecedentes = createEntity(em);
    }

    @Test
    @Transactional
    public void createAntecedentes() throws Exception {
        int databaseSizeBeforeCreate = antecedentesRepository.findAll().size();

        // Create the Antecedentes
        restAntecedentesMockMvc.perform(post("/api/antecedentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(antecedentes)))
            .andExpect(status().isCreated());

        // Validate the Antecedentes in the database
        List<Antecedentes> antecedentesList = antecedentesRepository.findAll();
        assertThat(antecedentesList).hasSize(databaseSizeBeforeCreate + 1);
        Antecedentes testAntecedentes = antecedentesList.get(antecedentesList.size() - 1);
        assertThat(testAntecedentes.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testAntecedentes.getSoporte()).isEqualTo(DEFAULT_SOPORTE);
    }

    @Test
    @Transactional
    public void createAntecedentesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = antecedentesRepository.findAll().size();

        // Create the Antecedentes with an existing ID
        antecedentes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAntecedentesMockMvc.perform(post("/api/antecedentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(antecedentes)))
            .andExpect(status().isBadRequest());

        // Validate the Antecedentes in the database
        List<Antecedentes> antecedentesList = antecedentesRepository.findAll();
        assertThat(antecedentesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAntecedentes() throws Exception {
        // Initialize the database
        antecedentesRepository.saveAndFlush(antecedentes);

        // Get all the antecedentesList
        restAntecedentesMockMvc.perform(get("/api/antecedentes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(antecedentes.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].soporte").value(hasItem(DEFAULT_SOPORTE.toString())));
    }
    
    @Test
    @Transactional
    public void getAntecedentes() throws Exception {
        // Initialize the database
        antecedentesRepository.saveAndFlush(antecedentes);

        // Get the antecedentes
        restAntecedentesMockMvc.perform(get("/api/antecedentes/{id}", antecedentes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(antecedentes.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.soporte").value(DEFAULT_SOPORTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAntecedentes() throws Exception {
        // Get the antecedentes
        restAntecedentesMockMvc.perform(get("/api/antecedentes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAntecedentes() throws Exception {
        // Initialize the database
        antecedentesRepository.saveAndFlush(antecedentes);

        int databaseSizeBeforeUpdate = antecedentesRepository.findAll().size();

        // Update the antecedentes
        Antecedentes updatedAntecedentes = antecedentesRepository.findById(antecedentes.getId()).get();
        // Disconnect from session so that the updates on updatedAntecedentes are not directly saved in db
        em.detach(updatedAntecedentes);
        updatedAntecedentes
            .tipo(UPDATED_TIPO)
            .soporte(UPDATED_SOPORTE);

        restAntecedentesMockMvc.perform(put("/api/antecedentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAntecedentes)))
            .andExpect(status().isOk());

        // Validate the Antecedentes in the database
        List<Antecedentes> antecedentesList = antecedentesRepository.findAll();
        assertThat(antecedentesList).hasSize(databaseSizeBeforeUpdate);
        Antecedentes testAntecedentes = antecedentesList.get(antecedentesList.size() - 1);
        assertThat(testAntecedentes.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testAntecedentes.getSoporte()).isEqualTo(UPDATED_SOPORTE);
    }

    @Test
    @Transactional
    public void updateNonExistingAntecedentes() throws Exception {
        int databaseSizeBeforeUpdate = antecedentesRepository.findAll().size();

        // Create the Antecedentes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAntecedentesMockMvc.perform(put("/api/antecedentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(antecedentes)))
            .andExpect(status().isBadRequest());

        // Validate the Antecedentes in the database
        List<Antecedentes> antecedentesList = antecedentesRepository.findAll();
        assertThat(antecedentesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAntecedentes() throws Exception {
        // Initialize the database
        antecedentesRepository.saveAndFlush(antecedentes);

        int databaseSizeBeforeDelete = antecedentesRepository.findAll().size();

        // Delete the antecedentes
        restAntecedentesMockMvc.perform(delete("/api/antecedentes/{id}", antecedentes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Antecedentes> antecedentesList = antecedentesRepository.findAll();
        assertThat(antecedentesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Antecedentes.class);
        Antecedentes antecedentes1 = new Antecedentes();
        antecedentes1.setId(1L);
        Antecedentes antecedentes2 = new Antecedentes();
        antecedentes2.setId(antecedentes1.getId());
        assertThat(antecedentes1).isEqualTo(antecedentes2);
        antecedentes2.setId(2L);
        assertThat(antecedentes1).isNotEqualTo(antecedentes2);
        antecedentes1.setId(null);
        assertThat(antecedentes1).isNotEqualTo(antecedentes2);
    }
}

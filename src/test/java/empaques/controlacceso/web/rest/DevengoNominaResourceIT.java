package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.DevengoNomina;
import empaques.controlacceso.repository.DevengoNominaRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static empaques.controlacceso.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DevengoNominaResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class DevengoNominaResourceIT {

    private static final Instant DEFAULT_FECHA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_INICIO = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_FIN = Instant.ofEpochMilli(-1L);

    @Autowired
    private DevengoNominaRepository devengoNominaRepository;

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

    private MockMvc restDevengoNominaMockMvc;

    private DevengoNomina devengoNomina;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DevengoNominaResource devengoNominaResource = new DevengoNominaResource(devengoNominaRepository);
        this.restDevengoNominaMockMvc = MockMvcBuilders.standaloneSetup(devengoNominaResource)
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
    public static DevengoNomina createEntity(EntityManager em) {
        DevengoNomina devengoNomina = new DevengoNomina()
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN);
        return devengoNomina;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DevengoNomina createUpdatedEntity(EntityManager em) {
        DevengoNomina devengoNomina = new DevengoNomina()
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN);
        return devengoNomina;
    }

    @BeforeEach
    public void initTest() {
        devengoNomina = createEntity(em);
    }

    @Test
    @Transactional
    public void createDevengoNomina() throws Exception {
        int databaseSizeBeforeCreate = devengoNominaRepository.findAll().size();

        // Create the DevengoNomina
        restDevengoNominaMockMvc.perform(post("/api/devengo-nominas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devengoNomina)))
            .andExpect(status().isCreated());

        // Validate the DevengoNomina in the database
        List<DevengoNomina> devengoNominaList = devengoNominaRepository.findAll();
        assertThat(devengoNominaList).hasSize(databaseSizeBeforeCreate + 1);
        DevengoNomina testDevengoNomina = devengoNominaList.get(devengoNominaList.size() - 1);
        assertThat(testDevengoNomina.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testDevengoNomina.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
    }

    @Test
    @Transactional
    public void createDevengoNominaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = devengoNominaRepository.findAll().size();

        // Create the DevengoNomina with an existing ID
        devengoNomina.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDevengoNominaMockMvc.perform(post("/api/devengo-nominas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devengoNomina)))
            .andExpect(status().isBadRequest());

        // Validate the DevengoNomina in the database
        List<DevengoNomina> devengoNominaList = devengoNominaRepository.findAll();
        assertThat(devengoNominaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDevengoNominas() throws Exception {
        // Initialize the database
        devengoNominaRepository.saveAndFlush(devengoNomina);

        // Get all the devengoNominaList
        restDevengoNominaMockMvc.perform(get("/api/devengo-nominas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(devengoNomina.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())));
    }
    
    @Test
    @Transactional
    public void getDevengoNomina() throws Exception {
        // Initialize the database
        devengoNominaRepository.saveAndFlush(devengoNomina);

        // Get the devengoNomina
        restDevengoNominaMockMvc.perform(get("/api/devengo-nominas/{id}", devengoNomina.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(devengoNomina.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDevengoNomina() throws Exception {
        // Get the devengoNomina
        restDevengoNominaMockMvc.perform(get("/api/devengo-nominas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDevengoNomina() throws Exception {
        // Initialize the database
        devengoNominaRepository.saveAndFlush(devengoNomina);

        int databaseSizeBeforeUpdate = devengoNominaRepository.findAll().size();

        // Update the devengoNomina
        DevengoNomina updatedDevengoNomina = devengoNominaRepository.findById(devengoNomina.getId()).get();
        // Disconnect from session so that the updates on updatedDevengoNomina are not directly saved in db
        em.detach(updatedDevengoNomina);
        updatedDevengoNomina
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN);

        restDevengoNominaMockMvc.perform(put("/api/devengo-nominas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDevengoNomina)))
            .andExpect(status().isOk());

        // Validate the DevengoNomina in the database
        List<DevengoNomina> devengoNominaList = devengoNominaRepository.findAll();
        assertThat(devengoNominaList).hasSize(databaseSizeBeforeUpdate);
        DevengoNomina testDevengoNomina = devengoNominaList.get(devengoNominaList.size() - 1);
        assertThat(testDevengoNomina.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testDevengoNomina.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingDevengoNomina() throws Exception {
        int databaseSizeBeforeUpdate = devengoNominaRepository.findAll().size();

        // Create the DevengoNomina

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDevengoNominaMockMvc.perform(put("/api/devengo-nominas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devengoNomina)))
            .andExpect(status().isBadRequest());

        // Validate the DevengoNomina in the database
        List<DevengoNomina> devengoNominaList = devengoNominaRepository.findAll();
        assertThat(devengoNominaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDevengoNomina() throws Exception {
        // Initialize the database
        devengoNominaRepository.saveAndFlush(devengoNomina);

        int databaseSizeBeforeDelete = devengoNominaRepository.findAll().size();

        // Delete the devengoNomina
        restDevengoNominaMockMvc.perform(delete("/api/devengo-nominas/{id}", devengoNomina.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DevengoNomina> devengoNominaList = devengoNominaRepository.findAll();
        assertThat(devengoNominaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DevengoNomina.class);
        DevengoNomina devengoNomina1 = new DevengoNomina();
        devengoNomina1.setId(1L);
        DevengoNomina devengoNomina2 = new DevengoNomina();
        devengoNomina2.setId(devengoNomina1.getId());
        assertThat(devengoNomina1).isEqualTo(devengoNomina2);
        devengoNomina2.setId(2L);
        assertThat(devengoNomina1).isNotEqualTo(devengoNomina2);
        devengoNomina1.setId(null);
        assertThat(devengoNomina1).isNotEqualTo(devengoNomina2);
    }
}

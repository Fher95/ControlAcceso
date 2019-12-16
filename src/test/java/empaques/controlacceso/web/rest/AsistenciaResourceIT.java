package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.Asistencia;
import empaques.controlacceso.repository.AsistenciaRepository;
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
 * Integration tests for the {@link AsistenciaResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class AsistenciaResourceIT {

    private static final String DEFAULT_DOCUMENTO_COLABORADOR = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENTO_COLABORADOR = "BBBBBBBBBB";

    private static final Instant DEFAULT_ENTRADA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENTRADA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_ENTRADA = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_SALIDA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SALIDA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_SALIDA = Instant.ofEpochMilli(-1L);

    @Autowired
    private AsistenciaRepository asistenciaRepository;

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

    private MockMvc restAsistenciaMockMvc;

    private Asistencia asistencia;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsistenciaResource asistenciaResource = new AsistenciaResource(asistenciaRepository);
        this.restAsistenciaMockMvc = MockMvcBuilders.standaloneSetup(asistenciaResource)
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
    public static Asistencia createEntity(EntityManager em) {
        Asistencia asistencia = new Asistencia()
            .documentoColaborador(DEFAULT_DOCUMENTO_COLABORADOR)
            .entrada(DEFAULT_ENTRADA)
            .salida(DEFAULT_SALIDA);
        return asistencia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Asistencia createUpdatedEntity(EntityManager em) {
        Asistencia asistencia = new Asistencia()
            .documentoColaborador(UPDATED_DOCUMENTO_COLABORADOR)
            .entrada(UPDATED_ENTRADA)
            .salida(UPDATED_SALIDA);
        return asistencia;
    }

    @BeforeEach
    public void initTest() {
        asistencia = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsistencia() throws Exception {
        int databaseSizeBeforeCreate = asistenciaRepository.findAll().size();

        // Create the Asistencia
        restAsistenciaMockMvc.perform(post("/api/asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistencia)))
            .andExpect(status().isCreated());

        // Validate the Asistencia in the database
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeCreate + 1);
        Asistencia testAsistencia = asistenciaList.get(asistenciaList.size() - 1);
        assertThat(testAsistencia.getDocumentoColaborador()).isEqualTo(DEFAULT_DOCUMENTO_COLABORADOR);
        assertThat(testAsistencia.getEntrada()).isEqualTo(DEFAULT_ENTRADA);
        assertThat(testAsistencia.getSalida()).isEqualTo(DEFAULT_SALIDA);
    }

    @Test
    @Transactional
    public void createAsistenciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asistenciaRepository.findAll().size();

        // Create the Asistencia with an existing ID
        asistencia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsistenciaMockMvc.perform(post("/api/asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistencia)))
            .andExpect(status().isBadRequest());

        // Validate the Asistencia in the database
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAsistencias() throws Exception {
        // Initialize the database
        asistenciaRepository.saveAndFlush(asistencia);

        // Get all the asistenciaList
        restAsistenciaMockMvc.perform(get("/api/asistencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asistencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentoColaborador").value(hasItem(DEFAULT_DOCUMENTO_COLABORADOR.toString())))
            .andExpect(jsonPath("$.[*].entrada").value(hasItem(DEFAULT_ENTRADA.toString())))
            .andExpect(jsonPath("$.[*].salida").value(hasItem(DEFAULT_SALIDA.toString())));
    }
    
    @Test
    @Transactional
    public void getAsistencia() throws Exception {
        // Initialize the database
        asistenciaRepository.saveAndFlush(asistencia);

        // Get the asistencia
        restAsistenciaMockMvc.perform(get("/api/asistencias/{id}", asistencia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asistencia.getId().intValue()))
            .andExpect(jsonPath("$.documentoColaborador").value(DEFAULT_DOCUMENTO_COLABORADOR.toString()))
            .andExpect(jsonPath("$.entrada").value(DEFAULT_ENTRADA.toString()))
            .andExpect(jsonPath("$.salida").value(DEFAULT_SALIDA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAsistencia() throws Exception {
        // Get the asistencia
        restAsistenciaMockMvc.perform(get("/api/asistencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsistencia() throws Exception {
        // Initialize the database
        asistenciaRepository.saveAndFlush(asistencia);

        int databaseSizeBeforeUpdate = asistenciaRepository.findAll().size();

        // Update the asistencia
        Asistencia updatedAsistencia = asistenciaRepository.findById(asistencia.getId()).get();
        // Disconnect from session so that the updates on updatedAsistencia are not directly saved in db
        em.detach(updatedAsistencia);
        updatedAsistencia
            .documentoColaborador(UPDATED_DOCUMENTO_COLABORADOR)
            .entrada(UPDATED_ENTRADA)
            .salida(UPDATED_SALIDA);

        restAsistenciaMockMvc.perform(put("/api/asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsistencia)))
            .andExpect(status().isOk());

        // Validate the Asistencia in the database
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeUpdate);
        Asistencia testAsistencia = asistenciaList.get(asistenciaList.size() - 1);
        assertThat(testAsistencia.getDocumentoColaborador()).isEqualTo(UPDATED_DOCUMENTO_COLABORADOR);
        assertThat(testAsistencia.getEntrada()).isEqualTo(UPDATED_ENTRADA);
        assertThat(testAsistencia.getSalida()).isEqualTo(UPDATED_SALIDA);
    }

    @Test
    @Transactional
    public void updateNonExistingAsistencia() throws Exception {
        int databaseSizeBeforeUpdate = asistenciaRepository.findAll().size();

        // Create the Asistencia

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsistenciaMockMvc.perform(put("/api/asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistencia)))
            .andExpect(status().isBadRequest());

        // Validate the Asistencia in the database
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAsistencia() throws Exception {
        // Initialize the database
        asistenciaRepository.saveAndFlush(asistencia);

        int databaseSizeBeforeDelete = asistenciaRepository.findAll().size();

        // Delete the asistencia
        restAsistenciaMockMvc.perform(delete("/api/asistencias/{id}", asistencia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Asistencia.class);
        Asistencia asistencia1 = new Asistencia();
        asistencia1.setId(1L);
        Asistencia asistencia2 = new Asistencia();
        asistencia2.setId(asistencia1.getId());
        assertThat(asistencia1).isEqualTo(asistencia2);
        asistencia2.setId(2L);
        assertThat(asistencia1).isNotEqualTo(asistencia2);
        asistencia1.setId(null);
        assertThat(asistencia1).isNotEqualTo(asistencia2);
    }
}

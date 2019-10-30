package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.AsignacionHorasExtras;
import empaques.controlacceso.repository.AsignacionHorasExtrasRepository;
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
 * Integration tests for the {@link AsignacionHorasExtrasResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class AsignacionHorasExtrasResourceIT {

    private static final String DEFAULT_JUSTIFICACION = "AAAAAAAAAA";
    private static final String UPDATED_JUSTIFICACION = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_HORA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_HORA_INICIO = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_HORA_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_HORA_FIN = Instant.ofEpochMilli(-1L);

    private static final Boolean DEFAULT_COMPENSATORIO = false;
    private static final Boolean UPDATED_COMPENSATORIO = true;

    private static final String DEFAULT_AUTORIZADAS_POR = "AAAAAAAAAA";
    private static final String UPDATED_AUTORIZADAS_POR = "BBBBBBBBBB";

    @Autowired
    private AsignacionHorasExtrasRepository asignacionHorasExtrasRepository;

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

    private MockMvc restAsignacionHorasExtrasMockMvc;

    private AsignacionHorasExtras asignacionHorasExtras;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsignacionHorasExtrasResource asignacionHorasExtrasResource = new AsignacionHorasExtrasResource(asignacionHorasExtrasRepository);
        this.restAsignacionHorasExtrasMockMvc = MockMvcBuilders.standaloneSetup(asignacionHorasExtrasResource)
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
    public static AsignacionHorasExtras createEntity(EntityManager em) {
        AsignacionHorasExtras asignacionHorasExtras = new AsignacionHorasExtras()
            .justificacion(DEFAULT_JUSTIFICACION)
            .observaciones(DEFAULT_OBSERVACIONES)
            .fecha(DEFAULT_FECHA)
            .horaInicio(DEFAULT_HORA_INICIO)
            .horaFin(DEFAULT_HORA_FIN)
            .compensatorio(DEFAULT_COMPENSATORIO)
            .autorizadasPor(DEFAULT_AUTORIZADAS_POR);
        return asignacionHorasExtras;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AsignacionHorasExtras createUpdatedEntity(EntityManager em) {
        AsignacionHorasExtras asignacionHorasExtras = new AsignacionHorasExtras()
            .justificacion(UPDATED_JUSTIFICACION)
            .observaciones(UPDATED_OBSERVACIONES)
            .fecha(UPDATED_FECHA)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFin(UPDATED_HORA_FIN)
            .compensatorio(UPDATED_COMPENSATORIO)
            .autorizadasPor(UPDATED_AUTORIZADAS_POR);
        return asignacionHorasExtras;
    }

    @BeforeEach
    public void initTest() {
        asignacionHorasExtras = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsignacionHorasExtras() throws Exception {
        int databaseSizeBeforeCreate = asignacionHorasExtrasRepository.findAll().size();

        // Create the AsignacionHorasExtras
        restAsignacionHorasExtrasMockMvc.perform(post("/api/asignacion-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asignacionHorasExtras)))
            .andExpect(status().isCreated());

        // Validate the AsignacionHorasExtras in the database
        List<AsignacionHorasExtras> asignacionHorasExtrasList = asignacionHorasExtrasRepository.findAll();
        assertThat(asignacionHorasExtrasList).hasSize(databaseSizeBeforeCreate + 1);
        AsignacionHorasExtras testAsignacionHorasExtras = asignacionHorasExtrasList.get(asignacionHorasExtrasList.size() - 1);
        assertThat(testAsignacionHorasExtras.getJustificacion()).isEqualTo(DEFAULT_JUSTIFICACION);
        assertThat(testAsignacionHorasExtras.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testAsignacionHorasExtras.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testAsignacionHorasExtras.getHoraInicio()).isEqualTo(DEFAULT_HORA_INICIO);
        assertThat(testAsignacionHorasExtras.getHoraFin()).isEqualTo(DEFAULT_HORA_FIN);
        assertThat(testAsignacionHorasExtras.isCompensatorio()).isEqualTo(DEFAULT_COMPENSATORIO);
        assertThat(testAsignacionHorasExtras.getAutorizadasPor()).isEqualTo(DEFAULT_AUTORIZADAS_POR);
    }

    @Test
    @Transactional
    public void createAsignacionHorasExtrasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asignacionHorasExtrasRepository.findAll().size();

        // Create the AsignacionHorasExtras with an existing ID
        asignacionHorasExtras.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsignacionHorasExtrasMockMvc.perform(post("/api/asignacion-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asignacionHorasExtras)))
            .andExpect(status().isBadRequest());

        // Validate the AsignacionHorasExtras in the database
        List<AsignacionHorasExtras> asignacionHorasExtrasList = asignacionHorasExtrasRepository.findAll();
        assertThat(asignacionHorasExtrasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAsignacionHorasExtras() throws Exception {
        // Initialize the database
        asignacionHorasExtrasRepository.saveAndFlush(asignacionHorasExtras);

        // Get all the asignacionHorasExtrasList
        restAsignacionHorasExtrasMockMvc.perform(get("/api/asignacion-horas-extras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asignacionHorasExtras.getId().intValue())))
            .andExpect(jsonPath("$.[*].justificacion").value(hasItem(DEFAULT_JUSTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].horaInicio").value(hasItem(DEFAULT_HORA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].horaFin").value(hasItem(DEFAULT_HORA_FIN.toString())))
            .andExpect(jsonPath("$.[*].compensatorio").value(hasItem(DEFAULT_COMPENSATORIO.booleanValue())))
            .andExpect(jsonPath("$.[*].autorizadasPor").value(hasItem(DEFAULT_AUTORIZADAS_POR.toString())));
    }
    
    @Test
    @Transactional
    public void getAsignacionHorasExtras() throws Exception {
        // Initialize the database
        asignacionHorasExtrasRepository.saveAndFlush(asignacionHorasExtras);

        // Get the asignacionHorasExtras
        restAsignacionHorasExtrasMockMvc.perform(get("/api/asignacion-horas-extras/{id}", asignacionHorasExtras.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asignacionHorasExtras.getId().intValue()))
            .andExpect(jsonPath("$.justificacion").value(DEFAULT_JUSTIFICACION.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.horaInicio").value(DEFAULT_HORA_INICIO.toString()))
            .andExpect(jsonPath("$.horaFin").value(DEFAULT_HORA_FIN.toString()))
            .andExpect(jsonPath("$.compensatorio").value(DEFAULT_COMPENSATORIO.booleanValue()))
            .andExpect(jsonPath("$.autorizadasPor").value(DEFAULT_AUTORIZADAS_POR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAsignacionHorasExtras() throws Exception {
        // Get the asignacionHorasExtras
        restAsignacionHorasExtrasMockMvc.perform(get("/api/asignacion-horas-extras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsignacionHorasExtras() throws Exception {
        // Initialize the database
        asignacionHorasExtrasRepository.saveAndFlush(asignacionHorasExtras);

        int databaseSizeBeforeUpdate = asignacionHorasExtrasRepository.findAll().size();

        // Update the asignacionHorasExtras
        AsignacionHorasExtras updatedAsignacionHorasExtras = asignacionHorasExtrasRepository.findById(asignacionHorasExtras.getId()).get();
        // Disconnect from session so that the updates on updatedAsignacionHorasExtras are not directly saved in db
        em.detach(updatedAsignacionHorasExtras);
        updatedAsignacionHorasExtras
            .justificacion(UPDATED_JUSTIFICACION)
            .observaciones(UPDATED_OBSERVACIONES)
            .fecha(UPDATED_FECHA)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFin(UPDATED_HORA_FIN)
            .compensatorio(UPDATED_COMPENSATORIO)
            .autorizadasPor(UPDATED_AUTORIZADAS_POR);

        restAsignacionHorasExtrasMockMvc.perform(put("/api/asignacion-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsignacionHorasExtras)))
            .andExpect(status().isOk());

        // Validate the AsignacionHorasExtras in the database
        List<AsignacionHorasExtras> asignacionHorasExtrasList = asignacionHorasExtrasRepository.findAll();
        assertThat(asignacionHorasExtrasList).hasSize(databaseSizeBeforeUpdate);
        AsignacionHorasExtras testAsignacionHorasExtras = asignacionHorasExtrasList.get(asignacionHorasExtrasList.size() - 1);
        assertThat(testAsignacionHorasExtras.getJustificacion()).isEqualTo(UPDATED_JUSTIFICACION);
        assertThat(testAsignacionHorasExtras.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testAsignacionHorasExtras.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testAsignacionHorasExtras.getHoraInicio()).isEqualTo(UPDATED_HORA_INICIO);
        assertThat(testAsignacionHorasExtras.getHoraFin()).isEqualTo(UPDATED_HORA_FIN);
        assertThat(testAsignacionHorasExtras.isCompensatorio()).isEqualTo(UPDATED_COMPENSATORIO);
        assertThat(testAsignacionHorasExtras.getAutorizadasPor()).isEqualTo(UPDATED_AUTORIZADAS_POR);
    }

    @Test
    @Transactional
    public void updateNonExistingAsignacionHorasExtras() throws Exception {
        int databaseSizeBeforeUpdate = asignacionHorasExtrasRepository.findAll().size();

        // Create the AsignacionHorasExtras

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsignacionHorasExtrasMockMvc.perform(put("/api/asignacion-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asignacionHorasExtras)))
            .andExpect(status().isBadRequest());

        // Validate the AsignacionHorasExtras in the database
        List<AsignacionHorasExtras> asignacionHorasExtrasList = asignacionHorasExtrasRepository.findAll();
        assertThat(asignacionHorasExtrasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAsignacionHorasExtras() throws Exception {
        // Initialize the database
        asignacionHorasExtrasRepository.saveAndFlush(asignacionHorasExtras);

        int databaseSizeBeforeDelete = asignacionHorasExtrasRepository.findAll().size();

        // Delete the asignacionHorasExtras
        restAsignacionHorasExtrasMockMvc.perform(delete("/api/asignacion-horas-extras/{id}", asignacionHorasExtras.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AsignacionHorasExtras> asignacionHorasExtrasList = asignacionHorasExtrasRepository.findAll();
        assertThat(asignacionHorasExtrasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AsignacionHorasExtras.class);
        AsignacionHorasExtras asignacionHorasExtras1 = new AsignacionHorasExtras();
        asignacionHorasExtras1.setId(1L);
        AsignacionHorasExtras asignacionHorasExtras2 = new AsignacionHorasExtras();
        asignacionHorasExtras2.setId(asignacionHorasExtras1.getId());
        assertThat(asignacionHorasExtras1).isEqualTo(asignacionHorasExtras2);
        asignacionHorasExtras2.setId(2L);
        assertThat(asignacionHorasExtras1).isNotEqualTo(asignacionHorasExtras2);
        asignacionHorasExtras1.setId(null);
        assertThat(asignacionHorasExtras1).isNotEqualTo(asignacionHorasExtras2);
    }
}

package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.AsistenciaHorasExtras;
import empaques.controlacceso.repository.AsistenciaHorasExtrasRepository;
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
 * Integration tests for the {@link AsistenciaHorasExtrasResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class AsistenciaHorasExtrasResourceIT {

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_HORA_LLEGADA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_LLEGADA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_HORA_LLEGADA = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_HORA_SALIDA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_SALIDA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_HORA_SALIDA = Instant.ofEpochMilli(-1L);

    @Autowired
    private AsistenciaHorasExtrasRepository asistenciaHorasExtrasRepository;

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

    private MockMvc restAsistenciaHorasExtrasMockMvc;

    private AsistenciaHorasExtras asistenciaHorasExtras;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsistenciaHorasExtrasResource asistenciaHorasExtrasResource = new AsistenciaHorasExtrasResource(asistenciaHorasExtrasRepository);
        this.restAsistenciaHorasExtrasMockMvc = MockMvcBuilders.standaloneSetup(asistenciaHorasExtrasResource)
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
    public static AsistenciaHorasExtras createEntity(EntityManager em) {
        AsistenciaHorasExtras asistenciaHorasExtras = new AsistenciaHorasExtras()
            .fecha(DEFAULT_FECHA)
            .horaLlegada(DEFAULT_HORA_LLEGADA)
            .horaSalida(DEFAULT_HORA_SALIDA);
        return asistenciaHorasExtras;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AsistenciaHorasExtras createUpdatedEntity(EntityManager em) {
        AsistenciaHorasExtras asistenciaHorasExtras = new AsistenciaHorasExtras()
            .fecha(UPDATED_FECHA)
            .horaLlegada(UPDATED_HORA_LLEGADA)
            .horaSalida(UPDATED_HORA_SALIDA);
        return asistenciaHorasExtras;
    }

    @BeforeEach
    public void initTest() {
        asistenciaHorasExtras = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsistenciaHorasExtras() throws Exception {
        int databaseSizeBeforeCreate = asistenciaHorasExtrasRepository.findAll().size();

        // Create the AsistenciaHorasExtras
        restAsistenciaHorasExtrasMockMvc.perform(post("/api/asistencia-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistenciaHorasExtras)))
            .andExpect(status().isCreated());

        // Validate the AsistenciaHorasExtras in the database
        List<AsistenciaHorasExtras> asistenciaHorasExtrasList = asistenciaHorasExtrasRepository.findAll();
        assertThat(asistenciaHorasExtrasList).hasSize(databaseSizeBeforeCreate + 1);
        AsistenciaHorasExtras testAsistenciaHorasExtras = asistenciaHorasExtrasList.get(asistenciaHorasExtrasList.size() - 1);
        assertThat(testAsistenciaHorasExtras.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testAsistenciaHorasExtras.getHoraLlegada()).isEqualTo(DEFAULT_HORA_LLEGADA);
        assertThat(testAsistenciaHorasExtras.getHoraSalida()).isEqualTo(DEFAULT_HORA_SALIDA);
    }

    @Test
    @Transactional
    public void createAsistenciaHorasExtrasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asistenciaHorasExtrasRepository.findAll().size();

        // Create the AsistenciaHorasExtras with an existing ID
        asistenciaHorasExtras.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsistenciaHorasExtrasMockMvc.perform(post("/api/asistencia-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistenciaHorasExtras)))
            .andExpect(status().isBadRequest());

        // Validate the AsistenciaHorasExtras in the database
        List<AsistenciaHorasExtras> asistenciaHorasExtrasList = asistenciaHorasExtrasRepository.findAll();
        assertThat(asistenciaHorasExtrasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAsistenciaHorasExtras() throws Exception {
        // Initialize the database
        asistenciaHorasExtrasRepository.saveAndFlush(asistenciaHorasExtras);

        // Get all the asistenciaHorasExtrasList
        restAsistenciaHorasExtrasMockMvc.perform(get("/api/asistencia-horas-extras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asistenciaHorasExtras.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].horaLlegada").value(hasItem(DEFAULT_HORA_LLEGADA.toString())))
            .andExpect(jsonPath("$.[*].horaSalida").value(hasItem(DEFAULT_HORA_SALIDA.toString())));
    }
    
    @Test
    @Transactional
    public void getAsistenciaHorasExtras() throws Exception {
        // Initialize the database
        asistenciaHorasExtrasRepository.saveAndFlush(asistenciaHorasExtras);

        // Get the asistenciaHorasExtras
        restAsistenciaHorasExtrasMockMvc.perform(get("/api/asistencia-horas-extras/{id}", asistenciaHorasExtras.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asistenciaHorasExtras.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.horaLlegada").value(DEFAULT_HORA_LLEGADA.toString()))
            .andExpect(jsonPath("$.horaSalida").value(DEFAULT_HORA_SALIDA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAsistenciaHorasExtras() throws Exception {
        // Get the asistenciaHorasExtras
        restAsistenciaHorasExtrasMockMvc.perform(get("/api/asistencia-horas-extras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsistenciaHorasExtras() throws Exception {
        // Initialize the database
        asistenciaHorasExtrasRepository.saveAndFlush(asistenciaHorasExtras);

        int databaseSizeBeforeUpdate = asistenciaHorasExtrasRepository.findAll().size();

        // Update the asistenciaHorasExtras
        AsistenciaHorasExtras updatedAsistenciaHorasExtras = asistenciaHorasExtrasRepository.findById(asistenciaHorasExtras.getId()).get();
        // Disconnect from session so that the updates on updatedAsistenciaHorasExtras are not directly saved in db
        em.detach(updatedAsistenciaHorasExtras);
        updatedAsistenciaHorasExtras
            .fecha(UPDATED_FECHA)
            .horaLlegada(UPDATED_HORA_LLEGADA)
            .horaSalida(UPDATED_HORA_SALIDA);

        restAsistenciaHorasExtrasMockMvc.perform(put("/api/asistencia-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsistenciaHorasExtras)))
            .andExpect(status().isOk());

        // Validate the AsistenciaHorasExtras in the database
        List<AsistenciaHorasExtras> asistenciaHorasExtrasList = asistenciaHorasExtrasRepository.findAll();
        assertThat(asistenciaHorasExtrasList).hasSize(databaseSizeBeforeUpdate);
        AsistenciaHorasExtras testAsistenciaHorasExtras = asistenciaHorasExtrasList.get(asistenciaHorasExtrasList.size() - 1);
        assertThat(testAsistenciaHorasExtras.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testAsistenciaHorasExtras.getHoraLlegada()).isEqualTo(UPDATED_HORA_LLEGADA);
        assertThat(testAsistenciaHorasExtras.getHoraSalida()).isEqualTo(UPDATED_HORA_SALIDA);
    }

    @Test
    @Transactional
    public void updateNonExistingAsistenciaHorasExtras() throws Exception {
        int databaseSizeBeforeUpdate = asistenciaHorasExtrasRepository.findAll().size();

        // Create the AsistenciaHorasExtras

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsistenciaHorasExtrasMockMvc.perform(put("/api/asistencia-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistenciaHorasExtras)))
            .andExpect(status().isBadRequest());

        // Validate the AsistenciaHorasExtras in the database
        List<AsistenciaHorasExtras> asistenciaHorasExtrasList = asistenciaHorasExtrasRepository.findAll();
        assertThat(asistenciaHorasExtrasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAsistenciaHorasExtras() throws Exception {
        // Initialize the database
        asistenciaHorasExtrasRepository.saveAndFlush(asistenciaHorasExtras);

        int databaseSizeBeforeDelete = asistenciaHorasExtrasRepository.findAll().size();

        // Delete the asistenciaHorasExtras
        restAsistenciaHorasExtrasMockMvc.perform(delete("/api/asistencia-horas-extras/{id}", asistenciaHorasExtras.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AsistenciaHorasExtras> asistenciaHorasExtrasList = asistenciaHorasExtrasRepository.findAll();
        assertThat(asistenciaHorasExtrasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AsistenciaHorasExtras.class);
        AsistenciaHorasExtras asistenciaHorasExtras1 = new AsistenciaHorasExtras();
        asistenciaHorasExtras1.setId(1L);
        AsistenciaHorasExtras asistenciaHorasExtras2 = new AsistenciaHorasExtras();
        asistenciaHorasExtras2.setId(asistenciaHorasExtras1.getId());
        assertThat(asistenciaHorasExtras1).isEqualTo(asistenciaHorasExtras2);
        asistenciaHorasExtras2.setId(2L);
        assertThat(asistenciaHorasExtras1).isNotEqualTo(asistenciaHorasExtras2);
        asistenciaHorasExtras1.setId(null);
        assertThat(asistenciaHorasExtras1).isNotEqualTo(asistenciaHorasExtras2);
    }
}

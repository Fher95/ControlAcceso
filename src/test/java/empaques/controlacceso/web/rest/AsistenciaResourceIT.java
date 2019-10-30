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

    private static final String DEFAULT_NOMBRE_1 = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_2 = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO_1 = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO_1 = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO_2 = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO_2 = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_TURNO = "AAAAAAAAAA";
    private static final String UPDATED_TURNO = "BBBBBBBBBB";

    private static final Instant DEFAULT_ENTRADA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENTRADA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_ENTRADA = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_SALIDA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SALIDA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_SALIDA = Instant.ofEpochMilli(-1L);

    private static final Boolean DEFAULT_SIN_ENTRADA = false;
    private static final Boolean UPDATED_SIN_ENTRADA = true;

    private static final Boolean DEFAULT_SIN_SALIDA = false;
    private static final Boolean UPDATED_SIN_SALIDA = true;

    private static final Boolean DEFAULT_AUSENTE = false;
    private static final Boolean UPDATED_AUSENTE = true;

    private static final Integer DEFAULT_MINUTOS_TRABAJADOS = 1;
    private static final Integer UPDATED_MINUTOS_TRABAJADOS = 2;
    private static final Integer SMALLER_MINUTOS_TRABAJADOS = 1 - 1;

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
            .nombre1(DEFAULT_NOMBRE_1)
            .nombre2(DEFAULT_NOMBRE_2)
            .apellido1(DEFAULT_APELLIDO_1)
            .apellido2(DEFAULT_APELLIDO_2)
            .fecha(DEFAULT_FECHA)
            .turno(DEFAULT_TURNO)
            .entrada(DEFAULT_ENTRADA)
            .salida(DEFAULT_SALIDA)
            .sinEntrada(DEFAULT_SIN_ENTRADA)
            .sinSalida(DEFAULT_SIN_SALIDA)
            .ausente(DEFAULT_AUSENTE)
            .minutosTrabajados(DEFAULT_MINUTOS_TRABAJADOS);
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
            .nombre1(UPDATED_NOMBRE_1)
            .nombre2(UPDATED_NOMBRE_2)
            .apellido1(UPDATED_APELLIDO_1)
            .apellido2(UPDATED_APELLIDO_2)
            .fecha(UPDATED_FECHA)
            .turno(UPDATED_TURNO)
            .entrada(UPDATED_ENTRADA)
            .salida(UPDATED_SALIDA)
            .sinEntrada(UPDATED_SIN_ENTRADA)
            .sinSalida(UPDATED_SIN_SALIDA)
            .ausente(UPDATED_AUSENTE)
            .minutosTrabajados(UPDATED_MINUTOS_TRABAJADOS);
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
        assertThat(testAsistencia.getNombre1()).isEqualTo(DEFAULT_NOMBRE_1);
        assertThat(testAsistencia.getNombre2()).isEqualTo(DEFAULT_NOMBRE_2);
        assertThat(testAsistencia.getApellido1()).isEqualTo(DEFAULT_APELLIDO_1);
        assertThat(testAsistencia.getApellido2()).isEqualTo(DEFAULT_APELLIDO_2);
        assertThat(testAsistencia.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testAsistencia.getTurno()).isEqualTo(DEFAULT_TURNO);
        assertThat(testAsistencia.getEntrada()).isEqualTo(DEFAULT_ENTRADA);
        assertThat(testAsistencia.getSalida()).isEqualTo(DEFAULT_SALIDA);
        assertThat(testAsistencia.isSinEntrada()).isEqualTo(DEFAULT_SIN_ENTRADA);
        assertThat(testAsistencia.isSinSalida()).isEqualTo(DEFAULT_SIN_SALIDA);
        assertThat(testAsistencia.isAusente()).isEqualTo(DEFAULT_AUSENTE);
        assertThat(testAsistencia.getMinutosTrabajados()).isEqualTo(DEFAULT_MINUTOS_TRABAJADOS);
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
            .andExpect(jsonPath("$.[*].nombre1").value(hasItem(DEFAULT_NOMBRE_1.toString())))
            .andExpect(jsonPath("$.[*].nombre2").value(hasItem(DEFAULT_NOMBRE_2.toString())))
            .andExpect(jsonPath("$.[*].apellido1").value(hasItem(DEFAULT_APELLIDO_1.toString())))
            .andExpect(jsonPath("$.[*].apellido2").value(hasItem(DEFAULT_APELLIDO_2.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].turno").value(hasItem(DEFAULT_TURNO.toString())))
            .andExpect(jsonPath("$.[*].entrada").value(hasItem(DEFAULT_ENTRADA.toString())))
            .andExpect(jsonPath("$.[*].salida").value(hasItem(DEFAULT_SALIDA.toString())))
            .andExpect(jsonPath("$.[*].sinEntrada").value(hasItem(DEFAULT_SIN_ENTRADA.booleanValue())))
            .andExpect(jsonPath("$.[*].sinSalida").value(hasItem(DEFAULT_SIN_SALIDA.booleanValue())))
            .andExpect(jsonPath("$.[*].ausente").value(hasItem(DEFAULT_AUSENTE.booleanValue())))
            .andExpect(jsonPath("$.[*].minutosTrabajados").value(hasItem(DEFAULT_MINUTOS_TRABAJADOS)));
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
            .andExpect(jsonPath("$.nombre1").value(DEFAULT_NOMBRE_1.toString()))
            .andExpect(jsonPath("$.nombre2").value(DEFAULT_NOMBRE_2.toString()))
            .andExpect(jsonPath("$.apellido1").value(DEFAULT_APELLIDO_1.toString()))
            .andExpect(jsonPath("$.apellido2").value(DEFAULT_APELLIDO_2.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.turno").value(DEFAULT_TURNO.toString()))
            .andExpect(jsonPath("$.entrada").value(DEFAULT_ENTRADA.toString()))
            .andExpect(jsonPath("$.salida").value(DEFAULT_SALIDA.toString()))
            .andExpect(jsonPath("$.sinEntrada").value(DEFAULT_SIN_ENTRADA.booleanValue()))
            .andExpect(jsonPath("$.sinSalida").value(DEFAULT_SIN_SALIDA.booleanValue()))
            .andExpect(jsonPath("$.ausente").value(DEFAULT_AUSENTE.booleanValue()))
            .andExpect(jsonPath("$.minutosTrabajados").value(DEFAULT_MINUTOS_TRABAJADOS));
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
            .nombre1(UPDATED_NOMBRE_1)
            .nombre2(UPDATED_NOMBRE_2)
            .apellido1(UPDATED_APELLIDO_1)
            .apellido2(UPDATED_APELLIDO_2)
            .fecha(UPDATED_FECHA)
            .turno(UPDATED_TURNO)
            .entrada(UPDATED_ENTRADA)
            .salida(UPDATED_SALIDA)
            .sinEntrada(UPDATED_SIN_ENTRADA)
            .sinSalida(UPDATED_SIN_SALIDA)
            .ausente(UPDATED_AUSENTE)
            .minutosTrabajados(UPDATED_MINUTOS_TRABAJADOS);

        restAsistenciaMockMvc.perform(put("/api/asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsistencia)))
            .andExpect(status().isOk());

        // Validate the Asistencia in the database
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeUpdate);
        Asistencia testAsistencia = asistenciaList.get(asistenciaList.size() - 1);
        assertThat(testAsistencia.getNombre1()).isEqualTo(UPDATED_NOMBRE_1);
        assertThat(testAsistencia.getNombre2()).isEqualTo(UPDATED_NOMBRE_2);
        assertThat(testAsistencia.getApellido1()).isEqualTo(UPDATED_APELLIDO_1);
        assertThat(testAsistencia.getApellido2()).isEqualTo(UPDATED_APELLIDO_2);
        assertThat(testAsistencia.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testAsistencia.getTurno()).isEqualTo(UPDATED_TURNO);
        assertThat(testAsistencia.getEntrada()).isEqualTo(UPDATED_ENTRADA);
        assertThat(testAsistencia.getSalida()).isEqualTo(UPDATED_SALIDA);
        assertThat(testAsistencia.isSinEntrada()).isEqualTo(UPDATED_SIN_ENTRADA);
        assertThat(testAsistencia.isSinSalida()).isEqualTo(UPDATED_SIN_SALIDA);
        assertThat(testAsistencia.isAusente()).isEqualTo(UPDATED_AUSENTE);
        assertThat(testAsistencia.getMinutosTrabajados()).isEqualTo(UPDATED_MINUTOS_TRABAJADOS);
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

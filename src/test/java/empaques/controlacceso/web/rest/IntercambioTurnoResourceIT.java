package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.IntercambioTurno;
import empaques.controlacceso.repository.IntercambioTurnoRepository;
import empaques.controlacceso.repository.PlanificacionAsistenciaRepository;
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
 * Integration tests for the {@link IntercambioTurnoResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class IntercambioTurnoResourceIT {

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_FIN = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_AUTORIZADO_POR = "AAAAAAAAAA";
    private static final String UPDATED_AUTORIZADO_POR = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private IntercambioTurnoRepository intercambioTurnoRepository;
    
    @Autowired
    private PlanificacionAsistenciaRepository planificacionAsistenciaRepository;

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

    private MockMvc restIntercambioTurnoMockMvc;

    private IntercambioTurno intercambioTurno;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IntercambioTurnoResource intercambioTurnoResource = new IntercambioTurnoResource(intercambioTurnoRepository, 
                planificacionAsistenciaRepository);
        this.restIntercambioTurnoMockMvc = MockMvcBuilders.standaloneSetup(intercambioTurnoResource)
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
    public static IntercambioTurno createEntity(EntityManager em) {
        IntercambioTurno intercambioTurno = new IntercambioTurno()
            .fecha(DEFAULT_FECHA)
            .fechaFin(DEFAULT_FECHA_FIN)
            .autorizadoPor(DEFAULT_AUTORIZADO_POR)
            .observaciones(DEFAULT_OBSERVACIONES);
        return intercambioTurno;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IntercambioTurno createUpdatedEntity(EntityManager em) {
        IntercambioTurno intercambioTurno = new IntercambioTurno()
            .fecha(UPDATED_FECHA)
            .fechaFin(UPDATED_FECHA_FIN)
            .autorizadoPor(UPDATED_AUTORIZADO_POR)
            .observaciones(UPDATED_OBSERVACIONES);
        return intercambioTurno;
    }

    @BeforeEach
    public void initTest() {
        intercambioTurno = createEntity(em);
    }

    @Test
    @Transactional
    public void createIntercambioTurno() throws Exception {
        int databaseSizeBeforeCreate = intercambioTurnoRepository.findAll().size();

        // Create the IntercambioTurno
        restIntercambioTurnoMockMvc.perform(post("/api/intercambio-turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intercambioTurno)))
            .andExpect(status().isCreated());

        // Validate the IntercambioTurno in the database
        List<IntercambioTurno> intercambioTurnoList = intercambioTurnoRepository.findAll();
        assertThat(intercambioTurnoList).hasSize(databaseSizeBeforeCreate + 1);
        IntercambioTurno testIntercambioTurno = intercambioTurnoList.get(intercambioTurnoList.size() - 1);
        assertThat(testIntercambioTurno.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testIntercambioTurno.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
        assertThat(testIntercambioTurno.getAutorizadoPor()).isEqualTo(DEFAULT_AUTORIZADO_POR);
        assertThat(testIntercambioTurno.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void createIntercambioTurnoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = intercambioTurnoRepository.findAll().size();

        // Create the IntercambioTurno with an existing ID
        intercambioTurno.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIntercambioTurnoMockMvc.perform(post("/api/intercambio-turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intercambioTurno)))
            .andExpect(status().isBadRequest());

        // Validate the IntercambioTurno in the database
        List<IntercambioTurno> intercambioTurnoList = intercambioTurnoRepository.findAll();
        assertThat(intercambioTurnoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllIntercambioTurnos() throws Exception {
        // Initialize the database
        intercambioTurnoRepository.saveAndFlush(intercambioTurno);

        // Get all the intercambioTurnoList
        restIntercambioTurnoMockMvc.perform(get("/api/intercambio-turnos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(intercambioTurno.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].autorizadoPor").value(hasItem(DEFAULT_AUTORIZADO_POR.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }
    
    @Test
    @Transactional
    public void getIntercambioTurno() throws Exception {
        // Initialize the database
        intercambioTurnoRepository.saveAndFlush(intercambioTurno);

        // Get the intercambioTurno
        restIntercambioTurnoMockMvc.perform(get("/api/intercambio-turnos/{id}", intercambioTurno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(intercambioTurno.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()))
            .andExpect(jsonPath("$.autorizadoPor").value(DEFAULT_AUTORIZADO_POR.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIntercambioTurno() throws Exception {
        // Get the intercambioTurno
        restIntercambioTurnoMockMvc.perform(get("/api/intercambio-turnos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIntercambioTurno() throws Exception {
        // Initialize the database
        intercambioTurnoRepository.saveAndFlush(intercambioTurno);

        int databaseSizeBeforeUpdate = intercambioTurnoRepository.findAll().size();

        // Update the intercambioTurno
        IntercambioTurno updatedIntercambioTurno = intercambioTurnoRepository.findById(intercambioTurno.getId()).get();
        // Disconnect from session so that the updates on updatedIntercambioTurno are not directly saved in db
        em.detach(updatedIntercambioTurno);
        updatedIntercambioTurno
            .fecha(UPDATED_FECHA)
            .fechaFin(UPDATED_FECHA_FIN)
            .autorizadoPor(UPDATED_AUTORIZADO_POR)
            .observaciones(UPDATED_OBSERVACIONES);

        restIntercambioTurnoMockMvc.perform(put("/api/intercambio-turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIntercambioTurno)))
            .andExpect(status().isOk());

        // Validate the IntercambioTurno in the database
        List<IntercambioTurno> intercambioTurnoList = intercambioTurnoRepository.findAll();
        assertThat(intercambioTurnoList).hasSize(databaseSizeBeforeUpdate);
        IntercambioTurno testIntercambioTurno = intercambioTurnoList.get(intercambioTurnoList.size() - 1);
        assertThat(testIntercambioTurno.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testIntercambioTurno.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
        assertThat(testIntercambioTurno.getAutorizadoPor()).isEqualTo(UPDATED_AUTORIZADO_POR);
        assertThat(testIntercambioTurno.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void updateNonExistingIntercambioTurno() throws Exception {
        int databaseSizeBeforeUpdate = intercambioTurnoRepository.findAll().size();

        // Create the IntercambioTurno

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIntercambioTurnoMockMvc.perform(put("/api/intercambio-turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intercambioTurno)))
            .andExpect(status().isBadRequest());

        // Validate the IntercambioTurno in the database
        List<IntercambioTurno> intercambioTurnoList = intercambioTurnoRepository.findAll();
        assertThat(intercambioTurnoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIntercambioTurno() throws Exception {
        // Initialize the database
        intercambioTurnoRepository.saveAndFlush(intercambioTurno);

        int databaseSizeBeforeDelete = intercambioTurnoRepository.findAll().size();

        // Delete the intercambioTurno
        restIntercambioTurnoMockMvc.perform(delete("/api/intercambio-turnos/{id}", intercambioTurno.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<IntercambioTurno> intercambioTurnoList = intercambioTurnoRepository.findAll();
        assertThat(intercambioTurnoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntercambioTurno.class);
        IntercambioTurno intercambioTurno1 = new IntercambioTurno();
        intercambioTurno1.setId(1L);
        IntercambioTurno intercambioTurno2 = new IntercambioTurno();
        intercambioTurno2.setId(intercambioTurno1.getId());
        assertThat(intercambioTurno1).isEqualTo(intercambioTurno2);
        intercambioTurno2.setId(2L);
        assertThat(intercambioTurno1).isNotEqualTo(intercambioTurno2);
        intercambioTurno1.setId(null);
        assertThat(intercambioTurno1).isNotEqualTo(intercambioTurno2);
    }
}

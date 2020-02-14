package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.PlanificacionAsistencia;
import empaques.controlacceso.repository.AsignacionTurnoRepository;
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
 * Integration tests for the {@link PlanificacionAsistenciaResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class PlanificacionAsistenciaResourceIT {

    private static final Instant DEFAULT_FECHA_INICIO_PLANIFICACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INICIO_PLANIFICACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_INICIO_PLANIFICACION = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_FIN_PLANIFICACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_FIN_PLANIFICACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_FIN_PLANIFICACION = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_ASISTENCIA_TURNO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_ASISTENCIA_TURNO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_ASISTENCIA_TURNO = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_HORA_INICIO_TURNO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_INICIO_TURNO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_HORA_INICIO_TURNO = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_HORA_FIN_TURNO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_FIN_TURNO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_HORA_FIN_TURNO = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_NOMBRE_CARGO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_CARGO = "BBBBBBBBBB";

    private static final String DEFAULT_TIPOS_ASISTENCIA = "AAAAAAAAAA";
    private static final String UPDATED_TIPOS_ASISTENCIA = "BBBBBBBBBB";

    private static final String DEFAULT_MINUTOS_DIFERENCIA = "AAAAAAAAAA";
    private static final String UPDATED_MINUTOS_DIFERENCIA = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_TURNO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TURNO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_INASISTENCIA_JUSTIFICADA = false;
    private static final Boolean UPDATED_INASISTENCIA_JUSTIFICADA = true;

    @Autowired
    private PlanificacionAsistenciaRepository planificacionAsistenciaRepository;

    @Autowired
    private AsignacionTurnoRepository asignacionTurnoRepository;

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

    private MockMvc restPlanificacionAsistenciaMockMvc;

    private PlanificacionAsistencia planificacionAsistencia;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlanificacionAsistenciaResource planificacionAsistenciaResource = new PlanificacionAsistenciaResource(planificacionAsistenciaRepository,
        asignacionTurnoRepository);
        this.restPlanificacionAsistenciaMockMvc = MockMvcBuilders.standaloneSetup(planificacionAsistenciaResource)
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
    public static PlanificacionAsistencia createEntity(EntityManager em) {
        PlanificacionAsistencia planificacionAsistencia = new PlanificacionAsistencia()
            .fechaInicioPlanificacion(DEFAULT_FECHA_INICIO_PLANIFICACION)
            .fechaFinPlanificacion(DEFAULT_FECHA_FIN_PLANIFICACION)
            .fechaAsistenciaTurno(DEFAULT_FECHA_ASISTENCIA_TURNO)
            .horaInicioTurno(DEFAULT_HORA_INICIO_TURNO)
            .horaFinTurno(DEFAULT_HORA_FIN_TURNO)
            .nombreCargo(DEFAULT_NOMBRE_CARGO)
            .tiposAsistencia(DEFAULT_TIPOS_ASISTENCIA)
            .minutosDiferencia(DEFAULT_MINUTOS_DIFERENCIA)
            .nombreTurno(DEFAULT_NOMBRE_TURNO)
            .inasistenciaJustificada(DEFAULT_INASISTENCIA_JUSTIFICADA);
        return planificacionAsistencia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanificacionAsistencia createUpdatedEntity(EntityManager em) {
        PlanificacionAsistencia planificacionAsistencia = new PlanificacionAsistencia()
            .fechaInicioPlanificacion(UPDATED_FECHA_INICIO_PLANIFICACION)
            .fechaFinPlanificacion(UPDATED_FECHA_FIN_PLANIFICACION)
            .fechaAsistenciaTurno(UPDATED_FECHA_ASISTENCIA_TURNO)
            .horaInicioTurno(UPDATED_HORA_INICIO_TURNO)
            .horaFinTurno(UPDATED_HORA_FIN_TURNO)
            .nombreCargo(UPDATED_NOMBRE_CARGO)
            .tiposAsistencia(UPDATED_TIPOS_ASISTENCIA)
            .minutosDiferencia(UPDATED_MINUTOS_DIFERENCIA)
            .nombreTurno(UPDATED_NOMBRE_TURNO)
            .inasistenciaJustificada(UPDATED_INASISTENCIA_JUSTIFICADA);
        return planificacionAsistencia;
    }

    @BeforeEach
    public void initTest() {
        planificacionAsistencia = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlanificacionAsistencia() throws Exception {
        int databaseSizeBeforeCreate = planificacionAsistenciaRepository.findAll().size();

        // Create the PlanificacionAsistencia
        restPlanificacionAsistenciaMockMvc.perform(post("/api/planificacion-asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planificacionAsistencia)))
            .andExpect(status().isCreated());

        // Validate the PlanificacionAsistencia in the database
        List<PlanificacionAsistencia> planificacionAsistenciaList = planificacionAsistenciaRepository.findAll();
        assertThat(planificacionAsistenciaList).hasSize(databaseSizeBeforeCreate + 1);
        PlanificacionAsistencia testPlanificacionAsistencia = planificacionAsistenciaList.get(planificacionAsistenciaList.size() - 1);
        assertThat(testPlanificacionAsistencia.getFechaInicioPlanificacion()).isEqualTo(DEFAULT_FECHA_INICIO_PLANIFICACION);
        assertThat(testPlanificacionAsistencia.getFechaFinPlanificacion()).isEqualTo(DEFAULT_FECHA_FIN_PLANIFICACION);
        assertThat(testPlanificacionAsistencia.getFechaAsistenciaTurno()).isEqualTo(DEFAULT_FECHA_ASISTENCIA_TURNO);
        assertThat(testPlanificacionAsistencia.getHoraInicioTurno()).isEqualTo(DEFAULT_HORA_INICIO_TURNO);
        assertThat(testPlanificacionAsistencia.getHoraFinTurno()).isEqualTo(DEFAULT_HORA_FIN_TURNO);
        assertThat(testPlanificacionAsistencia.getNombreCargo()).isEqualTo(DEFAULT_NOMBRE_CARGO);
        assertThat(testPlanificacionAsistencia.getTiposAsistencia()).isEqualTo(DEFAULT_TIPOS_ASISTENCIA);
        assertThat(testPlanificacionAsistencia.getMinutosDiferencia()).isEqualTo(DEFAULT_MINUTOS_DIFERENCIA);
        assertThat(testPlanificacionAsistencia.getNombreTurno()).isEqualTo(DEFAULT_NOMBRE_TURNO);
        assertThat(testPlanificacionAsistencia.isInasistenciaJustificada()).isEqualTo(DEFAULT_INASISTENCIA_JUSTIFICADA);
    }

    @Test
    @Transactional
    public void createPlanificacionAsistenciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planificacionAsistenciaRepository.findAll().size();

        // Create the PlanificacionAsistencia with an existing ID
        planificacionAsistencia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanificacionAsistenciaMockMvc.perform(post("/api/planificacion-asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planificacionAsistencia)))
            .andExpect(status().isBadRequest());

        // Validate the PlanificacionAsistencia in the database
        List<PlanificacionAsistencia> planificacionAsistenciaList = planificacionAsistenciaRepository.findAll();
        assertThat(planificacionAsistenciaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlanificacionAsistencias() throws Exception {
        // Initialize the database
        planificacionAsistenciaRepository.saveAndFlush(planificacionAsistencia);

        // Get all the planificacionAsistenciaList
        restPlanificacionAsistenciaMockMvc.perform(get("/api/planificacion-asistencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planificacionAsistencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicioPlanificacion").value(hasItem(DEFAULT_FECHA_INICIO_PLANIFICACION.toString())))
            .andExpect(jsonPath("$.[*].fechaFinPlanificacion").value(hasItem(DEFAULT_FECHA_FIN_PLANIFICACION.toString())))
            .andExpect(jsonPath("$.[*].fechaAsistenciaTurno").value(hasItem(DEFAULT_FECHA_ASISTENCIA_TURNO.toString())))
            .andExpect(jsonPath("$.[*].horaInicioTurno").value(hasItem(DEFAULT_HORA_INICIO_TURNO.toString())))
            .andExpect(jsonPath("$.[*].horaFinTurno").value(hasItem(DEFAULT_HORA_FIN_TURNO.toString())))
            .andExpect(jsonPath("$.[*].nombreCargo").value(hasItem(DEFAULT_NOMBRE_CARGO.toString())))
            .andExpect(jsonPath("$.[*].tiposAsistencia").value(hasItem(DEFAULT_TIPOS_ASISTENCIA.toString())))
            .andExpect(jsonPath("$.[*].minutosDiferencia").value(hasItem(DEFAULT_MINUTOS_DIFERENCIA.toString())))
            .andExpect(jsonPath("$.[*].nombreTurno").value(hasItem(DEFAULT_NOMBRE_TURNO.toString())))
            .andExpect(jsonPath("$.[*].inasistenciaJustificada").value(hasItem(DEFAULT_INASISTENCIA_JUSTIFICADA.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPlanificacionAsistencia() throws Exception {
        // Initialize the database
        planificacionAsistenciaRepository.saveAndFlush(planificacionAsistencia);

        // Get the planificacionAsistencia
        restPlanificacionAsistenciaMockMvc.perform(get("/api/planificacion-asistencias/{id}", planificacionAsistencia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(planificacionAsistencia.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicioPlanificacion").value(DEFAULT_FECHA_INICIO_PLANIFICACION.toString()))
            .andExpect(jsonPath("$.fechaFinPlanificacion").value(DEFAULT_FECHA_FIN_PLANIFICACION.toString()))
            .andExpect(jsonPath("$.fechaAsistenciaTurno").value(DEFAULT_FECHA_ASISTENCIA_TURNO.toString()))
            .andExpect(jsonPath("$.horaInicioTurno").value(DEFAULT_HORA_INICIO_TURNO.toString()))
            .andExpect(jsonPath("$.horaFinTurno").value(DEFAULT_HORA_FIN_TURNO.toString()))
            .andExpect(jsonPath("$.nombreCargo").value(DEFAULT_NOMBRE_CARGO.toString()))
            .andExpect(jsonPath("$.tiposAsistencia").value(DEFAULT_TIPOS_ASISTENCIA.toString()))
            .andExpect(jsonPath("$.minutosDiferencia").value(DEFAULT_MINUTOS_DIFERENCIA.toString()))
            .andExpect(jsonPath("$.nombreTurno").value(DEFAULT_NOMBRE_TURNO.toString()))
            .andExpect(jsonPath("$.inasistenciaJustificada").value(DEFAULT_INASISTENCIA_JUSTIFICADA.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPlanificacionAsistencia() throws Exception {
        // Get the planificacionAsistencia
        restPlanificacionAsistenciaMockMvc.perform(get("/api/planificacion-asistencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlanificacionAsistencia() throws Exception {
        // Initialize the database
        planificacionAsistenciaRepository.saveAndFlush(planificacionAsistencia);

        int databaseSizeBeforeUpdate = planificacionAsistenciaRepository.findAll().size();

        // Update the planificacionAsistencia
        PlanificacionAsistencia updatedPlanificacionAsistencia = planificacionAsistenciaRepository.findById(planificacionAsistencia.getId()).get();
        // Disconnect from session so that the updates on updatedPlanificacionAsistencia are not directly saved in db
        em.detach(updatedPlanificacionAsistencia);
        updatedPlanificacionAsistencia
            .fechaInicioPlanificacion(UPDATED_FECHA_INICIO_PLANIFICACION)
            .fechaFinPlanificacion(UPDATED_FECHA_FIN_PLANIFICACION)
            .fechaAsistenciaTurno(UPDATED_FECHA_ASISTENCIA_TURNO)
            .horaInicioTurno(UPDATED_HORA_INICIO_TURNO)
            .horaFinTurno(UPDATED_HORA_FIN_TURNO)
            .nombreCargo(UPDATED_NOMBRE_CARGO)
            .tiposAsistencia(UPDATED_TIPOS_ASISTENCIA)
            .minutosDiferencia(UPDATED_MINUTOS_DIFERENCIA)
            .nombreTurno(UPDATED_NOMBRE_TURNO)
            .inasistenciaJustificada(UPDATED_INASISTENCIA_JUSTIFICADA);

        restPlanificacionAsistenciaMockMvc.perform(put("/api/planificacion-asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlanificacionAsistencia)))
            .andExpect(status().isOk());

        // Validate the PlanificacionAsistencia in the database
        List<PlanificacionAsistencia> planificacionAsistenciaList = planificacionAsistenciaRepository.findAll();
        assertThat(planificacionAsistenciaList).hasSize(databaseSizeBeforeUpdate);
        PlanificacionAsistencia testPlanificacionAsistencia = planificacionAsistenciaList.get(planificacionAsistenciaList.size() - 1);
        assertThat(testPlanificacionAsistencia.getFechaInicioPlanificacion()).isEqualTo(UPDATED_FECHA_INICIO_PLANIFICACION);
        assertThat(testPlanificacionAsistencia.getFechaFinPlanificacion()).isEqualTo(UPDATED_FECHA_FIN_PLANIFICACION);
        assertThat(testPlanificacionAsistencia.getFechaAsistenciaTurno()).isEqualTo(UPDATED_FECHA_ASISTENCIA_TURNO);
        assertThat(testPlanificacionAsistencia.getHoraInicioTurno()).isEqualTo(UPDATED_HORA_INICIO_TURNO);
        assertThat(testPlanificacionAsistencia.getHoraFinTurno()).isEqualTo(UPDATED_HORA_FIN_TURNO);
        assertThat(testPlanificacionAsistencia.getNombreCargo()).isEqualTo(UPDATED_NOMBRE_CARGO);
        assertThat(testPlanificacionAsistencia.getTiposAsistencia()).isEqualTo(UPDATED_TIPOS_ASISTENCIA);
        assertThat(testPlanificacionAsistencia.getMinutosDiferencia()).isEqualTo(UPDATED_MINUTOS_DIFERENCIA);
        assertThat(testPlanificacionAsistencia.getNombreTurno()).isEqualTo(UPDATED_NOMBRE_TURNO);
        assertThat(testPlanificacionAsistencia.isInasistenciaJustificada()).isEqualTo(UPDATED_INASISTENCIA_JUSTIFICADA);
    }

    @Test
    @Transactional
    public void updateNonExistingPlanificacionAsistencia() throws Exception {
        int databaseSizeBeforeUpdate = planificacionAsistenciaRepository.findAll().size();

        // Create the PlanificacionAsistencia

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanificacionAsistenciaMockMvc.perform(put("/api/planificacion-asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planificacionAsistencia)))
            .andExpect(status().isBadRequest());

        // Validate the PlanificacionAsistencia in the database
        List<PlanificacionAsistencia> planificacionAsistenciaList = planificacionAsistenciaRepository.findAll();
        assertThat(planificacionAsistenciaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlanificacionAsistencia() throws Exception {
        // Initialize the database
        planificacionAsistenciaRepository.saveAndFlush(planificacionAsistencia);

        int databaseSizeBeforeDelete = planificacionAsistenciaRepository.findAll().size();

        // Delete the planificacionAsistencia
        restPlanificacionAsistenciaMockMvc.perform(delete("/api/planificacion-asistencias/{id}", planificacionAsistencia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlanificacionAsistencia> planificacionAsistenciaList = planificacionAsistenciaRepository.findAll();
        assertThat(planificacionAsistenciaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanificacionAsistencia.class);
        PlanificacionAsistencia planificacionAsistencia1 = new PlanificacionAsistencia();
        planificacionAsistencia1.setId(1L);
        PlanificacionAsistencia planificacionAsistencia2 = new PlanificacionAsistencia();
        planificacionAsistencia2.setId(planificacionAsistencia1.getId());
        assertThat(planificacionAsistencia1).isEqualTo(planificacionAsistencia2);
        planificacionAsistencia2.setId(2L);
        assertThat(planificacionAsistencia1).isNotEqualTo(planificacionAsistencia2);
        planificacionAsistencia1.setId(null);
        assertThat(planificacionAsistencia1).isNotEqualTo(planificacionAsistencia2);
    }
}

package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.ReporteAsistencia;
import empaques.controlacceso.repository.ReporteAsistenciaRepository;
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
 * Integration tests for the {@link ReporteAsistenciaResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class ReporteAsistenciaResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_INICIO = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_FIN = Instant.ofEpochMilli(-1L);

    @Autowired
    private ReporteAsistenciaRepository reporteAsistenciaRepository;

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

    private MockMvc restReporteAsistenciaMockMvc;

    private ReporteAsistencia reporteAsistencia;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReporteAsistenciaResource reporteAsistenciaResource = new ReporteAsistenciaResource(reporteAsistenciaRepository);
        this.restReporteAsistenciaMockMvc = MockMvcBuilders.standaloneSetup(reporteAsistenciaResource)
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
    public static ReporteAsistencia createEntity(EntityManager em) {
        ReporteAsistencia reporteAsistencia = new ReporteAsistencia()
            .tipo(DEFAULT_TIPO)
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN);
        return reporteAsistencia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReporteAsistencia createUpdatedEntity(EntityManager em) {
        ReporteAsistencia reporteAsistencia = new ReporteAsistencia()
            .tipo(UPDATED_TIPO)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN);
        return reporteAsistencia;
    }

    @BeforeEach
    public void initTest() {
        reporteAsistencia = createEntity(em);
    }

    @Test
    @Transactional
    public void createReporteAsistencia() throws Exception {
        int databaseSizeBeforeCreate = reporteAsistenciaRepository.findAll().size();

        // Create the ReporteAsistencia
        restReporteAsistenciaMockMvc.perform(post("/api/reporte-asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteAsistencia)))
            .andExpect(status().isCreated());

        // Validate the ReporteAsistencia in the database
        List<ReporteAsistencia> reporteAsistenciaList = reporteAsistenciaRepository.findAll();
        assertThat(reporteAsistenciaList).hasSize(databaseSizeBeforeCreate + 1);
        ReporteAsistencia testReporteAsistencia = reporteAsistenciaList.get(reporteAsistenciaList.size() - 1);
        assertThat(testReporteAsistencia.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testReporteAsistencia.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testReporteAsistencia.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
    }

    @Test
    @Transactional
    public void createReporteAsistenciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reporteAsistenciaRepository.findAll().size();

        // Create the ReporteAsistencia with an existing ID
        reporteAsistencia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReporteAsistenciaMockMvc.perform(post("/api/reporte-asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteAsistencia)))
            .andExpect(status().isBadRequest());

        // Validate the ReporteAsistencia in the database
        List<ReporteAsistencia> reporteAsistenciaList = reporteAsistenciaRepository.findAll();
        assertThat(reporteAsistenciaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReporteAsistencias() throws Exception {
        // Initialize the database
        reporteAsistenciaRepository.saveAndFlush(reporteAsistencia);

        // Get all the reporteAsistenciaList
        restReporteAsistenciaMockMvc.perform(get("/api/reporte-asistencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reporteAsistencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())));
    }
    
    @Test
    @Transactional
    public void getReporteAsistencia() throws Exception {
        // Initialize the database
        reporteAsistenciaRepository.saveAndFlush(reporteAsistencia);

        // Get the reporteAsistencia
        restReporteAsistenciaMockMvc.perform(get("/api/reporte-asistencias/{id}", reporteAsistencia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reporteAsistencia.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReporteAsistencia() throws Exception {
        // Get the reporteAsistencia
        restReporteAsistenciaMockMvc.perform(get("/api/reporte-asistencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReporteAsistencia() throws Exception {
        // Initialize the database
        reporteAsistenciaRepository.saveAndFlush(reporteAsistencia);

        int databaseSizeBeforeUpdate = reporteAsistenciaRepository.findAll().size();

        // Update the reporteAsistencia
        ReporteAsistencia updatedReporteAsistencia = reporteAsistenciaRepository.findById(reporteAsistencia.getId()).get();
        // Disconnect from session so that the updates on updatedReporteAsistencia are not directly saved in db
        em.detach(updatedReporteAsistencia);
        updatedReporteAsistencia
            .tipo(UPDATED_TIPO)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN);

        restReporteAsistenciaMockMvc.perform(put("/api/reporte-asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReporteAsistencia)))
            .andExpect(status().isOk());

        // Validate the ReporteAsistencia in the database
        List<ReporteAsistencia> reporteAsistenciaList = reporteAsistenciaRepository.findAll();
        assertThat(reporteAsistenciaList).hasSize(databaseSizeBeforeUpdate);
        ReporteAsistencia testReporteAsistencia = reporteAsistenciaList.get(reporteAsistenciaList.size() - 1);
        assertThat(testReporteAsistencia.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testReporteAsistencia.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testReporteAsistencia.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingReporteAsistencia() throws Exception {
        int databaseSizeBeforeUpdate = reporteAsistenciaRepository.findAll().size();

        // Create the ReporteAsistencia

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReporteAsistenciaMockMvc.perform(put("/api/reporte-asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteAsistencia)))
            .andExpect(status().isBadRequest());

        // Validate the ReporteAsistencia in the database
        List<ReporteAsistencia> reporteAsistenciaList = reporteAsistenciaRepository.findAll();
        assertThat(reporteAsistenciaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReporteAsistencia() throws Exception {
        // Initialize the database
        reporteAsistenciaRepository.saveAndFlush(reporteAsistencia);

        int databaseSizeBeforeDelete = reporteAsistenciaRepository.findAll().size();

        // Delete the reporteAsistencia
        restReporteAsistenciaMockMvc.perform(delete("/api/reporte-asistencias/{id}", reporteAsistencia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReporteAsistencia> reporteAsistenciaList = reporteAsistenciaRepository.findAll();
        assertThat(reporteAsistenciaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReporteAsistencia.class);
        ReporteAsistencia reporteAsistencia1 = new ReporteAsistencia();
        reporteAsistencia1.setId(1L);
        ReporteAsistencia reporteAsistencia2 = new ReporteAsistencia();
        reporteAsistencia2.setId(reporteAsistencia1.getId());
        assertThat(reporteAsistencia1).isEqualTo(reporteAsistencia2);
        reporteAsistencia2.setId(2L);
        assertThat(reporteAsistencia1).isNotEqualTo(reporteAsistencia2);
        reporteAsistencia1.setId(null);
        assertThat(reporteAsistencia1).isNotEqualTo(reporteAsistencia2);
    }
}

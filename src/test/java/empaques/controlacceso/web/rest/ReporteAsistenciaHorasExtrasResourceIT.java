package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.ReporteAsistenciaHorasExtras;
import empaques.controlacceso.repository.ReporteAsistenciaHorasExtrasRepository;
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
 * Integration tests for the {@link ReporteAsistenciaHorasExtrasResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class ReporteAsistenciaHorasExtrasResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_INICIO = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_FIN = Instant.ofEpochMilli(-1L);

    @Autowired
    private ReporteAsistenciaHorasExtrasRepository reporteAsistenciaHorasExtrasRepository;

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

    private MockMvc restReporteAsistenciaHorasExtrasMockMvc;

    private ReporteAsistenciaHorasExtras reporteAsistenciaHorasExtras;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReporteAsistenciaHorasExtrasResource reporteAsistenciaHorasExtrasResource = new ReporteAsistenciaHorasExtrasResource(reporteAsistenciaHorasExtrasRepository);
        this.restReporteAsistenciaHorasExtrasMockMvc = MockMvcBuilders.standaloneSetup(reporteAsistenciaHorasExtrasResource)
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
    public static ReporteAsistenciaHorasExtras createEntity(EntityManager em) {
        ReporteAsistenciaHorasExtras reporteAsistenciaHorasExtras = new ReporteAsistenciaHorasExtras()
            .tipo(DEFAULT_TIPO)
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN);
        return reporteAsistenciaHorasExtras;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReporteAsistenciaHorasExtras createUpdatedEntity(EntityManager em) {
        ReporteAsistenciaHorasExtras reporteAsistenciaHorasExtras = new ReporteAsistenciaHorasExtras()
            .tipo(UPDATED_TIPO)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN);
        return reporteAsistenciaHorasExtras;
    }

    @BeforeEach
    public void initTest() {
        reporteAsistenciaHorasExtras = createEntity(em);
    }

    @Test
    @Transactional
    public void createReporteAsistenciaHorasExtras() throws Exception {
        int databaseSizeBeforeCreate = reporteAsistenciaHorasExtrasRepository.findAll().size();

        // Create the ReporteAsistenciaHorasExtras
        restReporteAsistenciaHorasExtrasMockMvc.perform(post("/api/reporte-asistencia-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteAsistenciaHorasExtras)))
            .andExpect(status().isCreated());

        // Validate the ReporteAsistenciaHorasExtras in the database
        List<ReporteAsistenciaHorasExtras> reporteAsistenciaHorasExtrasList = reporteAsistenciaHorasExtrasRepository.findAll();
        assertThat(reporteAsistenciaHorasExtrasList).hasSize(databaseSizeBeforeCreate + 1);
        ReporteAsistenciaHorasExtras testReporteAsistenciaHorasExtras = reporteAsistenciaHorasExtrasList.get(reporteAsistenciaHorasExtrasList.size() - 1);
        assertThat(testReporteAsistenciaHorasExtras.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testReporteAsistenciaHorasExtras.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testReporteAsistenciaHorasExtras.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
    }

    @Test
    @Transactional
    public void createReporteAsistenciaHorasExtrasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reporteAsistenciaHorasExtrasRepository.findAll().size();

        // Create the ReporteAsistenciaHorasExtras with an existing ID
        reporteAsistenciaHorasExtras.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReporteAsistenciaHorasExtrasMockMvc.perform(post("/api/reporte-asistencia-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteAsistenciaHorasExtras)))
            .andExpect(status().isBadRequest());

        // Validate the ReporteAsistenciaHorasExtras in the database
        List<ReporteAsistenciaHorasExtras> reporteAsistenciaHorasExtrasList = reporteAsistenciaHorasExtrasRepository.findAll();
        assertThat(reporteAsistenciaHorasExtrasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReporteAsistenciaHorasExtras() throws Exception {
        // Initialize the database
        reporteAsistenciaHorasExtrasRepository.saveAndFlush(reporteAsistenciaHorasExtras);

        // Get all the reporteAsistenciaHorasExtrasList
        restReporteAsistenciaHorasExtrasMockMvc.perform(get("/api/reporte-asistencia-horas-extras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reporteAsistenciaHorasExtras.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())));
    }
    
    @Test
    @Transactional
    public void getReporteAsistenciaHorasExtras() throws Exception {
        // Initialize the database
        reporteAsistenciaHorasExtrasRepository.saveAndFlush(reporteAsistenciaHorasExtras);

        // Get the reporteAsistenciaHorasExtras
        restReporteAsistenciaHorasExtrasMockMvc.perform(get("/api/reporte-asistencia-horas-extras/{id}", reporteAsistenciaHorasExtras.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reporteAsistenciaHorasExtras.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReporteAsistenciaHorasExtras() throws Exception {
        // Get the reporteAsistenciaHorasExtras
        restReporteAsistenciaHorasExtrasMockMvc.perform(get("/api/reporte-asistencia-horas-extras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReporteAsistenciaHorasExtras() throws Exception {
        // Initialize the database
        reporteAsistenciaHorasExtrasRepository.saveAndFlush(reporteAsistenciaHorasExtras);

        int databaseSizeBeforeUpdate = reporteAsistenciaHorasExtrasRepository.findAll().size();

        // Update the reporteAsistenciaHorasExtras
        ReporteAsistenciaHorasExtras updatedReporteAsistenciaHorasExtras = reporteAsistenciaHorasExtrasRepository.findById(reporteAsistenciaHorasExtras.getId()).get();
        // Disconnect from session so that the updates on updatedReporteAsistenciaHorasExtras are not directly saved in db
        em.detach(updatedReporteAsistenciaHorasExtras);
        updatedReporteAsistenciaHorasExtras
            .tipo(UPDATED_TIPO)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN);

        restReporteAsistenciaHorasExtrasMockMvc.perform(put("/api/reporte-asistencia-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReporteAsistenciaHorasExtras)))
            .andExpect(status().isOk());

        // Validate the ReporteAsistenciaHorasExtras in the database
        List<ReporteAsistenciaHorasExtras> reporteAsistenciaHorasExtrasList = reporteAsistenciaHorasExtrasRepository.findAll();
        assertThat(reporteAsistenciaHorasExtrasList).hasSize(databaseSizeBeforeUpdate);
        ReporteAsistenciaHorasExtras testReporteAsistenciaHorasExtras = reporteAsistenciaHorasExtrasList.get(reporteAsistenciaHorasExtrasList.size() - 1);
        assertThat(testReporteAsistenciaHorasExtras.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testReporteAsistenciaHorasExtras.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testReporteAsistenciaHorasExtras.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingReporteAsistenciaHorasExtras() throws Exception {
        int databaseSizeBeforeUpdate = reporteAsistenciaHorasExtrasRepository.findAll().size();

        // Create the ReporteAsistenciaHorasExtras

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReporteAsistenciaHorasExtrasMockMvc.perform(put("/api/reporte-asistencia-horas-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporteAsistenciaHorasExtras)))
            .andExpect(status().isBadRequest());

        // Validate the ReporteAsistenciaHorasExtras in the database
        List<ReporteAsistenciaHorasExtras> reporteAsistenciaHorasExtrasList = reporteAsistenciaHorasExtrasRepository.findAll();
        assertThat(reporteAsistenciaHorasExtrasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReporteAsistenciaHorasExtras() throws Exception {
        // Initialize the database
        reporteAsistenciaHorasExtrasRepository.saveAndFlush(reporteAsistenciaHorasExtras);

        int databaseSizeBeforeDelete = reporteAsistenciaHorasExtrasRepository.findAll().size();

        // Delete the reporteAsistenciaHorasExtras
        restReporteAsistenciaHorasExtrasMockMvc.perform(delete("/api/reporte-asistencia-horas-extras/{id}", reporteAsistenciaHorasExtras.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReporteAsistenciaHorasExtras> reporteAsistenciaHorasExtrasList = reporteAsistenciaHorasExtrasRepository.findAll();
        assertThat(reporteAsistenciaHorasExtrasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReporteAsistenciaHorasExtras.class);
        ReporteAsistenciaHorasExtras reporteAsistenciaHorasExtras1 = new ReporteAsistenciaHorasExtras();
        reporteAsistenciaHorasExtras1.setId(1L);
        ReporteAsistenciaHorasExtras reporteAsistenciaHorasExtras2 = new ReporteAsistenciaHorasExtras();
        reporteAsistenciaHorasExtras2.setId(reporteAsistenciaHorasExtras1.getId());
        assertThat(reporteAsistenciaHorasExtras1).isEqualTo(reporteAsistenciaHorasExtras2);
        reporteAsistenciaHorasExtras2.setId(2L);
        assertThat(reporteAsistenciaHorasExtras1).isNotEqualTo(reporteAsistenciaHorasExtras2);
        reporteAsistenciaHorasExtras1.setId(null);
        assertThat(reporteAsistenciaHorasExtras1).isNotEqualTo(reporteAsistenciaHorasExtras2);
    }
}

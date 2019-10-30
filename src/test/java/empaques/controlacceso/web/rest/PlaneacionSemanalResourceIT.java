package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.PlaneacionSemanal;
import empaques.controlacceso.repository.PlaneacionSemanalRepository;
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

import empaques.controlacceso.domain.enumeration.EstadoPlaneacion;
/**
 * Integration tests for the {@link PlaneacionSemanalResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class PlaneacionSemanalResourceIT {

    private static final Instant DEFAULT_FECHA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_INICIO = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_FIN = Instant.ofEpochMilli(-1L);

    private static final EstadoPlaneacion DEFAULT_ESTADO = EstadoPlaneacion.Historica;
    private static final EstadoPlaneacion UPDATED_ESTADO = EstadoPlaneacion.Actual;

    @Autowired
    private PlaneacionSemanalRepository planeacionSemanalRepository;

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

    private MockMvc restPlaneacionSemanalMockMvc;

    private PlaneacionSemanal planeacionSemanal;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaneacionSemanalResource planeacionSemanalResource = new PlaneacionSemanalResource(planeacionSemanalRepository);
        this.restPlaneacionSemanalMockMvc = MockMvcBuilders.standaloneSetup(planeacionSemanalResource)
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
    public static PlaneacionSemanal createEntity(EntityManager em) {
        PlaneacionSemanal planeacionSemanal = new PlaneacionSemanal()
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN)
            .estado(DEFAULT_ESTADO);
        return planeacionSemanal;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlaneacionSemanal createUpdatedEntity(EntityManager em) {
        PlaneacionSemanal planeacionSemanal = new PlaneacionSemanal()
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .estado(UPDATED_ESTADO);
        return planeacionSemanal;
    }

    @BeforeEach
    public void initTest() {
        planeacionSemanal = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlaneacionSemanal() throws Exception {
        int databaseSizeBeforeCreate = planeacionSemanalRepository.findAll().size();

        // Create the PlaneacionSemanal
        restPlaneacionSemanalMockMvc.perform(post("/api/planeacion-semanals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planeacionSemanal)))
            .andExpect(status().isCreated());

        // Validate the PlaneacionSemanal in the database
        List<PlaneacionSemanal> planeacionSemanalList = planeacionSemanalRepository.findAll();
        assertThat(planeacionSemanalList).hasSize(databaseSizeBeforeCreate + 1);
        PlaneacionSemanal testPlaneacionSemanal = planeacionSemanalList.get(planeacionSemanalList.size() - 1);
        assertThat(testPlaneacionSemanal.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testPlaneacionSemanal.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
        assertThat(testPlaneacionSemanal.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createPlaneacionSemanalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planeacionSemanalRepository.findAll().size();

        // Create the PlaneacionSemanal with an existing ID
        planeacionSemanal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaneacionSemanalMockMvc.perform(post("/api/planeacion-semanals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planeacionSemanal)))
            .andExpect(status().isBadRequest());

        // Validate the PlaneacionSemanal in the database
        List<PlaneacionSemanal> planeacionSemanalList = planeacionSemanalRepository.findAll();
        assertThat(planeacionSemanalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlaneacionSemanals() throws Exception {
        // Initialize the database
        planeacionSemanalRepository.saveAndFlush(planeacionSemanal);

        // Get all the planeacionSemanalList
        restPlaneacionSemanalMockMvc.perform(get("/api/planeacion-semanals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planeacionSemanal.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }
    
    @Test
    @Transactional
    public void getPlaneacionSemanal() throws Exception {
        // Initialize the database
        planeacionSemanalRepository.saveAndFlush(planeacionSemanal);

        // Get the planeacionSemanal
        restPlaneacionSemanalMockMvc.perform(get("/api/planeacion-semanals/{id}", planeacionSemanal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(planeacionSemanal.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlaneacionSemanal() throws Exception {
        // Get the planeacionSemanal
        restPlaneacionSemanalMockMvc.perform(get("/api/planeacion-semanals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlaneacionSemanal() throws Exception {
        // Initialize the database
        planeacionSemanalRepository.saveAndFlush(planeacionSemanal);

        int databaseSizeBeforeUpdate = planeacionSemanalRepository.findAll().size();

        // Update the planeacionSemanal
        PlaneacionSemanal updatedPlaneacionSemanal = planeacionSemanalRepository.findById(planeacionSemanal.getId()).get();
        // Disconnect from session so that the updates on updatedPlaneacionSemanal are not directly saved in db
        em.detach(updatedPlaneacionSemanal);
        updatedPlaneacionSemanal
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .estado(UPDATED_ESTADO);

        restPlaneacionSemanalMockMvc.perform(put("/api/planeacion-semanals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlaneacionSemanal)))
            .andExpect(status().isOk());

        // Validate the PlaneacionSemanal in the database
        List<PlaneacionSemanal> planeacionSemanalList = planeacionSemanalRepository.findAll();
        assertThat(planeacionSemanalList).hasSize(databaseSizeBeforeUpdate);
        PlaneacionSemanal testPlaneacionSemanal = planeacionSemanalList.get(planeacionSemanalList.size() - 1);
        assertThat(testPlaneacionSemanal.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testPlaneacionSemanal.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
        assertThat(testPlaneacionSemanal.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingPlaneacionSemanal() throws Exception {
        int databaseSizeBeforeUpdate = planeacionSemanalRepository.findAll().size();

        // Create the PlaneacionSemanal

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaneacionSemanalMockMvc.perform(put("/api/planeacion-semanals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planeacionSemanal)))
            .andExpect(status().isBadRequest());

        // Validate the PlaneacionSemanal in the database
        List<PlaneacionSemanal> planeacionSemanalList = planeacionSemanalRepository.findAll();
        assertThat(planeacionSemanalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlaneacionSemanal() throws Exception {
        // Initialize the database
        planeacionSemanalRepository.saveAndFlush(planeacionSemanal);

        int databaseSizeBeforeDelete = planeacionSemanalRepository.findAll().size();

        // Delete the planeacionSemanal
        restPlaneacionSemanalMockMvc.perform(delete("/api/planeacion-semanals/{id}", planeacionSemanal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlaneacionSemanal> planeacionSemanalList = planeacionSemanalRepository.findAll();
        assertThat(planeacionSemanalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaneacionSemanal.class);
        PlaneacionSemanal planeacionSemanal1 = new PlaneacionSemanal();
        planeacionSemanal1.setId(1L);
        PlaneacionSemanal planeacionSemanal2 = new PlaneacionSemanal();
        planeacionSemanal2.setId(planeacionSemanal1.getId());
        assertThat(planeacionSemanal1).isEqualTo(planeacionSemanal2);
        planeacionSemanal2.setId(2L);
        assertThat(planeacionSemanal1).isNotEqualTo(planeacionSemanal2);
        planeacionSemanal1.setId(null);
        assertThat(planeacionSemanal1).isNotEqualTo(planeacionSemanal2);
    }
}

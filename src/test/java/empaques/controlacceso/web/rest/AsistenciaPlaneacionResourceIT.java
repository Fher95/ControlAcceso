package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.AsistenciaPlaneacion;
import empaques.controlacceso.repository.AsignacionTurnoRepository;
import empaques.controlacceso.repository.AsistenciaPlaneacionRepository;
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
import java.util.List;

import static empaques.controlacceso.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AsistenciaPlaneacionResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class AsistenciaPlaneacionResourceIT {

    @Autowired
    private AsistenciaPlaneacionRepository asistenciaPlaneacionRepository;

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @Autowired
    private AsignacionTurnoRepository asignacionRepository;

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

    private MockMvc restAsistenciaPlaneacionMockMvc;

    private AsistenciaPlaneacion asistenciaPlaneacion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsistenciaPlaneacionResource asistenciaPlaneacionResource = new AsistenciaPlaneacionResource(asistenciaPlaneacionRepository,
        asignacionRepository, asistenciaRepository);
        this.restAsistenciaPlaneacionMockMvc = MockMvcBuilders.standaloneSetup(asistenciaPlaneacionResource)
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
    public static AsistenciaPlaneacion createEntity(EntityManager em) {
        AsistenciaPlaneacion asistenciaPlaneacion = new AsistenciaPlaneacion();
        return asistenciaPlaneacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AsistenciaPlaneacion createUpdatedEntity(EntityManager em) {
        AsistenciaPlaneacion asistenciaPlaneacion = new AsistenciaPlaneacion();
        return asistenciaPlaneacion;
    }

    @BeforeEach
    public void initTest() {
        asistenciaPlaneacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsistenciaPlaneacion() throws Exception {
        int databaseSizeBeforeCreate = asistenciaPlaneacionRepository.findAll().size();

        // Create the AsistenciaPlaneacion
        restAsistenciaPlaneacionMockMvc.perform(post("/api/asistencia-planeacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistenciaPlaneacion)))
            .andExpect(status().isCreated());

        // Validate the AsistenciaPlaneacion in the database
        List<AsistenciaPlaneacion> asistenciaPlaneacionList = asistenciaPlaneacionRepository.findAll();
        assertThat(asistenciaPlaneacionList).hasSize(databaseSizeBeforeCreate + 1);
        AsistenciaPlaneacion testAsistenciaPlaneacion = asistenciaPlaneacionList.get(asistenciaPlaneacionList.size() - 1);
    }

    @Test
    @Transactional
    public void createAsistenciaPlaneacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asistenciaPlaneacionRepository.findAll().size();

        // Create the AsistenciaPlaneacion with an existing ID
        asistenciaPlaneacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsistenciaPlaneacionMockMvc.perform(post("/api/asistencia-planeacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistenciaPlaneacion)))
            .andExpect(status().isBadRequest());

        // Validate the AsistenciaPlaneacion in the database
        List<AsistenciaPlaneacion> asistenciaPlaneacionList = asistenciaPlaneacionRepository.findAll();
        assertThat(asistenciaPlaneacionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAsistenciaPlaneacions() throws Exception {
        // Initialize the database
        asistenciaPlaneacionRepository.saveAndFlush(asistenciaPlaneacion);

        // Get all the asistenciaPlaneacionList
        restAsistenciaPlaneacionMockMvc.perform(get("/api/asistencia-planeacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
            //.andExpect(jsonPath("$.[*].id").value(hasItem(asistenciaPlaneacion.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAsistenciaPlaneacion() throws Exception {
        // Initialize the database
        asistenciaPlaneacionRepository.saveAndFlush(asistenciaPlaneacion);

        // Get the asistenciaPlaneacion
        restAsistenciaPlaneacionMockMvc.perform(get("/api/asistencia-planeacions/{id}", asistenciaPlaneacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asistenciaPlaneacion.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAsistenciaPlaneacion() throws Exception {
        // Get the asistenciaPlaneacion
        restAsistenciaPlaneacionMockMvc.perform(get("/api/asistencia-planeacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsistenciaPlaneacion() throws Exception {
        // Initialize the database
        asistenciaPlaneacionRepository.saveAndFlush(asistenciaPlaneacion);

        int databaseSizeBeforeUpdate = asistenciaPlaneacionRepository.findAll().size();

        // Update the asistenciaPlaneacion
        AsistenciaPlaneacion updatedAsistenciaPlaneacion = asistenciaPlaneacionRepository.findById(asistenciaPlaneacion.getId()).get();
        // Disconnect from session so that the updates on updatedAsistenciaPlaneacion are not directly saved in db
        em.detach(updatedAsistenciaPlaneacion);

        restAsistenciaPlaneacionMockMvc.perform(put("/api/asistencia-planeacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsistenciaPlaneacion)))
            .andExpect(status().isOk());

        // Validate the AsistenciaPlaneacion in the database
        List<AsistenciaPlaneacion> asistenciaPlaneacionList = asistenciaPlaneacionRepository.findAll();
        assertThat(asistenciaPlaneacionList).hasSize(databaseSizeBeforeUpdate);
        AsistenciaPlaneacion testAsistenciaPlaneacion = asistenciaPlaneacionList.get(asistenciaPlaneacionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAsistenciaPlaneacion() throws Exception {
        int databaseSizeBeforeUpdate = asistenciaPlaneacionRepository.findAll().size();

        // Create the AsistenciaPlaneacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsistenciaPlaneacionMockMvc.perform(put("/api/asistencia-planeacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistenciaPlaneacion)))
            .andExpect(status().isBadRequest());

        // Validate the AsistenciaPlaneacion in the database
        List<AsistenciaPlaneacion> asistenciaPlaneacionList = asistenciaPlaneacionRepository.findAll();
        assertThat(asistenciaPlaneacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAsistenciaPlaneacion() throws Exception {
        // Initialize the database
        asistenciaPlaneacionRepository.saveAndFlush(asistenciaPlaneacion);

        int databaseSizeBeforeDelete = asistenciaPlaneacionRepository.findAll().size();

        // Delete the asistenciaPlaneacion
        restAsistenciaPlaneacionMockMvc.perform(delete("/api/asistencia-planeacions/{id}", asistenciaPlaneacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AsistenciaPlaneacion> asistenciaPlaneacionList = asistenciaPlaneacionRepository.findAll();
        assertThat(asistenciaPlaneacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AsistenciaPlaneacion.class);
        AsistenciaPlaneacion asistenciaPlaneacion1 = new AsistenciaPlaneacion();
        asistenciaPlaneacion1.setId(1L);
        AsistenciaPlaneacion asistenciaPlaneacion2 = new AsistenciaPlaneacion();
        asistenciaPlaneacion2.setId(asistenciaPlaneacion1.getId());
        assertThat(asistenciaPlaneacion1).isEqualTo(asistenciaPlaneacion2);
        asistenciaPlaneacion2.setId(2L);
        assertThat(asistenciaPlaneacion1).isNotEqualTo(asistenciaPlaneacion2);
        asistenciaPlaneacion1.setId(null);
        assertThat(asistenciaPlaneacion1).isNotEqualTo(asistenciaPlaneacion2);
    }
}

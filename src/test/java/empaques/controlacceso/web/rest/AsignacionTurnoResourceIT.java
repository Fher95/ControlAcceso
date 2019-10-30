package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.AsignacionTurno;
import empaques.controlacceso.repository.AsignacionTurnoRepository;
import empaques.controlacceso.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;

import static empaques.controlacceso.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AsignacionTurnoResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class AsignacionTurnoResourceIT {

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA = Instant.ofEpochMilli(-1L);

    @Autowired
    private AsignacionTurnoRepository asignacionTurnoRepository;

    @Mock
    private AsignacionTurnoRepository asignacionTurnoRepositoryMock;

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

    private MockMvc restAsignacionTurnoMockMvc;

    private AsignacionTurno asignacionTurno;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsignacionTurnoResource asignacionTurnoResource = new AsignacionTurnoResource(asignacionTurnoRepository);
        this.restAsignacionTurnoMockMvc = MockMvcBuilders.standaloneSetup(asignacionTurnoResource)
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
    public static AsignacionTurno createEntity(EntityManager em) {
        AsignacionTurno asignacionTurno = new AsignacionTurno()
            .fecha(DEFAULT_FECHA);
        return asignacionTurno;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AsignacionTurno createUpdatedEntity(EntityManager em) {
        AsignacionTurno asignacionTurno = new AsignacionTurno()
            .fecha(UPDATED_FECHA);
        return asignacionTurno;
    }

    @BeforeEach
    public void initTest() {
        asignacionTurno = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsignacionTurno() throws Exception {
        int databaseSizeBeforeCreate = asignacionTurnoRepository.findAll().size();

        // Create the AsignacionTurno
        restAsignacionTurnoMockMvc.perform(post("/api/asignacion-turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asignacionTurno)))
            .andExpect(status().isCreated());

        // Validate the AsignacionTurno in the database
        List<AsignacionTurno> asignacionTurnoList = asignacionTurnoRepository.findAll();
        assertThat(asignacionTurnoList).hasSize(databaseSizeBeforeCreate + 1);
        AsignacionTurno testAsignacionTurno = asignacionTurnoList.get(asignacionTurnoList.size() - 1);
        assertThat(testAsignacionTurno.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    public void createAsignacionTurnoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asignacionTurnoRepository.findAll().size();

        // Create the AsignacionTurno with an existing ID
        asignacionTurno.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsignacionTurnoMockMvc.perform(post("/api/asignacion-turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asignacionTurno)))
            .andExpect(status().isBadRequest());

        // Validate the AsignacionTurno in the database
        List<AsignacionTurno> asignacionTurnoList = asignacionTurnoRepository.findAll();
        assertThat(asignacionTurnoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAsignacionTurnos() throws Exception {
        // Initialize the database
        asignacionTurnoRepository.saveAndFlush(asignacionTurno);

        // Get all the asignacionTurnoList
        restAsignacionTurnoMockMvc.perform(get("/api/asignacion-turnos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asignacionTurno.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAsignacionTurnosWithEagerRelationshipsIsEnabled() throws Exception {
        AsignacionTurnoResource asignacionTurnoResource = new AsignacionTurnoResource(asignacionTurnoRepositoryMock);
        when(asignacionTurnoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAsignacionTurnoMockMvc = MockMvcBuilders.standaloneSetup(asignacionTurnoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAsignacionTurnoMockMvc.perform(get("/api/asignacion-turnos?eagerload=true"))
        .andExpect(status().isOk());

        verify(asignacionTurnoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAsignacionTurnosWithEagerRelationshipsIsNotEnabled() throws Exception {
        AsignacionTurnoResource asignacionTurnoResource = new AsignacionTurnoResource(asignacionTurnoRepositoryMock);
            when(asignacionTurnoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAsignacionTurnoMockMvc = MockMvcBuilders.standaloneSetup(asignacionTurnoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAsignacionTurnoMockMvc.perform(get("/api/asignacion-turnos?eagerload=true"))
        .andExpect(status().isOk());

            verify(asignacionTurnoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAsignacionTurno() throws Exception {
        // Initialize the database
        asignacionTurnoRepository.saveAndFlush(asignacionTurno);

        // Get the asignacionTurno
        restAsignacionTurnoMockMvc.perform(get("/api/asignacion-turnos/{id}", asignacionTurno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asignacionTurno.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAsignacionTurno() throws Exception {
        // Get the asignacionTurno
        restAsignacionTurnoMockMvc.perform(get("/api/asignacion-turnos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsignacionTurno() throws Exception {
        // Initialize the database
        asignacionTurnoRepository.saveAndFlush(asignacionTurno);

        int databaseSizeBeforeUpdate = asignacionTurnoRepository.findAll().size();

        // Update the asignacionTurno
        AsignacionTurno updatedAsignacionTurno = asignacionTurnoRepository.findById(asignacionTurno.getId()).get();
        // Disconnect from session so that the updates on updatedAsignacionTurno are not directly saved in db
        em.detach(updatedAsignacionTurno);
        updatedAsignacionTurno
            .fecha(UPDATED_FECHA);

        restAsignacionTurnoMockMvc.perform(put("/api/asignacion-turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsignacionTurno)))
            .andExpect(status().isOk());

        // Validate the AsignacionTurno in the database
        List<AsignacionTurno> asignacionTurnoList = asignacionTurnoRepository.findAll();
        assertThat(asignacionTurnoList).hasSize(databaseSizeBeforeUpdate);
        AsignacionTurno testAsignacionTurno = asignacionTurnoList.get(asignacionTurnoList.size() - 1);
        assertThat(testAsignacionTurno.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void updateNonExistingAsignacionTurno() throws Exception {
        int databaseSizeBeforeUpdate = asignacionTurnoRepository.findAll().size();

        // Create the AsignacionTurno

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsignacionTurnoMockMvc.perform(put("/api/asignacion-turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asignacionTurno)))
            .andExpect(status().isBadRequest());

        // Validate the AsignacionTurno in the database
        List<AsignacionTurno> asignacionTurnoList = asignacionTurnoRepository.findAll();
        assertThat(asignacionTurnoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAsignacionTurno() throws Exception {
        // Initialize the database
        asignacionTurnoRepository.saveAndFlush(asignacionTurno);

        int databaseSizeBeforeDelete = asignacionTurnoRepository.findAll().size();

        // Delete the asignacionTurno
        restAsignacionTurnoMockMvc.perform(delete("/api/asignacion-turnos/{id}", asignacionTurno.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AsignacionTurno> asignacionTurnoList = asignacionTurnoRepository.findAll();
        assertThat(asignacionTurnoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AsignacionTurno.class);
        AsignacionTurno asignacionTurno1 = new AsignacionTurno();
        asignacionTurno1.setId(1L);
        AsignacionTurno asignacionTurno2 = new AsignacionTurno();
        asignacionTurno2.setId(asignacionTurno1.getId());
        assertThat(asignacionTurno1).isEqualTo(asignacionTurno2);
        asignacionTurno2.setId(2L);
        assertThat(asignacionTurno1).isNotEqualTo(asignacionTurno2);
        asignacionTurno1.setId(null);
        assertThat(asignacionTurno1).isNotEqualTo(asignacionTurno2);
    }
}

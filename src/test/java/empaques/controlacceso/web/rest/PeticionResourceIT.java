package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.Peticion;
import empaques.controlacceso.repository.PeticionRepository;
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

import empaques.controlacceso.domain.enumeration.TipoPeticion;
import empaques.controlacceso.domain.enumeration.TipoPermiso;
import empaques.controlacceso.domain.enumeration.EstadoPeticion;
import empaques.controlacceso.repository.PlanificacionAsistenciaRepository;
/**
 * Integration tests for the {@link PeticionResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class PeticionResourceIT {

    private static final TipoPeticion DEFAULT_TIPO = TipoPeticion.Vacaciones;
    private static final TipoPeticion UPDATED_TIPO = TipoPeticion.Permiso;

    private static final TipoPermiso DEFAULT_TIPO_PERMISO = TipoPermiso.Incapacidades;
    private static final TipoPermiso UPDATED_TIPO_PERMISO = TipoPermiso.PermisoRemunerado;

    private static final Instant DEFAULT_FECHA_PETICION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_PETICION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_PETICION = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_MOTIVO = "AAAAAAAAAA";
    private static final String UPDATED_MOTIVO = "BBBBBBBBBB";

    private static final String DEFAULT_CONSTANCIA = "AAAAAAAAAA";
    private static final String UPDATED_CONSTANCIA = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_INICIO = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_FIN = Instant.ofEpochMilli(-1L);

    private static final EstadoPeticion DEFAULT_ESTADO = EstadoPeticion.Autorizada;
    private static final EstadoPeticion UPDATED_ESTADO = EstadoPeticion.NoAutorizada;

    private static final String DEFAULT_AUTORIZADO_POR = "AAAAAAAAAA";
    private static final String UPDATED_AUTORIZADO_POR = "BBBBBBBBBB";

    @Autowired
    private PeticionRepository peticionRepository;
    
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

    private MockMvc restPeticionMockMvc;

    private Peticion peticion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PeticionResource peticionResource = new PeticionResource(peticionRepository, planificacionAsistenciaRepository);
        this.restPeticionMockMvc = MockMvcBuilders.standaloneSetup(peticionResource)
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
    public static Peticion createEntity(EntityManager em) {
        Peticion peticion = new Peticion()
            .tipo(DEFAULT_TIPO)
            .tipoPermiso(DEFAULT_TIPO_PERMISO)
            .fechaPeticion(DEFAULT_FECHA_PETICION)
            .motivo(DEFAULT_MOTIVO)
            .constancia(DEFAULT_CONSTANCIA)
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN)
            .estado(DEFAULT_ESTADO)
            .autorizadoPor(DEFAULT_AUTORIZADO_POR);
        return peticion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Peticion createUpdatedEntity(EntityManager em) {
        Peticion peticion = new Peticion()
            .tipo(UPDATED_TIPO)
            .tipoPermiso(UPDATED_TIPO_PERMISO)
            .fechaPeticion(UPDATED_FECHA_PETICION)
            .motivo(UPDATED_MOTIVO)
            .constancia(UPDATED_CONSTANCIA)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .estado(UPDATED_ESTADO)
            .autorizadoPor(UPDATED_AUTORIZADO_POR);
        return peticion;
    }

    @BeforeEach
    public void initTest() {
        peticion = createEntity(em);
    }

    @Test
    @Transactional
    public void createPeticion() throws Exception {
        int databaseSizeBeforeCreate = peticionRepository.findAll().size();

        // Create the Peticion
        restPeticionMockMvc.perform(post("/api/peticions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(peticion)))
            .andExpect(status().isCreated());

        // Validate the Peticion in the database
        List<Peticion> peticionList = peticionRepository.findAll();
        assertThat(peticionList).hasSize(databaseSizeBeforeCreate + 1);
        Peticion testPeticion = peticionList.get(peticionList.size() - 1);
        assertThat(testPeticion.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testPeticion.getTipoPermiso()).isEqualTo(DEFAULT_TIPO_PERMISO);
        assertThat(testPeticion.getFechaPeticion()).isEqualTo(DEFAULT_FECHA_PETICION);
        assertThat(testPeticion.getMotivo()).isEqualTo(DEFAULT_MOTIVO);
        assertThat(testPeticion.getConstancia()).isEqualTo(DEFAULT_CONSTANCIA);
        assertThat(testPeticion.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testPeticion.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
        assertThat(testPeticion.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testPeticion.getAutorizadoPor()).isEqualTo(DEFAULT_AUTORIZADO_POR);
    }

    @Test
    @Transactional
    public void createPeticionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = peticionRepository.findAll().size();

        // Create the Peticion with an existing ID
        peticion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPeticionMockMvc.perform(post("/api/peticions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(peticion)))
            .andExpect(status().isBadRequest());

        // Validate the Peticion in the database
        List<Peticion> peticionList = peticionRepository.findAll();
        assertThat(peticionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPeticions() throws Exception {
        // Initialize the database
        peticionRepository.saveAndFlush(peticion);

        // Get all the peticionList
        restPeticionMockMvc.perform(get("/api/peticions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(peticion.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].tipoPermiso").value(hasItem(DEFAULT_TIPO_PERMISO.toString())))
            .andExpect(jsonPath("$.[*].fechaPeticion").value(hasItem(DEFAULT_FECHA_PETICION.toString())))
            .andExpect(jsonPath("$.[*].motivo").value(hasItem(DEFAULT_MOTIVO.toString())))
            .andExpect(jsonPath("$.[*].constancia").value(hasItem(DEFAULT_CONSTANCIA.toString())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].autorizadoPor").value(hasItem(DEFAULT_AUTORIZADO_POR.toString())));
    }
    
    @Test
    @Transactional
    public void getPeticion() throws Exception {
        // Initialize the database
        peticionRepository.saveAndFlush(peticion);

        // Get the peticion
        restPeticionMockMvc.perform(get("/api/peticions/{id}", peticion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(peticion.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.tipoPermiso").value(DEFAULT_TIPO_PERMISO.toString()))
            .andExpect(jsonPath("$.fechaPeticion").value(DEFAULT_FECHA_PETICION.toString()))
            .andExpect(jsonPath("$.motivo").value(DEFAULT_MOTIVO.toString()))
            .andExpect(jsonPath("$.constancia").value(DEFAULT_CONSTANCIA.toString()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.autorizadoPor").value(DEFAULT_AUTORIZADO_POR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPeticion() throws Exception {
        // Get the peticion
        restPeticionMockMvc.perform(get("/api/peticions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePeticion() throws Exception {
        // Initialize the database
        peticionRepository.saveAndFlush(peticion);

        int databaseSizeBeforeUpdate = peticionRepository.findAll().size();

        // Update the peticion
        Peticion updatedPeticion = peticionRepository.findById(peticion.getId()).get();
        // Disconnect from session so that the updates on updatedPeticion are not directly saved in db
        em.detach(updatedPeticion);
        updatedPeticion
            .tipo(UPDATED_TIPO)
            .tipoPermiso(UPDATED_TIPO_PERMISO)
            .fechaPeticion(UPDATED_FECHA_PETICION)
            .motivo(UPDATED_MOTIVO)
            .constancia(UPDATED_CONSTANCIA)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .estado(UPDATED_ESTADO)
            .autorizadoPor(UPDATED_AUTORIZADO_POR);

        restPeticionMockMvc.perform(put("/api/peticions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPeticion)))
            .andExpect(status().isOk());

        // Validate the Peticion in the database
        List<Peticion> peticionList = peticionRepository.findAll();
        assertThat(peticionList).hasSize(databaseSizeBeforeUpdate);
        Peticion testPeticion = peticionList.get(peticionList.size() - 1);
        assertThat(testPeticion.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPeticion.getTipoPermiso()).isEqualTo(UPDATED_TIPO_PERMISO);
        assertThat(testPeticion.getFechaPeticion()).isEqualTo(UPDATED_FECHA_PETICION);
        assertThat(testPeticion.getMotivo()).isEqualTo(UPDATED_MOTIVO);
        assertThat(testPeticion.getConstancia()).isEqualTo(UPDATED_CONSTANCIA);
        assertThat(testPeticion.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testPeticion.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
        assertThat(testPeticion.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testPeticion.getAutorizadoPor()).isEqualTo(UPDATED_AUTORIZADO_POR);
    }

    @Test
    @Transactional
    public void updateNonExistingPeticion() throws Exception {
        int databaseSizeBeforeUpdate = peticionRepository.findAll().size();

        // Create the Peticion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPeticionMockMvc.perform(put("/api/peticions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(peticion)))
            .andExpect(status().isBadRequest());

        // Validate the Peticion in the database
        List<Peticion> peticionList = peticionRepository.findAll();
        assertThat(peticionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePeticion() throws Exception {
        // Initialize the database
        peticionRepository.saveAndFlush(peticion);

        int databaseSizeBeforeDelete = peticionRepository.findAll().size();

        // Delete the peticion
        restPeticionMockMvc.perform(delete("/api/peticions/{id}", peticion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Peticion> peticionList = peticionRepository.findAll();
        assertThat(peticionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Peticion.class);
        Peticion peticion1 = new Peticion();
        peticion1.setId(1L);
        Peticion peticion2 = new Peticion();
        peticion2.setId(peticion1.getId());
        assertThat(peticion1).isEqualTo(peticion2);
        peticion2.setId(2L);
        assertThat(peticion1).isNotEqualTo(peticion2);
        peticion1.setId(null);
        assertThat(peticion1).isNotEqualTo(peticion2);
    }
}

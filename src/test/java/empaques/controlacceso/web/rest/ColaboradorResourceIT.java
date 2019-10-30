package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.Colaborador;
import empaques.controlacceso.repository.ColaboradorRepository;
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

import empaques.controlacceso.domain.enumeration.Estado;
/**
 * Integration tests for the {@link ColaboradorResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class ColaboradorResourceIT {

    private static final String DEFAULT_NOMBRE_1 = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_2 = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO_1 = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO_1 = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO_2 = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO_2 = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_DOCUMENTO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_DOCUMENTO = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_DOCUMENTO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_DOCUMENTO = "BBBBBBBBBB";

    private static final String DEFAULT_LUGAR_EXPEDICION = "AAAAAAAAAA";
    private static final String UPDATED_LUGAR_EXPEDICION = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_EXPEDICION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_EXPEDICION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_EXPEDICION = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_NACIMIENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_NACIMIENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_NACIMIENTO = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_DIRECCION_RESIDENCIA = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION_RESIDENCIA = "BBBBBBBBBB";

    private static final String DEFAULT_BARRIO = "AAAAAAAAAA";
    private static final String UPDATED_BARRIO = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_INGRESO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INGRESO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_INGRESO = Instant.ofEpochMilli(-1L);

    private static final Integer DEFAULT_TIEMPO_REQUERIDO = 1;
    private static final Integer UPDATED_TIEMPO_REQUERIDO = 2;
    private static final Integer SMALLER_TIEMPO_REQUERIDO = 1 - 1;

    private static final String DEFAULT_CARGO_DESEMPENIAR = "AAAAAAAAAA";
    private static final String UPDATED_CARGO_DESEMPENIAR = "BBBBBBBBBB";

    private static final Integer DEFAULT_SALARIO = 1;
    private static final Integer UPDATED_SALARIO = 2;
    private static final Integer SMALLER_SALARIO = 1 - 1;

    private static final String DEFAULT_EPS = "AAAAAAAAAA";
    private static final String UPDATED_EPS = "BBBBBBBBBB";

    private static final Estado DEFAULT_ESTADO = Estado.Activo;
    private static final Estado UPDATED_ESTADO = Estado.Inactivo;

    private static final Instant DEFAULT_FECHA_BAJA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_BAJA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_BAJA = Instant.ofEpochMilli(-1L);

    @Autowired
    private ColaboradorRepository colaboradorRepository;

    @Mock
    private ColaboradorRepository colaboradorRepositoryMock;

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

    private MockMvc restColaboradorMockMvc;

    private Colaborador colaborador;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ColaboradorResource colaboradorResource = new ColaboradorResource(colaboradorRepository);
        this.restColaboradorMockMvc = MockMvcBuilders.standaloneSetup(colaboradorResource)
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
    public static Colaborador createEntity(EntityManager em) {
        Colaborador colaborador = new Colaborador()
            .nombre1(DEFAULT_NOMBRE_1)
            .nombre2(DEFAULT_NOMBRE_2)
            .apellido1(DEFAULT_APELLIDO_1)
            .apellido2(DEFAULT_APELLIDO_2)
            .tipoDocumento(DEFAULT_TIPO_DOCUMENTO)
            .numeroDocumento(DEFAULT_NUMERO_DOCUMENTO)
            .lugarExpedicion(DEFAULT_LUGAR_EXPEDICION)
            .fechaExpedicion(DEFAULT_FECHA_EXPEDICION)
            .fechaNacimiento(DEFAULT_FECHA_NACIMIENTO)
            .direccionResidencia(DEFAULT_DIRECCION_RESIDENCIA)
            .barrio(DEFAULT_BARRIO)
            .fechaIngreso(DEFAULT_FECHA_INGRESO)
            .tiempoRequerido(DEFAULT_TIEMPO_REQUERIDO)
            .cargoDesempeniar(DEFAULT_CARGO_DESEMPENIAR)
            .salario(DEFAULT_SALARIO)
            .eps(DEFAULT_EPS)
            .estado(DEFAULT_ESTADO)
            .fechaBaja(DEFAULT_FECHA_BAJA);
        return colaborador;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Colaborador createUpdatedEntity(EntityManager em) {
        Colaborador colaborador = new Colaborador()
            .nombre1(UPDATED_NOMBRE_1)
            .nombre2(UPDATED_NOMBRE_2)
            .apellido1(UPDATED_APELLIDO_1)
            .apellido2(UPDATED_APELLIDO_2)
            .tipoDocumento(UPDATED_TIPO_DOCUMENTO)
            .numeroDocumento(UPDATED_NUMERO_DOCUMENTO)
            .lugarExpedicion(UPDATED_LUGAR_EXPEDICION)
            .fechaExpedicion(UPDATED_FECHA_EXPEDICION)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .direccionResidencia(UPDATED_DIRECCION_RESIDENCIA)
            .barrio(UPDATED_BARRIO)
            .fechaIngreso(UPDATED_FECHA_INGRESO)
            .tiempoRequerido(UPDATED_TIEMPO_REQUERIDO)
            .cargoDesempeniar(UPDATED_CARGO_DESEMPENIAR)
            .salario(UPDATED_SALARIO)
            .eps(UPDATED_EPS)
            .estado(UPDATED_ESTADO)
            .fechaBaja(UPDATED_FECHA_BAJA);
        return colaborador;
    }

    @BeforeEach
    public void initTest() {
        colaborador = createEntity(em);
    }

    @Test
    @Transactional
    public void createColaborador() throws Exception {
        int databaseSizeBeforeCreate = colaboradorRepository.findAll().size();

        // Create the Colaborador
        restColaboradorMockMvc.perform(post("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colaborador)))
            .andExpect(status().isCreated());

        // Validate the Colaborador in the database
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeCreate + 1);
        Colaborador testColaborador = colaboradorList.get(colaboradorList.size() - 1);
        assertThat(testColaborador.getNombre1()).isEqualTo(DEFAULT_NOMBRE_1);
        assertThat(testColaborador.getNombre2()).isEqualTo(DEFAULT_NOMBRE_2);
        assertThat(testColaborador.getApellido1()).isEqualTo(DEFAULT_APELLIDO_1);
        assertThat(testColaborador.getApellido2()).isEqualTo(DEFAULT_APELLIDO_2);
        assertThat(testColaborador.getTipoDocumento()).isEqualTo(DEFAULT_TIPO_DOCUMENTO);
        assertThat(testColaborador.getNumeroDocumento()).isEqualTo(DEFAULT_NUMERO_DOCUMENTO);
        assertThat(testColaborador.getLugarExpedicion()).isEqualTo(DEFAULT_LUGAR_EXPEDICION);
        assertThat(testColaborador.getFechaExpedicion()).isEqualTo(DEFAULT_FECHA_EXPEDICION);
        assertThat(testColaborador.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testColaborador.getDireccionResidencia()).isEqualTo(DEFAULT_DIRECCION_RESIDENCIA);
        assertThat(testColaborador.getBarrio()).isEqualTo(DEFAULT_BARRIO);
        assertThat(testColaborador.getFechaIngreso()).isEqualTo(DEFAULT_FECHA_INGRESO);
        assertThat(testColaborador.getTiempoRequerido()).isEqualTo(DEFAULT_TIEMPO_REQUERIDO);
        assertThat(testColaborador.getCargoDesempeniar()).isEqualTo(DEFAULT_CARGO_DESEMPENIAR);
        assertThat(testColaborador.getSalario()).isEqualTo(DEFAULT_SALARIO);
        assertThat(testColaborador.getEps()).isEqualTo(DEFAULT_EPS);
        assertThat(testColaborador.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testColaborador.getFechaBaja()).isEqualTo(DEFAULT_FECHA_BAJA);
    }

    @Test
    @Transactional
    public void createColaboradorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = colaboradorRepository.findAll().size();

        // Create the Colaborador with an existing ID
        colaborador.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restColaboradorMockMvc.perform(post("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colaborador)))
            .andExpect(status().isBadRequest());

        // Validate the Colaborador in the database
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombre1IsRequired() throws Exception {
        int databaseSizeBeforeTest = colaboradorRepository.findAll().size();
        // set the field null
        colaborador.setNombre1(null);

        // Create the Colaborador, which fails.

        restColaboradorMockMvc.perform(post("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colaborador)))
            .andExpect(status().isBadRequest());

        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkApellido1IsRequired() throws Exception {
        int databaseSizeBeforeTest = colaboradorRepository.findAll().size();
        // set the field null
        colaborador.setApellido1(null);

        // Create the Colaborador, which fails.

        restColaboradorMockMvc.perform(post("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colaborador)))
            .andExpect(status().isBadRequest());

        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllColaboradors() throws Exception {
        // Initialize the database
        colaboradorRepository.saveAndFlush(colaborador);

        // Get all the colaboradorList
        restColaboradorMockMvc.perform(get("/api/colaboradors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(colaborador.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre1").value(hasItem(DEFAULT_NOMBRE_1.toString())))
            .andExpect(jsonPath("$.[*].nombre2").value(hasItem(DEFAULT_NOMBRE_2.toString())))
            .andExpect(jsonPath("$.[*].apellido1").value(hasItem(DEFAULT_APELLIDO_1.toString())))
            .andExpect(jsonPath("$.[*].apellido2").value(hasItem(DEFAULT_APELLIDO_2.toString())))
            .andExpect(jsonPath("$.[*].tipoDocumento").value(hasItem(DEFAULT_TIPO_DOCUMENTO.toString())))
            .andExpect(jsonPath("$.[*].numeroDocumento").value(hasItem(DEFAULT_NUMERO_DOCUMENTO.toString())))
            .andExpect(jsonPath("$.[*].lugarExpedicion").value(hasItem(DEFAULT_LUGAR_EXPEDICION.toString())))
            .andExpect(jsonPath("$.[*].fechaExpedicion").value(hasItem(DEFAULT_FECHA_EXPEDICION.toString())))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].direccionResidencia").value(hasItem(DEFAULT_DIRECCION_RESIDENCIA.toString())))
            .andExpect(jsonPath("$.[*].barrio").value(hasItem(DEFAULT_BARRIO.toString())))
            .andExpect(jsonPath("$.[*].fechaIngreso").value(hasItem(DEFAULT_FECHA_INGRESO.toString())))
            .andExpect(jsonPath("$.[*].tiempoRequerido").value(hasItem(DEFAULT_TIEMPO_REQUERIDO)))
            .andExpect(jsonPath("$.[*].cargoDesempeniar").value(hasItem(DEFAULT_CARGO_DESEMPENIAR.toString())))
            .andExpect(jsonPath("$.[*].salario").value(hasItem(DEFAULT_SALARIO)))
            .andExpect(jsonPath("$.[*].eps").value(hasItem(DEFAULT_EPS.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].fechaBaja").value(hasItem(DEFAULT_FECHA_BAJA.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllColaboradorsWithEagerRelationshipsIsEnabled() throws Exception {
        ColaboradorResource colaboradorResource = new ColaboradorResource(colaboradorRepositoryMock);
        when(colaboradorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restColaboradorMockMvc = MockMvcBuilders.standaloneSetup(colaboradorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restColaboradorMockMvc.perform(get("/api/colaboradors?eagerload=true"))
        .andExpect(status().isOk());

        verify(colaboradorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllColaboradorsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ColaboradorResource colaboradorResource = new ColaboradorResource(colaboradorRepositoryMock);
            when(colaboradorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restColaboradorMockMvc = MockMvcBuilders.standaloneSetup(colaboradorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restColaboradorMockMvc.perform(get("/api/colaboradors?eagerload=true"))
        .andExpect(status().isOk());

            verify(colaboradorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getColaborador() throws Exception {
        // Initialize the database
        colaboradorRepository.saveAndFlush(colaborador);

        // Get the colaborador
        restColaboradorMockMvc.perform(get("/api/colaboradors/{id}", colaborador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(colaborador.getId().intValue()))
            .andExpect(jsonPath("$.nombre1").value(DEFAULT_NOMBRE_1.toString()))
            .andExpect(jsonPath("$.nombre2").value(DEFAULT_NOMBRE_2.toString()))
            .andExpect(jsonPath("$.apellido1").value(DEFAULT_APELLIDO_1.toString()))
            .andExpect(jsonPath("$.apellido2").value(DEFAULT_APELLIDO_2.toString()))
            .andExpect(jsonPath("$.tipoDocumento").value(DEFAULT_TIPO_DOCUMENTO.toString()))
            .andExpect(jsonPath("$.numeroDocumento").value(DEFAULT_NUMERO_DOCUMENTO.toString()))
            .andExpect(jsonPath("$.lugarExpedicion").value(DEFAULT_LUGAR_EXPEDICION.toString()))
            .andExpect(jsonPath("$.fechaExpedicion").value(DEFAULT_FECHA_EXPEDICION.toString()))
            .andExpect(jsonPath("$.fechaNacimiento").value(DEFAULT_FECHA_NACIMIENTO.toString()))
            .andExpect(jsonPath("$.direccionResidencia").value(DEFAULT_DIRECCION_RESIDENCIA.toString()))
            .andExpect(jsonPath("$.barrio").value(DEFAULT_BARRIO.toString()))
            .andExpect(jsonPath("$.fechaIngreso").value(DEFAULT_FECHA_INGRESO.toString()))
            .andExpect(jsonPath("$.tiempoRequerido").value(DEFAULT_TIEMPO_REQUERIDO))
            .andExpect(jsonPath("$.cargoDesempeniar").value(DEFAULT_CARGO_DESEMPENIAR.toString()))
            .andExpect(jsonPath("$.salario").value(DEFAULT_SALARIO))
            .andExpect(jsonPath("$.eps").value(DEFAULT_EPS.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.fechaBaja").value(DEFAULT_FECHA_BAJA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingColaborador() throws Exception {
        // Get the colaborador
        restColaboradorMockMvc.perform(get("/api/colaboradors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateColaborador() throws Exception {
        // Initialize the database
        colaboradorRepository.saveAndFlush(colaborador);

        int databaseSizeBeforeUpdate = colaboradorRepository.findAll().size();

        // Update the colaborador
        Colaborador updatedColaborador = colaboradorRepository.findById(colaborador.getId()).get();
        // Disconnect from session so that the updates on updatedColaborador are not directly saved in db
        em.detach(updatedColaborador);
        updatedColaborador
            .nombre1(UPDATED_NOMBRE_1)
            .nombre2(UPDATED_NOMBRE_2)
            .apellido1(UPDATED_APELLIDO_1)
            .apellido2(UPDATED_APELLIDO_2)
            .tipoDocumento(UPDATED_TIPO_DOCUMENTO)
            .numeroDocumento(UPDATED_NUMERO_DOCUMENTO)
            .lugarExpedicion(UPDATED_LUGAR_EXPEDICION)
            .fechaExpedicion(UPDATED_FECHA_EXPEDICION)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .direccionResidencia(UPDATED_DIRECCION_RESIDENCIA)
            .barrio(UPDATED_BARRIO)
            .fechaIngreso(UPDATED_FECHA_INGRESO)
            .tiempoRequerido(UPDATED_TIEMPO_REQUERIDO)
            .cargoDesempeniar(UPDATED_CARGO_DESEMPENIAR)
            .salario(UPDATED_SALARIO)
            .eps(UPDATED_EPS)
            .estado(UPDATED_ESTADO)
            .fechaBaja(UPDATED_FECHA_BAJA);

        restColaboradorMockMvc.perform(put("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedColaborador)))
            .andExpect(status().isOk());

        // Validate the Colaborador in the database
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeUpdate);
        Colaborador testColaborador = colaboradorList.get(colaboradorList.size() - 1);
        assertThat(testColaborador.getNombre1()).isEqualTo(UPDATED_NOMBRE_1);
        assertThat(testColaborador.getNombre2()).isEqualTo(UPDATED_NOMBRE_2);
        assertThat(testColaborador.getApellido1()).isEqualTo(UPDATED_APELLIDO_1);
        assertThat(testColaborador.getApellido2()).isEqualTo(UPDATED_APELLIDO_2);
        assertThat(testColaborador.getTipoDocumento()).isEqualTo(UPDATED_TIPO_DOCUMENTO);
        assertThat(testColaborador.getNumeroDocumento()).isEqualTo(UPDATED_NUMERO_DOCUMENTO);
        assertThat(testColaborador.getLugarExpedicion()).isEqualTo(UPDATED_LUGAR_EXPEDICION);
        assertThat(testColaborador.getFechaExpedicion()).isEqualTo(UPDATED_FECHA_EXPEDICION);
        assertThat(testColaborador.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testColaborador.getDireccionResidencia()).isEqualTo(UPDATED_DIRECCION_RESIDENCIA);
        assertThat(testColaborador.getBarrio()).isEqualTo(UPDATED_BARRIO);
        assertThat(testColaborador.getFechaIngreso()).isEqualTo(UPDATED_FECHA_INGRESO);
        assertThat(testColaborador.getTiempoRequerido()).isEqualTo(UPDATED_TIEMPO_REQUERIDO);
        assertThat(testColaborador.getCargoDesempeniar()).isEqualTo(UPDATED_CARGO_DESEMPENIAR);
        assertThat(testColaborador.getSalario()).isEqualTo(UPDATED_SALARIO);
        assertThat(testColaborador.getEps()).isEqualTo(UPDATED_EPS);
        assertThat(testColaborador.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testColaborador.getFechaBaja()).isEqualTo(UPDATED_FECHA_BAJA);
    }

    @Test
    @Transactional
    public void updateNonExistingColaborador() throws Exception {
        int databaseSizeBeforeUpdate = colaboradorRepository.findAll().size();

        // Create the Colaborador

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restColaboradorMockMvc.perform(put("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colaborador)))
            .andExpect(status().isBadRequest());

        // Validate the Colaborador in the database
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteColaborador() throws Exception {
        // Initialize the database
        colaboradorRepository.saveAndFlush(colaborador);

        int databaseSizeBeforeDelete = colaboradorRepository.findAll().size();

        // Delete the colaborador
        restColaboradorMockMvc.perform(delete("/api/colaboradors/{id}", colaborador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Colaborador.class);
        Colaborador colaborador1 = new Colaborador();
        colaborador1.setId(1L);
        Colaborador colaborador2 = new Colaborador();
        colaborador2.setId(colaborador1.getId());
        assertThat(colaborador1).isEqualTo(colaborador2);
        colaborador2.setId(2L);
        assertThat(colaborador1).isNotEqualTo(colaborador2);
        colaborador1.setId(null);
        assertThat(colaborador1).isNotEqualTo(colaborador2);
    }
}

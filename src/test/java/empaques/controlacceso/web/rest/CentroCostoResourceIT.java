package empaques.controlacceso.web.rest;

import empaques.controlacceso.ControlAccesoApp;
import empaques.controlacceso.domain.CentroCosto;
import empaques.controlacceso.repository.CentroCostoRepository;
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

import empaques.controlacceso.domain.enumeration.Estado;
/**
 * Integration tests for the {@link CentroCostoResource} REST controller.
 */
@SpringBootTest(classes = ControlAccesoApp.class)
public class CentroCostoResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Estado DEFAULT_ESTADO = Estado.Activo;
    private static final Estado UPDATED_ESTADO = Estado.Inactivo;

    @Autowired
    private CentroCostoRepository centroCostoRepository;

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

    private MockMvc restCentroCostoMockMvc;

    private CentroCosto centroCosto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CentroCostoResource centroCostoResource = new CentroCostoResource(centroCostoRepository);
        this.restCentroCostoMockMvc = MockMvcBuilders.standaloneSetup(centroCostoResource)
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
    public static CentroCosto createEntity(EntityManager em) {
        CentroCosto centroCosto = new CentroCosto()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .estado(DEFAULT_ESTADO);
        return centroCosto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CentroCosto createUpdatedEntity(EntityManager em) {
        CentroCosto centroCosto = new CentroCosto()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .estado(UPDATED_ESTADO);
        return centroCosto;
    }

    @BeforeEach
    public void initTest() {
        centroCosto = createEntity(em);
    }

    @Test
    @Transactional
    public void createCentroCosto() throws Exception {
        int databaseSizeBeforeCreate = centroCostoRepository.findAll().size();

        // Create the CentroCosto
        restCentroCostoMockMvc.perform(post("/api/centro-costos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroCosto)))
            .andExpect(status().isCreated());

        // Validate the CentroCosto in the database
        List<CentroCosto> centroCostoList = centroCostoRepository.findAll();
        assertThat(centroCostoList).hasSize(databaseSizeBeforeCreate + 1);
        CentroCosto testCentroCosto = centroCostoList.get(centroCostoList.size() - 1);
        assertThat(testCentroCosto.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCentroCosto.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testCentroCosto.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createCentroCostoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = centroCostoRepository.findAll().size();

        // Create the CentroCosto with an existing ID
        centroCosto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCentroCostoMockMvc.perform(post("/api/centro-costos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroCosto)))
            .andExpect(status().isBadRequest());

        // Validate the CentroCosto in the database
        List<CentroCosto> centroCostoList = centroCostoRepository.findAll();
        assertThat(centroCostoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = centroCostoRepository.findAll().size();
        // set the field null
        centroCosto.setNombre(null);

        // Create the CentroCosto, which fails.

        restCentroCostoMockMvc.perform(post("/api/centro-costos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroCosto)))
            .andExpect(status().isBadRequest());

        List<CentroCosto> centroCostoList = centroCostoRepository.findAll();
        assertThat(centroCostoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCentroCostos() throws Exception {
        // Initialize the database
        centroCostoRepository.saveAndFlush(centroCosto);

        // Get all the centroCostoList
        restCentroCostoMockMvc.perform(get("/api/centro-costos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(centroCosto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }
    
    @Test
    @Transactional
    public void getCentroCosto() throws Exception {
        // Initialize the database
        centroCostoRepository.saveAndFlush(centroCosto);

        // Get the centroCosto
        restCentroCostoMockMvc.perform(get("/api/centro-costos/{id}", centroCosto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(centroCosto.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCentroCosto() throws Exception {
        // Get the centroCosto
        restCentroCostoMockMvc.perform(get("/api/centro-costos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCentroCosto() throws Exception {
        // Initialize the database
        centroCostoRepository.saveAndFlush(centroCosto);

        int databaseSizeBeforeUpdate = centroCostoRepository.findAll().size();

        // Update the centroCosto
        CentroCosto updatedCentroCosto = centroCostoRepository.findById(centroCosto.getId()).get();
        // Disconnect from session so that the updates on updatedCentroCosto are not directly saved in db
        em.detach(updatedCentroCosto);
        updatedCentroCosto
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .estado(UPDATED_ESTADO);

        restCentroCostoMockMvc.perform(put("/api/centro-costos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCentroCosto)))
            .andExpect(status().isOk());

        // Validate the CentroCosto in the database
        List<CentroCosto> centroCostoList = centroCostoRepository.findAll();
        assertThat(centroCostoList).hasSize(databaseSizeBeforeUpdate);
        CentroCosto testCentroCosto = centroCostoList.get(centroCostoList.size() - 1);
        assertThat(testCentroCosto.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCentroCosto.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testCentroCosto.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingCentroCosto() throws Exception {
        int databaseSizeBeforeUpdate = centroCostoRepository.findAll().size();

        // Create the CentroCosto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCentroCostoMockMvc.perform(put("/api/centro-costos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centroCosto)))
            .andExpect(status().isBadRequest());

        // Validate the CentroCosto in the database
        List<CentroCosto> centroCostoList = centroCostoRepository.findAll();
        assertThat(centroCostoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCentroCosto() throws Exception {
        // Initialize the database
        centroCostoRepository.saveAndFlush(centroCosto);

        int databaseSizeBeforeDelete = centroCostoRepository.findAll().size();

        // Delete the centroCosto
        restCentroCostoMockMvc.perform(delete("/api/centro-costos/{id}", centroCosto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CentroCosto> centroCostoList = centroCostoRepository.findAll();
        assertThat(centroCostoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CentroCosto.class);
        CentroCosto centroCosto1 = new CentroCosto();
        centroCosto1.setId(1L);
        CentroCosto centroCosto2 = new CentroCosto();
        centroCosto2.setId(centroCosto1.getId());
        assertThat(centroCosto1).isEqualTo(centroCosto2);
        centroCosto2.setId(2L);
        assertThat(centroCosto1).isNotEqualTo(centroCosto2);
        centroCosto1.setId(null);
        assertThat(centroCosto1).isNotEqualTo(centroCosto2);
    }
}

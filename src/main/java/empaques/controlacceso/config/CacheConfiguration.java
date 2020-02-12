package empaques.controlacceso.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, empaques.controlacceso.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, empaques.controlacceso.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, empaques.controlacceso.domain.User.class.getName());
            createCache(cm, empaques.controlacceso.domain.Authority.class.getName());
            createCache(cm, empaques.controlacceso.domain.User.class.getName() + ".authorities");
            createCache(cm, empaques.controlacceso.domain.Turno.class.getName());
            createCache(cm, empaques.controlacceso.domain.AsignacionTurno.class.getName());
            createCache(cm, empaques.controlacceso.domain.AsignacionTurno.class.getName() + ".colaboradors");
            createCache(cm, empaques.controlacceso.domain.Cargo.class.getName());
            createCache(cm, empaques.controlacceso.domain.Cargo.class.getName() + ".asignacionTurnos");
            createCache(cm, empaques.controlacceso.domain.CentroCosto.class.getName());
            createCache(cm, empaques.controlacceso.domain.CentroCosto.class.getName() + ".cargos");
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName());
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName() + ".intercambioTurnos");
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName() + ".telefonos");
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName() + ".antecedentes");
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName() + ".asistenciaPlaneacions");
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName() + ".peticions");
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName() + ".asignacionHorasExtras");
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName() + ".asignacionTurnos");
            createCache(cm, empaques.controlacceso.domain.Telefono.class.getName());
            createCache(cm, empaques.controlacceso.domain.Antecedentes.class.getName());
            createCache(cm, empaques.controlacceso.domain.Peticion.class.getName());
            createCache(cm, empaques.controlacceso.domain.Peticion.class.getName() + ".colaboradors");
            createCache(cm, empaques.controlacceso.domain.IntercambioTurno.class.getName());
            // createCache(cm, empaques.controlacceso.domain.PlaneacionSemanal.class.getName());
            // createCache(cm, empaques.controlacceso.domain.PlaneacionSemanal.class.getName() + ".asignacionTurnos");
            createCache(cm, empaques.controlacceso.domain.AsignacionHorasExtras.class.getName());
            createCache(cm, empaques.controlacceso.domain.AsignacionHorasExtras.class.getName() + ".colaboradors");
            createCache(cm, empaques.controlacceso.domain.Asistencia.class.getName());
            createCache(cm, empaques.controlacceso.domain.AsistenciaPlaneacion.class.getName());
            createCache(cm, empaques.controlacceso.domain.ReporteAsistencia.class.getName());
            createCache(cm, empaques.controlacceso.domain.DevengoNomina.class.getName());
            createCache(cm, empaques.controlacceso.domain.Novedades.class.getName());
            createCache(cm, empaques.controlacceso.domain.AsistenciaHorasExtras.class.getName());
            createCache(cm, empaques.controlacceso.domain.ReporteAsistenciaHorasExtras.class.getName());
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName() + ".intercambioTurno2S");
            createCache(cm, empaques.controlacceso.domain.PlanificacionAsistencia.class.getName());
            createCache(cm, empaques.controlacceso.domain.Colaborador.class.getName() + ".planificacionAsistencias");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}

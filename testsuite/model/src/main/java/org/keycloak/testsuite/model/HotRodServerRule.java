package org.keycloak.testsuite.model;

import java.io.IOException;
import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

import org.infinispan.client.hotrod.RemoteCacheManager;
import org.infinispan.commons.dataconversion.MediaType;
import org.infinispan.configuration.cache.BackupConfiguration;
import org.infinispan.configuration.cache.BackupFailurePolicy;
import org.infinispan.configuration.cache.CacheMode;
import org.infinispan.configuration.cache.Configuration;
import org.infinispan.configuration.cache.ConfigurationBuilder;
import org.infinispan.container.versioning.IncrementableEntryVersion;
import org.infinispan.container.versioning.NumericVersion;
import org.infinispan.container.versioning.VersionGenerator;
import org.infinispan.factories.ComponentRegistry;
import org.infinispan.factories.KnownComponentNames;
import org.infinispan.manager.DefaultCacheManager;
import org.infinispan.server.hotrod.HotRodServer;
import org.infinispan.server.hotrod.configuration.HotRodServerConfiguration;
import org.infinispan.server.hotrod.configuration.HotRodServerConfigurationBuilder;
import org.junit.rules.ExternalResource;
import org.keycloak.Config;
import org.keycloak.connections.infinispan.InfinispanUtil;
import org.keycloak.marshalling.KeycloakModelSchema;

import static org.keycloak.connections.infinispan.InfinispanConnectionProvider.ACTION_TOKEN_CACHE;
import static org.keycloak.connections.infinispan.InfinispanConnectionProvider.AUTHENTICATION_SESSIONS_CACHE_NAME;
import static org.keycloak.connections.infinispan.InfinispanConnectionProvider.CLIENT_SESSION_CACHE_NAME;
import static org.keycloak.connections.infinispan.InfinispanConnectionProvider.LOGIN_FAILURE_CACHE_NAME;
import static org.keycloak.connections.infinispan.InfinispanConnectionProvider.OFFLINE_CLIENT_SESSION_CACHE_NAME;
import static org.keycloak.connections.infinispan.InfinispanConnectionProvider.OFFLINE_USER_SESSION_CACHE_NAME;
import static org.keycloak.connections.infinispan.InfinispanConnectionProvider.USER_SESSION_CACHE_NAME;
import static org.keycloak.connections.infinispan.InfinispanConnectionProvider.WORK_CACHE_NAME;

public class HotRodServerRule extends ExternalResource {

    protected HotRodServer hotRodServer;

    protected HotRodServer hotRodServer2;

    protected RemoteCacheManager remoteCacheManager;

    protected DefaultCacheManager hotRodCacheManager;

    protected DefaultCacheManager hotRodCacheManager2;

    @Override
    protected void after() {
        if (remoteCacheManager != null) {
            remoteCacheManager.stop();
        }
    }

    public void createEmbeddedHotRodServer(Config.Scope config) {
        try {
            hotRodCacheManager = new DefaultCacheManager("hotrod/hotrod1.xml");
            hotRodCacheManager2 = new DefaultCacheManager("hotrod/hotrod2.xml");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        HotRodServerConfiguration build = new HotRodServerConfigurationBuilder().build();
        hotRodServer = new HotRodServer();
        hotRodServer.start(build, hotRodCacheManager);

        HotRodServerConfiguration build2 = new HotRodServerConfigurationBuilder().port(11333).build();
        hotRodServer2 = new HotRodServer();
        hotRodServer2.start(build2, hotRodCacheManager2);

        // Create a Hot Rod client
        org.infinispan.client.hotrod.configuration.ConfigurationBuilder remoteBuilder = new org.infinispan.client.hotrod.configuration.ConfigurationBuilder();
        remoteBuilder.addContextInitializers(KeycloakModelSchema.INSTANCE);
        org.infinispan.client.hotrod.configuration.Configuration cfg = remoteBuilder
                .addServers(hotRodServer.getHost() + ":" + hotRodServer.getPort() + ";"
                        + hotRodServer2.getHost() + ":" + hotRodServer2.getPort()).build();
        remoteCacheManager = new RemoteCacheManager(cfg);

        boolean async = config.getBoolean("async", false);

        // create remote keycloak caches
        createKeycloakCaches(async, USER_SESSION_CACHE_NAME, OFFLINE_USER_SESSION_CACHE_NAME, CLIENT_SESSION_CACHE_NAME,
                OFFLINE_CLIENT_SESSION_CACHE_NAME, LOGIN_FAILURE_CACHE_NAME, WORK_CACHE_NAME, ACTION_TOKEN_CACHE, AUTHENTICATION_SESSIONS_CACHE_NAME);

        getCaches(USER_SESSION_CACHE_NAME, OFFLINE_USER_SESSION_CACHE_NAME, CLIENT_SESSION_CACHE_NAME, OFFLINE_CLIENT_SESSION_CACHE_NAME,
                LOGIN_FAILURE_CACHE_NAME, WORK_CACHE_NAME, ACTION_TOKEN_CACHE, AUTHENTICATION_SESSIONS_CACHE_NAME);

        replaceVersionGenerator(USER_SESSION_CACHE_NAME, OFFLINE_USER_SESSION_CACHE_NAME, CLIENT_SESSION_CACHE_NAME, OFFLINE_CLIENT_SESSION_CACHE_NAME,
                LOGIN_FAILURE_CACHE_NAME, WORK_CACHE_NAME, ACTION_TOKEN_CACHE, AUTHENTICATION_SESSIONS_CACHE_NAME);

        // Use Keycloak time service in remote caches
        InfinispanUtil.setTimeServiceToKeycloakTime(hotRodCacheManager);
        InfinispanUtil.setTimeServiceToKeycloakTime(hotRodCacheManager2);
    }

    private void getCaches(String... cache) {
        for (String c: cache) {
            hotRodCacheManager.getCache(c, true);
            hotRodCacheManager2.getCache(c, true);
        }
    }

    // ----- WORKAROUND FOR https://github.com/infinispan/infinispan/issues/13191 -----//
    private void replaceVersionGenerator(String... caches) {
        Arrays.stream(caches)
                .flatMap(name -> Stream.of(hotRodCacheManager.getCache(name), hotRodCacheManager2.getCache(name)))
                .map(ComponentRegistry::of)
                .forEach(cr -> cr.registerComponent(RANDOM_GENERATOR, KnownComponentNames.HOT_ROD_VERSION_GENERATOR, false));
    }

    private static final NumericVersion NON_EXISTING = new NumericVersion(0);
    private static final VersionGenerator RANDOM_GENERATOR = new VersionGenerator() {
        @Override
        public IncrementableEntryVersion generateNew() {
            var version = ThreadLocalRandom.current().nextLong();
            return version == 0 ? new NumericVersion(1L) : new NumericVersion(version);
        }

        @Override
        public IncrementableEntryVersion increment(IncrementableEntryVersion initialVersion) {
            // not used by hot rod
            throw new IllegalStateException();
        }

        @Override
        public IncrementableEntryVersion nonExistingVersion() {
            return NON_EXISTING;
        }
    };
    // ----- END OF WORKAROUND -----//

    private void createKeycloakCaches(boolean async, String... cache) {
        ConfigurationBuilder sessionConfigBuilder1 = createCacheConfigurationBuilder();
        ConfigurationBuilder sessionConfigBuilder2 = createCacheConfigurationBuilder();
        sessionConfigBuilder1.clustering().cacheMode(async ? CacheMode.REPL_ASYNC: CacheMode.REPL_SYNC);
        sessionConfigBuilder2.clustering().cacheMode(async ? CacheMode.REPL_ASYNC: CacheMode.REPL_SYNC);

        sessionConfigBuilder1.sites().addBackup()
                .site("site-2").backupFailurePolicy(BackupFailurePolicy.FAIL).strategy(BackupConfiguration.BackupStrategy.SYNC)
                .replicationTimeout(15000);
        sessionConfigBuilder2.sites().addBackup()
                .site("site-1").backupFailurePolicy(BackupFailurePolicy.FAIL).strategy(BackupConfiguration.BackupStrategy.SYNC)
                .replicationTimeout(15000);

        sessionConfigBuilder1.locking().lockAcquisitionTimeout(1, TimeUnit.SECONDS);
        sessionConfigBuilder2.locking().lockAcquisitionTimeout(1, TimeUnit.SECONDS);

        Configuration sessionCacheConfiguration1 = sessionConfigBuilder1.build();
        Configuration sessionCacheConfiguration2 = sessionConfigBuilder2.build();
        for (String c: cache) {
            hotRodCacheManager.defineConfiguration(c, sessionCacheConfiguration1);
            hotRodCacheManager2.defineConfiguration(c, sessionCacheConfiguration2);
        }
    }

    public static ConfigurationBuilder createCacheConfigurationBuilder() {
        ConfigurationBuilder builder = new ConfigurationBuilder();
        builder.encoding().mediaType(MediaType.APPLICATION_PROTOSTREAM);
        return builder;
    }

    public RemoteCacheManager getRemoteCacheManager() {
        return remoteCacheManager;
    }

    public HotRodServer getHotRodServer() {
        return hotRodServer;
    }

    public HotRodServer getHotRodServer2() {
        return hotRodServer2;
    }

    public DefaultCacheManager getHotRodCacheManager() {
        return hotRodCacheManager;
    }

    public DefaultCacheManager getHotRodCacheManager2() {
        return hotRodCacheManager2;
    }
}

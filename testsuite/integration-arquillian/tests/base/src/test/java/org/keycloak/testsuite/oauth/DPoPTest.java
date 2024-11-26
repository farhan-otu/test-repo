/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.keycloak.testsuite.oauth;

import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.HttpMethod;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.keycloak.OAuth2Constants;
import org.keycloak.OAuthErrorException;
import org.keycloak.admin.client.resource.ClientResource;
import org.keycloak.client.registration.Auth;
import org.keycloak.client.registration.ClientRegistration;
import org.keycloak.client.registration.ClientRegistrationException;
import org.keycloak.common.Profile;
import org.keycloak.common.util.KeyUtils;
import org.keycloak.common.util.Time;
import org.keycloak.crypto.Algorithm;
import org.keycloak.events.EventType;
import org.keycloak.jose.jwk.ECPublicJWK;
import org.keycloak.jose.jwk.JWK;
import org.keycloak.jose.jwk.RSAPublicJWK;
import org.keycloak.jose.jws.JWSHeader;
import org.keycloak.protocol.oidc.OIDCAdvancedConfigWrapper;
import org.keycloak.protocol.oidc.OIDCConfigAttributes;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.RefreshToken;
import org.keycloak.representations.idm.ClientInitialAccessCreatePresentation;
import org.keycloak.representations.idm.ClientInitialAccessPresentation;
import org.keycloak.representations.idm.ClientPoliciesRepresentation;
import org.keycloak.representations.idm.ClientProfilesRepresentation;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.RealmRepresentation;
import org.keycloak.representations.oidc.OIDCClientRepresentation;
import org.keycloak.representations.oidc.TokenMetadataRepresentation;
import org.keycloak.services.clientpolicy.ClientPolicyException;
import org.keycloak.services.clientpolicy.condition.ClientAccessTypeConditionFactory;
import org.keycloak.services.clientpolicy.executor.DPoPBindEnforcerExecutorFactory;
import org.keycloak.services.cors.Cors;
import org.keycloak.testsuite.AbstractTestRealmKeycloakTest;
import org.keycloak.testsuite.Assert;
import org.keycloak.testsuite.AssertEvents;
import org.keycloak.testsuite.admin.ApiUtil;
import org.keycloak.testsuite.arquillian.annotation.EnableFeature;
import org.keycloak.testsuite.util.ClientPoliciesUtil.ClientPoliciesBuilder;
import org.keycloak.testsuite.util.ClientPoliciesUtil.ClientPolicyBuilder;
import org.keycloak.testsuite.util.ClientPoliciesUtil.ClientProfileBuilder;
import org.keycloak.testsuite.util.ClientPoliciesUtil.ClientProfilesBuilder;
import org.keycloak.testsuite.util.Matchers;
import org.keycloak.testsuite.util.OAuthClient;
import org.keycloak.testsuite.util.OAuthClient.UserInfoResponse;
import org.keycloak.testsuite.util.ServerURLs;
import org.keycloak.util.JWKSUtils;
import org.keycloak.util.JsonSerialization;
import org.keycloak.util.TokenUtil;

import java.io.IOException;
import java.security.KeyPair;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.emptyOrNullString;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.keycloak.testsuite.util.ClientPoliciesUtil.createClientAccessTypeConditionConfig;
import static org.keycloak.testsuite.util.ClientPoliciesUtil.createDPoPBindEnforcerExecutorConfig;
import static org.keycloak.testsuite.util.ClientPoliciesUtil.createEcJwk;
import static org.keycloak.testsuite.util.ClientPoliciesUtil.createRsaJwk;
import static org.keycloak.testsuite.util.ClientPoliciesUtil.generateEcdsaKey;
import static org.keycloak.testsuite.util.ClientPoliciesUtil.generateSignedDPoPProof;

@EnableFeature(value = Profile.Feature.DPOP, skipRestart = true)
public class DPoPTest extends AbstractTestRealmKeycloakTest {

    private static final String REALM_NAME = "test";
    private static final String TEST_CONFIDENTIAL_CLIENT_ID = "test-app";
    private static final String TEST_CONFIDENTIAL_CLIENT_SECRET = "password";
    private static final String TEST_PUBLIC_CLIENT_ID = "test-public-client";
    private static final String TEST_USER_NAME = "test-user@localhost";
    private static final String TEST_USER_PASSWORD = "password";
    private static final String DPOP_JWT_HEADER_TYPE = "dpop+jwt";
    @Rule
    public AssertEvents events = new AssertEvents(this);
    private KeyPair ecKeyPair;
    private KeyPair rsaKeyPair;
    private JWK jwkRsa;
    private JWK jwkEc;
    private JWSHeader jwsRsaHeader;
    private JWSHeader jwsEcHeader;
    private String jktRsa;
    private String jktEc;
    private ClientRegistration reg;

    @Before
    public void beforeDPoPTest() throws Exception {
        rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);
        jwkRsa = createRsaJwk(rsaKeyPair.getPublic());
        jwkRsa.getOtherClaims().put(RSAPublicJWK.MODULUS, ((RSAPublicJWK) jwkRsa).getModulus());
        jwkRsa.getOtherClaims().put(RSAPublicJWK.PUBLIC_EXPONENT, ((RSAPublicJWK) jwkRsa).getPublicExponent());
        jktRsa = JWKSUtils.computeThumbprint(jwkRsa);
        jwsRsaHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.PS256, DPOP_JWT_HEADER_TYPE, jwkRsa.getKeyId(), jwkRsa);

        ecKeyPair = generateEcdsaKey("secp256r1");
        jwkEc = createEcJwk(ecKeyPair.getPublic());
        jwkEc.getOtherClaims().put(ECPublicJWK.CRV, ((ECPublicJWK) jwkEc).getCrv());
        jwkEc.getOtherClaims().put(ECPublicJWK.X, ((ECPublicJWK) jwkEc).getX());
        jwkEc.getOtherClaims().put(ECPublicJWK.Y, ((ECPublicJWK) jwkEc).getY());
        jktEc = JWKSUtils.computeThumbprint(jwkEc);
        jwsEcHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.ES256, DPOP_JWT_HEADER_TYPE, jwkEc.getKeyId(), jwkEc);

        changeDPoPBound(TEST_CONFIDENTIAL_CLIENT_ID, true);

        createClientByAdmin(TEST_PUBLIC_CLIENT_ID, (ClientRepresentation rep) -> rep.setPublicClient(Boolean.TRUE));
        changeDPoPBound(TEST_PUBLIC_CLIENT_ID, true);
    }

    @Override
    public void configureTestRealm(RealmRepresentation testRealm) {
    }

    @Test
    public void testDPoPByPublicClientWithDpopJkt() throws Exception {
        // use pre-computed EC key

        int clockSkew = 10; // acceptable clock skew is +-10sec

        sendAuthorizationRequestWithDPoPJkt(jktEc);

        String dpopProofEcEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) (Time.currentTime() + clockSkew), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());

        successTokenProceduresWithDPoP(dpopProofEcEncoded, jktEc);
    }

    @Test
    public void testDPoPByPublicClientWithDpopJktWithDifferentDPoPProofKey() throws Exception {
        // use pre-computed EC and RSA key

        int clockSkew = 10; // acceptable clock skew is +-10sec

        sendAuthorizationRequestWithDPoPJkt(jktEc);
    
        // change key : EC key to RSA key
        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) (Time.currentTime() + clockSkew), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());

        failureTokenProceduresWithDPoP(dpopProofRsaEncoded, "DPoP Proof public key thumbprint does not match dpop_jkt");
    }

    @Test
    public void testDPoPByPublicClient() throws Exception {
        // use pre-computed EC key

        int clockSkew = 10; // acceptable clock skew is +-10sec

        sendAuthorizationRequestWithDPoPJkt(null);

        String dpopProofEcEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) (Time.currentTime() + clockSkew), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());

        successTokenProceduresWithDPoP(dpopProofEcEncoded, jktEc);
    }

    @Test
    public void testDPoPProofByConfidentialClient() throws Exception {
        // use pre-computed RSA key

        int clockSkew = -10; // acceptable clock skew is +-10sec

        oauth.clientId(TEST_CONFIDENTIAL_CLIENT_ID);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) (Time.currentTime() + clockSkew), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());

        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
        oauth.dpopProof(dpopProofRsaEncoded);
        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, TEST_CONFIDENTIAL_CLIENT_SECRET);
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());

        assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
        AccessToken accessToken = oauth.verifyToken(response.getAccessToken());
        assertEquals(jktRsa, accessToken.getConfirmation().getKeyThumbprint());
        RefreshToken refreshToken = oauth.parseRefreshToken(response.getRefreshToken());
        // For confidential client, DPoP is not bind to refresh token (See "section 5 DPoP Access Token Request" of DPoP specification)
        assertNull(refreshToken.getConfirmation());

        String tokenResponse = oauth.introspectTokenWithClientCredential(TEST_CONFIDENTIAL_CLIENT_ID, TEST_CONFIDENTIAL_CLIENT_SECRET, "access_token", response.getAccessToken());
        Assert.assertNotNull(tokenResponse);
        TokenMetadataRepresentation tokenMetadataRepresentation = JsonSerialization.readValue(tokenResponse, TokenMetadataRepresentation.class);
        Assert.assertTrue(tokenMetadataRepresentation.isActive());
        assertEquals(jktRsa, tokenMetadataRepresentation.getConfirmation().getKeyThumbprint());
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, tokenMetadataRepresentation.getOtherClaims().get(OAuth2Constants.TOKEN_TYPE));

        CloseableHttpResponse closableHttpResponse = oauth.doTokenRevoke(response.getAccessToken(), "access_token", TEST_CONFIDENTIAL_CLIENT_SECRET);
        tokenResponse = oauth.introspectTokenWithClientCredential(TEST_CONFIDENTIAL_CLIENT_ID, TEST_CONFIDENTIAL_CLIENT_SECRET, "access_token", response.getAccessToken());
        Assert.assertNotNull(tokenResponse);
        tokenMetadataRepresentation = JsonSerialization.readValue(tokenResponse, TokenMetadataRepresentation.class);
        Assert.assertFalse(tokenMetadataRepresentation.isActive());
        closableHttpResponse.close();

        // token refresh
        String dpopProofEcEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) (Time.currentTime() + clockSkew), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());

        oauth.dpopProof(dpopProofEcEncoded);
        response = oauth.doRefreshTokenRequest(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());

        assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
        accessToken = oauth.verifyToken(response.getAccessToken());
        assertEquals(jktEc, accessToken.getConfirmation().getKeyThumbprint());
        refreshToken = oauth.parseRefreshToken(response.getRefreshToken());
        assertNull(refreshToken.getConfirmation());

        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
    }

    @Test
    public void testDPoPDisabledByPublicClient() throws Exception {

        changeDPoPBound(TEST_PUBLIC_CLIENT_ID, false);
        try {
            // with DPoP proof
            testDPoPByPublicClient();

            // without DPoP proof
            oauth.clientId(TEST_PUBLIC_CLIENT_ID);
            oauth.dpopProof(null);
            oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

            String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
            OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, null);
            // token-type must be "Bearer" because no DPoP is present within the token-request
            assertEquals(TokenUtil.TOKEN_TYPE_BEARER, response.getTokenType());

            assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
            AccessToken accessToken = oauth.verifyToken(response.getAccessToken());
            assertNull(accessToken.getConfirmation());
            RefreshToken refreshToken = oauth.parseRefreshToken(response.getRefreshToken());
            assertNull(refreshToken.getConfirmation());

            // token refresh
            response = oauth.doRefreshTokenRequest(response.getRefreshToken(), null);
            assertEquals(TokenUtil.TOKEN_TYPE_BEARER, response.getTokenType());

            assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
            accessToken = oauth.verifyToken(response.getAccessToken());
            assertNull(accessToken.getConfirmation());
            refreshToken = oauth.parseRefreshToken(response.getRefreshToken());
            assertNull(refreshToken.getConfirmation());

            oauth.idTokenHint(response.getIdToken()).openLogout();
        } finally {
            changeDPoPBound(TEST_PUBLIC_CLIENT_ID, true);
        }
    }

    @Test
    public void testTokenRefreshWithReplayedDPoPProofByPublicClient() throws Exception {

        oauth.clientId(TEST_PUBLIC_CLIENT_ID);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

        String dpopProofEcEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());

        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
        oauth.dpopProof(dpopProofEcEncoded);
        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, null);
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());

        // token refresh
        response = oauth.doRefreshTokenRequest(response.getRefreshToken(), null);
        assertNull(response.getTokenType());
        assertEquals(Status.BAD_REQUEST.getStatusCode(), response.getStatusCode());
        assertEquals(OAuthErrorException.INVALID_REQUEST, response.getError());
        assertEquals("DPoP proof has already been used", response.getErrorDescription());

        oauth.idTokenHint(response.getIdToken()).openLogout();
    }

    @Test
    public void testTokenRefreshWithoutDPoPProofByConfidentialClient() throws Exception {

        oauth.clientId(TEST_CONFIDENTIAL_CLIENT_ID);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());

        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
        oauth.dpopProof(dpopProofRsaEncoded);
        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, TEST_USER_PASSWORD);
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());

        // token refresh
        oauth.dpopProof(null);
        response = oauth.doRefreshTokenRequest(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
        assertNull(response.getTokenType());
        assertEquals(Status.BAD_REQUEST.getStatusCode(), response.getStatusCode());
        assertEquals(OAuthErrorException.INVALID_REQUEST, response.getError());
        assertEquals("DPoP proof is missing", response.getErrorDescription());

        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
    }

    @Test
    public void testDPoPProofCorsPreflight() throws Exception {
        CloseableHttpResponse response = oauth.doPreflightRequest();

        String[] headers = response.getHeaders(Cors.ACCESS_CONTROL_ALLOW_HEADERS)[0].getValue().split(", ");
        Set<String> allowedHeaders = new HashSet<>(Arrays.asList(headers));

        assertTrue(allowedHeaders.contains(TokenUtil.TOKEN_TYPE_DPOP));
    }

    @Test
    public void testDPoPProofWithoutJwk() throws Exception {
        JWSHeader jwsHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.ES256, DPOP_JWT_HEADER_TYPE, jwkEc.getKeyId(), null);
        testDPoPProofFailure(generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsHeader, ecKeyPair.getPrivate()), "No JWK in DPoP header");
    }

    @Test
    public void testDPoPProofInvalidAlgorithm() throws Exception {
        JWSHeader jwsHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.none, DPOP_JWT_HEADER_TYPE, jwkEc.getKeyId(), jwkEc);
        testDPoPProofFailure(generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsHeader, ecKeyPair.getPrivate()), "Unsupported DPoP algorithm: none");
    }

    @Test
    public void testDPoPProofInvalidType() throws Exception {
        JWSHeader jwsEcHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.ES256, "jwt+dpop", jwkEc.getKeyId(), jwkEc);
        testDPoPProofFailure(generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate()), "Invalid or missing type in DPoP header: jwt+dpop");
    }

    @Test
    public void testDPoPProofInvalidSignature() throws Exception {
        testDPoPProofFailure(generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.PS256, jwsEcHeader, rsaKeyPair.getPrivate()), "DPoP verification failure: org.keycloak.exceptions.TokenSignatureInvalidException: Invalid token signature");
    }

    @Test
    public void testDPoPProofMandatoryClaimMissing() throws Exception {
        testDPoPProofFailure(generateSignedDPoPProof(null, HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate()), "DPoP mandatory claims are missing");
    }

    @Test
    public void testDPoPProofReplayed() throws Exception {

        String dpopProofEcEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());

        oauth.dpopProof(dpopProofEcEncoded);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, TEST_USER_PASSWORD);
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());
        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);

        testDPoPProofFailure(dpopProofEcEncoded, "DPoP proof has already been used");
    }

    @Test
    public void testDPoPProofExpired() throws Exception {
        testDPoPProofFailure(generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) (Time.currentTime() - 100000), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate()), "DPoP proof is not active");
    }

    @Test
    public void testDPoPProofHttpMethodMismatch() throws Exception {
        testDPoPProofFailure(generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.GET, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate()), "DPoP HTTP method mismatch");
    }

    @Test
    public void testDPoPProofHttpUrlMalformed() throws Exception {
        testDPoPProofFailure(generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, ":::*;", (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate()), "Malformed HTTP URL in DPoP proof");
    }

    @Test
    public void testDPoPProofHttpUrlMismatch() throws Exception {
        testDPoPProofFailure(generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, "https://server.example.com/token", (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate()), "DPoP HTTP URL mismatch");
    }

    @Test
    public void testWithoutDPoPProof() throws Exception {

        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, TEST_USER_PASSWORD);

        assertEquals(OAuthErrorException.INVALID_REQUEST, response.getError());
        assertEquals("DPoP proof is missing", response.getErrorDescription());
    }

    @Test
    public void testDPoPProofOnUserInfoByConfidentialClient() throws Exception {
        KeyPair rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);
        OAuthClient.AccessTokenResponse response = getDPoPBindAccessToken(rsaKeyPair);
        doSuccessfulUserInfoGet(response, rsaKeyPair);

        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
    }

    @Test
    public void testDPoPDisabledOnUserInfo() throws Exception {

        changeDPoPBound(TEST_CONFIDENTIAL_CLIENT_ID, false);
        try {
            KeyPair rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);
            OAuthClient.AccessTokenResponse response = getDPoPBindAccessToken(rsaKeyPair);
            doSuccessfulUserInfoGet(response, rsaKeyPair);

            // delete DPoP proof
            oauth.dpopProof(null);
            UserInfoResponse userInfoResponse = oauth.doUserInfoRequestByGet(response);
            assertEquals(401, userInfoResponse.getStatusCode());
            assertEquals("Bearer realm=\"test\", error=\"invalid_token\", error_description=\"DPoP proof and token binding verification failed\"", userInfoResponse.getHeaders().get("WWW-Authenticate"));

            oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
        } finally {
            changeDPoPBound(TEST_CONFIDENTIAL_CLIENT_ID, true);
        }
    }

    @Test
    public void testWithoutDPoPProofOnUserInfo() throws Exception {
        KeyPair rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);
        OAuthClient.AccessTokenResponse response = getDPoPBindAccessToken(rsaKeyPair);

        oauth.dpopProof(null);
        UserInfoResponse userInfoResponse = oauth.doUserInfoRequestByGet(response);
        assertEquals(401, userInfoResponse.getStatusCode());
        assertEquals("Bearer realm=\"test\", error=\"invalid_token\", error_description=\"DPoP proof and token binding verification failed\"", userInfoResponse.getHeaders().get("WWW-Authenticate"));

        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
    }

    @Test
    public void testInvalidDPoPProofOnUserInfo() throws Exception {
        KeyPair rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);
        OAuthClient.AccessTokenResponse response = getDPoPBindAccessToken(rsaKeyPair);

        JWK jwkRsa = createRsaJwk(rsaKeyPair.getPublic());
        JWSHeader jwsRsaHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.PS256, DPOP_JWT_HEADER_TYPE, jwkRsa.getKeyId(), jwkRsa);
        // invalid "htu" claim
        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.GET, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());
        oauth.dpopProof(dpopProofRsaEncoded);
        UserInfoResponse userInfoResponse = oauth.doUserInfoRequestByGet(response);
        assertEquals(401, userInfoResponse.getStatusCode());
        assertEquals("Bearer realm=\"test\", error=\"invalid_token\", error_description=\"DPoP proof and token binding verification failed\"", userInfoResponse.getHeaders().get("WWW-Authenticate"));

        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
    }

    @Test
    public void testMultipleUseDPoPProofOnUserInfo() throws Exception {
        KeyPair rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);
        OAuthClient.AccessTokenResponse response = getDPoPBindAccessToken(rsaKeyPair);
        doSuccessfulUserInfoGet(response, rsaKeyPair);

        // use the same DPoP proof
        UserInfoResponse userInfoResponse = oauth.doUserInfoRequestByGet(response);
        assertEquals(401, userInfoResponse.getStatusCode());
        assertEquals("Bearer realm=\"test\", error=\"invalid_token\", error_description=\"DPoP proof and token binding verification failed\"", userInfoResponse.getHeaders().get("WWW-Authenticate"));

        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
    }

    @Test
    public void testDifferentKeyDPoPProofOnUserInfo() throws Exception {
        KeyPair rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);
        OAuthClient.AccessTokenResponse response = getDPoPBindAccessToken(rsaKeyPair);

        // use different key
        rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);
        JWK jwkRsa = createRsaJwk(rsaKeyPair.getPublic());
        JWSHeader jwsRsaHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.PS256, DPOP_JWT_HEADER_TYPE, jwkRsa.getKeyId(), jwkRsa);
        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.GET, oauth.getUserInfoUrl(), (long) Time.currentTime(), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());
        oauth.dpopProof(dpopProofRsaEncoded);
        UserInfoResponse userInfoResponse = oauth.doUserInfoRequestByGet(response);
        assertEquals(401, userInfoResponse.getStatusCode());
        assertEquals("Bearer realm=\"test\", error=\"invalid_token\", error_description=\"DPoP proof and token binding verification failed\"", userInfoResponse.getHeaders().get("WWW-Authenticate"));

        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
    }

    @Test
    public void testDPoPBindEnforcerExecutor() throws Exception {
        setInitialAccessTokenForDynamicClientRegistration();

        KeyPair ecKeyPair = generateEcdsaKey("secp256r1");
        KeyPair rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);
        JWK jwkRsa = createRsaJwk(rsaKeyPair.getPublic());
        JWK jwkEc = createEcJwk(ecKeyPair.getPublic());

        // register profiles
        String json = (new ClientProfilesBuilder()).addProfile(
                (new ClientProfileBuilder()).createProfile("MyProfile", "Le Premier Profil")
                        .addExecutor(DPoPBindEnforcerExecutorFactory.PROVIDER_ID, createDPoPBindEnforcerExecutorConfig(Boolean.FALSE))
                        .toRepresentation()
        ).toString();
        updateProfiles(json);

        // register policies
        json = (new ClientPoliciesBuilder()).addPolicy(
                (new ClientPolicyBuilder()).createPolicy("MyPolicy", "La Primera Plitica", Boolean.TRUE)
                        .addCondition(ClientAccessTypeConditionFactory.PROVIDER_ID,
                                createClientAccessTypeConditionConfig(List.of(ClientAccessTypeConditionFactory.TYPE_PUBLIC)))
                        .addProfile("MyProfile")
                        .toRepresentation()
        ).toString();
        updatePolicies(json);

        // register by Admin REST API - fail
        try {
            createClientByAdmin(generateSuffixedName("App-by-Admin"), (ClientRepresentation rep) -> rep.setPublicClient(Boolean.TRUE));
            fail();
        } catch (ClientPolicyException e) {
            assertEquals(OAuthErrorException.INVALID_CLIENT_METADATA, e.getMessage());
        }

        // register by Admin REST API - success
        String cAppAdminAlphaId = createClientByAdmin(generateSuffixedName("App-by-Admin-Alpha"), (ClientRepresentation clientRep) -> {
            clientRep.setPublicClient(Boolean.TRUE);
            clientRep.setAttributes(new HashMap<>());
            clientRep.getAttributes().put(OIDCConfigAttributes.DPOP_BOUND_ACCESS_TOKENS, Boolean.TRUE.toString());
        });

        // update by Admin REST API - fail
        try {
            updateClientByAdmin(cAppAdminAlphaId, (ClientRepresentation clientRep) -> clientRep.getAttributes().put(OIDCConfigAttributes.DPOP_BOUND_ACCESS_TOKENS, Boolean.FALSE.toString()));
        } catch (ClientPolicyException cpe) {
            assertEquals(OAuthErrorException.INVALID_CLIENT_METADATA, cpe.getError());
        }
        ClientRepresentation cRep = getClientByAdmin(cAppAdminAlphaId);
        assertEquals(Boolean.TRUE.toString(), cRep.getAttributes().get(OIDCConfigAttributes.DPOP_BOUND_ACCESS_TOKENS));
        String appAlphaClientId = cRep.getClientId();

        json = (new ClientProfilesBuilder()).addProfile(
                (new ClientProfileBuilder()).createProfile("MyProfile", "Le Premier Profil")
                        .addExecutor(DPoPBindEnforcerExecutorFactory.PROVIDER_ID, createDPoPBindEnforcerExecutorConfig(Boolean.TRUE))
                        .toRepresentation()
        ).toString();
        updateProfiles(json);

        // register by Dynamic Client Registration - success
        String cAppDynamicBetaId = createClientDynamically(generateSuffixedName("App-in-Dynamic-Beta"), (OIDCClientRepresentation clientRep) -> {
            clientRep.setTokenEndpointAuthMethod("none");
            clientRep.setDpopBoundAccessTokens(Boolean.FALSE);
        });
        events.expect(EventType.CLIENT_REGISTER).client(cAppDynamicBetaId).user(is(emptyOrNullString())).assertEvent();
        OIDCClientRepresentation oidcClientRep = getClientDynamically(cAppDynamicBetaId);
        assertEquals(Boolean.TRUE, oidcClientRep.getDpopBoundAccessTokens());

        // token request without a DPoP proof - fail
        oauth.clientId(appAlphaClientId);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);
        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);

        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, null);
        assertEquals(400, response.getStatusCode());
        assertEquals(OAuthErrorException.INVALID_REQUEST, response.getError());
        assertEquals("DPoP proof is missing", response.getErrorDescription());
        oauth.idTokenHint(response.getIdToken()).openLogout();

        // token request with a valid DPoP proof - success
        // EC key for client alpha
        oauth.doSilentLogin();
        code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);

        JWSHeader jwsEcHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.ES256, DPOP_JWT_HEADER_TYPE, jwkEc.getKeyId(), jwkEc);
        String dpopProofEcEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());
        oauth.dpopProof(dpopProofEcEncoded);
        response = oauth.doAccessTokenRequest(code, null);

        assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
        String encodedAccessToken = response.getAccessToken();
        String encodedRefreshToken = response.getRefreshToken();
        String encodedIdToken = response.getIdToken();
        AccessToken accessToken = oauth.verifyToken(encodedAccessToken);
        jwkEc.getOtherClaims().put(ECPublicJWK.CRV, ((ECPublicJWK) jwkEc).getCrv());
        jwkEc.getOtherClaims().put(ECPublicJWK.X, ((ECPublicJWK) jwkEc).getX());
        jwkEc.getOtherClaims().put(ECPublicJWK.Y, ((ECPublicJWK) jwkEc).getY());
        String jkt = JWKSUtils.computeThumbprint(jwkEc);
        assertEquals(jkt, accessToken.getConfirmation().getKeyThumbprint());
        RefreshToken refreshToken = oauth.parseRefreshToken(encodedRefreshToken);
        assertEquals(jkt, refreshToken.getConfirmation().getKeyThumbprint());

        // userinfo request without a DPoP proof - fail
        oauth.dpopProof(null);
        OAuthClient.UserInfoResponse userInfoResponse = oauth.doUserInfoRequestByGet(response);
        assertEquals(401, userInfoResponse.getStatusCode());

        // userinfo request with a valid DPoP proof - success
        jwsEcHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.ES256, DPOP_JWT_HEADER_TYPE, jwkEc.getKeyId(), jwkEc);
        dpopProofEcEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.GET, oauth.getUserInfoUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());
        oauth.dpopProof(dpopProofEcEncoded);
        userInfoResponse = oauth.doUserInfoRequestByGet(response);
        assertEquals(200, userInfoResponse.getStatusCode());
        assertEquals(TEST_USER_NAME, userInfoResponse.getUserInfo().getPreferredUsername());

        // token refresh without a DPoP Proof - fail
        oauth.dpopProof(null);
        response = oauth.doRefreshTokenRequest(encodedRefreshToken, null);
        assertEquals(400, response.getStatusCode());
        assertEquals(OAuthErrorException.INVALID_REQUEST, response.getError());
        assertEquals("DPoP proof is missing", response.getErrorDescription());

        // token refresh with a valid DPoP Proof - success
        dpopProofEcEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());
        oauth.dpopProof(dpopProofEcEncoded);
        response = oauth.doRefreshTokenRequest(encodedRefreshToken, null);
        assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
        encodedAccessToken = response.getAccessToken();
        encodedRefreshToken = response.getRefreshToken();
        accessToken = oauth.verifyToken(encodedAccessToken);
        jwkEc.getOtherClaims().put(ECPublicJWK.CRV, ((ECPublicJWK) jwkEc).getCrv());
        jwkEc.getOtherClaims().put(ECPublicJWK.X, ((ECPublicJWK) jwkEc).getX());
        jwkEc.getOtherClaims().put(ECPublicJWK.Y, ((ECPublicJWK) jwkEc).getY());
        jkt = JWKSUtils.computeThumbprint(jwkEc);
        assertEquals(jkt, accessToken.getConfirmation().getKeyThumbprint());
        refreshToken = oauth.parseRefreshToken(encodedRefreshToken);
        assertEquals(jkt, refreshToken.getConfirmation().getKeyThumbprint());

        // revoke token without a valid DPoP proof - fail
        JWSHeader jwsRsaHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.PS256, DPOP_JWT_HEADER_TYPE, jwkRsa.getKeyId(), jwkRsa);
        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getTokenRevocationUrl(), (long) Time.currentTime(), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());
        oauth.dpopProof(dpopProofRsaEncoded);
        CloseableHttpResponse closableHttpResponse = oauth.doTokenRevoke(encodedAccessToken, "access_token", null);
        assertThat(closableHttpResponse, Matchers.statusCodeIsHC(Status.BAD_REQUEST));

        // revoke token with a valid DPoP proof - success
        dpopProofEcEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getTokenRevocationUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());
        oauth.dpopProof(dpopProofEcEncoded);
        closableHttpResponse = oauth.doTokenRevoke(encodedAccessToken, "access_token", null);
        assertThat(closableHttpResponse, Matchers.statusCodeIsHC(Status.OK));
        String introspectionResponse = oauth.introspectAccessTokenWithClientCredential(appAlphaClientId, null, encodedAccessToken);
        TokenMetadataRepresentation tokenMetadataRepresentation = JsonSerialization.readValue(introspectionResponse, TokenMetadataRepresentation.class);
        assertFalse(tokenMetadataRepresentation.isActive());

        updatePolicies("{}");
        updateProfiles("{}");

        oauth.idTokenHint(encodedIdToken).openLogout();
    }

    @Test
    public void testDPoPProofWithClientCredentialsGrant() throws Exception {
        modifyClient(TEST_CONFIDENTIAL_CLIENT_ID, (clientRepresentation, configWrapper) -> {
            clientRepresentation.setServiceAccountsEnabled(true);
            configWrapper.setUseDPoP(true);
        });
        oauth.clientId(TEST_CONFIDENTIAL_CLIENT_ID);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

        KeyPair rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);

        JWK jwkRsa = createRsaJwk(rsaKeyPair.getPublic());
        JWSHeader jwsRsaHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.PS256, DPOP_JWT_HEADER_TYPE, jwkRsa.getKeyId(), jwkRsa);
        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());

        oauth.dpopProof(dpopProofRsaEncoded);
        OAuthClient.AccessTokenResponse response = oauth.doClientCredentialsGrantAccessTokenRequest(TEST_CONFIDENTIAL_CLIENT_SECRET);
        assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());
        AccessToken accessToken = oauth.verifyToken(response.getAccessToken());

        jwkRsa.getOtherClaims().put(RSAPublicJWK.MODULUS, ((RSAPublicJWK) jwkRsa).getModulus());
        jwkRsa.getOtherClaims().put(RSAPublicJWK.PUBLIC_EXPONENT, ((RSAPublicJWK) jwkRsa).getPublicExponent());
        String jkt = JWKSUtils.computeThumbprint(jwkRsa);
        assertEquals(jkt, accessToken.getConfirmation().getKeyThumbprint());

        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
    }

    @Test
    public void testDPoPProofWithResourceOwnerPasswordCredentialsGrant() throws Exception {
        modifyClient(TEST_CONFIDENTIAL_CLIENT_ID, (clientRepresentation, configWrapper) -> {
            clientRepresentation.setDirectAccessGrantsEnabled(true);
            configWrapper.setUseDPoP(true);
        });
        oauth.clientId(TEST_CONFIDENTIAL_CLIENT_ID);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

        KeyPair rsaKeyPair = KeyUtils.generateRsaKeyPair(2048);

        JWK jwkRsa = createRsaJwk(rsaKeyPair.getPublic());
        JWSHeader jwsRsaHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.PS256, DPOP_JWT_HEADER_TYPE, jwkRsa.getKeyId(), jwkRsa);
        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());

        oauth.dpopProof(dpopProofRsaEncoded);
        OAuthClient.AccessTokenResponse response = oauth.doGrantAccessTokenRequest(TEST_CONFIDENTIAL_CLIENT_SECRET,
                                                                                   TEST_USER_NAME,
                                                                                   TEST_USER_PASSWORD);
        assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());
        AccessToken accessToken = oauth.verifyToken(response.getAccessToken());

        jwkRsa.getOtherClaims().put(RSAPublicJWK.MODULUS, ((RSAPublicJWK) jwkRsa).getModulus());
        jwkRsa.getOtherClaims().put(RSAPublicJWK.PUBLIC_EXPONENT, ((RSAPublicJWK) jwkRsa).getPublicExponent());
        String jkt = JWKSUtils.computeThumbprint(jwkRsa);
        assertEquals(jkt, accessToken.getConfirmation().getKeyThumbprint());

        oauth.doLogout(response.getRefreshToken(), TEST_CONFIDENTIAL_CLIENT_SECRET);
    }

    private OAuthClient.AccessTokenResponse getDPoPBindAccessToken(KeyPair rsaKeyPair) throws Exception {
        oauth.clientId(TEST_CONFIDENTIAL_CLIENT_ID);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

        JWK jwkRsa = createRsaJwk(rsaKeyPair.getPublic());
        JWSHeader jwsRsaHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.PS256, DPOP_JWT_HEADER_TYPE, jwkRsa.getKeyId(), jwkRsa);
        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());

        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
        oauth.dpopProof(dpopProofRsaEncoded);
        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, TEST_CONFIDENTIAL_CLIENT_SECRET);
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());

        assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
        AccessToken accessToken = oauth.verifyToken(response.getAccessToken());
        jwkRsa.getOtherClaims().put(RSAPublicJWK.MODULUS, ((RSAPublicJWK) jwkRsa).getModulus());
        jwkRsa.getOtherClaims().put(RSAPublicJWK.PUBLIC_EXPONENT, ((RSAPublicJWK) jwkRsa).getPublicExponent());
        String jkt = JWKSUtils.computeThumbprint(jwkRsa);
        assertEquals(jkt, accessToken.getConfirmation().getKeyThumbprint());

        return response;
    }

    private void doSuccessfulUserInfoGet(OAuthClient.AccessTokenResponse accessTokenResponse, KeyPair rsaKeyPair) throws Exception {
        JWK jwkRsa = createRsaJwk(rsaKeyPair.getPublic());
        JWSHeader jwsRsaHeader = new JWSHeader(org.keycloak.jose.jws.Algorithm.PS256, DPOP_JWT_HEADER_TYPE, jwkRsa.getKeyId(), jwkRsa);
        String dpopProofRsaEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.GET, oauth.getUserInfoUrl(), (long) Time.currentTime(), Algorithm.PS256, jwsRsaHeader, rsaKeyPair.getPrivate());
        oauth.dpopProof(dpopProofRsaEncoded);
        UserInfoResponse userInfoResponse = oauth.doUserInfoRequestByGet(accessTokenResponse);
        assertEquals(TEST_USER_NAME, userInfoResponse.getUserInfo().getPreferredUsername());
    }

    private void testDPoPProofFailure(String dpopProofEncoded, String errorDescription) throws Exception {
        oauth.dpopProof(dpopProofEncoded);
        oauth.clientId(TEST_CONFIDENTIAL_CLIENT_ID);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);

        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, TEST_CONFIDENTIAL_CLIENT_SECRET);

        assertEquals(Status.BAD_REQUEST.getStatusCode(), response.getStatusCode());
        assertEquals(OAuthErrorException.INVALID_REQUEST, response.getError());
        assertEquals(errorDescription, response.getErrorDescription());
    }

    private void changeDPoPBound(String clientId, boolean isEnabled) {
        ClientResource clientResource = ApiUtil.findClientByClientId(adminClient.realm(REALM_NAME), clientId);
        ClientRepresentation clientRep = clientResource.toRepresentation();
        OIDCAdvancedConfigWrapper.fromClientRepresentation(clientRep).setUseDPoP(isEnabled);
        clientResource.update(clientRep);
    }

    private void modifyClient(String clientId, BiConsumer<ClientRepresentation, OIDCAdvancedConfigWrapper> modify) {
        ClientResource clientResource = ApiUtil.findClientByClientId(adminClient.realm(REALM_NAME), clientId);
        ClientRepresentation clientRep = clientResource.toRepresentation();
        OIDCAdvancedConfigWrapper configWrapper = OIDCAdvancedConfigWrapper.fromClientRepresentation(clientRep);
        modify.accept(clientRep, configWrapper);
        clientResource.update(clientRep);
    }

    private String createClientByAdmin(String clientName, Consumer<ClientRepresentation> op) throws ClientPolicyException {
        ClientRepresentation clientRep = new ClientRepresentation();
        clientRep.setClientId(clientName);
        clientRep.setName(clientName);
        clientRep.setProtocol("openid-connect");
        clientRep.setBearerOnly(Boolean.FALSE);
        clientRep.setPublicClient(Boolean.FALSE);
        clientRep.setServiceAccountsEnabled(Boolean.TRUE);
        clientRep.setRedirectUris(Collections.singletonList(ServerURLs.getAuthServerContextRoot() + "/auth/realms/master/app/auth"));
        OIDCAdvancedConfigWrapper.fromClientRepresentation(clientRep).setPostLogoutRedirectUris(Collections.singletonList("+"));
        op.accept(clientRep);
        Response resp = adminClient.realm(REALM_NAME).clients().create(clientRep);
        if (resp.getStatus() == Response.Status.BAD_REQUEST.getStatusCode()) {
            String respBody = resp.readEntity(String.class);
            Map<String, String> responseJson = null;
            try {
                responseJson = JsonSerialization.readValue(respBody, Map.class);
            } catch (IOException e) {
                fail();
            }
            throw new ClientPolicyException(responseJson.get(OAuth2Constants.ERROR), responseJson.get(OAuth2Constants.ERROR_DESCRIPTION));
        }
        resp.close();
        assertEquals(Response.Status.CREATED.getStatusCode(), resp.getStatus());
        // registered components will be removed automatically when a test method finishes regardless of its success or failure.
        String cId = ApiUtil.getCreatedId(resp);
        testContext.getOrCreateCleanup(REALM_NAME).addClientUuid(cId);
        return cId;
    }

    private void updateProfiles(String json) throws ClientPolicyException {
        try {
            ClientProfilesRepresentation clientProfiles = JsonSerialization.readValue(json, ClientProfilesRepresentation.class);
            adminClient.realm(REALM_NAME).clientPoliciesProfilesResource().updateProfiles(clientProfiles);
        } catch (BadRequestException e) {
            throw new ClientPolicyException("update profiles failed", e.getResponse().getStatusInfo().toString());
        } catch (Exception e) {
            throw new ClientPolicyException("update profiles failed", e.getMessage());
        }
    }

    private void updatePolicies(String json) throws ClientPolicyException {
        try {
            ClientPoliciesRepresentation clientPolicies = json == null ? null : JsonSerialization.readValue(json, ClientPoliciesRepresentation.class);
            adminClient.realm(REALM_NAME).clientPoliciesPoliciesResource().updatePolicies(clientPolicies);
        } catch (BadRequestException e) {
            throw new ClientPolicyException("update policies failed", e.getResponse().getStatusInfo().toString());
        } catch (IOException e) {
            throw new ClientPolicyException("update policies failed", e.getMessage());
        }
    }

    private String generateSuffixedName(String name) {
        return name + "-" + UUID.randomUUID().toString().subSequence(0, 7);
    }

    private void updateClientByAdmin(String cId, Consumer<ClientRepresentation> op) throws ClientPolicyException {
        ClientResource clientResource = adminClient.realm(REALM_NAME).clients().get(cId);
        ClientRepresentation clientRep = clientResource.toRepresentation();
        op.accept(clientRep);
        try {
            clientResource.update(clientRep);
        } catch (BadRequestException bre) {
            processClientPolicyExceptionByAdmin(bre);
        }
    }

    private void processClientPolicyExceptionByAdmin(BadRequestException bre) throws ClientPolicyException {
        Response resp = bre.getResponse();
        if (resp.getStatus() != Response.Status.BAD_REQUEST.getStatusCode()) {
            resp.close();
            return;
        }

        String respBody = resp.readEntity(String.class);
        Map<String, String> responseJson = null;
        try {
            responseJson = JsonSerialization.readValue(respBody, Map.class);
        } catch (IOException e) {
            fail();
        }
        throw new ClientPolicyException(responseJson.get(OAuth2Constants.ERROR), responseJson.get(OAuth2Constants.ERROR_DESCRIPTION));
    }

    private ClientRepresentation getClientByAdmin(String cId) throws ClientPolicyException {
        ClientResource clientResource = adminClient.realm(REALM_NAME).clients().get(cId);
        try {
            return clientResource.toRepresentation();
        } catch (BadRequestException bre) {
            processClientPolicyExceptionByAdmin(bre);
        }
        return null;
    }

    private String createClientDynamically(String clientName, Consumer<OIDCClientRepresentation> op) throws ClientRegistrationException {
        OIDCClientRepresentation clientRep = new OIDCClientRepresentation();
        clientRep.setClientName(clientName);
        clientRep.setClientUri(ServerURLs.getAuthServerContextRoot());
        clientRep.setRedirectUris(Collections.singletonList(ServerURLs.getAuthServerContextRoot() + "/auth/realms/master/app/auth"));
        op.accept(clientRep);
        OIDCClientRepresentation response = reg.oidc().create(clientRep);
        reg.auth(Auth.token(response));
        // registered components will be removed automatically when a test method finishes regardless of its success or failure.
        String clientId = response.getClientId();
        testContext.getOrCreateCleanup(REALM_NAME).addClientUuid(clientId);
        return clientId;
    }

    private void setInitialAccessTokenForDynamicClientRegistration() {
        // get initial access token for Dynamic Client Registration with authentication
        reg = ClientRegistration.create().url(suiteContext.getAuthServerInfo().getContextRoot() + "/auth", REALM_NAME).build();
        ClientInitialAccessPresentation token = adminClient.realm(REALM_NAME).clientInitialAccess().create(new ClientInitialAccessCreatePresentation(0, 10));
        reg.auth(Auth.token(token));
    }

    private OIDCClientRepresentation getClientDynamically(String clientId) throws ClientRegistrationException {
        return reg.oidc().get(clientId);
    }


    private void sendAuthorizationRequestWithDPoPJkt(String dpopJkt) throws Exception {
        oauth.clientId(TEST_PUBLIC_CLIENT_ID);
        oauth.dpopJkt(dpopJkt);
        oauth.doLogin(TEST_USER_NAME, TEST_USER_PASSWORD);
        oauth.dpopJkt(null); // revert explicitly
    }

    private void successTokenProceduresWithDPoP(String dpopProofEncoded, String jkt) throws Exception {
        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
        oauth.dpopProof(dpopProofEncoded);
        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, null);
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());
        assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
        AccessToken accessToken = oauth.verifyToken(response.getAccessToken());
        assertEquals(jkt, accessToken.getConfirmation().getKeyThumbprint());
        RefreshToken refreshToken = oauth.parseRefreshToken(response.getRefreshToken());
        assertEquals(jkt, refreshToken.getConfirmation().getKeyThumbprint());

        // token refresh
        dpopProofEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.POST, oauth.getAccessTokenUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());

        oauth.dpopProof(dpopProofEncoded);
        response = oauth.doRefreshTokenRequest(response.getRefreshToken(), null);
        assertEquals(TokenUtil.TOKEN_TYPE_DPOP, response.getTokenType());

        assertEquals(Status.OK.getStatusCode(), response.getStatusCode());
        accessToken = oauth.verifyToken(response.getAccessToken());
        assertEquals(jkt, accessToken.getConfirmation().getKeyThumbprint());
        refreshToken = oauth.parseRefreshToken(response.getRefreshToken());
        assertEquals(jkt, refreshToken.getConfirmation().getKeyThumbprint());

        // userinfo access
        dpopProofEncoded = generateSignedDPoPProof(UUID.randomUUID().toString(), HttpMethod.GET, oauth.getUserInfoUrl(), (long) Time.currentTime(), Algorithm.ES256, jwsEcHeader, ecKeyPair.getPrivate());
        oauth.dpopProof(dpopProofEncoded);
        UserInfoResponse userInfoResponse = oauth.doUserInfoRequestByGet(response);
        assertEquals(TEST_USER_NAME, userInfoResponse.getUserInfo().getPreferredUsername());

        // logout
        oauth.idTokenHint(response.getIdToken()).openLogout();
    }

    private void failureTokenProceduresWithDPoP(String dpopProofEncoded, String error) throws Exception {
        String code = oauth.getCurrentQuery().get(OAuth2Constants.CODE);
        oauth.dpopProof(dpopProofEncoded);
        OAuthClient.AccessTokenResponse response = oauth.doAccessTokenRequest(code, null);
        assertEquals(400, response.getStatusCode());
        assertEquals(OAuthErrorException.INVALID_REQUEST, response.getError());
        assertEquals(error, response.getErrorDescription());
        oauth.idTokenHint(response.getIdToken()).openLogout();
    }
}
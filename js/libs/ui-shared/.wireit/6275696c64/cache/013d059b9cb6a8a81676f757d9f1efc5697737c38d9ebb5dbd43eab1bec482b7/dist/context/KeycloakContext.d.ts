import { default as Keycloak } from 'keycloak-js';
import { PropsWithChildren } from 'react';
import { BaseEnvironment } from './environment';
export type KeycloakContext<T extends BaseEnvironment = BaseEnvironment> = KeycloakContextProps<T> & {
    keycloak: Keycloak;
};
export declare const useEnvironment: <T extends BaseEnvironment = BaseEnvironment>() => KeycloakContext<T>;
interface KeycloakContextProps<T extends BaseEnvironment> {
    environment: T;
}
export declare const KeycloakProvider: <T extends BaseEnvironment>({ environment, children, }: PropsWithChildren<KeycloakContextProps<T>>) => import("react/jsx-runtime").JSX.Element;
export {};

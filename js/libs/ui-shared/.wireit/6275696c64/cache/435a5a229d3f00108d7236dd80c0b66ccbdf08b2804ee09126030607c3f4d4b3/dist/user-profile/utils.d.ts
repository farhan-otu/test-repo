import { UserProfileAttributeMetadata } from '@keycloak/keycloak-admin-client/lib/defs/userProfileMetadata';
import { default as UserRepresentation } from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { TFunction } from 'i18next';
import { FieldPath } from 'react-hook-form';
export type KeyValueType = {
    key: string;
    value: string;
};
export type UserFormFields = Omit<UserRepresentation, "attributes" | "userProfileMetadata"> & {
    attributes?: KeyValueType[] | Record<string, string | string[]>;
};
type FieldError = {
    field: string;
    errorMessage: string;
    params?: string[];
};
type ErrorArray = {
    errors?: FieldError[];
};
export type UserProfileError = {
    responseData: ErrorArray | FieldError;
};
export declare const label: (t: TFunction, text: string | undefined, fallback?: string, prefix?: string) => string;
export declare const labelAttribute: (t: TFunction, attribute: UserProfileAttributeMetadata) => string;
export declare const isRootAttribute: (attr?: string) => boolean | "" | undefined;
export declare const fieldName: (name?: string) => FieldPath<UserFormFields>;
export declare const beerify: <T extends string>(name: T) => string;
export declare const debeerify: <T extends string>(name: T) => string;
export declare function setUserProfileServerError<T>(error: UserProfileError, setError: (field: keyof T, params: object) => void, t: TFunction): void;
export declare function isRequiredAttribute({ required, validators, }: UserProfileAttributeMetadata): boolean;
export declare function isUserProfileError(error: unknown): error is UserProfileError;
export {};

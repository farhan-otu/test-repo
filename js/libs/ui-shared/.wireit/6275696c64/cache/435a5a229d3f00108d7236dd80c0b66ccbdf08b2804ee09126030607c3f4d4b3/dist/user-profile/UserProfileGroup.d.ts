import { UserProfileAttributeMetadata } from '@keycloak/keycloak-admin-client/lib/defs/userProfileMetadata';
import { TFunction } from 'i18next';
import { PropsWithChildren, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { UserFormFields } from './utils';
export type UserProfileGroupProps = {
    t: TFunction;
    form: UseFormReturn<UserFormFields>;
    attribute: UserProfileAttributeMetadata;
    renderer?: (attribute: UserProfileAttributeMetadata) => ReactNode;
};
export declare const UserProfileGroup: ({ t, form, attribute, renderer, children, }: PropsWithChildren<UserProfileGroupProps>) => import("react/jsx-runtime").JSX.Element;

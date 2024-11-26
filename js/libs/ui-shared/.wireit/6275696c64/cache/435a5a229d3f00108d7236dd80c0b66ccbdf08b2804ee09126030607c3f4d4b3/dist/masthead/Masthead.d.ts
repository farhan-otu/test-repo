import { AvatarProps, MastheadBrandProps, MastheadMainProps } from '@patternfly/react-core';
import { default as Keycloak } from 'keycloak-js';
import { ReactNode } from 'react';
type BrandLogo = MastheadBrandProps;
type KeycloakMastheadProps = MastheadMainProps & {
    keycloak: Keycloak;
    brand: BrandLogo;
    avatar?: AvatarProps;
    features?: {
        hasLogout?: boolean;
        hasManageAccount?: boolean;
        hasUsername?: boolean;
    };
    kebabDropdownItems?: ReactNode[];
    dropdownItems?: ReactNode[];
    toolbarItems?: ReactNode[];
};
declare const KeycloakMasthead: ({ keycloak, brand: { src, alt, className, ...brandProps }, avatar, features: { hasLogout, hasManageAccount, hasUsername, }, kebabDropdownItems, dropdownItems, toolbarItems, ...rest }: KeycloakMastheadProps) => import("react/jsx-runtime").JSX.Element;
export default KeycloakMasthead;

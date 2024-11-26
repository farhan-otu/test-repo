import { DropdownProps } from '@patternfly/react-core';
import { ReactNode } from 'react';
type KeycloakDropdownProps = Omit<DropdownProps, "toggle"> & {
    "data-testid"?: string;
    isKebab?: boolean;
    title?: ReactNode;
    dropDownItems: ReactNode[];
};
export declare const KeycloakDropdown: ({ isKebab, title, dropDownItems, ...rest }: KeycloakDropdownProps) => import("react/jsx-runtime").JSX.Element;
export {};

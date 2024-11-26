import { default as OrganizationRepresentation } from '@keycloak/keycloak-admin-client/lib/defs/organizationRepresentation';
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { LoaderFunction } from './table/KeycloakDataTable';
export type OrganizationTableProps = PropsWithChildren & {
    loader: LoaderFunction<OrganizationRepresentation> | OrganizationRepresentation[];
    link: FunctionComponent<PropsWithChildren<{
        organization: OrganizationRepresentation;
    }>>;
    toolbarItem?: ReactNode;
    isPaginated?: boolean;
    isSearching?: boolean;
    onSelect?: (orgs: OrganizationRepresentation[]) => void;
    onDelete?: (org: OrganizationRepresentation) => void;
    deleteLabel?: string;
};
export declare const OrganizationTable: ({ loader, toolbarItem, isPaginated, isSearching, onSelect, onDelete, deleteLabel, link, children, }: OrganizationTableProps) => import("react/jsx-runtime").JSX.Element;

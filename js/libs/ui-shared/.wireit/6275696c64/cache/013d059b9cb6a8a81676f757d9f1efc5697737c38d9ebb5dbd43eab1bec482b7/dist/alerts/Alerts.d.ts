import { AlertVariant } from '@patternfly/react-core';
import { PropsWithChildren } from 'react';
export type AddAlertFunction = (message: string, variant?: AlertVariant, description?: string) => void;
export type AddErrorFunction = (messageKey: string, error: unknown) => void;
export type AlertProps = {
    addAlert: AddAlertFunction;
    addError: AddErrorFunction;
};
export declare const useAlerts: () => AlertProps;
export type AlertEntry = {
    id: number;
    message: string;
    variant: AlertVariant;
    description?: string;
};
export declare const AlertProvider: ({ children }: PropsWithChildren) => import("react/jsx-runtime").JSX.Element;

import { ReactNode } from 'react';
import { ButtonProps, ModalProps } from '@patternfly/react-core';
export type ContinueCancelModalProps = Omit<ModalProps, "ref" | "children"> & {
    modalTitle: string;
    continueLabel: string;
    cancelLabel: string;
    buttonTitle: string | ReactNode;
    buttonVariant?: ButtonProps["variant"];
    buttonTestRole?: string;
    isDisabled?: boolean;
    onContinue: () => void;
    component?: React.ElementType<any> | React.ComponentType<any>;
    children?: ReactNode;
};
export declare const ContinueCancelModal: ({ modalTitle, continueLabel, cancelLabel, buttonTitle, isDisabled, buttonVariant, buttonTestRole, onContinue, component, children, ...rest }: ContinueCancelModalProps) => import("react/jsx-runtime").JSX.Element;

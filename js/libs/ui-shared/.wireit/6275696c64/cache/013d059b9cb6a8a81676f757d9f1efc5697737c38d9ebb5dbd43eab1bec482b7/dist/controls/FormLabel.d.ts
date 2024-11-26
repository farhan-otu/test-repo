import { FormGroupProps } from '@patternfly/react-core';
import { PropsWithChildren, ReactNode } from 'react';
import { FieldError, FieldValues, Merge } from 'react-hook-form';
export type FieldProps<T extends FieldValues = FieldValues> = {
    label?: string;
    name: string;
    labelIcon?: string | ReactNode;
    error?: FieldError | Merge<FieldError, T>;
    isRequired: boolean;
};
type FormLabelProps = FieldProps & Omit<FormGroupProps, "label" | "labelIcon">;
export declare const FormLabel: ({ name, label, labelIcon, error, children, ...rest }: PropsWithChildren<FormLabelProps>) => import("react/jsx-runtime").JSX.Element;
export {};

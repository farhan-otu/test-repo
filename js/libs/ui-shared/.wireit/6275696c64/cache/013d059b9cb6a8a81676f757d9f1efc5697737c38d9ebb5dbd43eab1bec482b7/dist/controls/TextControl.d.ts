import { TextInputProps } from '@patternfly/react-core';
import { ReactNode } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
export type TextControlProps<T extends FieldValues, P extends FieldPath<T> = FieldPath<T>> = UseControllerProps<T, P> & Omit<TextInputProps, "name" | "isRequired" | "required"> & {
    label: string;
    labelIcon?: string | ReactNode;
    isDisabled?: boolean;
    helperText?: string;
    "data-testid"?: string;
};
export declare const TextControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>(props: TextControlProps<T, P>) => import("react/jsx-runtime").JSX.Element;

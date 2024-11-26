import { NumberInputProps } from '@patternfly/react-core';
import { ControllerProps, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
export type NumberControlOption = {
    key: string;
    value: string;
};
export type NumberControlProps<T extends FieldValues, P extends FieldPath<T> = FieldPath<T>> = Omit<NumberInputProps, "name" | "isRequired" | "required"> & UseControllerProps<T, P> & {
    name: string;
    label?: string;
    labelIcon?: string;
    controller: Omit<ControllerProps, "name" | "render">;
};
export declare const NumberControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>({ name, label, controller, labelIcon, ...rest }: NumberControlProps<T, P>) => import("react/jsx-runtime").JSX.Element;

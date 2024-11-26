import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { PasswordInputProps } from './PasswordInput';
export type PasswordControlProps<T extends FieldValues, P extends FieldPath<T> = FieldPath<T>> = UseControllerProps<T, P> & Omit<PasswordInputProps, "name" | "isRequired" | "required"> & {
    label: string;
    labelIcon?: string;
    isDisabled?: boolean;
    helperText?: string;
};
export declare const PasswordControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>(props: PasswordControlProps<T, P>) => import("react/jsx-runtime").JSX.Element;

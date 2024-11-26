import { ButtonProps } from '@patternfly/react-core';
import { PropsWithChildren } from 'react';
import { FieldValues, FormState } from 'react-hook-form';
export type FormSubmitButtonProps = Omit<ButtonProps, "isDisabled"> & {
    formState: FormState<FieldValues>;
    allowNonDirty?: boolean;
    allowInvalid?: boolean;
    isDisabled?: boolean;
};
export declare const FormSubmitButton: ({ formState, isDisabled, allowInvalid, allowNonDirty, children, ...rest }: PropsWithChildren<FormSubmitButtonProps>) => import("react/jsx-runtime").JSX.Element;

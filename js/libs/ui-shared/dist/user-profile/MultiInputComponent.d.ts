import { TextInputProps } from '@patternfly/react-core';
import { TFunction } from 'i18next';
import { FieldPath, UseFormReturn } from 'react-hook-form';
import { InputType, UserProfileFieldProps } from './UserProfileFields';
import { UserFormFields } from './utils';
export declare const MultiInputComponent: ({ t, form, attribute, renderer, ...rest }: UserProfileFieldProps) => import("react/jsx-runtime").JSX.Element;
export type MultiLineInputProps = Omit<TextInputProps, "form"> & {
    t: TFunction;
    name: FieldPath<UserFormFields>;
    form: UseFormReturn<UserFormFields>;
    addButtonLabel?: string;
    isDisabled?: boolean;
    defaultValue?: string[];
    inputType: InputType;
};

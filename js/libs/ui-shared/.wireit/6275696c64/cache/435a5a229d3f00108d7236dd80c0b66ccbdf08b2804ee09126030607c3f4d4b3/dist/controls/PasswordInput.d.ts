import { TextInputProps } from '@patternfly/react-core';
export type PasswordInputProps = TextInputProps & {
    hasReveal?: boolean;
};
export declare const PasswordInput: import('react').ForwardRefExoticComponent<TextInputProps & {
    hasReveal?: boolean;
} & import('react').RefAttributes<HTMLInputElement>>;

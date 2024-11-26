import { FormHelperTextProps } from '@patternfly/react-core';
export type FormErrorTextProps = FormHelperTextProps & {
    message: string;
};
export declare const FormErrorText: ({ message, ...props }: FormErrorTextProps) => import("react/jsx-runtime").JSX.Element;

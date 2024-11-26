import { TextArea } from '@patternfly/react-core';
import { ComponentProps, HTMLProps, ForwardRefExoticComponent, RefAttributes } from 'react';
export type KeycloakTextAreaProps = Omit<ComponentProps<typeof TextArea>, "onFocus" | "onBlur"> & Pick<HTMLProps<HTMLTextAreaElement>, "onFocus" | "onBlur">;
export declare const KeycloakTextArea: ForwardRefExoticComponent<KeycloakTextAreaProps & RefAttributes<HTMLTextAreaElement>>;

import { KeycloakSelectProps } from './KeycloakSelect';
type SingleSelectProps = Omit<KeycloakSelectProps, "variant">;
export declare const SingleSelect: ({ toggleId, onToggle, onSelect, selections, isOpen, menuAppendTo, direction, width, maxHeight, toggleIcon, className, isDisabled, children, ...props }: SingleSelectProps) => import("react/jsx-runtime").JSX.Element;
export {};

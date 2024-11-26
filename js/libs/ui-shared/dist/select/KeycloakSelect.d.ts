import { ChipGroupProps, SelectProps } from '@patternfly/react-core';
export type Variant = `${SelectVariant}`;
export declare enum SelectVariant {
    single = "single",
    typeahead = "typeahead",
    typeaheadMulti = "typeaheadMulti"
}
export declare const propertyToString: (prop: string | number | undefined) => string | undefined;
export type KeycloakSelectProps = Omit<SelectProps, "name" | "toggle" | "selected" | "onClick" | "onSelect"> & {
    toggleId?: string;
    onFilter?: (value: string) => JSX.Element[];
    onClear?: () => void;
    variant?: Variant;
    isDisabled?: boolean;
    menuAppendTo?: string;
    maxHeight?: string | number;
    width?: string | number;
    toggleIcon?: React.ReactElement;
    direction?: "up" | "down";
    placeholderText?: string;
    onSelect?: (value: string | number | object) => void;
    onToggle: (val: boolean) => void;
    selections?: string | string[] | number | number[];
    validated?: "success" | "warning" | "error" | "default";
    typeAheadAriaLabel?: string;
    chipGroupProps?: Omit<ChipGroupProps, "children" | "ref">;
    chipGroupComponent?: React.ReactNode;
    footer?: React.ReactNode;
};
export declare const KeycloakSelect: ({ variant, ...rest }: KeycloakSelectProps) => import("react/jsx-runtime").JSX.Element;

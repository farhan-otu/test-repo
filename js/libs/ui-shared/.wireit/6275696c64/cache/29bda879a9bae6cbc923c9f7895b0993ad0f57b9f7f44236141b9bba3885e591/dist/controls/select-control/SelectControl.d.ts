import { ChipGroupProps, SelectProps } from '@patternfly/react-core';
import { ControllerProps, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
type Variant = `${SelectVariant}`;
export declare enum SelectVariant {
    single = "single",
    typeahead = "typeahead",
    typeaheadMulti = "typeaheadMulti"
}
export type SelectControlOption = {
    key: string;
    value: string;
};
export type OptionType = string[] | SelectControlOption[];
export type SelectControlProps<T extends FieldValues, P extends FieldPath<T> = FieldPath<T>> = Omit<SelectProps, "name" | "toggle" | "selections" | "onSelect" | "onClear" | "isOpen" | "onFilter" | "variant"> & UseControllerProps<T, P> & {
    name: string;
    label?: string;
    options: OptionType;
    labelIcon?: string;
    controller: Omit<ControllerProps, "name" | "render">;
    onFilter?: (value: string) => void;
    variant?: Variant;
    isDisabled?: boolean;
    menuAppendTo?: string;
    placeholderText?: string;
    chipGroupProps?: ChipGroupProps;
};
export declare const isSelectBasedOptions: (options: OptionType) => options is SelectControlOption[];
export declare const isString: (option: SelectControlOption | string) => option is string;
export declare const key: (option: SelectControlOption | string) => string;
export declare const SelectControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>({ variant, ...rest }: SelectControlProps<T, P>) => import("react/jsx-runtime").JSX.Element;
export {};

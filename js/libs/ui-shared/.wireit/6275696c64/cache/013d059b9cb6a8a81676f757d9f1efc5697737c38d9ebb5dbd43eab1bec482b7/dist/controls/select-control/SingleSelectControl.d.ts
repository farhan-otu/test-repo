import { FieldPath, FieldValues } from 'react-hook-form';
import { SelectControlProps } from './SelectControl';
export declare const SingleSelectControl: <T extends FieldValues, P extends FieldPath<T> = FieldPath<T>>({ id, name, label, options, controller, labelIcon, ...rest }: SelectControlProps<T, P>) => import("react/jsx-runtime").JSX.Element;

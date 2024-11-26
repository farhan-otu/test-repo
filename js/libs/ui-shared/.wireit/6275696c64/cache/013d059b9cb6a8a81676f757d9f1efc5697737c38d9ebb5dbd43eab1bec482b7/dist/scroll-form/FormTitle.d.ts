import { TitleProps } from '@patternfly/react-core';
type FormTitleProps = Omit<TitleProps, "headingLevel"> & {
    id?: string;
    title: string;
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
export declare const FormTitle: ({ id, title, headingLevel, size, ...rest }: FormTitleProps) => import("react/jsx-runtime").JSX.Element;
export {};

import { GridProps } from '@patternfly/react-core';
import { ReactNode } from 'react';
export declare const mainPageContentId = "kc-main-content-page-container";
type ScrollSection = {
    title: string;
    panel: ReactNode;
    isHidden?: boolean;
};
type ScrollFormProps = GridProps & {
    label: string;
    sections: ScrollSection[];
    borders?: boolean;
};
export declare const ScrollForm: ({ label, sections, borders, ...rest }: ScrollFormProps) => import("react/jsx-runtime").JSX.Element;
export {};

import { HTMLProps } from 'react';
type ScrollPanelProps = HTMLProps<HTMLFormElement> & {
    title: string;
    scrollId: string;
};
export declare const ScrollPanel: (props: ScrollPanelProps) => import("react/jsx-runtime").JSX.Element;
export {};

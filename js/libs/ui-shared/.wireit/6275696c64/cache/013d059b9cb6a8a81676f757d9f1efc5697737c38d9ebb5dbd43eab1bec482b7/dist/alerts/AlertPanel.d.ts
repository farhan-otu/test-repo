import { AlertEntry } from './Alerts';
export type AlertPanelProps = {
    alerts: AlertEntry[];
    onCloseAlert: (id: number) => void;
};
export declare function AlertPanel({ alerts, onCloseAlert }: AlertPanelProps): import("react/jsx-runtime").JSX.Element;

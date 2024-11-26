import { UserProfileFieldProps } from './UserProfileFields';
type LocaleSelectorProps = Omit<UserProfileFieldProps, "inputType"> & {
    supportedLocales: string[];
    currentLocale: string;
};
export declare const LocaleSelector: ({ t, form, supportedLocales, currentLocale, }: LocaleSelectorProps) => import("react/jsx-runtime").JSX.Element | null;
export {};

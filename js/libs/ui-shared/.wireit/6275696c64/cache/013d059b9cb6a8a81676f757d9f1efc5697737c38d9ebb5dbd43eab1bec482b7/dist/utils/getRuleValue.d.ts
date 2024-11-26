import { ValidationRule, ValidationValue } from 'react-hook-form';
export declare function getRuleValue<T extends ValidationValue>(rule?: ValidationRule<T>): T | undefined;

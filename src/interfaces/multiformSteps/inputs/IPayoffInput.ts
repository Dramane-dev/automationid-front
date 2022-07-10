import { SetStateAction } from "react";
export interface IPayoffInput {
    simpleInput?: {
        title: string;
        value: string;
        onValueChange: (e: SetStateAction<string>) => void;
    };
    picker?: {
        title: string;
        value: string;
        onValueChange: (e: SetStateAction<string>) => void;
    };
    multiplesInput?: {
        simpleInput?: {
            title: string;
            value: string;
            onValueChange: (e: SetStateAction<string>) => void;
        };
        picker?: {
            title: string;
            value: string;
            onValueChange: (e: SetStateAction<string>) => void;
        };
    };
}

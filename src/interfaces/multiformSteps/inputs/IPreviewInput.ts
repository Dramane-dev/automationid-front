import { SetStateAction } from "react";
export interface IPreviewInput {
    simpleInput?: {
        title: string;
        placeholder: string;
        value: string;
        onValueChange: (e: SetStateAction<string>) => void;
    };
    picker?: {
        title: string;
        value: string;
        onValueChange: (e: SetStateAction<string>) => void;
    };
}

import { SetStateAction } from "react";

export interface IInput {
    label: string;
    placeholder: string;
    value: string;
    onValueChange: (e: SetStateAction<string>) => void;
}

import { SetStateAction } from "react";

export interface IFeasibilityInput {
    picker: {
        pickerTitle: string;
        pickerValue: string;
        onValueChange: (e: SetStateAction<string>) => void;
    };
    comment: {
        commentTitle: string;
        commentValue: string;
        onValueChange: (e: SetStateAction<string>) => void;
    };
}

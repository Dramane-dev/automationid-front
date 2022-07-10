import { DateData } from "react-native-calendars";

export interface IMeetingInput {
    firstMeet: {
        label: string;
        date: string;
        onValueChange: ((date: DateData) => void) | undefined;
        firstMarked: any;
    };
    secondMeet: {
        label: string;
        date: string;
        onValueChange: ((date: DateData) => void) | undefined;
        secondMarked: any;
    };
    thirdMeet: {
        label: string;
        date: string;
        onValueChange: ((date: DateData) => void) | undefined;
        thirdMarked: any;
    };
}

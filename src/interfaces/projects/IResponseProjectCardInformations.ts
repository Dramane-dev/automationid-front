import { IIformationsCard } from "./IInformationsCard";

export interface IResponseProjectCardInformations {
    query: string;
    status: boolean;
    message: string;
    result: IIformationsCard[];
}

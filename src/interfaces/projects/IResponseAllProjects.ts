import { IResponseProject } from "./IResponseProject";

export interface IResponseAllProjects {
    query: string;
    status: boolean;
    message: string;
    result: IResponseProject[];
}

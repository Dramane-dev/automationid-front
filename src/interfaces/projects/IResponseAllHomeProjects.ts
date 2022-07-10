import { IResponseProject } from "./IResponseProject";

export interface IResponseAllHomeProjects {
    query: string;
    status: boolean;
    message: string;
    result: IResponseProject[];
}

import { IUserCredentials } from "../interfaces/auth/IUserCredentials";

export type TServerResponse = {
    status?: number;
    message: string;
    mailVerification?: {
        status: string;
        message: string;
    };
    userMailChanged?: boolean;
    user?: IUserCredentials;
};

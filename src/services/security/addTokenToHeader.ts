import { AxiosRequestHeaders } from "axios";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { StorageService } from "../storage/Storage.service";

export const addTokenToHeader = async (currentUser: IUserCredentials): Promise<AxiosRequestHeaders> => {
    // let accessToken: string = (await (
    //     await StorageService.getUserFromStorage("userInformations")
    // ).accessToken) as string;
    return { authorization: "Bearer " + currentUser.accessToken };
};

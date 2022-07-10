import { axiosInstance } from "../../exports/server/axiosInstance";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { TServerResponse } from "../../types/TServerResponse";
import { addTokenToHeader } from "../security/addTokenToHeader";

export const SettingsService = {
    editMyProfile(user: IUserCredentials): Promise<TServerResponse> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .post(`edit-profile/${user.userId}`, user, { headers: await addTokenToHeader(user) })
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    const { status, message } = error.response.data;
                    reject(message);
                });
        });
    },
};

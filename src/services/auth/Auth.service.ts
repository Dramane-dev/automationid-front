import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { TServerResponse } from "../../types/TServerResponse";
import { axiosInstance } from "../../exports/server/axiosInstance";
import { StorageService } from "../storage/Storage.service";

export const AuthService = {
    signup(user: IUserCredentials): Promise<TServerResponse> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .post("signup", user)
                .then(async (res) => {
                    let response: TServerResponse = res.data;
                    let actualUser: IUserCredentials = response.user as IUserCredentials;
                    actualUser.userConnected = true;

                    if (response && response.mailVerification?.status === "OK") {
                        let userSavedToStorage: boolean = await StorageService.saveUserToStorage(
                            "userInformations",
                            actualUser
                        );

                        if (!userSavedToStorage) {
                            reject("L'utilisateur n'a pu être enregistré en local ❌");
                        }

                        resolve(response);
                    } else {
                        reject(response.message);
                    }
                })
                .catch((error) => {
                    const { status, data } = error.response;
                    reject(data.message);
                });
        });
    },
    verifyMailCode(code: string): Promise<TServerResponse> {
        return new Promise(async (resolve, reject) => {
            let userId: string = (await StorageService.getUserFromStorage("userInformations")).userId as string;
            if (userId && code) {
                axiosInstance
                    .post("confirmed-mail/" + userId, {
                        mailVerificationCode: code,
                    })
                    .then((res) => {
                        let response: TServerResponse = res.data;

                        StorageService.saveUserToStorage("userInformations", response.user as IUserCredentials)
                            .then((userSaved) => {
                                if (response.message.includes("Votre email à bien été vérifié") && userSaved) {
                                    resolve(response);
                                } else {
                                    reject(response.message);
                                }
                            })
                            .catch((error) => {
                                reject("Erreur de saisie du code ❌ . Veuillez réessayer à nouveau.");
                            });
                    })
                    .catch((error) => {
                        const { status, data } = error.response;
                        reject(data.message);
                    });
            } else {
                reject("Veuillez saisir le code reçu par mail !");
            }
        });
    },
    signin(user: IUserCredentials): Promise<string> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .post("signin", user)
                .then(async (res) => {
                    let response: TServerResponse = res.data;

                    if (response.message.includes("Utilisateur connecté avec succès")) {
                        let actualUser: IUserCredentials = response.user as IUserCredentials;
                        actualUser.userConnected = true;

                        StorageService.saveUserToStorage("userInformations", actualUser)
                            .then(() => {
                                resolve(response.message);
                            })
                            .catch(() => {
                                reject("L'utilisateur n'a pu être enregistré en local ❌");
                            });
                    } else {
                        reject(response.message);
                    }
                })
                .catch((error) => {
                    if (error.message.includes("Network Error")) {
                        reject("Service momentanément interrompu...");
                    } else {
                        const { status, data } = error.response;
                        reject(data.message);
                    }
                });
        });
    },
};

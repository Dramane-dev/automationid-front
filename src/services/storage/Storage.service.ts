import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";

export const StorageService = {
    saveUserToStorage(key: string, user: IUserCredentials): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let userStringified: string = JSON.stringify(user);
            AsyncStorage.setItem(key, userStringified)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(false);
                });
        });
    },
    getUserFromStorage(key: string): Promise<IUserCredentials> {
        return new Promise(async (resolve, reject) => {
            let data: string = (await AsyncStorage.getItem(key)) as string;

            if (data && data !== null) {
                resolve(JSON.parse(data));
            } else {
                let user: IUserCredentials = {};
                reject(user);
            }
        });
    },
    deleteUserFromStorage(key: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            AsyncStorage.removeItem(key)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

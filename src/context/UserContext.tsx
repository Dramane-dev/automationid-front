import React, { Context, createContext, useState } from "react";
import { IUserCredentials } from "../interfaces/auth/IUserCredentials";
import { StorageService } from "../services/storage/Storage.service";

export const userContext: Context<any> = createContext({});

const UserContext = (props: any) => {
    const [currentUser, setCurrentUser] = useState<IUserCredentials>();

    const initCurrentUser = async () => {
        setCurrentUser(await StorageService.getUserFromStorage("userInformations"));
    };

    return (
        <>
            <userContext.Provider
                value={{
                    currentUser,
                    setCurrentUser,
                    initCurrentUser,
                }}
            >
                {props.children}
            </userContext.Provider>
        </>
    );
};
export default UserContext;

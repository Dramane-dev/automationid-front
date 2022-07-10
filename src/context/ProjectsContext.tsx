import React, { Context, createContext, useContext, useState } from "react";
import { IUserCredentials } from "../interfaces/auth/IUserCredentials";
import { IIformationsCard } from "../interfaces/projects/IInformationsCard";
import { IResponseProject } from "../interfaces/projects/IResponseProject";
import { NotificationService } from "../services/notifications/Notification.service";
import { ProjectService } from "../services/project/Project.service";
import { userContext } from "./UserContext";

export const projectsContext: Context<any> = createContext({});

const ProjectsContext = (props: any) => {
    const [myProjects, setMyProjects] = useState<IResponseProject[]>([]);
    const [allProjects, setAllProjects] = useState<IResponseProject[]>([]);
    const [informationsCardById, setInformationsCardById] = useState<IIformationsCard[]>([]);
    const [projectId, setProjectId] = useState<string>("");
    const { currentUser } = useContext(userContext);
    let actualUser: IUserCredentials = currentUser;

    const getAllHomeProjects = async () => {
        ProjectService.getAllHome(actualUser.userId as string, actualUser)
            .then((res) => {
                setMyProjects(res[1].result);
                setAllProjects(res[0].result);
            })
            .catch((error) => {
                NotificationService.failed("error", "Affichage des projets", error.message);
            });
    };

    const getAllProjectsById = async () => {
        setMyProjects(await ProjectService.getAllById(actualUser.userId as string, actualUser));
    };

    const getAllProjects = async () => {
        setAllProjects(await ProjectService.getAll(actualUser));
    };

    const getInformationsCardById = async () => {
        setInformationsCardById(await ProjectService.getInformationsCardById(actualUser.userId as string, actualUser));
    };

    return (
        <projectsContext.Provider
            value={{
                myProjects,
                allProjects,
                getAllProjectsById,
                getAllProjects,
                getAllHomeProjects,
                projectId,
                setProjectId,
                informationsCardById,
                getInformationsCardById,
            }}
        >
            {props.children}
        </projectsContext.Provider>
    );
};
export default ProjectsContext;

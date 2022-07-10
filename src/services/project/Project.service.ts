import { axiosInstance } from "../../exports/server/axiosInstance";
import { serverUrl } from "../../exports/server/serverUrl";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { IFinalProjectData } from "../../interfaces/multiformSteps/data/IFinalProjectData";
import { IIformationsCard } from "../../interfaces/projects/IInformationsCard";
import { IResponseAllHomeProjects } from "../../interfaces/projects/IResponseAllHomeProjects";
import { IResponseAllProjects } from "../../interfaces/projects/IResponseAllProjects";
import { IResponseAttachment } from "../../interfaces/projects/IResponseAttachment";
import { IResponseProject } from "../../interfaces/projects/IResponseProject";
import { IResponseProjectCardInformations } from "../../interfaces/projects/IResponseProjectCardInformations";
import { addTokenToHeader } from "../security/addTokenToHeader";

export const ProjectService = {
    create(
        project: IFinalProjectData,
        attachments: FormData,
        userId: string,
        currentUser: IUserCredentials
    ): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .post("project/" + userId, project, { headers: await addTokenToHeader(currentUser) })
                .then((res) => {
                    let projectId: string = res.data.projectId;
                    return projectId;
                })
                .then((projectId) => {
                    this.uploadAttachments(attachments, userId, projectId, currentUser)
                        .then(() => {
                            resolve(true);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    uploadAttachments(
        attachments: FormData,
        userId: string,
        projectId: string,
        currentUser: IUserCredentials
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let config: RequestInit = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    authorization: "Bearer " + currentUser.accessToken,
                },
                body: attachments,
            };

            fetch(serverUrl + "upload-attachment/" + userId + "/" + projectId, config)
                .then((res) => {
                    resolve(res.ok);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getById(): Promise<any> {
        return new Promise((resolve, reject) => {});
    },
    getAllHome(userId: string, currentUser: IUserCredentials): Promise<IResponseAllHomeProjects[]> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .get(`all/home/projects/${currentUser.userId}`, { headers: await addTokenToHeader(currentUser) })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.log(error.message);
                    reject(error);
                });
        });
    },
    getAll(currentUser: IUserCredentials): Promise<IResponseProject[]> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .get("all/projects/", { headers: await addTokenToHeader(currentUser) })
                .then((res) => {
                    let result: IResponseAllProjects = res.data;
                    resolve(result.result);
                })
                .catch((error) => {
                    console.log(error.message);
                    reject(error);
                });
        });
    },
    getAllById(userId: string, currentUser: IUserCredentials): Promise<IResponseProject[]> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .get("all/projects/" + userId, { headers: await addTokenToHeader(currentUser) })
                .then((res) => {
                    let result: IResponseAllProjects = res.data;
                    resolve(result.result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getInformationsCardById(userId: string, currentUser: IUserCredentials): Promise<IIformationsCard[]> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .get("/projects-cards/" + userId, { headers: await addTokenToHeader(currentUser) })
                .then((res) => {
                    let result: IResponseProjectCardInformations = res.data;
                    let cards: IIformationsCard[] = result.result;
                    resolve(cards);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getInformationsCard(currentUser: IUserCredentials): Promise<IIformationsCard[]> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .get("/projects-cards/", { headers: await addTokenToHeader(currentUser) })
                .then((res) => {
                    let result: IResponseProjectCardInformations = res.data;
                    let cards: IIformationsCard[] = result.result;
                    resolve(cards);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getAllAttachmentsByProjectId(projectId: string, currentUser: IUserCredentials): Promise<IResponseAttachment[]> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .get(`attachments/${projectId}`, { headers: await addTokenToHeader(currentUser) })
                .then((res) => {
                    let attachments: IResponseAttachment[] = res.data;
                    resolve(attachments);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    send(projectId: string, project: IResponseProject, currentUser: IUserCredentials): Promise<any> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .post(
                    `send-project/${projectId}`,
                    { project: project },
                    { headers: await addTokenToHeader(currentUser) }
                )
                .then((res) => {
                    if (res.data.message.includes("Votre idée n'a pa pu être envoyée")) {
                        reject(res.data.message);
                    }

                    resolve(res.data.message);
                })
                .catch((error) => {
                    reject(error.data);
                });
        });
    },
    update(
        projectId: string,
        project: IFinalProjectData,
        attachments: FormData,
        userId: string,
        currentUser: IUserCredentials
    ): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .put(`project/${userId}/${projectId}`, project, { headers: await addTokenToHeader(currentUser) })
                .then((res) => {
                    this.uploadAttachments(attachments, userId, projectId, currentUser)
                        .then(() => {
                            resolve(true);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    deleteAttachment(
        projectId: string,
        fileId: number,
        filePath: string,
        currentUser: IUserCredentials
    ): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .delete(`attachment/${projectId}/${fileId}`, {
                    headers: await addTokenToHeader(currentUser),
                    data: { filePath: filePath },
                })
                .then((res) => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    delete(projectId: string, attachments: IResponseAttachment[], currentUser: IUserCredentials): Promise<any> {
        return new Promise(async (resolve, reject) => {
            axiosInstance
                .delete(`project/${currentUser.userId}/${projectId}`, {
                    headers: await addTokenToHeader(currentUser),
                    data: { attachments: attachments },
                })
                .then((res) => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

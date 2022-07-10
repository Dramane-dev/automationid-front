import React, { useContext } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../../css/components/multiform-steps/Resume";
import { multiStepContext } from "../../context/StepContext";
import { ProjectService } from "../../services/project/Project.service";
import { IFinalProjectData } from "../../interfaces/multiformSteps/data/IFinalProjectData";
import { IAttachment } from "../../interfaces/multiformSteps/data/IAttachment";
import { userContext } from "../../context/UserContext";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { NotificationService } from "../../services/notifications/Notification.service";
import { projectsContext } from "../../context/ProjectsContext";
import { appRouting } from "../../exports/navigation/app.routing";
import { notificationTimeout } from "../../exports/notifications/notificationTimeout";

const ResumeComponent = ({ navigationObject }: any) => {
    const { setStep, userProjectData, saveProject, load, setLoad, isUpdateProject, setIsUpdateProject } =
        useContext(multiStepContext);
    const { projectId } = useContext(projectsContext);
    const currentProject: IFinalProjectData = userProjectData;
    const { currentUser } = useContext(userContext);
    let actualUser: IUserCredentials = currentUser;
    const saveDataToDatabase = () => {
        setLoad(true);
        let project: IFinalProjectData = userProjectData;
        let attachments: FormData = uploadAttachments(project.attachments);

        if (isUpdateProject) {
            ProjectService.update(projectId, project, attachments, actualUser.userId as string, actualUser)
                .then((res) => {
                    setLoad(false);
                    setIsUpdateProject(false);
                    NotificationService.success(
                        "success",
                        "Mise à jour d'une idée",
                        "Votre idée à bien été mise à jour"
                    );
                    notificationTimeout(saveProject, () => navigateTo(appRouting.ideas));
                    // setTimeout(() => {
                    //     saveProject();
                    //     navigateTo(appRouting.ideas);
                    // }, 2500);
                })
                .catch((error) => {
                    setLoad(false);
                    NotificationService.failed("error", "Mise à jour d'une idée échoué", error);
                });
        } else {
            ProjectService.create(project, attachments, actualUser.userId as string, actualUser)
                .then((res) => {
                    setLoad(false);
                    setIsUpdateProject(false);
                    NotificationService.success("success", "Création d'une idée", "Votre idée à bien été sauvegardé");
                    // notificationTimeout(saveProject, () => navigateTo(appRouting.ideas));
                    setTimeout(() => {
                        saveProject();
                        navigateTo(appRouting.ideas);
                    }, 2500);
                })
                .catch((error) => {
                    setLoad(false);
                    NotificationService.failed("error", "Création d'un projet échoué", error);
                });
        }
    };

    const uploadAttachments = (attachments: IAttachment[]): FormData => {
        const formData = new FormData();
        if (attachments) {
            attachments.map((attachment: IAttachment) => {
                formData.append("attachments", attachment as any);
            });
        }
        return formData;
    };

    const prevStep = () => {
        setStep(4);
    };

    const navigateTo = (url: string) => {
        navigationObject.navigate(url);
    };

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Resume</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text>{JSON.stringify(userProjectData)}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={prevStep}>
                            <View style={styles.backButtonContainer}>
                                <Text style={styles.backButtonContent}>Retour</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={saveDataToDatabase}>
                            <View style={styles.saveButtonContainer}>
                                <Text style={styles.saveButtonContent}>Sauvegarder</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};
export default ResumeComponent;

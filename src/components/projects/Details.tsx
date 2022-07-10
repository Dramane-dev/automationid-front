import React, { useContext, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { projectsContext } from "../../context/ProjectsContext";
import { IResponseProject } from "../../interfaces/projects/IResponseProject";
import { styles } from "../../css/components/projects/Details";
import { IResponseAttachment } from "../../interfaces/projects/IResponseAttachment";
import moment from "moment";
import { multiStepContext } from "../../context/StepContext";
import { ProjectService } from "../../services/project/Project.service";
import { userContext } from "../../context/UserContext";
import { NotificationService } from "../../services/notifications/Notification.service";
import Loader from "../Loader";
import PopupComponent from "../popup/Popup";
import { appRouting } from "../../exports/navigation/app.routing";
import { notificationTimeout } from "../../exports/notifications/notificationTimeout";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const DetailsComponent = ({ route, navigation }: any) => {
    const { myProjects } = useContext(projectsContext);
    const { setIsUpdateProject, load, setLoad, attachmentsAlreadySaved } = useContext(multiStepContext);
    const { currentUser } = useContext(userContext);
    const { projectId, attachments } = route.params;
    const fonciaColors: string[] = ["#002955", "#FFB65E", "#5ECDA3", "#DCC7D9"];
    const myProjectsFiltered: IResponseProject = myProjects.filter(
        (project: IResponseProject) => project.ideaId === projectId
    )[0];
    const updateProject = async () => {
        setIsUpdateProject(true);
        let attachments: IResponseAttachment[] = await ProjectService.getAllAttachmentsByProjectId(
            projectId,
            currentUser
        );

        if (!myProjectsFiltered) {
            setIsUpdateProject(false);
            navigateTo(appRouting.newIdea);
        }
        navigateTo(appRouting.updateIdea, projectId, myProjectsFiltered, attachments);
    };
    const [modalVisible, setModalVisible] = useState(false);
    const automateSectionContainerColor = (index: number): StyleProp<ViewStyle> => {
        let color: string = fonciaColors[index % fonciaColors.length];

        return {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            padding: "2%",
            height: 60,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "5%",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            backgroundColor: `${color}`,
            alignItems: "center",
        };
    };
    const showPopup = () => {
        setModalVisible(!modalVisible);
    };
    const hidePopup = () => {
        setModalVisible(!modalVisible);
    };
    const abandonedProject = () => {
        setLoad(true);
        ProjectService.delete(projectId, attachments, currentUser)
            .then((res) => {
                NotificationService.success("success", "Suppression d'une idée", "Votre idée à bien été supprimée");
                notificationTimeout(
                    () => setLoad(false),
                    () => navigateTo(appRouting.ideas)
                );
            })
            .catch((error) => {
                NotificationService.failed("error", "Suppression d'une idéee échoué", error);
                notificationTimeout(
                    () => setLoad(false),
                    () => navigateTo(appRouting.ideas)
                );
            });
    };
    const navigateTo = (
        url: string,
        projectId?: string,
        project?: IResponseProject,
        attachments?: IResponseAttachment[]
    ) => {
        navigation.navigate(url, {
            projectId: projectId,
            project: project,
            attachments: attachments,
        });
    };

    return (
        <>
            {load ? (
                <Loader />
            ) : (
                <View style={styles.globalContainer}>
                    <PopupComponent
                        sentence={"Voulez-vous vraiment supprimer cette idée ?"}
                        modalVisible={modalVisible}
                        customFunction={abandonedProject}
                        hideModal={hidePopup}
                        actionButtonContent={"Supprimer"}
                    />
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.headerSection}>
                                <View style={styles.projectTitleContainer}>
                                    <Text style={styles.projectTitle}>{myProjectsFiltered.idName}</Text>
                                </View>
                                <View style={styles.headerSubSection}>
                                    <View>
                                        <Text style={styles.projectId}>Id : {myProjectsFiltered.ideaId}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.projectDateOfCreation}>
                                            Date :{" "}
                                            {new Date(myProjectsFiltered.idCreat)
                                                .toLocaleString()
                                                .slice(
                                                    0,
                                                    new Date(myProjectsFiltered.idCreat).toLocaleString().indexOf(" ")
                                                )}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.previewSection}>
                                <View style={automateSectionContainerColor(0)}>
                                    <Text style={styles.title}>Aperçu</Text>
                                    <MaterialIcons name="find-in-page" size={40} color={"#ffffff"} />
                                </View>

                                <View style={styles.itemContainer}>
                                    <Text style={styles.itemTitle}>Description</Text>
                                    <Text style={styles.item}>{myProjectsFiltered.idDescript}</Text>
                                </View>

                                <View style={styles.displayInRow}>
                                    <View style={styles.previewDisplayInRowUnitContainer}>
                                        <Text style={styles.itemTitle}>Business Unit</Text>
                                        <Text style={styles.item}>{myProjectsFiltered.idUnit}</Text>
                                    </View>

                                    <View style={styles.previewDisplayInRowGoalContainer}>
                                        <Text style={styles.itemTitle}>But principale</Text>
                                        <Text style={styles.item}>{myProjectsFiltered.idGoal}</Text>
                                    </View>
                                </View>

                                <View style={styles.displayInColumn}>
                                    <View style={styles.attachmentContainer}>
                                        <Text style={styles.itemTitle}>Pièces jointes</Text>
                                        {attachmentsAlreadySaved !== undefined &&
                                        attachmentsAlreadySaved !== null &&
                                        attachmentsAlreadySaved.length > 0 ? (
                                            attachmentsAlreadySaved.map(
                                                (attachment: IResponseAttachment, index: number) => {
                                                    return (
                                                        <Text key={index} style={styles.item}>
                                                            {attachment.fileName.includes(projectId)
                                                                ? attachment.fileName
                                                                      .replace(projectId, "")
                                                                      .replace("-", "")
                                                                : attachment.fileName}
                                                        </Text>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <View style={styles.displayInRow}>
                                                <Text style={styles.notAttachmentsComment}>
                                                    Acune pièce(s) jointe(s) n'a été fournis.
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>

                            <View style={styles.feasibilitySection}>
                                <View style={automateSectionContainerColor(1)}>
                                    <Text style={styles.feasibilitySectionTitle}>Faisabilité</Text>
                                    <MaterialIcons name="assignment-turned-in" size={40} color={"#ffffff"} />
                                </View>
                                <View style={styles.displayInColumn}>
                                    <View style={styles.feasibilityFirstDisplayInColumn}>
                                        <View style={styles.processRulesContainer}>
                                            <Text style={styles.feasibilityFirstItemsTitles}>
                                                Régles de gestions - complexité
                                            </Text>
                                            <Text style={styles.feasibilityFirstItemsContents}>
                                                {myProjectsFiltered.idQ1}
                                            </Text>
                                            <Text style={styles.feasibilityFirstItemsTitles}>Commentaire</Text>
                                            <Text style={styles.feasibilityFirstItemsContents}>
                                                {myProjectsFiltered.idCom1 ? (
                                                    myProjectsFiltered.idCom1
                                                ) : (
                                                    <Text style={styles.notComment}>Aucun commentaire...</Text>
                                                )}
                                            </Text>
                                        </View>
                                        <View style={styles.functionnalProcedureContainer}>
                                            <Text style={styles.feasibilityFirstItemsTitles}>
                                                Vous disposez d'une procedure fonctionnelle
                                            </Text>
                                            <Text style={styles.feasibilityFirstItemsContents}>
                                                {myProjectsFiltered.idQ2}
                                            </Text>
                                            <Text style={styles.feasibilityFirstItemsTitles}>Commentaire</Text>
                                            <Text style={styles.feasibilityFirstItemsContents}>
                                                {myProjectsFiltered.idCom2 ? (
                                                    myProjectsFiltered.idCom2
                                                ) : (
                                                    <Text style={styles.notComment}>Aucun commentaire...</Text>
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.feasibilitySecondDisplayInColumn}>
                                        <View style={styles.isDataStructuredContainer}>
                                            <Text style={styles.feasibilitySecondItemsTitles}>
                                                Type de donnée - input
                                            </Text>
                                            <Text style={styles.feasibilitySecondItemsContents}>
                                                {myProjectsFiltered.idQ3}
                                            </Text>
                                            <Text style={styles.feasibilitySecondItemsTitles}>Commentaire</Text>
                                            <Text style={styles.feasibilitySecondItemsContents}>
                                                {myProjectsFiltered.idCom3 ? (
                                                    myProjectsFiltered.idCom3
                                                ) : (
                                                    <Text style={styles.notComment}>Aucun commentaire...</Text>
                                                )}
                                            </Text>
                                        </View>
                                        <View style={styles.processStabilityContainer}>
                                            <Text style={styles.feasibilitySecondItemsTitles}>
                                                Stabilité du processus
                                            </Text>
                                            <Text style={styles.feasibilitySecondItemsContents}>
                                                {myProjectsFiltered.idQ4}
                                            </Text>
                                            <Text style={styles.feasibilitySecondItemsTitles}>Commentaire</Text>
                                            <Text style={styles.feasibilitySecondItemsContents}>
                                                {myProjectsFiltered.idCom4 ? (
                                                    myProjectsFiltered.idCom4
                                                ) : (
                                                    <Text style={styles.notComment}>Aucun commentaire...</Text>
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.payoffSection}>
                                <View style={automateSectionContainerColor(2)}>
                                    <Text style={styles.title}>Potentiel</Text>
                                    <MaterialIcons name="monetization-on" size={40} color={"#ffffff"} />
                                </View>
                                <View style={styles.displayInColumn}>
                                    <View style={styles.payoffFirstDisplayInColumn}>
                                        <Text style={styles.payoffFirstItemsTitles}>
                                            Collaborateurs intervenants dans le processus
                                        </Text>
                                        <Text style={styles.payoffFirstItemsContents}>
                                            {myProjectsFiltered.idMembers} intervenant(s)
                                        </Text>
                                        <Text style={styles.payoffFirstItemsTitles}>Frequence du processus</Text>
                                        <Text style={styles.payoffFirstItemsContents}>{myProjectsFiltered.idFreq}</Text>
                                        <Text style={styles.payoffFirstItemsTitles}>
                                            Nombre de traitements réalisés
                                        </Text>
                                        <Text style={styles.payoffFirstItemsContents}>
                                            {myProjectsFiltered.idTreats} traitement(s)
                                        </Text>
                                        <Text style={styles.payoffFirstItemsTitles}>Temps moyen de realisation</Text>
                                        <Text style={styles.payoffFirstItemsContents}>
                                            {myProjectsFiltered.idDuree}
                                        </Text>
                                        <Text style={styles.payoffFirstItemsTitles}>Part d'erreur constaté</Text>
                                        <Text style={styles.payoffFirstItemsContents}>
                                            {myProjectsFiltered.idErrPart}
                                        </Text>
                                        <Text style={styles.payoffFirstItemsTitles}>Pic d'activité</Text>
                                        <Text style={styles.payoffFirstItemsContents}>
                                            {myProjectsFiltered.idPicAct}
                                        </Text>
                                    </View>

                                    <View style={styles.payoffSecondDisplayInColumn}>
                                        <Text style={styles.payoffSecondItemsTitles}>Commentaire</Text>
                                        <Text style={styles.payoffSecondItemsContents}>
                                            {myProjectsFiltered.idPicCom ? (
                                                myProjectsFiltered.idPicCom
                                            ) : (
                                                <Text style={styles.notPicOfActivityComment}>Aucun commentaire...</Text>
                                            )}
                                        </Text>
                                        <Text style={styles.payoffSecondItemsTitles}>
                                            Étapes du processus identifiées
                                        </Text>
                                        <Text style={styles.payoffSecondItemsContents}>
                                            {myProjectsFiltered.idSteps}
                                        </Text>
                                        <Text style={styles.payoffSecondItemsTitles}>
                                            Nombre de règles de prises de décision
                                        </Text>
                                        <Text style={styles.payoffSecondItemsContents}>
                                            {myProjectsFiltered.idRules} règle(s)
                                        </Text>
                                        <Text style={styles.payoffSecondItemsTitles}>
                                            Nombre d'applications utilisées
                                        </Text>
                                        <Text style={styles.payoffSecondItemsContents}>
                                            {myProjectsFiltered.idAppUsed} application(s)
                                        </Text>
                                        <Text style={styles.payoffSecondItemsTitles}>
                                            Applications accessible par un bureau distant
                                        </Text>
                                        <Text style={styles.payoffSecondItemsContents}>
                                            {myProjectsFiltered.idRemoteApp}
                                        </Text>
                                        <Text style={styles.payoffSecondItemsTitles}>
                                            Ratio de données digitalisées
                                        </Text>
                                        <Text style={styles.payoffSecondItemsContents}>
                                            {myProjectsFiltered.idDigitData}
                                        </Text>
                                        <Text style={styles.payoffSecondItemsTitles}>Documents scannés</Text>
                                        <Text style={styles.payoffSecondItemsContents}>
                                            {myProjectsFiltered.idScanDocs}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.meetingsSection}>
                                <View style={automateSectionContainerColor(3)}>
                                    <Text style={styles.title}>RDV</Text>
                                    <Ionicons name="calendar-outline" size={40} color={"#ffffff"} />
                                </View>
                                <View style={styles.meetTitleSection}>
                                    <Text style={styles.meetTitleContents}>
                                        Afin d'échanger plus en profondeur lors d'un meeting, vous avez choisis :
                                    </Text>
                                </View>
                                <View style={styles.displayMeetInRow}>
                                    <View style={styles.firstMeetSection}>
                                        <Text style={styles.meetsContents}>Premier RDV</Text>
                                        <Text style={styles.meetsDateContents}>
                                            {moment
                                                .utc(Date.parse(myProjectsFiltered.meeting1))
                                                .format("DD-MM-YYYY HH:mm:ss")
                                                .replace(/[-]/gi, " ")
                                                .split(" ")
                                                .slice(0, 3)
                                                .join(" ")}
                                            <Text> à </Text>
                                            {moment
                                                .utc(Date.parse(myProjectsFiltered.meeting1))
                                                .format("DD-MM-YYYY HH:mm:ss")
                                                .replace(/[-]/gi, " ")
                                                .split(" ")
                                                .slice(3)
                                                .join(" ")}
                                        </Text>
                                    </View>
                                    <View style={styles.secondMeetSection}>
                                        <Text style={styles.meetsContents}>Deuxième RDV</Text>
                                        <Text style={styles.meetsDateContents}>
                                            {moment
                                                .utc(Date.parse(myProjectsFiltered.meeting2))
                                                .format("DD-MM-YYYY HH:mm:ss")
                                                .replace(/[-]/gi, " ")
                                                .split(" ")
                                                .slice(0, 3)
                                                .join(" ")}
                                            <Text> à </Text>
                                            {moment
                                                .utc(Date.parse(myProjectsFiltered.meeting2))
                                                .format("DD-MM-YYYY HH:mm:ss")
                                                .replace(/[-]/gi, " ")
                                                .split(" ")
                                                .slice(3)
                                                .join(" ")}
                                        </Text>
                                    </View>
                                    <View style={styles.thirdMeetSection}>
                                        <Text style={styles.meetsContents}>Troisième RDV</Text>
                                        <Text style={styles.meetsDateContents}>
                                            {moment
                                                .utc(Date.parse(myProjectsFiltered.meeting3))
                                                .format("DD-MM-YYYY HH:mm:ss")
                                                .replace(/[-]/gi, " ")
                                                .split(" ")
                                                .slice(0, 3)
                                                .join(" ")}
                                            <Text> à </Text>
                                            {moment
                                                .utc(Date.parse(myProjectsFiltered.meeting3))
                                                .format("DD-MM-YYYY HH:mm:ss")
                                                .replace(/[-]/gi, " ")
                                                .split(" ")
                                                .slice(3)
                                                .join(" ")}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.displayMeetInColumn}>
                                    {/* <View style={styles.thirdMeetSection}>
                                        <Text style={styles.meetsContents}>Troisième entretient</Text>
                                        <Text style={styles.meetsDateContents}>
                                            {moment
                                                .utc(Date.parse(myProjectsFiltered.meeting3))
                                                .format("DD-MM-YYYY HH:mm:ss")
                                                .replace(/[-]/gi, " ")
                                                .split(" ")
                                                .slice(0, 3)
                                                .join(" ")}
                                            <Text> à </Text>
                                            {moment
                                                .utc(Date.parse(myProjectsFiltered.meeting3))
                                                .format("DD-MM-YYYY HH:mm:ss")
                                                .replace(/[-]/gi, " ")
                                                .split(" ")
                                                .slice(3)
                                                .join(" ")}
                                        </Text>
                                    </View> */}
                                </View>
                            </View>

                            <View style={styles.actionsSection}>
                                {myProjectsFiltered.statusValue === "Brouillon" ? (
                                    <>
                                        <TouchableOpacity style={styles.updateButton} onPress={updateProject}>
                                            <Text style={styles.updateButtonContent}>Modifier</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.abandonedButton} onPress={showPopup}>
                                            <Text style={styles.abandonedButtonContent}>Abandoner</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )}
        </>
    );
};
export default DetailsComponent;

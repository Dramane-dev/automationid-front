import React, { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Modal, Image, StyleProp, ViewStyle } from "react-native";
import { projectsContext } from "../../context/ProjectsContext";
import { styles } from "../../css/components/projects/Projects";
import { popupStyles } from "../../css/components/popup/Popup";
import moment from "moment";
import { IResponseProject } from "../../interfaces/projects/IResponseProject";
import { multiStepContext } from "../../context/StepContext";
import { IResponseAttachment } from "../../interfaces/projects/IResponseAttachment";
import { ProjectService } from "../../services/project/Project.service";
import { userContext } from "../../context/UserContext";
import { NotificationService } from "../../services/notifications/Notification.service";
import Loader from "../Loader";
import { appRouting } from "../../exports/navigation/app.routing";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PopupComponent from "../popup/Popup";

const ProjectsComponent = ({ navigation }: any) => {
    const { currentUser } = useContext(userContext);
    const { myProjects, allProjects, getAllHomeProjects } = useContext(projectsContext);
    const { setIsUpdateProject, load, setLoad, attachmentsAlreadySaved, setAttachmentsAlreadySaved } =
        useContext(multiStepContext);
    const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
    const [showMyProjects, setShowMyProjects] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [projectToSend, setProjectToSend] = useState<IResponseProject>(myProjects);
    const fonciaColors: string[] = [
        "#002955",
        "#FFB65E",
        "#5ECDA3",
        "#1BA3B7",
        "#DCC7D9",
        "#727EBB",
        "#04945C",
        "#4775A5",
    ];
    const displayAllProjects = () => {
        setShowAllProjects(true);
        setShowMyProjects(false);
    };

    const displayMyProjects = () => {
        setShowMyProjects(true);
        setShowAllProjects(false);
    };

    const showDetails = async (projectId: string) => {
        let attachments: IResponseAttachment[] = await ProjectService.getAllAttachmentsByProjectId(
            projectId,
            currentUser
        );
        setAttachmentsAlreadySaved(attachments);
        navigateTo(appRouting.details, projectId, undefined, attachments);
    };

    const showMultiFormStepsToUpdateProject = async (projectId: string) => {
        setIsUpdateProject(true);
        let project: IResponseProject[] = myProjects.filter(
            (project: IResponseProject) => project.ideaId === projectId
        );

        let attachments: IResponseAttachment[] = await ProjectService.getAllAttachmentsByProjectId(
            projectId,
            currentUser
        );

        if (project.length === 0) {
            setIsUpdateProject(false);
            navigateTo(appRouting.newIdea);
        }
        navigateTo(appRouting.updateIdea, projectId, project[0], attachments);
    };

    const sendProject = async () => {
        setLoad(true);
        setModalVisible(!modalVisible);
        let projectId: string = projectToSend?.ideaId as string;
        let attachments: IResponseAttachment[] = await ProjectService.getAllAttachmentsByProjectId(
            projectId,
            currentUser
        );
        projectToSend.userMail = currentUser.userMail;
        projectToSend.attachments = attachments;
        ProjectService.send(projectId, projectToSend as IResponseProject, currentUser)
            .then((res) => {
                NotificationService.success("success", "Envoi d'une idée", res);
                setTimeout(() => {
                    setLoad(false);
                }, 2000);
            })
            .catch((error) => {
                NotificationService.failed("error", "Envoi d'une idée échoué", error);
                setTimeout(() => {
                    setLoad(false);
                }, 2000);
            });
    };

    // const showModal = (project: IResponseProject) => {
    //     let projectId: string = project.ideaId;
    //     project = myProjects.filter((project: IResponseProject) => project.ideaId === projectId)[0];
    //     setProjectToSend(project);
    //     setModalVisible(!modalVisible);
    // };

    // const hideModal = () => {
    //     setModalVisible(!modalVisible);
    // };

    const showPopup = (project: IResponseProject) => {
        let projectId: string = project.ideaId;
        project = myProjects.filter((project: IResponseProject) => project.ideaId === projectId)[0];
        setProjectToSend(project);
        setModalVisible(!modalVisible);
    };

    const hidePopup = () => {
        setModalVisible(!modalVisible);
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

    const automateCardContainerColor = (index: number): StyleProp<ViewStyle> => {
        let color: string = fonciaColors[index % fonciaColors.length];

        return {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "3%",
            width: "100%",
            borderRadius: 5,
            marginBottom: "5%",
            backgroundColor: `${color}`,
        };
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getAllHomeProjects();
        });

        return () => {
            unsubscribe;
        };
    }, [navigation]);

    return (
        <>
            {load ? (
                <Loader />
            ) : (
                <View style={styles.globalContainer}>
                    <PopupComponent
                        sentence={"Voulez-vous vraiment envoyer le projet ?"}
                        modalVisible={modalVisible}
                        customFunction={sendProject}
                        hideModal={hidePopup}
                        actionButtonContent={"Envoyer"}
                    />
                    <View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.buttonContainer} onPress={displayMyProjects}>
                                <Text style={styles.buttonContent}>Mes projets</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonContainer} onPress={displayAllProjects}>
                                <Text style={styles.buttonContent}>Tous les projets</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subTitleContainer}>
                            <Text style={styles.subTitle}>
                                {showMyProjects ? "Liste de mes projets" : "Tous les projets"}
                            </Text>
                        </View>
                        {/* <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={popupStyles.modalContainer}>
                                <View style={popupStyles.modalView}>
                                    <Text style={popupStyles.modalTitle}>Voulez-vous vraiment envoyer le projet ?</Text>
                                    <View style={popupStyles.modalButtonsContainer}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                sendProject();
                                            }}
                                            style={popupStyles.sendModalButton}
                                        >
                                            <Text style={popupStyles.modalButtonContent}>Envoyer</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={hideModal} style={popupStyles.cancelModalButton}>
                                            <Text style={popupStyles.modalButtonContent}>Annuler</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal> */}
                        <ScrollView>
                            {
                                <View style={styles.container}>
                                    {(showMyProjects && (myProjects === undefined || myProjects.length === 0)) ||
                                    (showAllProjects && (allProjects === undefined || allProjects.length === 0)) ? (
                                        <>
                                            <Text style={styles.noProjectFound}>
                                                Acun projet n'a été créer pour le moment...
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            {showMyProjects
                                                ? myProjects.map((project: IResponseProject, index: number) => {
                                                      return (
                                                          <View key={index}>
                                                              <View style={automateCardContainerColor(index)}>
                                                                  <View
                                                                      style={styles.cardFirstAndSecondSectionContainer}
                                                                  >
                                                                      <View style={styles.cardFirstSection}>
                                                                          <View style={styles.cardTitleContainer}>
                                                                              <Text style={styles.cardTitle}>
                                                                                  {project.idName}
                                                                              </Text>
                                                                          </View>
                                                                          <View
                                                                              style={styles.cardInformationsContainer}
                                                                          >
                                                                              <Text
                                                                                  style={styles.cardInformationsContent}
                                                                              >
                                                                                  Id : {project.ideaId}
                                                                              </Text>
                                                                          </View>
                                                                          <View
                                                                              style={styles.cardInformationsContainer}
                                                                          >
                                                                              <Text
                                                                                  style={styles.cardInformationsContent}
                                                                              >
                                                                                  Business Unit : {project.idUnit}
                                                                              </Text>
                                                                          </View>
                                                                          <View
                                                                              style={styles.cardInformationsContainer}
                                                                          >
                                                                              <Text
                                                                                  style={styles.cardInformationsContent}
                                                                              >
                                                                                  But principal : {project.idGoal}
                                                                              </Text>
                                                                          </View>
                                                                          <View
                                                                              style={styles.cardInformationsContainer}
                                                                          >
                                                                              <Text
                                                                                  style={styles.cardInformationsContent}
                                                                              >
                                                                                  Date de création :{" "}
                                                                                  {project.idCreat.length > 0
                                                                                      ? moment
                                                                                            .utc(
                                                                                                Date.parse(
                                                                                                    project.idCreat
                                                                                                )
                                                                                            )
                                                                                            .format("DD-MM-YYYY")
                                                                                            .replaceAll("-", " ")
                                                                                      : ""}
                                                                              </Text>
                                                                          </View>
                                                                          {project.statusValue !== "Brouillon" ? (
                                                                              <View
                                                                                  style={
                                                                                      styles.cardInformationsContainer
                                                                                  }
                                                                              >
                                                                                  <Text
                                                                                      style={
                                                                                          styles.cardInformationsContent
                                                                                      }
                                                                                  >
                                                                                      Statut : {project.statusValue}
                                                                                  </Text>
                                                                              </View>
                                                                          ) : (
                                                                              <></>
                                                                          )}
                                                                      </View>
                                                                      <View style={styles.cardSecondSection}>
                                                                          <TouchableOpacity
                                                                              style={styles.viewAllButtonContainer}
                                                                              onPress={() => {
                                                                                  showDetails(project.ideaId);
                                                                              }}
                                                                          >
                                                                              <Ionicons name="md-eye" size={25} />
                                                                          </TouchableOpacity>
                                                                          {project.statusValue === "Brouillon" ? (
                                                                              <>
                                                                                  <TouchableOpacity
                                                                                      style={
                                                                                          styles.updateButtonContainer
                                                                                      }
                                                                                      onPress={() => {
                                                                                          showMultiFormStepsToUpdateProject(
                                                                                              project.ideaId
                                                                                          );
                                                                                      }}
                                                                                  >
                                                                                      <MaterialIcons
                                                                                          style={styles.icons}
                                                                                          name="edit"
                                                                                          size={25}
                                                                                      />
                                                                                  </TouchableOpacity>
                                                                              </>
                                                                          ) : (
                                                                              <></>
                                                                          )}
                                                                      </View>
                                                                  </View>

                                                                  {project.statusValue === "Brouillon" ? (
                                                                      <View style={styles.cardThirdSection}>
                                                                          <View style={styles.statusContainer}>
                                                                              <Text style={styles.statusContent}>
                                                                                  Statut : {project.statusValue}
                                                                              </Text>
                                                                          </View>
                                                                          <TouchableOpacity
                                                                              style={styles.sendButtonContainer}
                                                                              onPress={() => {
                                                                                  showPopup(project);
                                                                              }}
                                                                          >
                                                                              <Text style={styles.sendButtonContent}>
                                                                                  Envoyer
                                                                              </Text>
                                                                              <MaterialIcons name="send" size={20} />
                                                                          </TouchableOpacity>
                                                                      </View>
                                                                  ) : (
                                                                      <></>
                                                                  )}
                                                              </View>
                                                          </View>
                                                      );
                                                  })
                                                : allProjects.map((project: IResponseProject, index: number) => {
                                                      return (
                                                          <View key={index} style={automateCardContainerColor(index)}>
                                                              <View style={styles.cardFirstAndSecondSectionContainer}>
                                                                  <View style={styles.cardFirstSection}>
                                                                      <View style={styles.cardTitleContainer}>
                                                                          <Text style={styles.cardTitle}>
                                                                              {project.idName}
                                                                          </Text>
                                                                      </View>
                                                                      <View style={styles.cardInformationsContainer}>
                                                                          <Text style={styles.cardInformationsContent}>
                                                                              {project.idUnit}
                                                                          </Text>
                                                                      </View>
                                                                      <View style={styles.cardInformationsContainer}>
                                                                          <Text style={styles.cardInformationsContent}>
                                                                              {project.idGoal}
                                                                          </Text>
                                                                      </View>
                                                                      <View style={styles.cardInformationsContainer}>
                                                                          <Text style={styles.cardInformationsContent}>
                                                                              {moment
                                                                                  .utc(Date.parse(project.idCreat))
                                                                                  .format("YYYY-MM-DD HH:mm:ss")}
                                                                          </Text>
                                                                      </View>
                                                                      <View style={styles.statusContainer}>
                                                                          <Text style={styles.statusContent}>
                                                                              Statut : {project.statusValue}
                                                                          </Text>
                                                                      </View>
                                                                  </View>
                                                                  <View style={styles.cardSecondSection}>
                                                                      <TouchableOpacity
                                                                          style={styles.viewAllButtonContainer}
                                                                          onPress={() => {
                                                                              showDetails(project.ideaId);
                                                                          }}
                                                                      >
                                                                          <Ionicons name="md-eye" size={25} />
                                                                      </TouchableOpacity>
                                                                  </View>
                                                              </View>
                                                              <View style={styles.cardThirdSectionAllProjects}>
                                                                  <View style={styles.statusContainer}>
                                                                      <Text style={styles.statusContent}>
                                                                          Statut : {project.statusValue}
                                                                      </Text>
                                                                  </View>
                                                              </View>
                                                          </View>
                                                      );
                                                  })}
                                        </>
                                    )}
                                </View>
                            }
                        </ScrollView>
                    </View>
                </View>
            )}
        </>
    );
};
export default ProjectsComponent;

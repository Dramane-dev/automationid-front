import React, { MutableRefObject, SetStateAction, useContext, useRef, useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { IPreviewInput } from "../../interfaces/multiformSteps/inputs/IPreviewInput";
import { styles } from "../../css/components/multiform-steps/Preview";
import { multiStepContext } from "../../context/StepContext";
import { IAttachment } from "../../interfaces/multiformSteps/data/IAttachment";
import moment from "moment";
import { IPickerParameters } from "../../interfaces/multiformSteps/picker/IPickerParameters";
import { IResponseAttachment } from "../../interfaces/projects/IResponseAttachment";
import { ProjectService } from "../../services/project/Project.service";
import { projectsContext } from "../../context/ProjectsContext";
import { userContext } from "../../context/UserContext";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { NotificationService } from "../../services/notifications/Notification.service";
import Loader from "../Loader";

const PreviewComponent = ({ navigationObject, scrollRef }: any) => {
    const {
        setStep,
        userProjectData,
        setUserProjectData,
        isUpdateProject,
        attachmentsAlreadySaved,
        setAttachmentsAlreadySaved,
        load,
        setLoad,
    } = useContext(multiStepContext);
    const { projectId } = useContext(projectsContext);
    const { currentUser } = useContext(userContext);
    let actualUser: IUserCredentials = currentUser;
    const [attachments, setAttachements] = useState<IAttachment[]>(
        userProjectData["attachments"] !== undefined ? userProjectData["attachments"] : []
    );
    // const [attachments, setAttachements] = useState<IAttachment[]>([{
    //     id: 123344,
    //     name: "stringstringstringstringstring",
    //     type: "JPEG",
    //     uri: "stringstringstringstringstringstring",
    //  },{
    //     id: 123344,
    //     name: "stringstringstringstringstring",
    //     type: "JPEG",
    //     uri: "stringstringstringstringstringstring",
    //  },{
    //     id: 123344,
    //     name: "stringstringstringstringstring",
    //     type: "JPEG",
    //     uri: "stringstringstringstringstringstring",
    //  },]
    // );
    const [missingProjectName, setMissigingProjectName] = useState<boolean>(false);
    const [missingProjectDescription, setMissigingProjectDescription] = useState<boolean>(false);
    const pickerRef: MutableRefObject<any> = useRef();
    const onProjectNameChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            projectName: e,
        });
        setMissigingProjectName(false);
    };
    const onPeopleToContactChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            peopleToContact: e,
        });
    };
    const onBusinessUnitChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            businessUnit: e,
        });
    };
    const onAutomatisationMainPurposeChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            automatisationMainPurpose: e,
        });
    };
    const onProjectDescriptionChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            projectDescription: e,
        });
        setMissigingProjectDescription(false);
    };
    const generateAttachmentId = (): number => {
        return parseInt(moment().format("YYYYMMDDhhmmss"));
    };
    const previewInputs: IPreviewInput[] = [
        {
            simpleInput: {
                title: "Nom de l'idée",
                placeholder: "Nom du projet",
                value: userProjectData["projectName"],
                onValueChange: onProjectNameChange,
            },
        },
        {
            simpleInput: {
                title: "Personne à contacter",
                placeholder: "",
                value: userProjectData["peopleToContact"],
                onValueChange: onPeopleToContactChange,
            },
        },
        {
            picker: {
                title: "Business Unit",
                value: userProjectData["businessUnit"],
                onValueChange: onBusinessUnitChange,
            },
        },
        {
            picker: {
                title: "But principale de l'automatisation",
                value: userProjectData["automatisationMainPurpose"],
                onValueChange: onAutomatisationMainPurposeChange,
            },
        },
        {
            simpleInput: {
                title: "Décrire en quelques phrases les tâches du processus",
                placeholder: "Decrire en quelques phrases les tâches du processus",
                value: userProjectData["projectDescription"],
                onValueChange: onProjectDescriptionChange,
            },
        },
    ];
    const pickerBusinessUnit: IPickerParameters[] = [
        {
            pickerParameters: {
                label: "RH",
                value: "RH",
            },
        },
        {
            pickerParameters: {
                label: "Finance",
                value: "Finance",
            },
        },
        {
            pickerParameters: {
                label: "Migration",
                value: "Migration",
            },
        },
        {
            pickerParameters: {
                label: "IT",
                value: "IT",
            },
        },
        {
            pickerParameters: {
                label: "Communication",
                value: "Communication",
            },
        },
        {
            pickerParameters: {
                label: "Accounting",
                value: "Accounting",
            },
        },
        {
            pickerParameters: {
                label: "Business core",
                value: "Business core",
            },
        },
        {
            pickerParameters: {
                label: "Legal",
                value: "Legal",
            },
        },
        {
            pickerParameters: {
                label: "Logistique",
                value: "Logistique",
            },
        },
    ];
    const pickerAutomatisationMainPurpose: IPickerParameters[] = [
        {
            pickerParameters: {
                label: "Productivité",
                value: "Productivité",
            },
        },
        {
            pickerParameters: {
                label: "Qualité",
                value: "Qualité",
            },
        },
    ];
    const openDocumentPicker = async () => {
        const file: DocumentPicker.DocumentResult = await DocumentPicker.getDocumentAsync({
            multiple: true,
        });
        const { type } = file;

        if (type !== "cancel") {
            const { name, uri, mimeType } = file;
            let attachment: IAttachment = {
                id: generateAttachmentId(),
                name: name,
                type: mimeType,
                uri: uri,
            };
            setAttachements([...attachments, attachment]);
        }
    };
    const deleteAttachement = (attachementId: number, filePath?: string) => {
        if (
            attachmentsAlreadySaved.filter((attachment: IResponseAttachment) => attachment.fileId === attachementId)
                .length > 0
        ) {
            setAttachmentsAlreadySaved(
                attachmentsAlreadySaved.filter((attachment: IResponseAttachment) => attachment.fileId !== attachementId)
            );
            ProjectService.deleteAttachment(projectId, attachementId, filePath as string, actualUser)
                .then(() => {
                    setLoad(false);
                    NotificationService.success(
                        "success",
                        "Supression d'une pièce jointe",
                        "Votre pièce jointe à bien été supprimée"
                    );
                })
                .catch((error) => {
                    setLoad(false);
                    NotificationService.failed("error", "Votre pièce jointe n'a pas été supprimée", error);
                });
        } else {
            setAttachements(attachments.filter((attachment: IAttachment) => attachment.id !== attachementId));
        }
    };
    const nextStep = () => {
        if (userProjectData["projectName"] && userProjectData["projectDescription"]) {
            setUserProjectData({
                ...userProjectData,
                attachments: attachments,
            });

            scrollRef.current.scrollTo({
                x: 0,
                y: 0,
                animated: true,
            });
            setStep(2);
        } else {
            NotificationService.failed(
                "error",
                "Informations manquantes",
                "Le nom et la description sont obligatoires !"
            );

            switch (true) {
                case !userProjectData["projectName"] && !userProjectData["projectDescription"]:
                    setMissigingProjectName(true);
                    setMissigingProjectDescription(true);
                    break;
                case !userProjectData["projectName"]:
                    setMissigingProjectName(true);
                    break;
                case !userProjectData["projectDescription"]:
                    setMissigingProjectDescription(true);
                    break;
                default:
                    break;
            }
        }
    };
    const prevStep = () => {
        navigationObject.pop(1);
    };

    return (
        <>
            {load ? (
                <Loader />
            ) : (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Aperçu</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.cardContainer}>
                            {previewInputs.map((input: IPreviewInput, index: number) => {
                                return (
                                    <View key={index}>
                                        {index === 2 || index === 3 ? (
                                            index === 2 ? (
                                                <>
                                                    <Text style={styles.label}>{input.picker?.title}</Text>
                                                    <Picker
                                                        ref={pickerRef}
                                                        selectedValue={input.picker?.value}
                                                        mode="dropdown"
                                                        onValueChange={input.picker?.onValueChange}
                                                    >
                                                        {pickerBusinessUnit.map(
                                                            (pickerParams: IPickerParameters, index: number) => {
                                                                return (
                                                                    <Picker.Item
                                                                        key={index}
                                                                        label={pickerParams.pickerParameters.label}
                                                                        value={pickerParams.pickerParameters.value}
                                                                        color="#ffffff"
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                    </Picker>
                                                </>
                                            ) : (
                                                <>
                                                    <Text style={styles.label}>{input.picker?.title}</Text>
                                                    <Picker
                                                        ref={pickerRef}
                                                        selectedValue={input.picker?.value}
                                                        mode="dropdown"
                                                        onValueChange={input.picker?.onValueChange}
                                                    >
                                                        {pickerAutomatisationMainPurpose.map(
                                                            (pickerParams: IPickerParameters, index: number) => {
                                                                return (
                                                                    <Picker.Item
                                                                        key={index}
                                                                        label={pickerParams.pickerParameters.label}
                                                                        value={pickerParams.pickerParameters.value}
                                                                        color="#ffffff"
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                    </Picker>
                                                </>
                                            )
                                        ) : index === 1 ? (
                                            <View>
                                                <Text style={styles.label}>{input.simpleInput?.title}</Text>
                                                <View style={styles.input}>
                                                    <Text>{input.simpleInput?.value}</Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <View>
                                                {missingProjectName && index === 0 ? (
                                                    <>
                                                        <Text style={styles.missingInformationsToLabel}>
                                                            {input.simpleInput?.title}
                                                        </Text>
                                                        <TextInput
                                                            style={styles.missingInformationsToSimpleInput}
                                                            value={input.simpleInput?.value}
                                                            onChangeText={input.simpleInput?.onValueChange}
                                                            placeholder={input.simpleInput?.placeholder}
                                                            placeholderTextColor={"#F79196"}
                                                            focusable={true}
                                                            multiline={
                                                                index === previewInputs.length - 1 ? true : false
                                                            }
                                                            numberOfLines={index === previewInputs.length - 1 ? 10 : 0}
                                                            maxLength={index === previewInputs.length - 1 ? 500 : 100}
                                                        />
                                                    </>
                                                ) : missingProjectDescription && index === previewInputs.length - 1 ? (
                                                    <>
                                                        <Text style={styles.missingInformationsToLabel}>
                                                            {input.simpleInput?.title}
                                                        </Text>
                                                        <TextInput
                                                            style={styles.missingInformationsToTextArea}
                                                            value={input.simpleInput?.value}
                                                            onChangeText={input.simpleInput?.onValueChange}
                                                            placeholder={input.simpleInput?.placeholder}
                                                            placeholderTextColor={"#F79196"}
                                                            focusable={true}
                                                            multiline={
                                                                index === previewInputs.length - 1 ? true : false
                                                            }
                                                            numberOfLines={index === previewInputs.length - 1 ? 10 : 0}
                                                            maxLength={index === previewInputs.length - 1 ? 500 : 100}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Text style={styles.label}>{input.simpleInput?.title}</Text>
                                                        <TextInput
                                                            style={
                                                                index === previewInputs.length - 1
                                                                    ? styles.textArea
                                                                    : styles.input
                                                            }
                                                            value={input.simpleInput?.value}
                                                            onChangeText={input.simpleInput?.onValueChange}
                                                            placeholder={input.simpleInput?.placeholder}
                                                            focusable={true}
                                                            multiline={
                                                                index === previewInputs.length - 1 ? true : false
                                                            }
                                                            numberOfLines={index === previewInputs.length - 1 ? 10 : 0}
                                                            maxLength={index === previewInputs.length - 1 ? 500 : 100}
                                                        />
                                                    </>
                                                )}
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    <View style={styles.attachementsContainer}>
                        <View style={styles.cardContainer}>
                            <View style={styles.attachmentSubTitleContainer}>
                                <Text style={styles.attachmentSubTitle}>Pièces jointes enregistrés</Text>
                            </View>
                            {isUpdateProject ? (
                                attachmentsAlreadySaved?.map((attachment: IResponseAttachment, index: number) => {
                                    return (
                                        <View style={styles.attachementTitleAndDeleteButtonContainer} key={index}>
                                            <Text style={styles.attachementName}>{attachment.fileName}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    deleteAttachement(attachment.fileId, attachment.filePath);
                                                }}
                                            >
                                                <View style={styles.deleteAttachementButtonContainer}>
                                                    <Ionicons name="trash" size={20} style={styles.icon} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                            <View style={styles.attachementsItemsContainer}>
                                {attachments !== undefined && attachments.length > 0 ? (
                                    attachments.map((attachment: IAttachment, index: number) => {
                                        return (
                                            <View style={styles.attachementTitleAndDeleteButtonContainer} key={index}>
                                                <Text style={styles.attachementName}>{attachment.name}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        deleteAttachement(attachment.id);
                                                    }}
                                                >
                                                    <View style={styles.deleteAttachementButtonContainer}>
                                                        <Ionicons name="trash" size={20} style={styles.icon} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })
                                ) : attachmentsAlreadySaved.length > 0 ? (
                                    <View style={styles.noAttachementTitleAndDeleteButtonContainer}>
                                        <Text style={styles.noAttachmentsSelected}>Ajouter une pièce jointe</Text>
                                    </View>
                                ) : (
                                    <View style={styles.noAttachementTitleAndDeleteButtonContainer}>
                                        <Text style={styles.noAttachmentsSelected}>Aucun fichier sélectionné...</Text>
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity onPress={openDocumentPicker}>
                                <View style={styles.addAttachementButtonContainer}>
                                    <Text style={styles.addAttachementButtonContent}>Sélectionner</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={prevStep}>
                            <View style={styles.prevButtonContainer}>
                                <Text style={styles.prevButtonContent}>Précédent</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={nextStep}>
                            <View style={styles.nextButtonContainer}>
                                <Text style={styles.nextButtonContent}>Suivant</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};
export default PreviewComponent;

import React, { SetStateAction, useState, useRef, MutableRefObject, useContext } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../../css/components/multiform-steps/Payoff";
import { IPayoffInput } from "../../interfaces/multiformSteps/inputs/IPayoffInput";
import { Picker } from "@react-native-picker/picker";
import Separator from "../Separator";
import { multiStepContext } from "../../context/StepContext";
import { IPickerParameters } from "../../interfaces/multiformSteps/picker/IPickerParameters";
import { IPickerRealisationMediumTime } from "../../interfaces/multiformSteps/picker/IPickerRealisationMediumTime";

const PayoffComponent = ({ navigation, scrollRef }: any) => {
    const { setStep, userProjectData, setUserProjectData } = useContext(multiStepContext);
    const pickerRef: MutableRefObject<any> = useRef();
    const realisationMediumTimePickerRef: MutableRefObject<any> = useRef();
    const onNumberOfPeopleWorkWithThisProcessChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            numberOfPeopleWorkToThisProcess: e,
        });
    };

    const onFrequencyOfProcessChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            frequencyOfProcess: e,
        });
    };

    const onNumberOfTreatmentsChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            numberOfTreatments: e,
        });
    };

    const onRealisationMediumTimeChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            realisationMediumTime: e,
        });
    };

    const onRealisationMediumTimeSecondPartChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            realisationMediumTimeSecondPart: e,
        });
    };

    const onPartOfErrorChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            partOfError: e,
        });
    };

    const onPeakOfActivityChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            peakOfActivity: e,
        });
    };

    const onPayoffCommentChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            payOffComment: e,
        });
    };

    const onProcessStepsChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            processSteps: e,
        });
    };

    const onRulesOfDecisionToReachEndOfProcessChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            rulesOfDecisionToReachEndOfProcess: e,
        });
    };

    const onNumberOfAppsChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            numberOfApps: e,
        });
    };

    const onAppsAccessibilityInRemoteDesktopChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            appsAccessibilityInRemoteDesktop: e,
        });
    };

    const onRatialsOfDigitalisedDatasChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            ratialsOfDigitalisedDatas: e,
        });
    };

    const onScanedFilesChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            scanedFiles: e,
        });
    };

    const payoffInputs: IPayoffInput[] = [
        {
            simpleInput: {
                title: "Combien de personnes interviennent dans le processus ?",
                value: String(userProjectData["numberOfPeopleWorkToThisProcess"]),
                onValueChange: onNumberOfPeopleWorkWithThisProcessChange,
            },
        },
        {
            picker: {
                title: "Quelles est la frequence du processus ?",
                value: userProjectData["frequencyOfProcess"],
                onValueChange: onFrequencyOfProcessChange,
            },
        },
        {
            simpleInput: {
                title: "Combien de traitements sont réalisés ?",
                value: String(userProjectData["numberOfTreatments"]),
                onValueChange: onNumberOfTreatmentsChange,
            },
        },
        {
            multiplesInput: {
                simpleInput: {
                    title: "Quel est le temps moyen de realisation ?",
                    value: userProjectData["realisationMediumTime"],
                    onValueChange: onRealisationMediumTimeChange,
                },
                picker: {
                    title: "Quelles est la frequence du processus ?",
                    value: userProjectData["realisationMediumTimeSecondPart"],
                    onValueChange: onRealisationMediumTimeSecondPartChange,
                },
            },
        },
        {
            simpleInput: {
                title: "Quelle est la part d'erreur constaté ?",
                value: userProjectData["partOfError"],
                onValueChange: onPartOfErrorChange,
            },
        },
        {
            picker: {
                title: "Y a-t-il un pic d'activité ?",
                value: userProjectData["peakOfActivity"],
                onValueChange: onPeakOfActivityChange,
            },
        },
        {
            simpleInput: {
                title: "Commentaire",
                value: userProjectData["payOffComment"],
                onValueChange: onPayoffCommentChange,
            },
        },
        {
            simpleInput: {
                title: "Combien d'etapes idenifiez-vous dans le processus ?",
                value: String(userProjectData["processSteps"]),
                onValueChange: onProcessStepsChange,
            },
        },
        {
            simpleInput: {
                title: "Environ combien de regles de prise de decision au maximum sont necessaire pour atteindre la fin du processus ?",
                value: String(userProjectData["rulesOfDecisionToReachEndOfProcess"]),
                onValueChange: onRulesOfDecisionToReachEndOfProcessChange,
            },
        },
        {
            simpleInput: {
                title: "Combien d'applications sont utilisées ?",
                value: String(userProjectData["numberOfApps"]),
                onValueChange: onNumberOfAppsChange,
            },
        },
        {
            picker: {
                title: "Y a-t-il des applications accessible par un bureau distant ?",
                value: userProjectData["appsAccessibilityInRemoteDesktop"],
                onValueChange: onAppsAccessibilityInRemoteDesktopChange,
            },
        },
        {
            picker: {
                title: "Quel est le ratio de données digitalisées ?",
                value: userProjectData["ratialsOfDigitalisedDatas"],
                onValueChange: onRatialsOfDigitalisedDatasChange,
            },
        },
        {
            picker: {
                title: "Y a-t-il des documents scannés ?",
                value: userProjectData["scanedFiles"],
                onValueChange: onScanedFilesChange,
            },
        },
    ];

    const pickerFrequencyOfProcess: IPickerParameters[] = [
        {
            pickerParameters: {
                label: "Jour",
                value: "Jour",
            },
        },
        {
            pickerParameters: {
                label: "Semaine",
                value: "Semaine",
            },
        },
        {
            pickerParameters: {
                label: "Mois",
                value: "Mois",
            },
        },
        {
            pickerParameters: {
                label: "Projet-campagne",
                value: "Projet-campagne",
            },
        },
    ];

    const pickerYesOrNo: IPickerParameters[] = [
        {
            pickerParameters: {
                label: "Oui",
                value: "Oui",
            },
        },
        {
            pickerParameters: {
                label: "Non",
                value: "Non",
            },
        },
    ];

    const pickerRatialsOfDigitalisedDatas: IPickerParameters[] = [
        {
            pickerParameters: {
                label: "10",
                value: "10",
            },
        },
        {
            pickerParameters: {
                label: "20",
                value: "20",
            },
        },
        {
            pickerParameters: {
                label: "30",
                value: "30",
            },
        },
        {
            pickerParameters: {
                label: "40",
                value: "40",
            },
        },
        {
            pickerParameters: {
                label: "50",
                value: "50",
            },
        },
        {
            pickerParameters: {
                label: "60",
                value: "60",
            },
        },
        {
            pickerParameters: {
                label: "70",
                value: "70",
            },
        },
        {
            pickerParameters: {
                label: "80",
                value: "80",
            },
        },
        {
            pickerParameters: {
                label: "90",
                value: "90",
            },
        },
        {
            pickerParameters: {
                label: "100",
                value: "100",
            },
        },
    ];

    const pickerRealisationMediumTime: IPickerRealisationMediumTime[] = [
        {
            temporality: {
                label: "Jour",
                value: "Jour",
            },
        },
        {
            temporality: {
                label: "Heure",
                value: "Heure",
            },
        },
        {
            temporality: {
                label: "Minute",
                value: "Minute",
            },
        },
        {
            temporality: {
                label: "Seconde",
                value: "Seconde",
            },
        },
    ];

    const nextStep = () => {
        scrollRef.current.scrollTo({
            x: 0,
            y: 0,
            animated: true,
        });
        setStep(4);
    };

    const prevStep = () => {
        scrollRef.current.scrollTo({
            x: 0,
            y: 0,
            animated: true,
        });
        setStep(2);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Potentiel</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.cardContainer}>
                        <View style={styles.subTitleContainer}>
                            <Text style={styles.subTitle}>Indicateurs actuels</Text>
                        </View>
                        {payoffInputs.map((input: IPayoffInput, index: number) => {
                            return (
                                <View key={index}>
                                    {index === 1 || index === 5 || (index >= 10 && index <= 12) ? (
                                        <>
                                            <Text style={styles.label}>{input.picker?.title}</Text>
                                            <Picker
                                                ref={pickerRef}
                                                style={styles.pickerContainer}
                                                selectedValue={input.picker?.value}
                                                mode="dropdown"
                                                onValueChange={input.picker?.onValueChange}
                                            >
                                                {index === 1
                                                    ? pickerFrequencyOfProcess.map(
                                                          (pickerParams: IPickerParameters, index: number) => {
                                                              return (
                                                                  <Picker.Item
                                                                      key={index}
                                                                      label={pickerParams.pickerParameters.label}
                                                                      value={pickerParams.pickerParameters.value}
                                                                      color="#ffffff"
                                                                      fontFamily="RobotoMonoRegular"
                                                                  />
                                                              );
                                                          }
                                                      )
                                                    : index === 11
                                                    ? pickerRatialsOfDigitalisedDatas.map(
                                                          (pickerParams: IPickerParameters, index: number) => {
                                                              return (
                                                                  <Picker.Item
                                                                      key={index}
                                                                      label={pickerParams.pickerParameters.label + "%"}
                                                                      value={pickerParams.pickerParameters.value}
                                                                      color="#ffffff"
                                                                      fontFamily="RobotoMonoRegular"
                                                                  />
                                                              );
                                                          }
                                                      )
                                                    : pickerYesOrNo.map(
                                                          (pickerParams: IPickerParameters, index: number) => {
                                                              return (
                                                                  <Picker.Item
                                                                      key={index}
                                                                      label={pickerParams.pickerParameters.label}
                                                                      value={pickerParams.pickerParameters.value}
                                                                      color="#ffffff"
                                                                      fontFamily="RobotoMonoRegular"
                                                                  />
                                                              );
                                                          }
                                                      )}
                                            </Picker>
                                        </>
                                    ) : index === 3 ? (
                                        <>
                                            <Text style={styles.label}>{input.multiplesInput?.simpleInput?.title}</Text>
                                            <View style={styles.realisationMediumTimeContainer}>
                                                <View style={styles.realisationMediumTimeInputContainer}>
                                                    <TextInput
                                                        style={styles.realisationMediumTimeInput}
                                                        value={input.multiplesInput?.simpleInput?.value}
                                                        onChangeText={input.multiplesInput?.simpleInput?.onValueChange}
                                                        focusable={true}
                                                        keyboardType={"decimal-pad"}
                                                    />
                                                </View>
                                                <Picker
                                                    ref={realisationMediumTimePickerRef}
                                                    style={styles.realisationMediumTimePicker}
                                                    selectedValue={input.multiplesInput?.picker?.value}
                                                    mode="dropdown"
                                                    onValueChange={input.multiplesInput?.picker?.onValueChange}
                                                >
                                                    {pickerRealisationMediumTime.map(
                                                        (pickerParams: IPickerRealisationMediumTime) => {
                                                            return (
                                                                <Picker.Item
                                                                    key={index}
                                                                    label={pickerParams.temporality.label}
                                                                    value={pickerParams.temporality.value}
                                                                    color="#ffffff"
                                                                    fontFamily="RobotoMonoRegular"
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </Picker>
                                            </View>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={styles.label}>{input.simpleInput?.title}</Text>
                                            <TextInput
                                                style={
                                                    input.simpleInput?.title !== "Commentaire"
                                                        ? styles.input
                                                        : styles.commentInput
                                                }
                                                value={input.simpleInput?.value}
                                                onChangeText={input.simpleInput?.onValueChange}
                                                focusable={true}
                                                keyboardType={
                                                    input.simpleInput?.title !== "Commentaire"
                                                        ? "decimal-pad"
                                                        : "default"
                                                }
                                                multiline={input.simpleInput?.title !== "Commentaire" ? false : true}
                                                numberOfLines={input.simpleInput?.title !== "Commentaire" ? 0 : 10}
                                            />
                                        </>
                                    )}
                                </View>
                            );
                        })}
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
            </View>
        </>
    );
};
export default PayoffComponent;

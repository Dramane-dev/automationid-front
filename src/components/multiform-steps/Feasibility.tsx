import React, { SetStateAction, useRef, MutableRefObject, useContext, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useScrollToTop } from "@react-navigation/native";
import { styles } from "../../css/components/multiform-steps/Feasability";
import Separator from "../Separator";
import { IFeasibilityInput } from "../../interfaces/multiformSteps/inputs/IFeasibilityInput";
import { multiStepContext } from "../../context/StepContext";

const FeasibilityComponent = ({ navigation, scrollRef }: any) => {
    const { setStep, userProjectData, setUserProjectData } = useContext(multiStepContext);

    const pickerRef: MutableRefObject<any> = useRef();

    const onRulesOfProcessChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            processRules: e,
        });
    };

    const onRulesCommentChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            processRulesComment: e,
        });
    };

    const onFunctionnalProcedureChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            functionnalProcedure: e,
        });
    };

    const onFunctionnalProcedureCommentChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            functionnalProcedureComment: e,
        });
    };

    const onIsDataStructuredChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            isDataStructured: e,
        });
    };

    const onIsDataStructuredCommentChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            isDataStructuredComment: e,
        });
    };

    const onProcessStabilityChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            processStability: e,
        });
    };

    const onProcessStabilityCommentChange = (e: SetStateAction<string>) => {
        setUserProjectData({
            ...userProjectData,
            processStabilityComment: e,
        });
    };

    const nextStep = () => {
        scrollRef.current.scrollTo({
            x: 0,
            y: 0,
            animated: true,
        });
        setStep(3);
    };

    const prevStep = () => {
        scrollRef.current.scrollTo({
            x: 0,
            y: 0,
            animated: true,
        });
        setStep(1);
    };

    const feasibilitys: IFeasibilityInput[] = [
        {
            picker: {
                pickerTitle: "Le processus est géré selon des règles précises et bien définies :",
                pickerValue: userProjectData["processRules"],
                onValueChange: onRulesOfProcessChange,
            },
            comment: {
                commentTitle: "Commentaire",
                commentValue: userProjectData["processRulesComment"],
                onValueChange: onRulesCommentChange,
            },
        },
        {
            picker: {
                pickerTitle: "Disposez-vous d'une procedure fonctionnelle detaillant le processus :",
                pickerValue: userProjectData["functionnalProcedure"],
                onValueChange: onFunctionnalProcedureChange,
            },
            comment: {
                commentTitle: "Commentaire",
                commentValue: userProjectData["functionnalProcedureComment"],
                onValueChange: onFunctionnalProcedureCommentChange,
            },
        },
        {
            picker: {
                pickerTitle: "La donnée est très structurée :",
                pickerValue: userProjectData["isDataStructured"],
                onValueChange: onIsDataStructuredChange,
            },
            comment: {
                commentTitle: "Commentaire",
                commentValue: userProjectData["isDataStructuredComment"],
                onValueChange: onIsDataStructuredCommentChange,
            },
        },
        {
            picker: {
                pickerTitle: "Le processus est prevu de changer dans moins de 6 mois :",
                pickerValue: userProjectData["processStability"],
                onValueChange: onProcessStabilityChange,
            },
            comment: {
                commentTitle: "Commentaire",
                commentValue: userProjectData["processStabilityComment"],
                onValueChange: onProcessStabilityCommentChange,
            },
        },
    ];

    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Faisabilité</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.cardContainer}>
                        <View style={styles.subTitleContainer}>
                            <Text style={styles.subTitle}>Régles de gestions - complexité</Text>
                        </View>
                        {feasibilitys.map((input: IFeasibilityInput, index: number) => {
                            return (
                                <View key={index}>
                                    {/* { 
                                        (index > 1) ? (
                                            <Separator color="#ffffff" />
                                        ) : (
                                            <></>
                                        )
                                    } */}
                                    {index === 2 ? (
                                        <View style={styles.subTitleContainer}>
                                            <Text style={styles.subTitle}>Type de donnée - input</Text>
                                        </View>
                                    ) : index === 3 ? (
                                        <View style={styles.subTitleContainer}>
                                            <Text style={styles.subTitle}>Stabilité du processus</Text>
                                        </View>
                                    ) : (
                                        <></>
                                    )}
                                    <Text style={styles.label}>{input.picker.pickerTitle}</Text>
                                    <Picker
                                        ref={pickerRef}
                                        style={styles.pickerContainer}
                                        selectedValue={input.picker.pickerValue}
                                        mode="dropdown"
                                        onValueChange={input.picker.onValueChange}
                                    >
                                        <Picker.Item
                                            label="Complètement d'accord"
                                            value="Complètement d'accord"
                                            color="#ffffff"
                                            fontFamily="RobotoMonoRegular"
                                            style={{ fontSize: 10 }}
                                        />
                                        <Picker.Item
                                            label="D'accord"
                                            value="D'accord"
                                            color="#ffffff"
                                            fontFamily="RobotoMonoRegular"
                                        />
                                        <Picker.Item
                                            label="Ni d'accord, ni pas d'accord"
                                            value="Ni d'accord, ni pas d'accord"
                                            color="#ffffff"
                                            fontFamily="RobotoMonoRegular"
                                        />
                                        <Picker.Item
                                            label="Pas d'accord"
                                            value="Pas d'accord"
                                            color="#ffffff"
                                            fontFamily="RobotoMonoRegular"
                                        />
                                        <Picker.Item
                                            label="Vraiment pas d'accord"
                                            value="Vraiment pas d'accord"
                                            color="#ffffff"
                                            fontFamily="RobotoMonoRegular"
                                        />
                                        <Picker.Item
                                            label="Pas d'avis"
                                            value="Pas d'avis"
                                            color="#ffffff"
                                            fontFamily="RobotoMonoRegular"
                                        />
                                    </Picker>
                                    <Text style={styles.label}>{input.comment.commentTitle}</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={input.comment.commentValue}
                                        onChangeText={input.comment.onValueChange}
                                        focusable={true}
                                        multiline={true}
                                        numberOfLines={10}
                                        maxLength={500}
                                    />
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
export default FeasibilityComponent;

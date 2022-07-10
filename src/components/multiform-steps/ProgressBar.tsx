import React from "react";
import { Text, View, ViewStyle, StyleProp } from "react-native";
import { styles } from "../../css/components/multiform-steps/ProgressBar";
import { IProgressBarItem } from "../../interfaces/multiformSteps/IProgressBarItem";

const ProgressBarComponent = (props: any) => {
    const progressBarItems: IProgressBarItem[] = [
        {
            stepNumber: "1",
            label: "Aperçu",
        },
        {
            stepNumber: "2",
            label: "Faisabilité",
        },
        {
            stepNumber: "3",
            label: "Potentiel",
        },
        {
            stepNumber: "4",
            label: "RDV",
        },
    ];

    const fillProgressBar = (step: number): StyleProp<ViewStyle> => {
        return {
            height: 2,
            width: `${25 * step}%`,
            borderWidth: 5,
            borderColor: "#92CEA8",
            borderRadius: 5,
            position: "absolute",
            top: "20%",
            left: 0,
            zIndex: -1,
        };
    };

    return (
        <View style={styles.progressBarContainer}>
            <View style={props.step < 5 ? fillProgressBar(props.step) : fillProgressBar(4)}></View>
            {progressBarItems.map((item: IProgressBarItem, index: number) => {
                return (
                    <View key={index}>
                        <View style={styles.progressBarStepContainer}>
                            <View
                                style={
                                    index + 1 === props.step || index + 1 <= props.step
                                        ? styles.checkedCirlce
                                        : styles.cirlce
                                }
                            >
                                <Text style={styles.progressBarStepNumberContent}>{item.stepNumber}</Text>
                            </View>
                            <View>
                                <Text style={styles.progressBarStepLabelContent}>{item.label}</Text>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};
export default ProgressBarComponent;

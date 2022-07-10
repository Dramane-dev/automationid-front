import React, { LegacyRef, useContext, useEffect, useRef } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../css/components/multiform-steps/MultiFormSteps";
import PreviewComponent from "../../components/multiform-steps/Preview";
import FeasibilityComponent from "../../components/multiform-steps/Feasibility";
import PayoffComponent from "../../components/multiform-steps/Payoff";
import MeetingComponent from "../../components/multiform-steps/Meeting";
import { multiStepContext } from "../../context/StepContext";
import ProgressBarComponent from "../../components/multiform-steps/ProgressBar";
import Loader from "../../components/Loader";
import { projectsContext } from "../../context/ProjectsContext";

const MultiFormStepsScreen = ({ route, navigation }: any) => {
    const { currentStep, initDefaultValues, isUpdateProject, initDefaultUpdateValues, load, setLoad } =
        useContext(multiStepContext);
    const { projectId, setProjectId } = useContext(projectsContext);
    const showStep = (step: number) => {
        switch (step) {
            case 1:
                return <PreviewComponent scrollRef={scrollRef} projectId={projectId} navigationObject={navigation} />;
                break;
            case 2:
                return <FeasibilityComponent scrollRef={scrollRef} />;
                break;
            case 3:
                return <PayoffComponent scrollRef={scrollRef} />;
                break;
            case 4:
                return <MeetingComponent scrollRef={scrollRef} navigationObject={navigation} />;
                break;
            default:
                return <PreviewComponent scrollRef={scrollRef} />;
                break;
        }
    };
    const scrollRef: LegacyRef<ScrollView> = useRef(null);

    useEffect(() => {
        setLoad(false);
        if (isUpdateProject) {
            const { project, projectId, attachments } = route.params;
            setProjectId(projectId);
            initDefaultUpdateValues(project, attachments);
        } else {
            initDefaultValues();
        }
    }, []);

    return (
        <>
            {load ? (
                <Loader />
            ) : (
                <View style={styles.globalContainer}>
                    {isUpdateProject ? (
                        <View style={styles.isUpdateCase}>
                            <ProgressBarComponent step={currentStep} />
                            <ScrollView ref={scrollRef}>
                                <KeyboardAwareScrollView>{showStep(currentStep)}</KeyboardAwareScrollView>
                            </ScrollView>
                        </View>
                    ) : (
                        <SafeAreaView>
                            <ProgressBarComponent step={currentStep} />
                            <ScrollView ref={scrollRef}>
                                <KeyboardAwareScrollView>{showStep(currentStep)}</KeyboardAwareScrollView>
                            </ScrollView>
                        </SafeAreaView>
                    )}
                </View>
            )}
        </>
    );
};
export default MultiFormStepsScreen;

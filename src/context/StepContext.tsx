import React, { Context, createContext, useContext, useState } from "react";
import { IUserCredentials } from "../interfaces/auth/IUserCredentials";
import { IResponseAttachment } from "../interfaces/projects/IResponseAttachment";
import { IResponseProject } from "../interfaces/projects/IResponseProject";
import { userContext } from "./UserContext";

export const multiStepContext: Context<any> = createContext({});

const StepContext = (props: any) => {
    const [currentStep, setStep] = useState<number>(1);
    const [userProjectData, setUserProjectData] = useState<any>([]);
    const [finalProjectData, setFinalProjectData] = useState<any>([]);
    const [isUpdateProject, setIsUpdateProject] = useState<boolean>(false);
    const [attachmentsAlreadySaved, setAttachmentsAlreadySaved] = useState<any>([]);
    const [load, setLoad] = useState<boolean>(false);
    const { currentUser } = useContext(userContext);
    let actualUser: IUserCredentials = currentUser;

    const initDefaultValues = () => {
        setUserProjectData("");
        setStep(1);
        setUserProjectData({
            ...userProjectData,
            projectName: "",
            peopleToContact: actualUser.userMail,
            businessUnit: "RH",
            automatisationMainPurpose: "Productivité",
            projectDescription: "",
            attachments: [],
            processRules: "Completement d'accord",
            processRulesComment: "",
            functionnalProcedure: "Completement d'accord",
            functionnalProcedureComment: "",
            isDataStructured: "Completement d'accord",
            isDataStructuredComment: "",
            processStability: "Completement d'accord",
            processStabilityComment: "",
            numberOfPeopleWorkToThisProcess: 0,
            frequencyOfProcess: "Jour",
            numberOfTreatments: 0,
            realisationMediumTime: "0",
            realisationMediumTimeSecondPart: "Jour",
            partOfError: "0",
            processSteps: 0,
            rulesOfDecisionToReachEndOfProcess: 0,
            numberOfApps: 0,
            peakOfActivity: "Oui",
            payOffComment: "",
            appsAccessibilityInRemoteDesktop: "Oui",
            ratialsOfDigitalisedDatas: "0",
            scanedFiles: "Oui",
        });
    };

    const initDefaultUpdateValues = (project: IResponseProject, attachments?: IResponseAttachment[]) => {
        setUserProjectData("");
        setStep(1);
        setUserProjectData({
            ...userProjectData,
            projectName: project.idName,
            peopleToContact: actualUser.userMail,
            businessUnit: project.idUnit,
            automatisationMainPurpose: project.idGoal,
            projectDescription: project.idDescript,
            attachments: [],
            processRules: project.idQ1,
            processRulesComment: project.idCom1,
            functionnalProcedure: project.idQ2,
            functionnalProcedureComment: project.idCom2,
            isDataStructured: project.idQ3,
            isDataStructuredComment: project.idCom3,
            processStability: project.idQ4,
            processStabilityComment: project.idCom4,
            numberOfPeopleWorkToThisProcess: project.idMembers,
            frequencyOfProcess: project.idFreq,
            numberOfTreatments: project.idTreats,
            realisationMediumTime: project.idDuree.split(" ")[0],
            realisationMediumTimeSecondPart: project.idDuree.split(" ")[1],
            partOfError: project.idErrPart,
            peakOfActivity: project.idPicAct,
            payOffComment: project.idPicCom,
            processSteps: project.idSteps,
            rulesOfDecisionToReachEndOfProcess: project.idRules,
            numberOfApps: project.idAppUsed,
            appsAccessibilityInRemoteDesktop: project.idRemoteApp,
            ratialsOfDigitalisedDatas: project.idDigitData,
            scanedFiles: project.idScanDocs,
            firstMeet: project.meeting1,
            secondMeet: project.meeting2,
            thirdMeet: project.meeting3,
        });
        setAttachmentsAlreadySaved(attachments);
    };

    const saveToFinalProjectData = () => {
        setFinalProjectData((finalData: any) => [userProjectData]);
    };

    const saveProject = () => {
        setUserProjectData("");
        setStep(1);
    };

    return (
        <>
            <multiStepContext.Provider
                value={{
                    currentStep,
                    setStep,
                    userProjectData,
                    setUserProjectData,
                    initDefaultValues,
                    finalProjectData,
                    setFinalProjectData,
                    saveToFinalProjectData,
                    saveProject,
                    isUpdateProject,
                    setIsUpdateProject,
                    initDefaultUpdateValues,
                    attachmentsAlreadySaved,
                    setAttachmentsAlreadySaved,
                    load,
                    setLoad,
                }}
            >
                {props.children}
            </multiStepContext.Provider>
        </>
    );
};
export default StepContext;

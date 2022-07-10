import { IResponseAttachment } from "./IResponseAttachment";

export interface IResponseProject {
    REC: number;
    ideaId: string;
    userId: string;
    userMail: string;
    idName: string;
    idUnit: string;
    idGoal: string;
    idDescript: string;
    idCreat: string;
    idScore: number;
    idQ1: string;
    idQ2: string;
    idQ3: string;
    idQ4: string;
    idCom1: undefined;
    idCom2: undefined;
    idCom3: undefined;
    idCom4: undefined;
    idAppUsed: number;
    idDigitData: number;
    idDuree: string;
    idErrPart: number;
    idFreq: string;
    idMembers: number;
    idPicAct: string;
    idPicCom: undefined;
    idRemoteApp: string;
    idRules: number;
    idScanDocs: string;
    idSteps: number;
    idTreats: number;
    meeting1: string;
    meeting2: string;
    meeting3: string;
    statusValue: string;
    fileCreat: string;
    fileId: number;
    fileName: string;
    filePath: string;
    fileType: string;
    attachments: IResponseAttachment[];
}

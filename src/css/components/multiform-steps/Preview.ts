import { StyleSheet } from "react-native";
import { currentScreenWidth, currentScreenHeight } from "../../../exports/dynamic/DynamicResolution";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "5%",
    },
    title: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 30
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 30
                : 40,
        fontWeight: "600",
        fontFamily: "RobotoMonoBold",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "center",
        width: "95%",
        marginBottom: "5%",
        borderRadius: 5,
        padding: "3%",
        backgroundColor: "#002955",
    },
    label: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "3%",
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 16
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 16
                : 18,
        fontWeight: "bold",
        color: "#ffffff",
        fontFamily: "RobotoMonoSemiBold",
    },
    input: {
        width: "90%",
        height: 40,
        marginTop: "3%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "10%",
        padding: "3%",
        color: "#000000",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        backgroundColor: "#ffffff",
        fontFamily: "RobotoMonoRegular",
    },
    textArea: {
        width: "90%",
        marginTop: "3%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "10%",
        padding: "3%",
        paddingTop: "3%",
        color: "#000000",
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "stretch",
        justifyContent: "flex-start",
        backgroundColor: "#ffffff",
        fontFamily: "RobotoMonoRegular",
    },
    missingInformationsToSimpleInput: {
        width: "90%",
        height: 40,
        marginTop: "3%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "10%",
        padding: "3%",
        color: "#000000",
        borderWidth: 2,
        borderColor: "#F79196",
        borderRadius: 5,
        backgroundColor: "#ffffff",
        fontFamily: "RobotoMonoSemiBold",
    },
    missingInformationsToTextArea: {
        width: "90%",
        marginTop: "3%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "10%",
        padding: "3%",
        paddingTop: "3%",
        color: "#000000",
        borderColor: "#F79196",
        borderWidth: 2,
        borderRadius: 5,
        alignSelf: "stretch",
        justifyContent: "flex-start",
        backgroundColor: "#ffffff",
        fontFamily: "RobotoMonoSemiBold",
    },
    missingInformationsToLabel: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "3%",
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 16
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 16
                : 18,
        fontWeight: "bold",
        color: "#F79196",
        fontFamily: "RobotoMonoSemiBold",
    },
    attachementsContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    attachementsItemsContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    attachementTitleAndDeleteButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "99%",
        marginTop: "2%",
        marginBottom: "10%",
    },
    attachmentSubTitleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "5%",
        borderWidth: 5,
        borderColor: "#F28809",
        backgroundColor: "#F28809",
        borderRadius: 5,
    },
    attachmentSubTitle: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 20,
        fontWeight: "500",
        color: "#ffffff",
        fontFamily: "RobotoMonoSemiBold",
    },
    attachementName: {
        width: "90%",
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "bold",
        color: "#ffffff",
        fontFamily: "RobotoMonoSemiBold",
    },
    noAttachementTitleAndDeleteButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: "5%",
        marginBottom: "10%",
        alignItems: "center",
    },
    noAttachmentsSelected: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        opacity: 0.6,
        fontFamily: "RobotoMonoSemiBold",
    },
    deleteAttachementButtonContainer: {
        width: 30,
        height: 30,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 30,
        backgroundColor: "#fe6b64",
    },
    icon: {
        marginTop: "10%",
        alignSelf: "center",
    },
    addAttachementButtonContainer: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2%",
        borderRadius: 5,
        backgroundColor: "#F28809",
    },
    addAttachementButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "800",
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "RobotoMonoBold",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginBottom: "30%",
        marginTop: "5%",
    },
    nextButtonContainer: {
        width:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 130
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 150
                : 150,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2%",
        borderColor: "#002955",
        borderRadius: 5,
        backgroundColor: "#002955",
    },
    prevButtonContainer: {
        width:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 130
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 150
                : 150,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2%",
        borderColor: "#002955",
        borderRadius: 5,
        backgroundColor: "#F28809",
    },
    nextButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "800",
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "RobotoMonoSemiBold",
    },
    prevButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "800",
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "RobotoMonoSemiBold",
    },
});

import { StyleSheet } from "react-native";
import { currentScreenWidth, currentScreenHeight } from "../../../exports/dynamic/DynamicResolution";

export const styles = StyleSheet.create({
    globalContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "5%",
        marginTop: "5%",
        alignItems: "center",
        marginBottom: "30%",
        backgroundColor: "#ffffff",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "2%",
        marginBottom: "1%",
    },
    buttonContainer: {
        width:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? "45%"
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? "45%"
                : "47%",
        padding: "2%",
        borderColor: "#002955",
        backgroundColor: "#002955",
        borderRadius: 5,
        alignItems: "center",
    },
    buttonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 12
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 17,
        fontWeight: "800",
        color: "#ffffff",
        fontFamily: "RobotoMonoBold",
    },
    addIdeaButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#002955",
        width: "30%",
        padding: "2%",
        marginBottom: "2%",
        borderWidth: 5,
        borderColor: "#002955",
        borderRadius: 5,
        alignItems: "center",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    subTitleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    subTitle: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : 20,
        fontWeight: "500",
        color: "#000000",
        fontFamily: "RobotoMonoBold",
    },
    cardFirstAndSecondSectionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "2%",
        width: "100%",
        borderRadius: 5,
    },
    cardFirstSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        padding: "2%",
    },
    cardSecondSection: {
        display: "flex",
        flexDirection: "column",
        maxHeight: "30%",
        width: "10%",
    },
    cardThirdSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "95%",
    },
    cardThirdSectionAllProjects: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        marginBottom: "3%",
    },
    cardTitleContainer: {
        display: "flex",
        flexDirection: "row",
        width: "90%",
        marginBottom: "5%",
    },
    cardTitle: {
        padding: "1%",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#ffffff",
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : currentScreenWidth <= 414 && currentScreenHeight <= 736
                ? 22
                : currentScreenWidth <= 375 && currentScreenHeight <= 812
                ? 22
                : currentScreenWidth <= 414 && currentScreenHeight <= 896
                ? 22
                : 22,
        fontWeight: "600",
        color: "#ffffff",
        fontFamily: "RobotoMonoBold",
    },
    cardInformationsContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginBottom: "2%",
    },
    cardInformationsContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 15,
        fontWeight: "600",
        color: "#ffffff",
        fontFamily: "RobotoMonoRegular",
    },
    noProjectFound: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontFamily: "RobotoMonoRegular",
    },
    viewAllButtonContainer: {
        display: "flex",
        flexDirection: "column",
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#ffffff",
        marginBottom: "30%",
    },
    viewAllButtonContent: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000000",
        fontFamily: "RobotoMonoSemiBold",
    },
    updateButtonContainer: {
        display: "flex",
        flexDirection: "column",
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#ffffff",
    },
    updateButtonContent: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000000",
    },
    statusContainer: {
        display: "flex",
        flexDirection: "row",
        width: "50%",
        alignItems: "center",
        borderRadius: 2,
        marginRight: "15%",
    },
    statusContainerProjectSend: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        borderRadius: 2,
    },
    statusContent: {
        textAlign: "left",
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "600",
        color: "#ffffff",
        fontFamily: "RobotoMonoSemiBold",
    },
    sendButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "40%",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 5,
    },
    sendButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "600",
        color: "#000000",
    },
    icons: {
        textAlign: "center",
    },
    separator: {
        borderWidth: 1,
        borderColor: "#000000",
    },
});

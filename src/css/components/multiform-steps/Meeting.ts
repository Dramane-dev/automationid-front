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
    subTitleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "10%",
        borderWidth: 5,
        borderColor: "#F28809",
        backgroundColor: "#F28809",
        borderRadius: 5,
    },
    subTitle: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "500",
        color: "#ffffff",
        fontFamily: "RobotoMonoBold",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    calendar: {
        marginBottom: "5%",
    },
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "center",
        width: "100%",
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
    selectHourContainer: {
        marginTop: "5%",
    },
    modalContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: "3%",
        shadowOpacity: 0.2,
        backgroundColor: "rgba(52, 52, 52, 0.2)",
    },
    modalView: {
        margin: "5%",
        backgroundColor: "white",
        borderRadius: 5,
        padding: "5%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        color: "#000000",
        fontWeight: "700",
        textAlign: "center",
    },
    modalButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "10%",
        padding: "3%",
    },
    sendModalButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "45%",
        borderRadius: 5,
        backgroundColor: "#B3E1CE",
        padding: "3%",
        marginRight: "5%",
    },
    cancelModalButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "45%",
        borderRadius: 5,
        backgroundColor: "#F79196",
        padding: "3%",
        marginLeft: "5%",
    },
    modalButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 12
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        color: "#ffffff",
        fontWeight: "700",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginBottom:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? "30%"
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? "30%"
                : "30%",
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

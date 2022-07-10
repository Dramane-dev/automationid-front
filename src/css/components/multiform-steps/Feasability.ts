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
                ? 12
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
                ? 12
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 16
                : 18,
        fontWeight: "bold",
        color: "#ffffff",
        fontFamily: "RobotoMonoSemiBold",
    },
    input: {
        width: "90%",
        height: 90,
        marginTop: "3%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "10%",
        alignSelf: "stretch",
        justifyContent: "flex-start",
        padding: "2%",
        color: "#000000",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        backgroundColor: "#ffffff",
        fontFamily: "RobotoMonoRegular",
    },
    pickerContainer: {
        width: "80%",
        alignSelf: "center",
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

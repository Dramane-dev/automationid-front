import { StyleSheet } from "react-native";
import { currentScreenWidth, currentScreenHeight } from "../../exports/dynamic/DynamicResolution";

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
        padding: 20,
        alignItems: "center",
        marginTop:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? "20%"
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? "20%"
                : "40%",
        marginBottom: "auto",
        backgroundColor: "#ffffff",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "20%",
    },
    title: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 22
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 22
                : currentScreenWidth <= 414 && currentScreenHeight <= 736
                ? 22
                : 25,
        fontWeight: "600",
        fontFamily: "RobotoMonoBold",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: "20%",
    },
    label: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: 10,
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : 20,
        fontWeight: "bold",
        fontFamily: "RobotoMonoBold",
    },
    input: {
        width: "90%",
        height: 40,
        marginTop: "2%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "5%",
        padding: "2%",
        color: "#000000",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        fontFamily: "RobotoMonoRegular",
    },
    verifyMailButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "20%",
    },
    verifyButton: {
        width: "80%",
        padding: "3%",
        borderColor: "#727EBB",
        backgroundColor: "#727EBB",
        borderRadius: 5,
        alignItems: "center",
    },
    verifyButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : 20,
        fontWeight: "800",
        color: "#ffffff",
        fontFamily: "RobotoMonoBold",
    },
});

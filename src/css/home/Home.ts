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
        justifyContent: "space-evenly",
        padding: "5%",
        marginTop: "5%",
        alignItems: "center",
        marginBottom: "auto",
        backgroundColor: "#ffffff",
    },
    imageContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    buImgContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "10%",
    },
    buTextContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "90%",
        marginLeft: "2%",
        padding: "2%",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: 5,
        position: "absolute",
        bottom: 0,
    },
    imgTitleContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : 20,
        fontFamily: "RobotoMonoBold",
        color: "#F0DE8A",
        marginBottom: "2%",
    },
    imgTextContent: {
        width: "100%",
        textAlign: "left",
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 10
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 10
                : 12,
        fontFamily: "RobotoMonoBold",
        color: "#ffffff",
    },
    buAutomationImg: {
        alignSelf: "center",
    },
    lowCodeImgContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "10%",
    },
    lowCodeTextContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "90%",
        marginLeft: "2%",
        padding: "2%",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderRadius: 5,
        position: "absolute",
        bottom: 0,
    },
    lowCodeAutomationImg: {
        alignSelf: "center",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        marginBottom: "20%",
    },
    title: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 25
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 25
                : 30,
        fontWeight: "600",
        fontFamily: "RobotoMonoBold",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        padding: "3%",
        borderColor: "#043C7C",
        backgroundColor: "#043C7C",
        borderRadius: 5,
        alignItems: "center",
    },
    buttonContent: {
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

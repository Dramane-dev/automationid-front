import { StyleSheet } from "react-native";
import { currentScreenWidth, currentScreenHeight } from "../../../exports/dynamic/DynamicResolution";

export const styles = StyleSheet.create({
    progressBarContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: "100%",
        width: "95%",
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
    },
    progressBarStepContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    cirlce: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontWeight: "600",
        borderWidth: 3,
        borderColor: "#000000",
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: "#ffffff",
    },
    progressBarStepNumberContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "700",
        fontFamily: "RobotoMonoBold",
    },
    progressBarStepLabelContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "600",
        fontFamily: "RobotoMonoBold",
    },
    checkedCirlce: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontWeight: "600",
        borderWidth: 3,
        borderColor: "#92CEA8",
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: "#92CEA8",
    },
});

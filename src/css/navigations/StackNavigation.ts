import { StyleSheet } from "react-native";
import { currentScreenWidth, currentScreenHeight } from "../../exports/dynamic/DynamicResolution";

export const styles = StyleSheet.create({
    backButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "-5%",
    },
    backButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 20,
        color: "#002955",
        fontWeight: "600",
        fontFamily: "RobotoMonoSemiBold",
    },
    icon: {
        marginRight: "5%",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "column",
    },
    newIdeaButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderWidth: 5,
        borderColor: "#002955",
        borderRadius: 5,
        backgroundColor: "#002955",
    },
    newIdeaButtonContent: {
        color: "#ffffff",
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontFamily: "RobotoMonoSemiBold",
    },
});

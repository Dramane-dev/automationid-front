import { StyleSheet } from "react-native";
import { currentScreenWidth, currentScreenHeight } from "../../../exports/dynamic/DynamicResolution";

export const popupStyles = StyleSheet.create({
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
        fontFamily: "RobotoMonoBold",
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
                : 17,
        color: "#ffffff",
        fontWeight: "700",
        fontFamily: "RobotoMonoBold",
    },
});

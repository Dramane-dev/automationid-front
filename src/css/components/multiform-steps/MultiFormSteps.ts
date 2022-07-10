import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    globalContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
    },
    isUpdateCase: {
        marginTop: "2%",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 90,
    },
    nextButtonContainer: {
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 10,
        borderWidth: 5,
        borderColor: "#002955",
        borderRadius: 5,
        backgroundColor: "#002955",
    },
    prevButtonContainer: {
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 10,
        borderWidth: 5,
        borderColor: "#002955",
        borderRadius: 5,
        backgroundColor: "#ffffff",
    },
    nextButtonContent: {
        fontSize: 20,
        fontWeight: "800",
        color: "#ffffff",
        textAlign: "center",
    },
    prevButtonContent: {
        fontSize: 20,
        fontWeight: "800",
        color: "#000000",
        textAlign: "center",
    },
});

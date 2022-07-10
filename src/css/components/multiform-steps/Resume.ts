import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "10%",
    },
    title: {
        fontSize: 30,
        fontWeight: "600",
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 90,
        marginTop: 20,
    },
    backButtonContainer: {
        width: 150,
        marginRight: "5%",
        alignSelf: "center",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#000000",
    },
    saveButtonContainer: {
        width: 150,
        alignSelf: "center",
        marginLeft: "5%",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#F8B392",
    },
    backButtonContent: {
        fontSize: 20,
        fontWeight: "800",
        color: "#ffffff",
        textAlign: "center",
    },
    saveButtonContent: {
        fontSize: 20,
        fontWeight: "800",
        color: "#000000",
        textAlign: "center",
    },
});

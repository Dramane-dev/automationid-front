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
        justifyContent: "center",
        padding: "5%",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        marginBottom: "5%",
    },
    title: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 25
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 25
                : currentScreenWidth <= 414 && currentScreenHeight <= 736
                ? 30
                : currentScreenWidth <= 375 && currentScreenHeight <= 812
                ? 30
                : currentScreenWidth <= 375 && currentScreenHeight <= 812
                ? 30
                : currentScreenWidth <= 414 && currentScreenHeight <= 896
                ? 30
                : 30,
        fontWeight: "bold",
        fontFamily: "RobotoMonoBold",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        padding: "5%",
    },
    label: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "2%",
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : currentScreenWidth <= 414 && currentScreenHeight <= 736
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 812
                ? 20
                : currentScreenWidth <= 414 && currentScreenHeight <= 896
                ? 20
                : 20,
        fontWeight: "bold",
        fontFamily: "RobotoMonoSemiBold",
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
    signupButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "5%",
    },
    submitButton: {
        width: "80%",
        padding: "3%",
        backgroundColor: "#DFC39D",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: "10%",
    },
    signoutButton: {
        width: "80%",
        padding: "3%",
        backgroundColor: "#D86E70",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: "10%",
    },
    signupButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : currentScreenWidth <= 414 && currentScreenHeight <= 736
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 812
                ? 20
                : currentScreenWidth <= 414 && currentScreenHeight <= 896
                ? 20
                : 20,
        fontWeight: "800",
        color: "#ffffff",
        fontFamily: "RobotoMonoSemiBold",
    },
});

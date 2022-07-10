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
        padding: "5%",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    appNameContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "5%",
    },
    appName: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : 30,
        fontWeight: "bold",
        fontFamily: "RobotoMonoBold",
    },
    imageContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },
    image: {
        maxWidth: "20%",
        height: 60,
        alignSelf: "center",
    },
    icon: {
        marginTop: "5%",
        alignSelf: "center",
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
                : 30,
        fontWeight: "bold",
        fontFamily: "RobotoMonoBold",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: "10%",
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
                ? 20
                : currentScreenWidth <= 375 && currentScreenHeight <= 812
                ? 20
                : currentScreenWidth <= 414 && currentScreenHeight <= 896
                ? 18
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
    signinButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "5%",
    },
    siginButton: {
        width: "80%",
        padding: "3%",
        borderColor: "#727EBB",
        backgroundColor: "#727EBB",
        borderRadius: 5,
        alignItems: "center",
    },
    signinButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 18
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : currentScreenWidth <= 414 && currentScreenHeight <= 736
                ? 20
                : currentScreenWidth <= 375 && currentScreenHeight <= 812
                ? 20
                : currentScreenWidth <= 414 && currentScreenHeight <= 896
                ? 18
                : 20,
        fontWeight: "800",
        color: "#ffffff",
        fontFamily: "RobotoMonoSemiBold",
    },
    notHaveAlreadyAnAccountContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "10%",
    },
    notHaveAlreadyAnAccountText: {
        textAlign: "center",
        fontSize: 15,
        fontFamily: "RobotoMonoRegular",
    },
    signupLink: {
        fontWeight: "700",
        fontSize: 20,
        margin: "10%",
        color: "#7DCAAD",
        fontFamily: "RobotoMonoSemiBold",
    },
});

import { StyleSheet } from "react-native";
import { currentScreenWidth, currentScreenHeight } from "../../../exports/dynamic/DynamicResolution";

export const styles = StyleSheet.create({
    globalContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
    },
    container: {
        padding: "2%",
    },
    headerSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
        marginBottom: "5%",
        borderWidth: 2,
        borderRadius: 10,
    },
    projectTitleContainer: {
        marginBottom: "5%",
    },
    projectTitle: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 25
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 25
                : 30,
        fontFamily: "RobotoMonoBold",
    },
    headerSubSection: {
        display: "flex",
        flexDirection:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? "column"
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? "row"
                : "row",
        justifyContent:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? "center"
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? "space-between"
                : "space-between",
        width: "100%",
        alignItems: "center",
    },
    projectId: {
        fontFamily: "RobotoMonoBold",
        marginRight: "5%",
    },
    projectDateOfCreation: {
        fontFamily: "RobotoMonoBold",
        marginLeft: "5%",
    },
    previewSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "#E6E6E6",
        marginBottom: "5%",
    },
    displayInRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginBottom: "5%",
        padding: "5%",
    },
    itemTitle: {
        marginBottom: "5%",
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 18
                : 20,
        fontWeight: "700",
        textAlign: "center",
        color: "#000000",
        fontFamily: "RobotoMonoBold",
    },
    item: {
        textAlign: "center",
        marginTop: "auto",
        fontFamily: "RobotoMonoRegular",
    },
    previewDisplayInRowUnitContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        margin: "2%",
        width: "50%",
        height: 50,
    },
    previewDisplayInRowGoalContainer: {
        display: "flex",
        flexDirection: "column",
        margin: "2%",
        width: "50%",
        height: 50,
    },
    notAttachmentsComment: {
        color: "#666666",
        fontFamily: "RobotoMonoRegular",
    },
    title: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 20
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 22
                : 25,
        fontWeight: "600",
        color: "#ffffff",
        fontFamily: "RobotoMonoBold",
    },
    displayInColumn: {
        display: "flex",
        flexDirection: "column",
    },
    attachmentContainer: {
        display: "flex",
        flexDirection: "column",
        margin: "5%",
        padding: "3%",
    },
    feasibilitySection: {
        borderRadius: 5,
        backgroundColor: "#E6E6E6",
        marginBottom: "5%",
    },
    feasibilitySectionTitle: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 20
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 22
                : 25,
        fontWeight: "600",
        color: "#ffffff",
        fontFamily: "RobotoMonoBold",
    },
    feasibilityFirstDisplayInColumn: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    feasibilityFirstItemsTitles: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "600",
        textAlign: "left",
        marginBottom: "2%",
        fontFamily: "RobotoMonoBold",
    },
    feasibilityFirstItemsContents: {
        textAlign: "left",
        marginBottom: "2%",
        fontFamily: "RobotoMonoRegular",
    },
    feasibilitySecondDisplayInColumn: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    feasibilitySecondItemsTitles: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "600",
        textAlign: "left",
        marginBottom: "2%",
        fontFamily: "RobotoMonoBold",
    },
    feasibilitySecondItemsContents: {
        textAlign: "left",
        marginBottom: "2%",
        fontFamily: "RobotoMonoRegular",
    },
    processRulesContainer: {
        margin: "3%",
    },
    isDataStructuredContainer: {
        margin: "3%",
    },
    functionnalProcedureContainer: {
        margin: "3%",
    },
    processStabilityContainer: {
        margin: "3%",
    },
    notComment: {
        color: "#A7A6A5",
        fontFamily: "RobotoMonoRegular",
    },
    payoffSection: {
        borderRadius: 5,
        backgroundColor: "#E6E6E6",
        marginBottom: "5%",
    },
    payoffFirstDisplayInColumn: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "3%",
    },
    payoffFirstItemsTitles: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "600",
        textAlign: "left",
        marginBottom: "2%",
        fontFamily: "RobotoMonoBold",
    },
    payoffFirstItemsContents: {
        textAlign: "left",
        marginBottom: "2%",
        fontFamily: "RobotoMonoRegular",
    },
    payoffSecondDisplayInColumn: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "3%",
    },
    payoffSecondItemsTitles: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "600",
        textAlign: "left",
        marginBottom: "2%",
        fontFamily: "RobotoMonoBold",
    },
    payoffSecondItemsContents: {
        textAlign: "left",
        marginBottom: "2%",
        fontFamily: "RobotoMonoRegular",
    },
    notPicOfActivityComment: {
        color: "#666666",
        fontFamily: "RobotoMonoRegular",
    },
    meetingsSection: {
        borderRadius: 5,
        backgroundColor: "#E6E6E6",
        marginBottom: "5%",
    },
    meetTitleSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "2%",
        marginBottom: "2%",
        margin: "3%",
    },
    meetTitleContents: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 18,
        fontWeight: "700",
        fontFamily: "RobotoMonoBold",
    },
    displayMeetInRow: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "5%",
    },
    displayMeetInColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "5%",
    },
    firstMeetSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        marginBottom: "2%",
        marginTop: "2%",
        borderWidth: 2,
        borderColor: "#ffffff",
        borderRadius: 5,
        padding: "2%",
    },
    secondMeetSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        marginBottom: "2%",
        marginTop: "2%",
        borderWidth: 2,
        borderColor: "#ffffff",
        borderRadius: 5,
        padding: "2%",
    },
    thirdMeetSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        marginBottom: "2%",
        marginTop: "2%",
        borderWidth: 2,
        borderColor: "#ffffff",
        borderRadius: 5,
        padding: "2%",
    },
    meetsContents: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 17,
        fontWeight: "600",
        marginBottom: "5%",
        fontFamily: "RobotoMonoBold",
    },
    meetsDateContents: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000000",
        fontFamily: "RobotoMonoRegular",
    },
    actionsSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? "5%"
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? "5%"
                : "10%",
    },
    updateButton: {
        width: "45%",
        padding: "2%",
        backgroundColor: "#DFC39D",
        borderRadius: 5,
        alignItems: "center",
    },
    abandonedButton: {
        width: "45%",
        padding: "2%",
        backgroundColor: "#D86E70",
        borderRadius: 5,
        alignItems: "center",
    },
    updateButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 20,
        fontWeight: "800",
        color: "#ffffff",
        fontFamily: "RobotoMonoBold",
    },
    abandonedButtonContent: {
        fontSize:
            currentScreenWidth <= 320 && currentScreenHeight <= 568
                ? 15
                : currentScreenWidth <= 375 && currentScreenHeight <= 667
                ? 15
                : 20,
        fontWeight: "800",
        color: "#ffffff",
        fontFamily: "RobotoMonoBold",
    },
});

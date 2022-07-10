import React, { useState, useCallback, useMemo, useContext } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { styles } from "../../css/components/multiform-steps/Meeting";
import { Calendar, CalendarProps } from "react-native-calendars";
import { TimePicker, ValueMap } from "react-native-simple-time-picker";
import moment from "moment";
import testID from "../../exports/calendar/testID";
import { multiStepContext } from "../../context/StepContext";
import { IMeetingInput } from "../../interfaces/multiformSteps/inputs/IMeetingInput";
import { IFinalProjectData } from "../../interfaces/multiformSteps/data/IFinalProjectData";
import { ProjectService } from "../../services/project/Project.service";
import { projectsContext } from "../../context/ProjectsContext";
import { IAttachment } from "../../interfaces/multiformSteps/data/IAttachment";
import { NotificationService } from "../../services/notifications/Notification.service";
import { notificationTimeout } from "../../exports/notifications/notificationTimeout";
import { userContext } from "../../context/UserContext";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { appRouting } from "../../exports/navigation/app.routing";
import PopupComponent from "../popup/Popup";

const MeetingComponent = ({ navigationObject, scrollRef }: any) => {
    const { setStep, userProjectData, setUserProjectData, isUpdateProject, setIsUpdateProject, setLoad, saveProject } =
        useContext(multiStepContext);
    const { projectId } = useContext(projectsContext);
    const { currentUser } = useContext(userContext);
    let actualUser: IUserCredentials = currentUser;
    const INITIAL_DATE: string = moment().format("YYYY-MM-DD");
    const updateDates: string[] = isUpdateProject
        ? [
              moment
                  .utc(userProjectData["firstMeet"])
                  .format("YYYY-MM-DD HH:mm:ss")
                  .replace(/[-]/gi, " ")
                  .split(" ")
                  .slice(0, 3)
                  .join(" "),
              moment
                  .utc(userProjectData["secondMeet"])
                  .format("YYYY-MM-DD HH:mm:ss")
                  .replace(/[-]/gi, " ")
                  .split(" ")
                  .slice(0, 3)
                  .join(" "),
              moment
                  .utc(userProjectData["thirdMeet"])
                  .format("YYYY-MM-DD HH:mm:ss")
                  .replace(/[-]/gi, " ")
                  .split(" ")
                  .slice(0, 3)
                  .join(" "),
          ]
        : [];
    const updateHours: string[] = isUpdateProject
        ? [
              moment
                  .utc(userProjectData["firstMeet"])
                  .format("DD-MM-YYYY HH:mm:ss")
                  .replace(/[-]/gi, " ")
                  .split(" ")
                  .slice(3)
                  .join(" "),
              moment
                  .utc(userProjectData["secondMeet"])
                  .format("DD-MM-YYYY HH:mm:ss")
                  .replace(/[-]/gi, " ")
                  .split(" ")
                  .slice(3)
                  .join(" "),
              moment
                  .utc(userProjectData["thirdMeet"])
                  .format("DD-MM-YYYY HH:mm:ss")
                  .replace(/[-]/gi, " ")
                  .split(" ")
                  .slice(3)
                  .join(" "),
          ]
        : [];
    const [firstSelected, setFirstSelected] = useState<string>(
        isUpdateProject ? updateDates[0].replaceAll(" ", "-") : INITIAL_DATE
    );
    const [secondSelected, setSecondSelected] = useState<string>(
        isUpdateProject ? updateDates[1].replaceAll(" ", "-") : INITIAL_DATE
    );
    const [thirdSelected, setThirdSelected] = useState<string>(
        isUpdateProject ? updateDates[2].replaceAll(" ", "-") : INITIAL_DATE
    );
    const [firstMeetHour, setFirstMeetHour] = useState<ValueMap>({
        hours: isUpdateProject ? parseInt(updateHours[0].split(":")[0]) : 8,
        minutes: isUpdateProject ? parseInt(updateHours[0].split(":")[1]) : 0,
        seconds: isUpdateProject ? parseInt(updateHours[0].split(":")[2]) : 0,
    });
    const [secondMeetHour, setSecondMeetHour] = useState<ValueMap>({
        hours: isUpdateProject ? parseInt(updateHours[1].split(":")[0]) : 8,
        minutes: isUpdateProject ? parseInt(updateHours[1].split(":")[1]) : 0,
        seconds: isUpdateProject ? parseInt(updateHours[1].split(":")[2]) : 0,
    });
    const [thirdMeetHour, setThirdMeetHour] = useState<ValueMap>({
        hours: isUpdateProject ? parseInt(updateHours[2].split(":")[0]) : 8,
        minutes: isUpdateProject ? parseInt(updateHours[2].split(":")[1]) : 0,
        seconds: isUpdateProject ? parseInt(updateHours[2].split(":")[2]) : 0,
    });
    const onDayPressOnFirstCalendar: CalendarProps["onDayPress"] = useCallback((day) => {
        setFirstSelected(day.dateString);
    }, []);
    const firstMarked = useMemo(() => {
        return {
            [firstSelected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "#FFB65E",
            },
        };
    }, [firstSelected]);
    const onDayPressOnSecondCalendar: CalendarProps["onDayPress"] = useCallback((day) => {
        setSecondSelected(day.dateString);
    }, []);
    const secondMarked = useMemo(() => {
        return {
            [secondSelected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "#FFB65E",
            },
        };
    }, [secondSelected]);
    const onDayPressOnThirdCalendar: CalendarProps["onDayPress"] = useCallback((day) => {
        setThirdSelected(day.dateString);
    }, []);
    const thirdMarked = useMemo(() => {
        return {
            [thirdSelected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "#FFB65E",
            },
        };
    }, [thirdSelected]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onFirstMeetHoursChange = (hour: ValueMap) => {
        setFirstMeetHour(hour);
    };

    const onSecondMeetHoursChange = (hour: ValueMap) => {
        setSecondMeetHour(hour);
    };

    const onThirdMeetHoursChange = (hour: ValueMap) => {
        setThirdMeetHour(hour);
    };

    const uploadAttachments = (attachments: IAttachment[]): FormData => {
        const formData = new FormData();
        if (attachments) {
            attachments.map((attachment: IAttachment) => {
                formData.append("attachments", attachment as any);
            });
        }
        return formData;
    };

    const onSubmit = () => {
        // if (isUpdateProject) {
        //     // console.log(`FIRST MEET HOUR DATE SELECTED : ${firstSelected} ${String(firstMeetHour.hours).padStart(2, "0")}:${String(firstMeetHour.minutes).padStart(2, "0")}:${String(firstMeetHour.seconds).padStart(2, "0")}`);
        //     // console.log(`FIRST SELECTED DATE : ${firstSelected} ${updateHours[0]}`);
        //     // console.log(`FORMATED DATE ${firstSelected} ${String(firstMeetHour.hours).padStart(2, "0")}:${String(firstMeetHour.minutes).padStart(2, "0")}:${String(firstMeetHour.seconds).padStart(2, "0")}`);

        //     let isSameFirstMeet: boolean = `
        //         ${firstSelected} ${String(firstMeetHour.hours).padStart(2, "0")}:${String(firstMeetHour.minutes).padStart(2, "0")}:${String(firstMeetHour.seconds).padStart(2, "0")}
        //     ` === `
        //         ${firstSelected} ${updateHours[0]}
        //     `;
        //     let isSameSecondMeet: boolean = `
        //         ${secondSelected} ${String(secondMeetHour.hours).padStart(2, "0")}:${String(secondMeetHour.minutes).padStart(2, "0")}:${String(secondMeetHour.seconds).padStart(2, "0")}
        //     ` === `
        //         ${secondSelected} ${updateHours[1]}
        //     `;
        //     let isSameThirdMeet: boolean = `
        //         ${thirdSelected} ${String(thirdMeetHour.hours).padStart(2, "0")}:${String(thirdMeetHour.minutes).padStart(2, "0")}:${String(thirdMeetHour.seconds).padStart(2, "0")}
        //     ` === `
        //         ${thirdSelected} ${updateHours[2]}
        //     `;
        //     setUserProjectData({
        //         ...userProjectData,
        //         firstMeet: !isSameFirstMeet ? `${String(firstMeetHour.hours).padStart(2, "0")}:${String(firstMeetHour.minutes).padStart(2, "0")}:${String(firstMeetHour.seconds).padStart(2, "0")}` : `${firstSelected} ${updateHours[0]}`,
        //         secondMeet: !isSameSecondMeet ? `${String(secondMeetHour.hours).padStart(2, "0")}:${String(secondMeetHour.minutes).padStart(2, "0")}:${String(secondMeetHour.seconds).padStart(2, "0")}` : `${secondSelected} ${updateHours[1]}`,
        //         thirdMeet: !isSameThirdMeet ? ` ${String(thirdMeetHour.hours).padStart(2, "0")}:${String(thirdMeetHour.minutes).padStart(2, "0")}:${String(thirdMeetHour.seconds).padStart(2, "0")}` : `${thirdSelected} ${updateHours[2]}`,
        //     });

        //     // setUserProjectData({
        //     //     ...userProjectData,
        //     //     firstMeet: `${firstSelected} ${updateHours[0]}`,
        //     //     secondMeet: `${secondSelected} ${updateHours[1]}`,
        //     //     thirdMeet: `${thirdSelected} ${updateHours[2]}`,
        //     // });
        // } else {
        //     setUserProjectData({
        //         ...userProjectData,
        //         firstMeet:`${firstSelected} ${String(firstMeetHour.hours).padStart(2, "0")}:${String(firstMeetHour.minutes).padStart(2, "0")}:${String(firstMeetHour.seconds).padStart(2, "0")}`,
        //         secondMeet:`${secondSelected} ${String(secondMeetHour.hours).padStart(2, "0")}:${String(secondMeetHour.minutes).padStart(2, "0")}:${String(secondMeetHour.seconds).padStart(2, "0")}`,
        //         thirdMeet:`${thirdSelected} ${String(thirdMeetHour.hours).padStart(2, "0")}:${String(thirdMeetHour.minutes).padStart(2, "0")}:${String(thirdMeetHour.seconds).padStart(2, "0")}`
        //     });
        // }

        // scrollRef.current.scrollTo({
        //     x: 0,
        //     y: 0,
        //     animated: true,
        // });
        // setStep(5);
        setLoad(true);
        let project: IFinalProjectData = userProjectData;
        let attachments: FormData = uploadAttachments(project.attachments);

        if (isUpdateProject) {
            ProjectService.update(projectId, project, attachments, actualUser.userId as string, actualUser)
                .then((res) => {
                    setLoad(false);
                    setIsUpdateProject(false);
                    NotificationService.success(
                        "success",
                        "Mise à jour d'une idée",
                        "Votre idée à bien été mise à jour"
                    );
                    notificationTimeout(saveProject, () => navigateTo(appRouting.ideas));
                })
                .catch((error) => {
                    setLoad(false);
                    NotificationService.failed("error", "Mise à jour d'une idée échoué", error);
                });
        } else {
            ProjectService.create(project, attachments, actualUser.userId as string, actualUser)
                .then((res) => {
                    setLoad(false);
                    setIsUpdateProject(false);
                    NotificationService.success("success", "Création d'une idée", "Votre idée à bien été sauvegardé");
                    notificationTimeout(saveProject, () => navigateTo(appRouting.ideas));
                })
                .catch((error) => {
                    setLoad(false);
                    NotificationService.failed("error", "Création d'un projet échoué", error);
                });
        }
    };

    const showPopup = () => {
        if (isUpdateProject) {
            let isSameFirstMeet: boolean =
                `
                ${firstSelected} ${String(firstMeetHour.hours).padStart(2, "0")}:${String(
                    firstMeetHour.minutes
                ).padStart(2, "0")}:${String(firstMeetHour.seconds).padStart(2, "0")}
            ` ===
                `
                ${firstSelected} ${updateHours[0]}
            `;
            let isSameSecondMeet: boolean =
                `
                ${secondSelected} ${String(secondMeetHour.hours).padStart(2, "0")}:${String(
                    secondMeetHour.minutes
                ).padStart(2, "0")}:${String(secondMeetHour.seconds).padStart(2, "0")}
            ` ===
                `
                ${secondSelected} ${updateHours[1]}
            `;
            let isSameThirdMeet: boolean =
                `
                ${thirdSelected} ${String(thirdMeetHour.hours).padStart(2, "0")}:${String(
                    thirdMeetHour.minutes
                ).padStart(2, "0")}:${String(thirdMeetHour.seconds).padStart(2, "0")}
            ` ===
                `
                ${thirdSelected} ${updateHours[2]}
            `;

            setUserProjectData({
                ...userProjectData,
                firstMeet: !isSameFirstMeet
                    ? `${firstSelected} ${String(firstMeetHour.hours).padStart(2, "0")}:${String(
                          firstMeetHour.minutes
                      ).padStart(2, "0")}:${String(firstMeetHour.seconds).padStart(2, "0")}`
                    : `${firstSelected} ${updateHours[0]}`,
                secondMeet: !isSameSecondMeet
                    ? `${secondSelected} ${String(secondMeetHour.hours).padStart(2, "0")}:${String(
                          secondMeetHour.minutes
                      ).padStart(2, "0")}:${String(secondMeetHour.seconds).padStart(2, "0")}`
                    : `${secondSelected} ${updateHours[1]}`,
                thirdMeet: !isSameThirdMeet
                    ? `${thirdSelected} ${String(thirdMeetHour.hours).padStart(2, "0")}:${String(
                          thirdMeetHour.minutes
                      ).padStart(2, "0")}:${String(thirdMeetHour.seconds).padStart(2, "0")}`
                    : `${thirdSelected} ${updateHours[2]}`,
            });
        } else {
            setUserProjectData({
                ...userProjectData,
                firstMeet: `${firstSelected} ${String(firstMeetHour.hours).padStart(2, "0")}:${String(
                    firstMeetHour.minutes
                ).padStart(2, "0")}:${String(firstMeetHour.seconds).padStart(2, "0")}`,
                secondMeet: `${secondSelected} ${String(secondMeetHour.hours).padStart(2, "0")}:${String(
                    secondMeetHour.minutes
                ).padStart(2, "0")}:${String(secondMeetHour.seconds).padStart(2, "0")}`,
                thirdMeet: `${thirdSelected} ${String(thirdMeetHour.hours).padStart(2, "0")}:${String(
                    thirdMeetHour.minutes
                ).padStart(2, "0")}:${String(thirdMeetHour.seconds).padStart(2, "0")}`,
            });
        }
        setModalVisible(!modalVisible);
    };

    const hidePopup = () => {
        setModalVisible(!modalVisible);
    };

    const prevStep = () => {
        scrollRef.current.scrollTo({
            x: 0,
            y: 0,
            animated: true,
        });
        setStep(3);
    };

    const navigateTo = (url: string) => {
        navigationObject.navigate(url);
    };

    const meetingInput: IMeetingInput[] = [
        {
            firstMeet: {
                label: "Vos disponibilités pour un première echange téléphonique (<30 min) :",
                date: "",
                onValueChange: onDayPressOnFirstCalendar,
                firstMarked: firstMarked,
            },
            secondMeet: {
                label: "Vos disponibilités pour un première echange téléphonique (<30 min) :",
                date: "",
                onValueChange: onDayPressOnSecondCalendar,
                secondMarked: secondMarked,
            },
            thirdMeet: {
                label: "Vos disponibilités pour un première echange téléphonique (<30 min) :",
                date: "",
                onValueChange: onDayPressOnThirdCalendar,
                thirdMarked: thirdMarked,
            },
        },
    ];

    return (
        <>
            <View style={styles.container}>
                <PopupComponent
                    sentence={"Voulez-vous vraiment sauvegarder le projet ?"}
                    modalVisible={modalVisible}
                    customFunction={onSubmit}
                    hideModal={hidePopup}
                    actionButtonContent={"Sauvegarder"}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>RDV</Text>
                </View>
                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Voulez-vous vraiment sauvegarder le projet ?</Text>
                            <View style={styles.modalButtonsContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        onSubmit();
                                    }}
                                    style={styles.sendModalButton}
                                >
                                    <Text style={styles.modalButtonContent}>Sauvegarder</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={hideModal} style={styles.cancelModalButton}>
                                    <Text style={styles.modalButtonContent}>Annuler</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal> */}
                <View style={styles.formContainer}>
                    {meetingInput.map((input: IMeetingInput, index: number) => {
                        return (
                            <View key={index}>
                                <View style={styles.cardContainer}>
                                    <Text style={styles.label}>{input.firstMeet.label}</Text>
                                    <Calendar
                                        testID={testID.calendars.FIRST}
                                        enableSwipeMonths
                                        current={firstSelected}
                                        style={styles.calendar}
                                        onDayPress={input.firstMeet.onValueChange}
                                        markedDates={input.firstMeet.firstMarked}
                                        theme={{
                                            calendarBackground: "white",
                                            textDayFontFamily: "RobotoMonoRegular",
                                            arrowColor: "#FFB65E",
                                            monthTextColor: "#000000",
                                            textMonthFontFamily: "RobotoMonoBold",
                                            textDayHeaderFontFamily: "RobotoMonoBold",
                                            todayTextColor: "#FFB65E",
                                        }}
                                    />
                                    <Text style={styles.label}>Date selectionnée : {firstSelected}</Text>
                                    <View style={styles.selectHourContainer}>
                                        <View style={styles.subTitleContainer}>
                                            <Text style={styles.subTitle}>Selectionner une heure :</Text>
                                        </View>
                                        <TimePicker
                                            value={firstMeetHour}
                                            onChange={onFirstMeetHoursChange}
                                            textColor="#ffffff"
                                            zeroPadding={true}
                                        />
                                    </View>
                                </View>
                                <View style={styles.cardContainer}>
                                    <Text style={styles.label}>{input.secondMeet.label}</Text>
                                    <Calendar
                                        testID={testID.calendars.MIDDLE}
                                        enableSwipeMonths
                                        current={secondSelected}
                                        style={styles.calendar}
                                        onDayPress={input.secondMeet.onValueChange}
                                        markedDates={secondMarked}
                                        theme={{
                                            calendarBackground: "white",
                                            textDayFontFamily: "RobotoMonoRegular",
                                            arrowColor: "#FFB65E",
                                            monthTextColor: "#000000",
                                            textMonthFontFamily: "RobotoMonoBold",
                                            textDayHeaderFontFamily: "RobotoMonoBold",
                                            todayTextColor: "#FFB65E",
                                        }}
                                    />
                                    <Text style={styles.label}>Date selectionnée : {secondSelected}</Text>
                                    <View style={styles.selectHourContainer}>
                                        <View style={styles.subTitleContainer}>
                                            <Text style={styles.subTitle}>Selectionner une heure :</Text>
                                        </View>
                                        <TimePicker
                                            value={secondMeetHour}
                                            onChange={onSecondMeetHoursChange}
                                            textColor="#ffffff"
                                            zeroPadding={true}
                                        />
                                    </View>
                                </View>
                                <View style={styles.cardContainer}>
                                    <Text style={styles.label}>{input.thirdMeet.label}</Text>
                                    <Calendar
                                        testID={testID.calendars.LAST}
                                        enableSwipeMonths
                                        current={thirdSelected}
                                        style={styles.calendar}
                                        onDayPress={input.thirdMeet.onValueChange}
                                        markedDates={thirdMarked}
                                        theme={{
                                            calendarBackground: "white",
                                            textDayFontFamily: "RobotoMonoRegular",
                                            arrowColor: "#FFB65E",
                                            monthTextColor: "#000000",
                                            textMonthFontFamily: "RobotoMonoBold",
                                            textDayHeaderFontFamily: "RobotoMonoBold",
                                            todayTextColor: "#FFB65E",
                                        }}
                                    />
                                    <Text style={styles.label}>Date selectionnée : {thirdSelected}</Text>
                                    <View style={styles.selectHourContainer}>
                                        <View style={styles.subTitleContainer}>
                                            <Text style={styles.subTitle}>Selectionner une heure :</Text>
                                        </View>
                                        <TimePicker
                                            value={thirdMeetHour}
                                            onChange={onThirdMeetHoursChange}
                                            textColor="#ffffff"
                                            zeroPadding={true}
                                        />
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={prevStep}>
                            <View style={styles.prevButtonContainer}>
                                <Text style={styles.prevButtonContent}>Précédent</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showPopup}>
                            <View style={styles.nextButtonContainer}>
                                <Text style={styles.nextButtonContent}>Suivant</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};
export default MeetingComponent;

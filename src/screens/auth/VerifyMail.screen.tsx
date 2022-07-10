import React, { SetStateAction, useContext, useState } from "react";
import { Text, TextInput, View, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../../css/auth/VerifyMail";
import { IInput } from "../../interfaces/auth/IInput";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { AuthService } from "../../services/auth/Auth.service";
import Loader from "../../components/Loader";
import { NotificationService } from "../../services/notifications/Notification.service";
import { userContext } from "../../context/UserContext";
import { appRouting } from "../../exports/navigation/app.routing";

const VerifyMailScreen = ({ navigation }: any) => {
    const { setCurrentUser } = useContext(userContext);
    const [mailVerificationCode, setMailVerificationCode] = useState<string>("");
    const [load, setLoad] = useState<boolean>(false);
    const pageTitle: string = "Vérifiez votre email 📩";

    const navigateTo = (url: string) => {
        navigation.navigate(url);
    };
    const onMailVerificationCodeChange = (e: SetStateAction<string>) => {
        setMailVerificationCode(e);
    };

    const mailVerificationInputs: IInput[] = [
        {
            label: "Code",
            placeholder: "Saisir le code reçu par mail",
            value: mailVerificationCode,
            onValueChange: onMailVerificationCodeChange,
        },
    ];

    const onSubmit = () => {
        setLoad(true);

        if (mailVerificationCode.length < 10 || mailVerificationCode.length > 10) {
        }

        AuthService.verifyMailCode(mailVerificationCode)
            .then((res) => {
                let user: IUserCredentials = res.user as IUserCredentials;
                setCurrentUser(user);

                setLoad(false);

                NotificationService.success("success", "Mail vérifié", res.message);
                setTimeout(() => {
                    navigateTo(appRouting.home);
                }, 2000);
            })
            .catch((error) => {
                setLoad(false);
                NotificationService.failed("error", "Code erronée", error);
            });
    };

    return (
        <>
            {load ? (
                <Loader />
            ) : (
                <View style={styles.globalContainer}>
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{pageTitle}</Text>
                            </View>
                            <View style={styles.formContainer}>
                                {mailVerificationInputs.map((input: IInput, index: number) => {
                                    return (
                                        <View key={index}>
                                            <Text style={styles.label}>{input.label}</Text>
                                            <TextInput
                                                style={styles.input}
                                                value={input.value}
                                                onChangeText={input.onValueChange}
                                                placeholder={input.placeholder}
                                                focusable={true}
                                            />
                                        </View>
                                    );
                                })}
                                <TouchableOpacity onPress={onSubmit}>
                                    <View style={styles.verifyMailButtonContainer}>
                                        <View style={styles.verifyButton}>
                                            <Text style={styles.verifyButtonContent}>Vérifiez</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )}
        </>
    );
};
export default VerifyMailScreen;

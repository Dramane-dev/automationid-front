import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { Text, TextInput, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { appRouting } from "../../exports/navigation/app.routing";
import { styles } from "../../css/auth/Signin";
import { IInput } from "../../interfaces/auth/IInput";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { AuthService } from "../../services/auth/Auth.service";
import { NotificationService } from "../../services/notifications/Notification.service";
import Loader from "../../components/Loader";
import { userContext } from "../../context/UserContext";
import { StorageService } from "../../services/storage/Storage.service";
import AutomationIdLogo from "../../components/AutomationIdLogo";

const SigninScreen = ({ navigation }: any) => {
    const { initCurrentUser } = useContext(userContext);
    const [userMail, setUserMail] = useState<string>("");
    const [userPass, setUserPass] = useState<string>("");
    const [load, setLoad] = useState<boolean>(false);

    const navigateTo = (url: string) => {
        navigation.navigate(url);
    };

    const onUserMailChange = (e: SetStateAction<string>) => {
        setUserMail(e);
    };

    const onUserPassChange = (e: SetStateAction<string>) => {
        setUserPass(e);
    };

    const signinInputs: IInput[] = [
        {
            label: "Email",
            placeholder: "Saisir votre email",
            value: userMail,
            onValueChange: onUserMailChange,
        },
        {
            label: "Mot de passe",
            placeholder: "Saisir votre mot de passe",
            value: userPass,
            onValueChange: onUserPassChange,
        },
    ];

    const onSubmit = () => {
        setLoad(true);

        let user: IUserCredentials = {
            userMail: userMail,
            userPass: userPass,
        };

        if (user) {
            AuthService.signin(user)
                .then(async (res) => {
                    setLoad(false);

                    initCurrentUser();
                    NotificationService.success("success", "Connexion réussie", res);
                    setTimeout(() => {
                        navigateTo(appRouting.home);
                    }, 2000);
                })
                .catch((error) => {
                    setLoad(false);
                    switch (true) {
                        case error.includes("Email ou mot de passe est incorrecte"):
                            NotificationService.failed("error", "Connexion échoué", error);
                            break;
                        case error.includes("Service momentanément interrompu..."):
                            NotificationService.failed("error", "Connexion échoué", error);
                            break;
                        default:
                            setTimeout(() => {
                                navigateTo(appRouting.verifyMail);
                            }, 2000);
                            break;
                    }

                    // if (error.includes("Email ou mot de passe est incorrecte")) {
                    //     NotificationService.failed("error", "Connexion échoué", error);
                    // } else {
                    //     NotificationService.failed("error", "Connexion échoué", error);
                    //     setTimeout(() => {
                    //         navigateTo(appRouting.verifyMail);
                    //     }, 2000);
                    // }
                });
        } else {
            setLoad(false);
            NotificationService.failed("error", "Connexion échoué", "Votre email ou mot de passe est incorrecte");
        }
    };

    useEffect(() => {
        StorageService.getUserFromStorage("userInformations")
            .then((user) => {
                if (user.accountValid === "y") {
                    navigateTo(appRouting.home);
                } else {
                    navigateTo(appRouting.verifyMail);
                }
            })
            .catch((error) => {
                navigateTo(appRouting.signup);
            });
    }, []);

    return (
        <>
            {load ? (
                <Loader />
            ) : (
                <View style={styles.globalContainer}>
                    <ScrollView>
                        <KeyboardAwareScrollView>
                            <SafeAreaView>
                                <View style={styles.container}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            style={styles.image}
                                            source={require("../../assets/logos/foncia-logo.png")}
                                        />
                                    </View>
                                    <AutomationIdLogo />
                                    <View style={styles.appNameContainer}>
                                        <Text style={styles.appName}>AUTOMATION ID</Text>
                                    </View>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.title}>SIGN IN</Text>
                                    </View>
                                    <View style={styles.formContainer}>
                                        {signinInputs.map((input: IInput, index: number) => {
                                            return (
                                                <View key={index}>
                                                    <Text style={styles.label}>{input.label}</Text>
                                                    <TextInput
                                                        style={styles.input}
                                                        value={input.value}
                                                        onChangeText={input.onValueChange}
                                                        placeholder={input.placeholder}
                                                        focusable={true}
                                                        secureTextEntry={
                                                            index === signinInputs.length - 1 ? true : false
                                                        }
                                                    />
                                                </View>
                                            );
                                        })}
                                        <TouchableOpacity onPress={onSubmit}>
                                            <View style={styles.signinButtonContainer}>
                                                <View style={styles.siginButton}>
                                                    <Text style={styles.signinButtonContent}>Sign in</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.notHaveAlreadyAnAccountContainer}>
                                            <Text style={styles.notHaveAlreadyAnAccountText}>
                                                Vous ne possédez pas déjà un compte ?
                                            </Text>
                                            <Text
                                                style={styles.signupLink}
                                                onPress={() => navigateTo(appRouting.signup)}
                                            >
                                                {" "}
                                                Sign up.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </KeyboardAwareScrollView>
                    </ScrollView>
                </View>
            )}
        </>
    );
};
export default SigninScreen;

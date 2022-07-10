import React, { SetStateAction, useState } from "react";
import { Text, TextInput, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../../css/auth/Signup";
import { IInput } from "../../interfaces/auth/IInput";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { AuthService } from "../../services/auth/Auth.service";
import { StorageService } from "../../services/storage/Storage.service";
import { NotificationService } from "../../services/notifications/Notification.service";
import Loader from "../../components/Loader";
import AutomationIdLogo from "../../components/AutomationIdLogo";
import { appRouting } from "../../exports/navigation/app.routing";

const SignupScreen = ({ navigation }: any) => {
    const [userNom, setUserNom] = useState<string>("");
    const [userPrenom, setUserPrenom] = useState<string>("");
    const [userMail, setUserMail] = useState<string>("");
    const [userPass, setUserPass] = useState<string>("");
    const [confirmedPass, setConfirmedPass] = useState<string>("");
    const [load, setLoad] = useState<boolean>(false);

    const navigateTo = (url: string) => {
        navigation.navigate(url);
    };

    const onUserNomChange = (e: SetStateAction<string>) => {
        setUserNom(e);
    };

    const onUserPrenomChange = (e: SetStateAction<string>) => {
        setUserPrenom(e);
    };

    const onUserMailChange = (e: SetStateAction<string>) => {
        setUserMail(e);
    };

    const onUserPassChange = (e: SetStateAction<string>) => {
        setUserPass(e);
    };

    const onConfirmedPassChange = (e: SetStateAction<string>) => {
        setConfirmedPass(e);
    };

    const signupInputs: IInput[] = [
        {
            label: "Nom",
            placeholder: "Nom",
            value: userNom,
            onValueChange: onUserNomChange,
        },
        {
            label: "Prénom",
            placeholder: "Prénom",
            value: userPrenom,
            onValueChange: onUserPrenomChange,
        },
        {
            label: "Email",
            placeholder: "Email",
            value: userMail,
            onValueChange: onUserMailChange,
        },
        {
            label: "Mot de passe",
            placeholder: "Mot de passe",
            value: userPass,
            onValueChange: onUserPassChange,
        },
        {
            label: "Confirmer votre mot de passe",
            placeholder: "Confirmer votre mot de passe",
            value: confirmedPass,
            onValueChange: onConfirmedPassChange,
        },
    ];

    const onSubmit = async () => {
        if (userPass === confirmedPass) {
            let userCredential: IUserCredentials = await {
                userNom: userNom,
                userPrenom: userPrenom,
                userMail: userMail,
                userPass: userPass,
                confirmedPassword: confirmedPass,
            };

            setLoad(true);

            if (
                userCredential.userNom &&
                userCredential.userPrenom &&
                userCredential.userMail &&
                userCredential.userPass &&
                userCredential.confirmedPassword
            ) {
                AuthService.signup(userCredential)
                    .then((res) => {
                        let user: IUserCredentials = res.user as IUserCredentials;

                        StorageService.saveUserToStorage("userInformations", user).then(() => {
                            setLoad(false);

                            NotificationService.success("success", "Inscription réussie", res.message);
                            setTimeout(() => {
                                navigateTo(appRouting.verifyMail);
                            }, 2000);
                        });
                    })
                    .catch((error) => {
                        setLoad(false);

                        NotificationService.success("error", "Inscription échoué", error);
                        if (error.includes("Vous possédez déjà un compte")) {
                            setTimeout(() => {
                                navigateTo(appRouting.signin);
                            }, 2000);
                        }
                    });
            } else {
                setLoad(false);
                NotificationService.success("error", "Inscription échoué", "Tous les champs sont requis !");
            }
        } else {
            NotificationService.failed("error", "Inscription échoué", "Vos mots de passe ne sont pas identiques !");
        }
    };

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
                                        <Text style={styles.title}>SIGN UP</Text>
                                    </View>
                                    <View style={styles.formContainer}>
                                        {signupInputs.map((input: IInput, index: number) => {
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
                                                            index === signupInputs.length - 2 ||
                                                            index === signupInputs.length - 1
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                </View>
                                            );
                                        })}
                                        <TouchableOpacity onPress={onSubmit}>
                                            <View style={styles.signupButtonContainer}>
                                                <View style={styles.submitButton}>
                                                    <Text style={styles.signupButtonContent}>Sign up</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.alreadyHaveAnAccountContainer}>
                                            <Text style={styles.alreadyHaveAnAccountText}>
                                                Vous possédez déjà un compte ?
                                            </Text>
                                            <Text
                                                style={styles.signupLink}
                                                onPress={() => navigateTo(appRouting.signin)}
                                            >
                                                {" "}
                                                Sign in.
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigateTo(appRouting.home);
                                            }}
                                        >
                                            <View style={styles.signupButtonContainer}>
                                                <View style={styles.submitButton}>
                                                    <Text style={styles.signupButtonContent}>Home</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigateTo(appRouting.signin);
                                            }}
                                        >
                                            <View style={styles.signupButtonContainer}>
                                                <View style={styles.submitButton}>
                                                    <Text style={styles.signupButtonContent}>Se connecter</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigateTo(appRouting.verifyMail);
                                            }}
                                        >
                                            <View style={styles.signupButtonContainer}>
                                                <View style={styles.submitButton}>
                                                    <Text style={styles.signupButtonContent}>Vérifier</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
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
export default SignupScreen;

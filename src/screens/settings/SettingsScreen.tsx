import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import { userContext } from "../../context/UserContext";
import { styles } from "../../css/settings/Settings";
import { IInput } from "../../interfaces/auth/IInput";
import Loader from "../../components/Loader";
import { IUserCredentials } from "../../interfaces/auth/IUserCredentials";
import { StorageService } from "../../services/storage/Storage.service";
import { NotificationService } from "../../services/notifications/Notification.service";
import { appRouting } from "../../exports/navigation/app.routing";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SettingsService } from "../../services/settings/Settings.service";
import PopupComponent from "../../components/popup/Popup";

const SettingsScreen: React.FunctionComponent = ({ route, navigation }: any) => {
    const { currentUser } = useContext(userContext);
    const [userNom, setUserNom] = useState<string>(currentUser.userNom);
    const [userPrenom, setUserPrenom] = useState<string>(currentUser.userPrenom);
    const [userMail, setUserMail] = useState<string>(currentUser.userMail);
    const [oldUserPass, setOldUserPass] = useState<string>("");
    const [newUserPass, setNewUserPass] = useState<string>("");
    const [confirmedPass, setConfirmedPass] = useState<string>("");
    const [load, setLoad] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [signoutModalVisible, setSignoutModalVisible] = useState(false);

    const onUserNomChange = (e: SetStateAction<string>) => {
        setUserNom(e);
    };

    const onUserPrenomChange = (e: SetStateAction<string>) => {
        setUserPrenom(e);
    };

    const onUserMailChange = (e: SetStateAction<string>) => {
        setUserMail(e);
    };

    const onOldUserPassChange = (e: SetStateAction<string>) => {
        setOldUserPass(e);
    };

    const onNewUserPassChange = (e: SetStateAction<string>) => {
        setNewUserPass(e);
    };

    const onConfirmedPassChange = (e: SetStateAction<string>) => {
        setConfirmedPass(e);
    };

    const navigateTo = (url: string) => {
        navigation.navigate(url);
    };

    const showPopup = () => {
        setModalVisible(!modalVisible);
    };

    const hidePopup = () => {
        setModalVisible(!modalVisible);
    };

    const showSignoutPopup = () => {
        setSignoutModalVisible(!signoutModalVisible);
    };

    const hideSignoutPopup = () => {
        setSignoutModalVisible(!signoutModalVisible);
    };

    const onSubmit = async () => {
        hidePopup();
        if (newUserPass === confirmedPass) {
            let userCredential: IUserCredentials = await {
                userId: currentUser.userId,
                accessToken: currentUser.accessToken,
                userNom: userNom,
                userPrenom: userPrenom,
                userMail: userMail,
                userPass: oldUserPass,
                newUserPass: newUserPass,
                confirmedPassword: confirmedPass,
            };

            // setLoad(true);

            if (
                userCredential.userNom &&
                userCredential.userPrenom &&
                userCredential.userMail &&
                userCredential.userPass &&
                userCredential.newUserPass &&
                userCredential.confirmedPassword
            ) {
                SettingsService.editMyProfile(userCredential)
                    .then((res) => {
                        let user: IUserCredentials = res.user as IUserCredentials;

                        StorageService.saveUserToStorage("userInformations", user).then(() => {
                            setOldUserPass("");
                            setNewUserPass("");
                            setConfirmedPass("");
                            setLoad(false);

                            NotificationService.success("success", "Mise à jour réussie", res.message);
                            if (res.userMailChanged) {
                                setTimeout(() => {
                                    navigateTo(appRouting.verifyMail);
                                }, 2000);
                            } else {
                                setTimeout(() => {
                                    navigateTo(appRouting.accueil);
                                }, 2000);
                            }
                        });
                    })
                    .catch((error) => {
                        setLoad(false);

                        NotificationService.success("error", "Mise à jour échoué", error);
                        if (error.includes("Vous possédez déjà un compte")) {
                            setTimeout(() => {
                                navigateTo(appRouting.signin);
                            }, 2000);
                        }
                    });
            } else {
                setLoad(false);
                console.log("ok cool");
                NotificationService.success("error", "Mise à jour échoué", "Tous les champs sont requis !");
            }
        } else {
            NotificationService.failed("error", "Mise à jour échoué", "Vos mots de passe ne sont pas identiques !");
        }
    };

    const signout = async () => {
        setLoad(true);
        StorageService.deleteUserFromStorage("userInformations")
            .then(() => {
                setLoad(false);
                navigateTo(appRouting.signin);
            })
            .catch(() => {
                setLoad(false);
                NotificationService.failed("error", "Déconnexion", "Déconnexion échouée...");
            });
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
            label: "Ancien mot de passe",
            placeholder: "Mot de passe",
            value: oldUserPass,
            onValueChange: onOldUserPassChange,
        },
        {
            label: "Nouveau mot de passe",
            placeholder: "Nouveau mot de passe",
            value: newUserPass,
            onValueChange: onNewUserPassChange,
        },
        {
            label: "Confirmer votre mot de passe",
            placeholder: "Confirmer votre mot de passe",
            value: confirmedPass,
            onValueChange: onConfirmedPassChange,
        },
    ];

    return (
        <>
            {load ? (
                <Loader />
            ) : (
                <View style={styles.globalContainer}>
                    <PopupComponent
                        sentence={"Voulez-vous vraiment modifier votre profile ?"}
                        modalVisible={modalVisible}
                        customFunction={onSubmit}
                        hideModal={hidePopup}
                        actionButtonContent={"Modifier"}
                    />
                    <PopupComponent
                        sentence={"Voulez-vous vraiment vous déconnecter ?"}
                        modalVisible={signoutModalVisible}
                        customFunction={signout}
                        hideModal={hideSignoutPopup}
                        actionButtonContent={"Déconnexion"}
                    />
                    <ScrollView>
                        <KeyboardAwareScrollView>
                            <View style={styles.container}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>PROFIL</Text>
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
                                                        index === signupInputs.length - 3 ||
                                                        index === signupInputs.length - 2 ||
                                                        index === signupInputs.length - 1
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                            <TouchableOpacity onPress={showPopup}>
                                <View style={styles.signupButtonContainer}>
                                    <View style={styles.submitButton}>
                                        <Text style={styles.signupButtonContent}>Modifier</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showSignoutPopup}>
                                <View style={styles.signupButtonContainer}>
                                    <View style={styles.signoutButton}>
                                        <Text style={styles.signupButtonContent}>Déconnexion</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </KeyboardAwareScrollView>
                    </ScrollView>
                </View>
            )}
        </>
    );
};
export default SettingsScreen;

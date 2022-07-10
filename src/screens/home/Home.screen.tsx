import React, { useEffect, useContext } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { userContext } from "../../context/UserContext";
import { styles } from "../../css/home/Home";
import { multiStepContext } from "../../context/StepContext";
import { appRouting } from "../../exports/navigation/app.routing";
import AutoHeightImage from "react-native-auto-height-image";
import { currentScreenWidth } from "../../exports/dynamic/DynamicResolution";

const HomeScreen = ({ navigation }: any) => {
    const { currentUser, initCurrentUser } = useContext(userContext);
    const { setIsUpdateProject } = useContext(multiStepContext);

    const navigateTo = (url: string) => {
        navigation?.navigate(url);
    };

    useEffect(() => {
        if (!currentUser) {
            initCurrentUser();
        }
        setIsUpdateProject(false);
    }, []);

    return (
        <>
            <View style={styles.globalContainer}>
                <ScrollView>
                    <SafeAreaView>
                        <View style={styles.container}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Bienvenue</Text>
                                <Text style={styles.title}>{currentUser?.userPrenom + " " + currentUser?.userNom}</Text>
                            </View>
                            <View style={styles.imageContainer}>
                                <View style={styles.buImgContainer}>
                                    <AutoHeightImage
                                        style={styles.buAutomationImg}
                                        width={currentScreenWidth}
                                        source={require("../../assets/home/bu-automation.png")}
                                    />
                                    <View style={styles.buTextContainer}>
                                        <Text style={styles.imgTitleContent}>Business Automation</Text>
                                        <Text style={styles.imgTextContent}>
                                            Rationalisez les processus métier, en économisant du temps et de l'énergies
                                            pour améliorer l'expérience des employées
                                        </Text>
                                        <Text style={styles.imgTextContent}>
                                            Nous automatisons certaines tâches à l'aide des robots pour que les
                                            collaborateurs ne deviennent pas des robotos !
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.lowCodeImgContainer}>
                                    <AutoHeightImage
                                        style={styles.lowCodeAutomationImg}
                                        width={currentScreenWidth}
                                        source={require("../../assets/home/low-code.png")}
                                    />
                                    <View style={styles.lowCodeTextContainer}>
                                        <Text style={styles.imgTitleContent}>Low coding Apps</Text>
                                        <Text style={styles.imgTextContent}>
                                            Augmenter l'agilité des équipes en créant des applications sur-mesure et
                                            rapidement.
                                        </Text>
                                        <Text style={styles.imgTextContent}>
                                            Digitaliser vos processus et vos données n'a jamais été aussi simple !
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                    navigateTo(appRouting.ideas);
                                }}
                            >
                                <Text style={styles.buttonContent}>On démarre !</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                    navigateTo(appRouting.signin);
                                }}
                            >
                                <Text style={styles.buttonContent}>Se connecter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                    navigateTo(appRouting.verifyMail);
                                }}
                            >
                                <Text style={styles.buttonContent}>Vérifier</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </View>
        </>
    );
};
export default HomeScreen;

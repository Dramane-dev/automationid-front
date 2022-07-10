import React, { useContext, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "../src/screens/auth/Signup.screen";
import VerifyMailScreen from "../src/screens/auth/VerifyMail.screen";
import SigninScreen from "../src/screens/auth/Signin.screen";
import HomeScreen from "../src/screens/home/Home.screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import MultiFormStepsScreen from "../src/screens/form/MultiFormSteps.screen";
import ProjectsComponent from "../src/components/projects/Projects";
import DetailsComponent from "../src/components/projects/Details";
import { styles } from "../src/css/navigations/StackNavigation";
import { appRouting } from "../src/exports/navigation/app.routing";
import { multiStepContext } from "../src/context/StepContext";
import { currentScreenWidth, currentScreenHeight } from "../src/exports/dynamic/DynamicResolution";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    const { setIsUpdateProject } = useContext(multiStepContext);

    return (
        <>
            <Stack.Navigator>
                {/* <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} /> */}
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen
                    name="VerifyMail"
                    component={VerifyMailScreen}
                    options={({ navigation, route }) => ({
                        headerTitleStyle: {
                            fontFamily: "RobotoMonoSemiBold",
                            fontSize:
                                currentScreenWidth <= 320 && currentScreenHeight <= 568
                                    ? 18
                                    : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                    ? 18
                                    : 20,
                        },
                        headerLeft: () => (
                            <TouchableOpacity
                                style={styles.backButtonContainer}
                                onPress={() => {
                                    setIsUpdateProject(false);
                                    navigation.pop(1);
                                }}
                            >
                                <Ionicons
                                    name="ios-arrow-back"
                                    size={
                                        currentScreenWidth <= 320 && currentScreenHeight <= 568
                                            ? 15
                                            : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                            ? 15
                                            : 20
                                    }
                                    style={styles.icon}
                                    color={"#002955"}
                                />
                                <Text style={styles.backButtonContent}>Retour</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsComponent}
                    options={({ navigation, route }) => ({
                        headerTitle: "Détails",
                        headerTitleStyle: {
                            fontFamily: "RobotoMonoSemiBold",
                            fontSize:
                                currentScreenWidth <= 320 && currentScreenHeight <= 568
                                    ? 18
                                    : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                    ? 18
                                    : 20,
                        },
                        headerLeft: () => (
                            <TouchableOpacity
                                style={styles.backButtonContainer}
                                onPress={() => {
                                    setIsUpdateProject(false);
                                    navigation.pop(1);
                                }}
                            >
                                <Ionicons
                                    name="ios-arrow-back"
                                    size={
                                        currentScreenWidth <= 320 && currentScreenHeight <= 568
                                            ? 15
                                            : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                            ? 15
                                            : 20
                                    }
                                    style={styles.icon}
                                    color={"#002955"}
                                />
                                <Text style={styles.backButtonContent}>Retour</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="UpdateIdea"
                    component={MultiFormStepsScreen}
                    options={({ navigation, route }) => ({
                        headerTitle: "Modifier",
                        headerTitleStyle: {
                            fontFamily: "RobotoMonoSemiBold",
                            fontSize:
                                currentScreenWidth <= 320 && currentScreenHeight <= 568
                                    ? 18
                                    : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                    ? 18
                                    : 20,
                        },
                        headerLeft: () => (
                            <TouchableOpacity
                                style={styles.backButtonContainer}
                                onPress={() => {
                                    setIsUpdateProject(false);
                                    navigation.pop(1);
                                }}
                            >
                                <Ionicons
                                    name="ios-arrow-back"
                                    size={
                                        currentScreenWidth <= 320 && currentScreenHeight <= 568
                                            ? 15
                                            : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                            ? 15
                                            : 20
                                    }
                                    style={styles.icon}
                                    color={"#002955"}
                                />
                                <Text style={styles.backButtonContent}>Retour</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Ideas"
                    component={ProjectsComponent}
                    options={({ navigation, route }) => ({
                        headerTitle: "Mes idées",
                        headerTitleStyle: {
                            fontFamily: "RobotoMonoSemiBold",
                            fontSize:
                                currentScreenWidth <= 320 && currentScreenHeight <= 568
                                    ? 18
                                    : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                    ? 18
                                    : 20,
                        },
                        headerLeft: () => (
                            <TouchableOpacity
                                style={styles.backButtonContainer}
                                onPress={() => {
                                    setIsUpdateProject(false);
                                    navigation.pop(1);
                                }}
                            >
                                <Ionicons
                                    name="ios-arrow-back"
                                    size={
                                        currentScreenWidth <= 320 && currentScreenHeight <= 568
                                            ? 15
                                            : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                            ? 15
                                            : 20
                                    }
                                    style={styles.icon}
                                    color={"#002955"}
                                />
                                <Text style={styles.backButtonContent}>Retour</Text>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                style={styles.newIdeaButton}
                                onPress={() => {
                                    navigation.navigate(appRouting.newIdea);
                                }}
                            >
                                <Ionicons
                                    name="ios-add-circle-outline"
                                    size={20}
                                    style={styles.icon}
                                    color={"#ffffff"}
                                />
                                <Text style={styles.newIdeaButtonContent}>New ID</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Nouvelle idée"
                    component={MultiFormStepsScreen}
                    options={({ navigation, route }) => ({
                        headerTitle: "Nouvelle idée",
                        headerTitleStyle: {
                            fontFamily: "RobotoMonoSemiBold",
                            fontSize:
                                currentScreenWidth <= 320 && currentScreenHeight <= 568
                                    ? 18
                                    : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                    ? 18
                                    : 20,
                        },
                        headerLeft: () => (
                            <TouchableOpacity
                                style={styles.backButtonContainer}
                                onPress={() => {
                                    setIsUpdateProject(false);
                                    navigation.pop(1);
                                }}
                            >
                                <Ionicons
                                    name="ios-arrow-back"
                                    size={
                                        currentScreenWidth <= 320 && currentScreenHeight <= 568
                                            ? 15
                                            : currentScreenWidth <= 375 && currentScreenHeight <= 667
                                            ? 15
                                            : 20
                                    }
                                    style={styles.icon}
                                    color={"#002955"}
                                />
                                <Text style={styles.backButtonContent}>Retour</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
            </Stack.Navigator>
        </>
    );
};
export default StackNavigation;

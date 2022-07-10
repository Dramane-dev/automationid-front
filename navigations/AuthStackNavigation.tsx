import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from "../src/css/navigations/StackNavigation";
import { currentScreenWidth, currentScreenHeight } from "../src/exports/dynamic/DynamicResolution";
import SigninScreen from "../src/screens/auth/Signin.screen";
import SignupScreen from "../src/screens/auth/Signup.screen";
import VerifyMailScreen from "../src/screens/auth/VerifyMail.screen";
import { multiStepContext } from "../src/context/StepContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import DrawerNavigation from "./DrawerNavigation";
import { StorageService } from "../src/services/storage/Storage.service";

const AuthStack = createNativeStackNavigator();

const AuthStackNavigation = () => {
    const [userExist, setUserExist] = useState<boolean>(false);
    const { setIsUpdateProject } = useContext(multiStepContext);

    useEffect(() => {
        StorageService.getUserFromStorage("userInformations")
            .then((usr) => {
                setUserExist((usr.userMail?.length as number) > 0);
            })
            .catch((error) => {
                console.log(error);
                setUserExist(false);
            });
    }, [userExist]);

    return (
        <AuthStack.Navigator key={"authStackNavigation"} initialRouteName={userExist ? "Home" : "Signin"}>
            <AuthStack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            <AuthStack.Screen
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
            <AuthStack.Screen name="Home" component={DrawerNavigation} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
};
export default AuthStackNavigation;

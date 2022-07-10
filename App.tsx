import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import StepContext from "./src/context/StepContext";
import UserContext from "./src/context/UserContext";
import ProjectsContext from "./src/context/ProjectsContext";
import Loader from "./src/components/Loader";
import AuthStackNavigation from "./navigations/AuthStackNavigation";

const getFonts = () =>
    Font.loadAsync({
        RobotoSerifRegular: require("./src/assets/fonts/RobotoSerif/RobotoSerif-Regular.ttf"),
        RobotoSerifSemiBold: require("./src/assets/fonts/RobotoSerif/RobotoSerif-SemiBold.ttf"),
        RobotoSerifBold: require("./src/assets/fonts/RobotoSerif/RobotoSerif-Bold.ttf"),
        RobotoBlack: require("./src/assets/fonts/Roboto/Roboto-Black.ttf"),
        RobotoMonoRegular: require("./src/assets/fonts/RobotoMono/RobotoMono-Regular.ttf"),
        RobotoMonoSemiBold: require("./src/assets/fonts/RobotoMono/RobotoMono-SemiBold.ttf"),
        RobotoMonoBold: require("./src/assets/fonts/RobotoMono/RobotoMono-Bold.ttf"),
    });
// const Tabs = () => {
//     return (
//         <>
//             <Tab.Navigator
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ focused, color, size }) => {
//                         let iconName: string = "";

//                         switch (true) {
//                             case route.name === "Mes projets":
//                                 iconName = "home";
//                                 break;
//                             case route.name === "Nouvelle idée":
//                                 iconName = "add-circle";
//                                 break;
//                             case route.name === "ShoppingCart":
//                                 iconName = "cart-outline";
//                                 break;
//                             case route.name === "Profile":
//                                 iconName = "person-outline";
//                             default:
//                                 break;
//                         }
//                         return <Ionicons name={iconName} size={size} color={color} />;
//                     },
//                     tabBarActiveTintColor: "black",
//                     tabBarInactiveTintColor: "gray",
//                 })}
//             >
//                 <Tab.Screen
//                     name="Mes projets"
//                     component={HomeScreen}
//                     options={{ headerShown: false, unmountOnBlur: true }}
//                 />
//                 <Tab.Screen
//                     name="Nouvelle idée"
//                     component={MultiFormStepsScreen}
//                     options={{ headerShown: false, unmountOnBlur: true }}
//                 />
//             </Tab.Navigator>
//         </>
//     );
// };

// const Root = () => {
//     const { setIsUpdateProject } = useContext(multiStepContext);

//     return (
//         <>
//             <Stack.Navigator>
//                 <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="VerifyMail" component={VerifyMailScreen} options={{ headerShown: false }} />
//                 <Stack.Screen
//                     name="Details"
//                     component={DetailsComponent}
//                     options={({ navigation, route }) => ({
//                         headerTitle: "Détails",
//                         headerTitleStyle: {
//                             fontFamily: "RobotoMonoSemiBold",
//                         },
//                         headerLeft: () => (
//                             <TouchableOpacity
//                                 style={styles.backButtonContainer}
//                                 onPress={() => {
//                                     setIsUpdateProject(false);
//                                     navigation.pop(1);
//                                 }}
//                             >
//                                 <Ionicons name="ios-arrow-back" size={20} style={styles.icon} color={"#002955"} />
//                                 <Text style={styles.backButtonContent}>Retour</Text>
//                             </TouchableOpacity>
//                         ),
//                     })}
//                 />
//                 <Stack.Screen
//                     name="UpdateIdea"
//                     component={MultiFormStepsScreen}
//                     options={({ navigation, route }) => ({
//                         headerTitle: "Mettre à jour mon idée",
//                         headerTitleStyle: {
//                             fontFamily: "RobotoMonoSemiBold",
//                         },
//                         headerLeft: () => (
//                             <TouchableOpacity
//                                 style={styles.backButtonContainer}
//                                 onPress={async () => {
//                                     setIsUpdateProject(false);
//                                     navigation.pop(1);
//                                 }}
//                             >
//                                 <Ionicons name="ios-arrow-back" size={20} style={styles.icon} color={"#002955"} />
//                                 <Text style={styles.backButtonContent}>Retour</Text>
//                             </TouchableOpacity>
//                         ),
//                     })}
//                 />
//                 <Stack.Screen
//                     name="Ideas"
//                     component={ProjectsComponent}
//                     options={({ navigation, route }) => ({
//                         headerTitle: "Mes idées",
//                         headerTitleStyle: {
//                             fontFamily: "RobotoMonoSemiBold",
//                         },
//                         headerLeft: () => (
//                             <TouchableOpacity
//                                 style={styles.backButtonContainer}
//                                 onPress={() => {
//                                     setIsUpdateProject(false);
//                                     navigation.pop(1);
//                                 }}
//                             >
//                                 <Ionicons name="ios-arrow-back" size={20} style={styles.icon} color={"#002955"} />
//                                 <Text style={styles.backButtonContent}>Retour</Text>
//                             </TouchableOpacity>
//                         ),
//                         headerRight: () => (
//                             <TouchableOpacity
//                                 style={styles.newIdeaButton}
//                                 onPress={() => {
//                                     navigation.navigate(appRouting.newIdea);
//                                 }}
//                             >
//                                 <Ionicons
//                                     name="ios-add-circle-outline"
//                                     size={20}
//                                     style={styles.icon}
//                                     color={"#ffffff"}
//                                 />
//                                 <Text style={styles.newIdeaButtonContent}>New ID</Text>
//                             </TouchableOpacity>
//                         ),
//                     })}
//                 />
//                 {/* <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} /> */}
//                 <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="Nouvelle idée" component={MultiFormStepsScreen} options={{ headerShown: false }} />
//             </Stack.Navigator>
//         </>
//     );
// };

export default function App() {
    const [fontsLoad, setFontsLoad] = useState<boolean>(true);

    useEffect(() => {
        getFonts()
            .then(() => {
                setFontsLoad(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {fontsLoad ? (
                <Loader />
            ) : (
                <UserContext>
                    <ProjectsContext>
                        <StepContext>
                            <NavigationContainer>
                                {/* {userExist ? <DrawerNavigation /> : <AuthStackNavigation />} */}
                                <AuthStackNavigation />
                            </NavigationContainer>
                            <Toast />
                        </StepContext>
                    </ProjectsContext>
                </UserContext>
            )}
        </>
    );
}

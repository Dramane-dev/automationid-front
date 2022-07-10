import "react-native-gesture-handler";
import React from "react";
import SettingsScreen from "../src/screens/settings/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigation from "./StackNavigation";
import SignoutScreen from "../src/screens/auth/Signout.screen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Accueil"
            screenOptions={({ navigation, route }) => ({
                drawerActiveTintColor: "#749AD6",
                drawerLabelStyle: {
                    fontFamily: "RobotoMonoBold",
                    color: "#000000",
                },
                // drawerIcon: () => (
                //     <Ionicons name="ios-arrow-back" size={20} style={styles.drawerIcon} color={"#002955"} />
                // ),
                drawerItemStyle: {
                    marginVertical: 10,
                },
            })}
        >
            <Drawer.Screen
                key={0}
                name="Accueil"
                component={StackNavigation}
                options={{
                    drawerIcon: () => <MaterialIcons name="home" size={20} color={"#000000"} />,
                    headerTitle: "",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#ffffff",
                        shadowColor: "transparent",
                    },
                }}
            />
            <Drawer.Screen
                key={1}
                name="Paramètres"
                component={SettingsScreen}
                options={{
                    drawerIcon: () => <MaterialIcons name="settings" size={20} color={"#000000"} />,
                    headerTitle: "",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#ffffff",
                        shadowColor: "transparent",
                    },
                }}
            />
            <Drawer.Screen
                key={2}
                component={SignoutScreen}
                name="Se déconnecter"
                options={{
                    drawerIcon: () => <MaterialIcons name="logout" size={20} color={"#000000"} />,
                    headerTitle: "",
                    headerLeftLabelVisible: false,
                    headerShadowVisible: false,
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "#ffffff",
                        shadowColor: "transparent",
                    },
                }}
            />
        </Drawer.Navigator>
    );
};
export default DrawerNavigation;

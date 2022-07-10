import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { styles } from "../css/components/AutomationIdLogo";

const AutomationIdLogo = () => {
    return (
        <View style={styles.container}>
            <LottieView
                style={styles.logo}
                source={require("../assets/automationid-logo/automationid-logo.json")}
                autoPlay
            />
        </View>
    );
};
export default AutomationIdLogo;

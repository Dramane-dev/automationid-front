import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { styles } from "../css/components/Loader";

const Loader = () => {
    return (
        <View style={styles.container}>
            <LottieView source={require("../assets/loaders/loader.json")} autoPlay />
        </View>
    );
};
export default Loader;

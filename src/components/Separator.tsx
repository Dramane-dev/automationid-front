import Reac from "react";
import { View, StyleSheet } from "react-native";

const Separator = (props: any) => (
    <View
        style={{
            marginVertical: 10,
            borderBottomColor: props.color ? props.color : "#0000000",
            borderBottomWidth: StyleSheet.hairlineWidth,
        }}
    />
);
export default Separator;

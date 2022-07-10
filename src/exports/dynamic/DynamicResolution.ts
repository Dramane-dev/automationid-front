import { Dimensions } from "react-native";

const currentScreenWidth: number = Dimensions.get("screen").width;
const currentScreenHeight: number = Dimensions.get("screen").height;

export { currentScreenWidth, currentScreenHeight };

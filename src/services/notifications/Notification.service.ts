import Toast from "react-native-toast-message";

export const NotificationService = {
    success(type: string, title: string, msg: string) {
        Toast.show({
            type: type,
            text1: title,
            text2: msg,
            visibilityTime: 2500,
        });
    },
    failed(type: string, title: string, msg: string) {
        Toast.show({
            type: type,
            text1: title,
            text2: msg,
            visibilityTime: 2500,
        });
    },
};
